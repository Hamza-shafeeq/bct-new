import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as anchor from '@coral-xyz/anchor'
import { AnchorProvider } from "@coral-xyz/anchor";
import idl from './idl.json'
import { connection } from "./connection"
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getMint } from "@solana/spl-token";

// replace the newly created pool address here when new pool is created
export const POOL_ADDR = new PublicKey("Fw9joLzeC9gbokcewuxsXo8zPvJpvBieLW8TSc3bLym1");
export const TOKEN_ADDRESS = new PublicKey("FQQ8YAc9fWCoFexLopHg5PL8rC3yuJEPG12oRhHeuPWr")
const FEE_WALLET = new PublicKey("7S6A4vK98MiNBCr9QcP5kdcVjjd4AjYD8M7HUuxULhGv");
const FEE_WALLET_TOKEN_ACCOUNT = getAssociatedTokenAddress(TOKEN_ADDRESS, FEE_WALLET);
export const TOKEN_LAMPORTS = 1000000;

export const getProvider = (wallet) => {
  const provider = new AnchorProvider(
    connection, wallet, { "preflightCommitment": "processed" },
  );
  return provider;
}

export const getEntryData = async (wallet, entryId) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const pools = await program.account.stakeEntry.fetch(entryId);

  return pools
}

export const getAllpools = async (wallet) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const pools = await program.account.stakePool.all()

  return pools
}

export const getPoolData = async (wallet, poolId) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const pool = await program.account.stakePool.fetch(poolId)

  return pool
}

export const getWalletStakes = async (wallet) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const stakes = await program.account.stakeEntry.all(
    [
      {
        memcmp: {
          offset: 41,
          bytes: wallet.publicKey.toString(),
        },
      },
    ]
  )

  return stakes
}

export const initStakePool = async (wallet, amount) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const stake_pool = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("stake-pool")],
      program.programId
    )[0];

    console.log("stake_pool:", stake_pool.toString())

    const poolAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, stake_pool, true)
    const payerAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, wallet.publicKey)

    const poolTx = await program.methods.initPool(
       new anchor.BN(amount),
    ).accounts({
      stakePool: stake_pool,
      poolTokenAccount: poolAta,
      mint: TOKEN_ADDRESS,
      payerTokenAccount: payerAta,
      payer: wallet.publicKey,
      escrowFee: FEE_WALLET,
      escrowTokenAccount: await FEE_WALLET_TOKEN_ACCOUNT,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()

    const transaction = new Transaction().add(poolTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const stakeTokens = async (wallet, amount) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const pool = await getPoolData(wallet, POOL_ADDR);
    const tx = new Transaction();

    const stakeEntry = findStakeEntryId(POOL_ADDR, wallet?.publicKey)

    const stakeEntryId = await connection.getAccountInfo(stakeEntry)
    if (stakeEntryId === null) {
      const txn = await initStakePoolEntry(wallet, POOL_ADDR, stakeEntry)
      tx.add(txn)
    }
    const poolAta = await getAssociatedTokenAddress(pool?.mint, POOL_ADDR, true)
    const payerAta = await getAssociatedTokenAddress(pool?.mint, wallet?.publicKey);

    const tokenDetails = await getMint(connection, new PublicKey(TOKEN_ADDRESS))
    let decimals = parseInt('1' + '0'.repeat(tokenDetails.decimals));

    const txn = await program.methods.stakeTokens(new anchor.BN(amount*decimals)).accounts({
      stakePool: POOL_ADDR,
      poolTokenAccount: poolAta,
      stakeEntry: stakeEntry,
      stakeMint: pool?.mint,
      user: wallet.publicKey,
      userTokenAccount: payerAta,
      escrowTokenAccount: await FEE_WALLET_TOKEN_ACCOUNT,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}

export const unstakeTokens = async (wallet, amount) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const pool = await getPoolData(wallet, POOL_ADDR);
    const tx = new Transaction();
    const stakeEntry = findStakeEntryId(POOL_ADDR, wallet?.publicKey)
    const payerAta = await getAssociatedTokenAddress(pool?.mint, wallet?.publicKey);
    const poolAta = await getAssociatedTokenAddress(pool?.mint, POOL_ADDR, true);
    const txn = await program.methods.unstakeTokens(new anchor.BN(amount * TOKEN_LAMPORTS)).accounts({
      stakePool: POOL_ADDR,
      poolTokenAccount: poolAta,
      stakeEntry: stakeEntry,
      stakeMint: pool?.mint,
      user: wallet.publicKey,
      escrowTokenAccount: await FEE_WALLET_TOKEN_ACCOUNT,
      userTokenAccount: payerAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}

export const claimReward = async (wallet) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const pool = await getPoolData(wallet, POOL_ADDR);
    const tx = new Transaction();
    const stakeEntry = findStakeEntryId(POOL_ADDR, wallet?.publicKey)
    const payerAta = await getAssociatedTokenAddress(pool?.mint, wallet?.publicKey);
    const poolAta = await getAssociatedTokenAddress(pool?.mint, POOL_ADDR, true);

    const txn = await program.methods.claimTokens().accounts({
      stakePool: POOL_ADDR,
      poolTokenAccount: poolAta,
      stakeEntry: stakeEntry,
      stakeMint: pool?.mint,
      user: wallet.publicKey,
      userTokenAccount: payerAta,
      escrowTokenAccount: await FEE_WALLET_TOKEN_ACCOUNT,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}


export const withdrawTokens = async (wallet, amount ) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const pool = await getPoolData(wallet, POOL_ADDR);

    const tx = new Transaction();
    const payerAta = await getAssociatedTokenAddress(pool?.mint, wallet?.publicKey);
    const poolAta = await getAssociatedTokenAddress(pool?.mint, POOL_ADDR, true);

    const txn = await program.methods.withdrawTokens(
      new anchor.BN(amount*TOKEN_LAMPORTS),
    ).accounts({
      stakePool: POOL_ADDR,
      poolTokenAccount: poolAta,
      stakeMint: pool?.mint,
      user: wallet.publicKey,
      userTokenAccount: payerAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}

export const depositeTokens = async (wallet, amount ) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    const pool = await getPoolData(wallet, POOL_ADDR);

    const tx = new Transaction();
    const payerAta = await getAssociatedTokenAddress(pool?.mint, wallet?.publicKey);
    const poolAta = await getAssociatedTokenAddress(pool?.mint, POOL_ADDR, true);

    const txn = await program.methods.depositeTokens(
      new anchor.BN(amount*TOKEN_LAMPORTS),
    ).accounts({
      stakePool: POOL_ADDR,
      poolTokenAccount: poolAta,
      stakeMint: pool?.mint,
      user: wallet.publicKey,
      userTokenAccount: payerAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}

export const updateOwner = async (wallet, newOwner ) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl, idl.metadata.address, provider);

    const tx = new Transaction();

    const txn = await program.methods.transferOwner(
      newOwner
    ).accounts({
      stakePool: POOL_ADDR,
      user: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).instruction()
    tx.add(txn)
    return tx
  } catch (e) {
    console.log(e)
  }
}

export const initStakePoolEntry = async (wallet, poolId, stakeEntryId) => {

  const provider = getProvider(wallet)
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const txn = await program.methods.initEntry().accounts({
    stakeEntry: stakeEntryId,
    stakePool: poolId,
    payer: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  }).instruction();

  return txn

}

export const STAKE_ENTRY_SEED = "stake-entry";
export const findStakeEntryId = (
  stakePoolId,
  user,
) => {
  return PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode(STAKE_ENTRY_SEED),
      stakePoolId.toBuffer(),
      user.toBuffer()
    ],
    new PublicKey(idl.metadata.address),
  )[0];
};

export const getErrorMessageFromFormattedString = (errorString) => {
  const match = errorString.match(/custom program error: 0x([0-9a-fA-F]+)/);

  if (match && match[1]) {
    const hexErrorCode = match[1];
    const errorCode = parseInt(hexErrorCode, 16);
    console.log(errorCode)
    let errorMessage = "";
    if (errorCode === 1 || errorCode === 3012) {
      errorMessage = "Not Enough Balance in Wallet";
    } else {
      errorMessage = getErrorMessage(errorCode);
    }

    return errorMessage || "Error message not found for the provided error code";
  } else {
    return errorString;
  }
}

function getErrorMessage(errorCode) {
  const errorCodes = idl.errors;
  const error = errorCodes.find(err => err.code === errorCode);
  return error ? error.msg : "Unknown error code";
}
