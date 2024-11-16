'use client';
import React, { useEffect, useState } from 'react'
import { getErrorMessageFromFormattedString, initStakePool, getAllpools } from '../integration/stake_func';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { connection } from '../integration/connection';
import { sendAndConfirmRawTransaction } from '@solana/web3.js';
import { toast } from 'react-toastify';

const page = () => {
    const wallet = useAnchorWallet();
    const [depositeAmount, setDepositeAmount] = useState(0);
    const [pool, setPool] = useState()


    const poolInit = async () => {
        try {
            if (!wallet) {
                toast.error("Please connect wallet");
                return
            }

            if (wallet) {
                const tx = await initStakePool(wallet, depositeAmount);
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
        </div>
    )
}

export default page