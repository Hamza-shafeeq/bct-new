'use client';
import React, { useEffect, useState } from 'react'
import { getErrorMessageFromFormattedString, initStakePool, getAllpools, tranferTokenBack, depositeTokens, withdrawTokens, TOKEN_LAMPORTS } from '../integration/stake_func';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { connection } from '../integration/connection';
import { PublicKey, sendAndConfirmRawTransaction } from '@solana/web3.js';
import { toast } from 'react-toastify';

const page = () => {
    const wallet = useAnchorWallet();
    const { publicKey, signAllTransactions } = useWallet();
    const [poolAmount, setPoolAmount] = useState(0)
    const [pool, setPool] = useState()
    const [transferWallet, setTransferWallet] = useState("")
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [depositeAmount, setDepositeAmount] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [newOwner, setNewOwner] = useState()


    const poolInit = async () => {
        try {
            if (!wallet) {
                toast.error("Please connect wallet");
                return
            }

            if (wallet) {
                const tx = await initStakePool(wallet, poolAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool Initialized")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            toast.error(error)
        }
    }

    const withdraw = async () => {
        try {
            if (!wallet) {
                toast.error("Please connect wallet");
                return
            }

            if (wallet) {
                const tx = await withdrawTokens(wallet, withdrawAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool Initialized")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            toast.error(error)
        }
    }

    const deposite = async () => {
        try {
            if (!wallet) {
                toast.error("Please connect wallet");
                return
            }

            if (wallet) {
                const tx = await depositeTokens(wallet, depositeAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool Initialized")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            toast.error(error)
        }
    }

    const transferBack = async () => {
        try {
            if (!wallet) {
                toast.error("Please connect wallet");
                return
            }

            if (wallet) {
                const tx = await tranferTokenBack(wallet, new PublicKey(transferWallet));
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool Initialized")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            toast.error(error)
        }
    }

    const airdropTokens = async () => {
        try {
            if (!publicKey) return
            const response = await fetch("https://mainnet.helius-rpc.com/?api-key=611b8650-18b4-4948-91d9-5c3492144251", {
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
            });
            const alldata = await response.json();
            const wallets = alldata.result.token_accounts;


            const allTxns = [];
            let currentTx = new Transaction();
            let count = 0;

            for (let item of wallets) {
                const userAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, publicKey);
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
                    currentTx.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
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
            console.log(e)
        }
    }

    const transferOwner = async () => {
        try {
          if (!wallet) {
            toast.error("Please connect wallet");
            return
          }
          if (!newOwner) {
            toast.error("Please Enter new owner");
            return
          }
          const key = new PublicKey(newOwner);
          if (!PublicKey.isOnCurve(key.toBytes())) {
            toast.error("Please Enter a valid pubkey");
            return
          }
          if (wallet) {
            const tx= await updateOwner(wallet, key);
    
            if (!tx) {
              return
            }
            tx.feePayer = wallet.publicKey
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
            const signedTx = await wallet.signTransaction(tx)
            const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
            toast.success("Owner Update Succesful")
            console.log('signature', txId)
            setRefetch(!refetch)
          }
        } catch (e) {
          console.log(e)
          const error = getErrorMessageFromFormattedString(e.message)
          toast.error(error)
        }
      }
    

    useEffect(() => {
        (async () => {
            if (!wallet) return
            const data = await getAllpools(wallet)
            setPool(data[0]);
        })();
    }, [wallet])


    console.log(pool)

    return (
        <div className='flex items-center justify-center flex-col'>
            <div>
                <h3>Pool Data</h3>
                {pool ?
                    <div>
                        <p>Authority: {pool?.account?.authority?.toString()}</p>
                        <p>Fee Wallet: {pool?.account?.escrowFee?.toString()}</p>
                        <p>Token Address: {pool?.account?.mint?.toString()}</p>
                        <p>Total Stake: {Number(pool?.account?.totalStaked)/TOKEN_LAMPORTS}</p>
                        <p>Total Stakers: {pool?.account?.totalStakers}</p>

                    </div>
                    : null}
            </div>
            <div className='flex flex-col mb-4'>
                <input
                    type="number"
                    value={poolAmount}
                    onChange={(e) => setPoolAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={poolInit}>
                    Create Pool
                </button>

            </div>

            <div className='flex flex-col mb-4'>
                <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={withdraw}>
                    withdraw Pool
                </button>
            </div>

            <div className='flex flex-col mb-4'>
                <input
                    type="number"
                    value={depositeAmount}
                    onChange={(e) => setDepositeAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={deposite}>
                    deposite Pool
                </button>

            </div>

            <div className='flex flex-col mb-4'>
                <input
                    type="text"
                    value={transferWallet}
                    onChange={(e) => setTransferWallet(e.target.value)}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={transferBack}>
                    Transfer Back
                </button>

            </div>

            <div className='flex flex-col mb-4'>
                <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={transferOwner}>
                    Transfer Owner
                </button>

            </div>

            <div className='flex flex-col mb-4'>
                <input
                    type="text"
                    value={percentage}
                    onChange={(e) => setPercentage(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full bg-[#e41e34] px-4 py-2 rounded" onClick={airdropTokens}>
                    Airdrop Tokens
                </button>

            </div>
        </div>
    )
}

export default page