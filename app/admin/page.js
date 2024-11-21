"use client";
import React, { useEffect, useState } from "react";
import {
  getErrorMessageFromFormattedString,
  initStakePool,
  getAllpools,
  tranferTokenBack,
  depositeTokens,
  withdrawTokens,
  TOKEN_LAMPORTS,
  TOKEN_ADDRESS,
} from "../integration/stake_func";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  getAccount,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  setAuthority,
  createSetAuthorityInstruction,
  AuthorityType,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import { connection } from "../integration/connection";
import {
  PublicKey,
  sendAndConfirmRawTransaction,
  Transaction,
} from "@solana/web3.js";
import { toast } from "react-toastify";
import idl from "../integration/idl.json";
const anchor = require("@project-serum/anchor");

const page = () => {
  const wallet = useAnchorWallet();
  const { publicKey, signAllTransactions } = useWallet();
  const [poolAmount, setPoolAmount] = useState(0);
  const [pool, setPool] = useState();
  const [transferWallet, setTransferWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositeAmount, setDepositeAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [feePercentage, setFeePercentage] = useState(0);
  const [newOwner, setNewOwner] = useState();

  const programAccounts = async () => {
    const program = new anchor.Program(idl, idl.metadata.address, {
      connection,
    });
    const accs = await program.account.stakeEntry.all();
    // accs.map((index)=>{
    //   console.log(JSON.stringify(index.account.lastStaker))
    //   console.log(Number(index.account.amount)/1e6)
    // })
    // const filename = 'wallet-data2.json';

    // fs.writeFile(filename, JSON.stringify(accs), (err:any) => {
    //   if (err) {
    //     console.error('Error writing to file', err);
    //   } else {
    //     console.log('Data written to file successfully');
    //   }
    // });
    return accs;
  };

  const poolInit = async () => {
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        const tx = await initStakePool(wallet, poolAmount);
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        toast.success("Pool initialisiert");
        console.log("signature", txId);
        // setRefetch(!refetch)
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      // toast.error(error)
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut"
      );
    }
  };

  const withdraw = async () => {
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        const tx = await withdrawTokens(wallet, withdrawAmount);
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        toast.success("Pool initialisiert");
        console.log("signature", txId);
        // setRefetch(!refetch)
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      // toast.error(error)
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut"
      );
    }
  };

  const deposite = async () => {
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        const tx = await depositeTokens(wallet, depositeAmount);
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        toast.success("Pool initialisiert");
        console.log("signature", txId);
        // setRefetch(!refetch)
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      // toast.error(error)
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut"
      );
    }
  };

  const transferBack = async () => {
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        const tx = await tranferTokenBack(
          wallet,
          new PublicKey(transferWallet)
        );
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        toast.success("Pool initialisiert");
        console.log("signature", txId);
        // setRefetch(!refetch)
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      // toast.error(error)
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut"
      );
    }
  };

  const airdropTokens = async () => {
    try {
      if (!publicKey) return;
      const response = await fetch(
        "https://mainnet.helius-rpc.com/?api-key=611b8650-18b4-4948-91d9-5c3492144251",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "getTokenAccounts",
            id: "helius-test",
            params: {
              page: 1,
              limit: 1000,
              displayOptions: {},
              mint: "BCTJnXmpYpmnozJb2eYykzPnVnV8cSABXXd71iJN8s7t",
            },
          }),
        }
      );
      const alldata = await response.json();
      const wallets = alldata.result.token_accounts;

      const allTxns = [];
      let currentTx = new Transaction();
      let count = 0;

      for (let item of wallets) {
        const userAta = await getAssociatedTokenAddress(
          TOKEN_ADDRESS,
          publicKey
        );
        const receAta = new PublicKey(item.address);

        const percentageAmount = Math.floor(item.amount * (percentage / 100));
        currentTx.add(
          createTransferCheckedInstruction(
            userAta,
            TOKEN_ADDRESS,
            receAta,
            publicKey,
            percentageAmount,
            6
          )
        );

        count++;

        if (count === 20 || item === wallets[wallets.length - 1]) {
          currentTx.feePayer = publicKey;
          currentTx.recentBlockhash = (
            await connection.getLatestBlockhash("confirmed")
          ).blockhash;
          allTxns.push(currentTx); // Add the current transaction to the array
          currentTx = new Transaction(); // Reset for the next batch
          count = 0; // Reset the counter
        }
      }

      console.log("allTxns", allTxns);

      const signedTx = await signAllTransactions(allTxns);
      for (let tx of signedTx) {
        const sig = await connection.sendRawTransaction(tx.serialize());
        console.log(sig);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const transferOwner = async () => {
    try {
      if (!wallet) {
        toast.error("Please connect wallet");
        return;
      }
      if (!newOwner) {
        toast.error("Please Enter new owner");
        return;
      }
      const key = new PublicKey(newOwner);
      if (!PublicKey.isOnCurve(key.toBytes())) {
        toast.error("Please Enter a valid pubkey");
        return;
      }
      if (wallet) {
        const tx = await updateOwner(wallet, key);

        if (!tx) {
          return;
        }
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        toast.success("Owner Update Succesful");
        console.log("signature", txId);
        setRefetch(!refetch);
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      toast.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (!wallet) return;
      const data = await getAllpools(wallet);
      setPool(data[0]);
    })();
  }, [wallet]);

  console.log(pool);

  const airdropTokensAndFee = async () => {
    try {
      if (!publicKey) return;
      const response = await fetch(
        "https://mainnet.helius-rpc.com/?api-key=611b8650-18b4-4948-91d9-5c3492144251",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "getTokenAccounts",
            id: "helius-test",
            params: {
              page: 1,
              limit: 1000,
              displayOptions: {},
              mint: "BCTJnXmpYpmnozJb2eYykzPnVnV8cSABXXd71iJN8s7t",
            },
          }),
        }
      );
      const alldata = await response.json();
      const wallets = alldata.result.token_accounts;
      const accs = await programAccounts();

      const allData = [];
      // console.log(allData , 20)
      for (let i = 0; i < wallets.length; i++) {
        if(!PublicKey.isOnCurve(wallets[i].owner)) continue
        let matched = false;
        for (let j = 0; j < accs.length; j++) {
          if (wallets[i].owner === accs[j]?.account?.lastStaker.toString()) {
            matched = true;
            const userData = {
              wallet: wallets[i].owner,
              staked_amount: Number(accs[j]?.account?.amount),
              wallet_amount: wallets[i].amount,
              total_amount:
                (wallets[i].amount + Number(accs[j]?.account?.amount)),
            };
            allData.push(userData);
          }
        }

        // If no match was found in accs for this wallet, add it separately
        if (!matched) {
          const userData = {
            wallet: wallets[i].owner,
            staked_amount: 0, // No staked amount in accs
            wallet_amount: wallets[i].amount,
            total_amount: wallets[i].amount,
          };
          allData.push(userData);
        }
      }

      // Now, add any addresses in accs that weren’t in wallets
      for (let j = 0; j < accs.length; j++) {
        const lastStaker = accs[j]?.account?.lastStaker.toString();
        const alreadyIncluded = allData.some(
          (data) => data.wallet === lastStaker
        );

        if (!alreadyIncluded) {
          const userData = {
            wallet: lastStaker,
            staked_amount: Number(accs[j]?.account?.amount),
            wallet_amount: 0, // No wallet amount in wallets
            total_amount: Number(accs[j]?.account?.amount),
          };
          allData.push(userData);
        }
      }

      const newData = allData.filter(item => {
        if (item.wallet === "3eR4KfQQCH6BBgfBnMCV59cEV1XbK6sozaZUs5FSrd1G") {
          return false; // Exclude this item from the new array
        }
        return true; // Keep other items
      });

      const allTxns = [];
      let currentTx = new Transaction();
      let count = 0;

      for (let item of newData) {
        console.log("item.wallet",item.wallet, PublicKey.isOnCurve(item.wallet));
        const userAta = await getAssociatedTokenAddress(
          TOKEN_ADDRESS,
          publicKey
        );
        const receAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, new PublicKey(item.wallet));

        const percentageAmount = Math.floor(
          item.total_amount * (feePercentage / 100)
        );

        console.log(item.total_amount);
        console.log(percentageAmount);

        currentTx.add(
          createTransferCheckedInstruction(
            userAta,
            TOKEN_ADDRESS,
            receAta,
            publicKey,
            percentageAmount,
            6
          )
        );

        count++;

        if (count === 20 || item === newData[newData.length - 1]) {
          currentTx.feePayer = publicKey;
          currentTx.recentBlockhash = (
            await connection.getLatestBlockhash("confirmed")
          ).blockhash;
          allTxns.push(currentTx); // Add the current transaction to the array
          currentTx = new Transaction(); // Reset for the next batch
          count = 0; // Reset the counter
        }
      }

      console.log("allTxns", allTxns);

      const signedTx = await signAllTransactions(allTxns);
      for (let tx of signedTx) {
        const sig = await connection.sendRawTransaction(tx.serialize());
        console.log(sig);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <h3>Pool Data</h3>
        {pool ? (
          <div>
            <p>Authority: {pool?.account?.authority?.toString()}</p>
            <p>Fee Wallet: {pool?.account?.escrowFee?.toString()}</p>
            <p>Token Address: {pool?.account?.mint?.toString()}</p>
            <p>
              Total Stake: {Number(pool?.account?.totalStaked) / TOKEN_LAMPORTS}
            </p>
            <p>Total Stakers: {pool?.account?.totalStakers}</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col mb-4">
        <input
          type="number"
          value={poolAmount}
          onChange={(e) => setPoolAmount(parseFloat(e.target.value))}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={poolInit}
        >
          Create Pool
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={withdraw}
        >
          withdraw Pool
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="number"
          value={depositeAmount}
          onChange={(e) => setDepositeAmount(parseFloat(e.target.value))}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={deposite}
        >
          deposite Pool
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={transferWallet}
          onChange={(e) => setTransferWallet(e.target.value)}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={transferBack}
        >
          Transfer Back
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={transferOwner}
        >
          Transfer Owner
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(parseFloat(e.target.value))}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
          min="0"

        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={airdropTokens}
        >
          Airdrop Tokens
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="number"
          value={feePercentage}
          onChange={(e) => setFeePercentage(parseFloat(e.target.value))}
          className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-3 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
          min="0"
        />
        <button
          className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded"
          onClick={airdropTokensAndFee}
        >
          Airdrop Fee
        </button>
      </div>
    </div>
  );
};

export default page;
