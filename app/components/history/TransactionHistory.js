"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Example data to populate the table
    setTransactions([
      {
        id: "01",
        asset: "Tether",
        type: "Stake",
        value: "+0.22%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "02",
        asset: "Bitcoin",
        type: "Unstake",
        value: "-5.12%",
        amount: "228.333",
        time: "2024-07-26 13:45:43",
        status: "failed",
      },
      {
        id: "03",
        asset: "USDT",
        type: "Redeem Reward",
        value: "+0.6%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "04",
        asset: "Tether",
        type: "Stake",
        value: "+0.22%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "05",
        asset: "Bitcoin",
        type: "Unstake",
        value: "-5.12%",
        amount: "228.333",
        time: "2024-07-26 13:45:43",
        status: "failed",
      },
      {
        id: "06",
        asset: "USDT",
        type: "Redeem Reward",
        value: "+0.6%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "07",
        asset: "Tether",
        type: "Stake",
        value: "+0.22%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "08",
        asset: "Bitcoin",
        type: "Unstake",
        value: "-5.12%",
        amount: "228.333",
        time: "2024-07-26 13:45:43",
        status: "failed",
      },
      {
        id: "09",
        asset: "USDT",
        type: "Redeem Reward",
        value: "+0.6%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "10",
        asset: "Tether",
        type: "Stake",
        value: "+0.22%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "11",
        asset: "Bitcoin",
        type: "Unstake",
        value: "-5.12%",
        amount: "228.333",
        time: "2024-07-26 13:45:43",
        status: "failed",
      },
      {
        id: "12",
        asset: "USDT",
        type: "Redeem Reward",
        value: "+0.6%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
      {
        id: "13",
        asset: "Bitcoin",
        type: "Unstake",
        value: "-5.12%",
        amount: "228.333",
        time: "2024-07-26 13:45:43",
        status: "failed",
      },
      {
        id: "14",
        asset: "USDT",
        type: "Redeem Reward",
        value: "+0.6%",
        amount: "496.00923",
        time: "2024-07-26 13:45:43",
        status: "completed",
      },
    ]);
  }, []);

  // Custom render functions for columns
  const assetTemplate = (rowData) => (
    <div className="flex items-center gap-2 justify-center">
      <span className={`icon-${rowData.asset.toLowerCase()}`} />{" "}
      {/* Placeholder for asset icon */}
      <span className="text-white">{rowData.asset}</span>
      <span className="text-gray-400 text-xs">
        {rowData.asset === "USDT" ? "USDT" : "BTC"}
      </span>
    </div>
  );

  const typeTemplate = (rowData) => (
    <span className="text-white">{rowData.type}</span>
  );

  const valueTemplate = (rowData) => (
    <span
      className={`text-${
        rowData.value.startsWith("-") ? "red-500" : "green-400"
      }`}
    >
      {rowData.value}
    </span>
  );

  const statusTemplate = (rowData) => (
    <Tag
      value={rowData.status === "completed" ? "✓" : "✗"}
      severity={rowData.status === "completed" ? "success" : "danger"}
    />
  );

  const actionTemplate = () => (
    <Button
      icon="pi pi-external-link"
      className="p-button-rounded p-button-secondary p-button-outlined"
    />
  );

  return (
    <main className="bg-[#0a0a0a] px-6 pb-6 text-white">
      <h2 className="text-left mb-4 text-[24px]">Your transactions</h2>
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
        <Column field="type" header="Type" body={typeTemplate} />
        <Column field="value" header="Value" body={valueTemplate} />
        <Column
          field="amount"
          header="Amount"
          body={(rowData) => (
            <span className="text-white">{rowData.amount}</span>
          )}
        />
        <Column
          field="time"
          header="Time"
          body={(rowData) => (
            <span className="text-gray-400">{rowData.time}</span>
          )}
        />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </main>
  );
}
