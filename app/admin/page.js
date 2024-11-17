'use client';
import React, { useEffect, useState } from 'react'
import { getErrorMessageFromFormattedString, initStakePool, getAllpools, tranferTokenBack, depositeTokens, withdrawTokens } from '../integration/stake_func';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { connection } from '../integration/connection';
import { PublicKey, sendAndConfirmRawTransaction } from '@solana/web3.js';
import { toast } from 'react-toastify';

const page = () => {
    const wallet = useAnchorWallet();
    const [depositeAmount, setDepositeAmount] = useState(0);
    const [pool, setPool] = useState()
    const [transferWallet, setTransferWallet] = useState("")

    const poolInit = async () => {
        try {
            if (!wallet) {
                toast.error("Bitte Wallet anschließen");
                return
            }

            if (wallet) {
                const tx = await initStakePool(wallet, depositeAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool initialisiert")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            // toast.error(error)
            toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut")
        }
    }

    const withdraw = async () => {
        try {
            if (!wallet) {
                toast.error("Bitte Wallet anschließen");
                return
            }

            if (wallet) {
                const tx = await withdrawTokens(wallet, depositeAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool initialisiert")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            // toast.error(error)
            toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut")
        }
    }

    const deposite = async () => {
        try {
            if (!wallet) {
                toast.error("Bitte Wallet anschließen");
                return
            }

            if (wallet) {
                const tx = await depositeTokens(wallet, depositeAmount);
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool initialisiert")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            // toast.error(error)
            toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut")
        }
    }

    const transferBack = async () => {
        try {
            if (!wallet) {
                toast.error("Bitte Wallet anschließen");
                return
            }

            if (wallet) {
                const tx = await tranferTokenBack(wallet, new PublicKey(transferWallet));
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
                const signedTx = await wallet.signTransaction(tx)
                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize())
                toast.success("Pool initialisiert")
                console.log('signature', txId)
                // setRefetch(!refetch)
            }
        } catch (e) {
            console.log(e)
            const error = getErrorMessageFromFormattedString(e.message)
            // toast.error(error)
            toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut")
        }
    }

    useEffect(() => {
        (async () => {
            if(!wallet) return
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
                        <p>Total Stake: {Number(pool?.account?.totalStaked)}</p>
                        <p>Total Stakers: {pool?.account?.totalStakers}</p>

                    </div>
                 : null}
            </div>
            <div className='flex flex-col'>
                <input
                    type="number"
                    value={depositeAmount}
                    onChange={(e) => setDepositeAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full" onClick={poolInit}>
                    Create Pool
                </button>

            </div>

            <div className='flex flex-col'>
                <input
                    type="number"
                    value={depositeAmount}
                    onChange={(e) => setDepositeAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full" onClick={withdraw}>
                    withdraw Pool
                </button>

            </div>

            <div className='flex flex-col'>
                <input
                    type="number"
                    value={depositeAmount}
                    onChange={(e) => setDepositeAmount(parseFloat(e.target.value))}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full" onClick={deposite}>
                    deposite Pool
                </button>

            </div>

            <div className='flex flex-col'>
                <input
                    type="text"
                    value={transferWallet}
                    onChange={(e) => setTransferWallet(e.target.value)}
                    className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
                />
                <button className="text-sm w-full" onClick={transferBack}>
                    Transfer Back
                </button>

            </div>
        </div>
    )
}

export default page