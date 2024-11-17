"use client"; // Optional, only needed if you use client-side features
import { useState } from "react";
import StakeComponent from "../components/stakeComponent/StakeMain";
import OverviewComponent from "../components/overviewComponent/OverviewMain";
import TransactionHistory from "../components/history/TransactionHistory";
import CalculatorMain from "../components/overviewComponent copy/CalculatorMain";
import Faqmain from "../components/faq/Faqmain";

export default function AboutUs() {
  const [selectedTab, setSelectedTab] = useState("stake");

  // Component content based on selected tab
  const getComponentContent = () => {
    switch (selectedTab) {
      case "stake":
        return <StakeComponent />;
      case "overview":
        return <OverviewComponent />;
      case "transactionHistory":
        return <TransactionHistory />;
      case "calculator":
        return <CalculatorMain />;
      case "faqs":
        return <Faqmain />;
      default:
        return <div>Stake Component</div>;
    }
  };

  return (
    <main
      className="flex md:px-12 bg-[#050505] "
      style={{
        minHeight: "calc(100vh - 72px)",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="flex gap-4 md:gap-14 pt-12 border-b-[1px] border-[#222429] md:px-[62px] text-[12px] md:text-[15px] text-[#FFFFFF]"
        style={{ height: "87px" }}
      >
        <p
          className={` cursor-pointer inline-block border-b-2 ${
            selectedTab === "stake" ? "border-red-500" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("stake")}
        >
          Stake
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "overview" ? "border-red-500" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("overview")}
        >
          Übersicht
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "transactionHistory"
              ? "border-red-500"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("transactionHistory")}
        >
          Transaktionshistorie
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "calculator"
              ? "border-red-500"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("calculator")}
        >
          Rechner
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "faqs" ? "border-red-500" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("faqs")}
        >
          FAQ
        </p>
      </div>

      {/* Displaying the content of the selected tab */}
      <div className="mt-8 w-full">{getComponentContent()}</div>
    </main>
  );
}
