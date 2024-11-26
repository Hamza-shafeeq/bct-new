"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { POOL_ADDR, TOKEN_ADDRESS, TOKEN_LAMPORTS } from "@/app/integration/stake_func";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { connection } from "@/app/integration/connection";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
const PROGRAM_ID = "5KA8qSGEJ9c8nNnEqcS5G5Wwsc8S7dzVgb49mUU5ZBUi";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false)
  const wallet = useAnchorWallet()
  const { translations } = useLanguage(); 
  const t = (key) => translations[key] || key;
  const instructions = ['ClaimTokens', 'StakeTokens', 'UnstakeTokens'];

// Function to check for instructions in logMessages and return the message
const checkInstructionsMessage = (logMessages) => {
  const foundInstructions = instructions.filter(instruction =>
    logMessages.some(log => log.includes(instruction))
  );

  // Return a message based on the found instructions
  if (foundInstructions.length > 0) {
    return `${foundInstructions.join(', ')}`;  // Combine multiple instructions if found
  } else {
    return 'No relevant instructions found';  // If no instructions are found
  }
};

const convertUnixTimestampToDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const dateTimeString = date.toLocaleString();   
  return dateTimeString;
};

  // useEffect(() => {
  //   // Example data to populate the table
  //   setTransactions([
  //     {
  //       id: "01",
  //       asset: "Tether",
  //       type: "Stake",
  //       value: "+0.22%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "02",
  //       asset: "Bitcoin",
  //       type: "Unstake",
  //       value: "-5.12%",
  //       amount: "228.333",
  //       time: "2024-07-26 13:45:43",
  //       status: "failed",
  //     },
  //     {
  //       id: "03",
  //       asset: "BCT",
  //       type: "Redeem Reward",
  //       value: "+0.6%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "04",
  //       asset: "Tether",
  //       type: "Stake",
  //       value: "+0.22%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "05",
  //       asset: "Bitcoin",
  //       type: "Unstake",
  //       value: "-5.12%",
  //       amount: "228.333",
  //       time: "2024-07-26 13:45:43",
  //       status: "failed",
  //     },
  //     {
  //       id: "06",
  //       asset: "BCT",
  //       type: "Redeem Reward",
  //       value: "+0.6%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "07",
  //       asset: "Tether",
  //       type: "Stake",
  //       value: "+0.22%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "08",
  //       asset: "Bitcoin",
  //       type: "Unstake",
  //       value: "-5.12%",
  //       amount: "228.333",
  //       time: "2024-07-26 13:45:43",
  //       status: "failed",
  //     },
  //     {
  //       id: "09",
  //       asset: "BCT",
  //       type: "Redeem Reward",
  //       value: "+0.6%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "10",
  //       asset: "Tether",
  //       type: "Stake",
  //       value: "+0.22%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "11",
  //       asset: "Bitcoin",
  //       type: "Unstake",
  //       value: "-5.12%",
  //       amount: "228.333",
  //       time: "2024-07-26 13:45:43",
  //       status: "failed",
  //     },
  //     {
  //       id: "12",
  //       asset: "BCT",
  //       type: "Redeem Reward",
  //       value: "+0.6%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //     {
  //       id: "13",
  //       asset: "Bitcoin",
  //       type: "Unstake",
  //       value: "-5.12%",
  //       amount: "228.333",
  //       time: "2024-07-26 13:45:43",
  //       status: "failed",
  //     },
  //     {
  //       id: "14",
  //       asset: "BCT",
  //       type: "Redeem Reward",
  //       value: "+0.6%",
  //       amount: "496.00923",
  //       time: "2024-07-26 13:45:43",
  //       status: "completed",
  //     },
  //   ]);
  // }, []);


  useEffect(() => {
    (async () => {
      setLoading(true)
      if(!wallet) return
      const walletAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, wallet.publicKey); 
      const signatures = await connection.getSignaturesForAddress(walletAta, {limit: 10});
      const signaturesArray = signatures.map(sig => sig?.signature);
      const allTxns = await connection.getParsedTransactions(signaturesArray, { maxSupportedTransactionVersion: 0 });
      const txns = allTxns.filter((tx)=> tx?.meta?.logMessages.some((item)=> item.includes(PROGRAM_ID)))
      const txData = [];

      for (let tx of txns) {
        if (tx?.meta?.innerInstructions?.length > 0) {
          let amount;
          for (let innertx of tx?.meta?.innerInstructions) {
            if (innertx.instructions.length > 0) {
              for (let ins of innertx?.instructions) {
                const poolAta = await getAssociatedTokenAddress(TOKEN_ADDRESS, POOL_ADDR, true)
                if (ins.program === "spl-token" && ins.parsed.type === "transfer" && (ins?.parsed?.info?.authority == POOL_ADDR?.toString() || ins?.parsed?.info?.destination == poolAta?.toString() )) {
                  amount= ins.parsed.info.amount
                }
              }
            }
          }

          const message = checkInstructionsMessage(tx?.meta?.logMessages);
          txData.push({

            id: tx?.blockTime,
            asset: "BlackChain Token",
            type: message,
            value: "+0.22%",
            amount: amount,
            time: tx?.blockTime,
            status: "completed",
          })

        }
      }
      setTransactions(txData)
      setLoading(false)
    })()
  }, [wallet])


  // Custom render functions for columns
  const assetTemplate = (rowData) => (
    <div className=" flex items-center gap-2 justify-center">
      <span>
        <img
          src="../../../assets/logo.png" // Assuming the logo files are named based on asset
          alt="logo"
          className="w-8 h-8" // Tailwind CSS classes for size, adjust as needed
        />
      </span>
      <span className="text-gray-400 text-xs">
        BCT
      </span> 
      {/* <span className={`icon-${rowData.asset.toLowerCase()}`}>{" "}</span> */}
      <span className="text-white">{rowData.asset}</span>
    </div>
  );

  const typeTemplate = (rowData) => {
    const translations = {
      StakeTokens: "Einsatztoken",
      UnstakeTokens: "Unstake",
      ClaimTokens: "Fordern Sie Token an",
    };
    const translatedType = translations[rowData.type] || rowData.type;

   return <span className="text-white">{translatedType}</span>
  };

  const valueTemplate = (rowData) => (
    <span
      className={`text-${rowData.value.startsWith("-") ? "red-500" : "green-400"
        }`}
    >
      {rowData.value}
    </span>
  );

  const statusTemplate = (rowData) => (
    <div className="w-[100%] flex justify-end">
      <div
        className={` flex items-center justify-center w-6 h-6 rounded-full text-right 
                ${rowData.status === "completed"
            ? "border-2 border-green-500 text-green-500"
            : "border-2 border-red-500 text-red-500"
          }`}
      >
        {rowData.status === "completed" ? "✓" : "✗"}
      </div>
    </div>
  );

  const actionTemplate = () => (
    <Button
      icon="pi pi-external-link"
      className="p-button-rounded p-button-secondary p-button-outlined"
    />
  );

  return (
    <main className="bg-[#0a0a0a] px-6 pb-6 text-white">
      <h2 className="text-left mb-4 text-[24px]">Deine Transaktionen</h2>
      {loading ? <p>...loading</p> :
       <DataTable
        value={transactions}
        className="w-full custom-data-table"
        tableStyle={{
          minWidth: "50rem",
          backgroundColor: "#0a0a0a",
          borderRadius: "12px",
          color: "#ffffff",
        }}
        headerstyle={{
          color: "#858585",
          backgroundColor: "rgb(34, 36, 41)",
          textAlign: "left",
        }}
        rowClassName="custom-row"
      >
        <Column
          field="id"
          header="ID"
          body={(rowData) => (
            <span className="text-gray-400">{rowData.id}</span>
          )}
        />
        <Column field="asset" header="Assets" body={assetTemplate} />
        <Column field="type"    header={t("type")} body={typeTemplate} />
        <Column field="value" header="Wert" body={valueTemplate} />
        <Column
          field="amount"
          header={t("amount")}
          body={(rowData) => (
            <span className="text-white">{rowData.amount/TOKEN_LAMPORTS}</span>
          )}
        />
        <Column
          field="time"
          header={t("time")}
          // header="Zeit"
          body={(rowData) => (
            <span className="text-gray-400">{convertUnixTimestampToDate(rowData.time)}</span>
          )}
        />
        <Column field="status" header={t("status")} body={statusTemplate} />
        {/* <Column header="Actions" body={actionTemplate} /> */}
      </DataTable>
       } 
    </main>
  );
}
