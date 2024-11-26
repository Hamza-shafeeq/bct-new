import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import StakeComponent from "../app/components/stakeComponent/StakeMain";
import OverviewComponent from "../app/components/overviewComponent/OverviewMain";
import TransactionHistory from "../app/components/history/TransactionHistory";
import CalculatorMain from "../app/components/overviewComponent copy/CalculatorMain";
import Faqmain from "../app/components/faq/Faqmain";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])), // Load 'common' translations
    },
  };
}

export default function AboutUs() {
  const { t } = useTranslation();  // Hook to access translations
  const [selectedTab, setSelectedTab] = useState("stake");

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
      // case "faqs":
      //   return <Faqmain />;
      default:
        return <div>{t('stake')}</div>;  // Example translation usage
    }
  };

  return (
    <main
      className="flex md:px-12 bg-[#050505]"
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
          {t('Stake')}  {/* Example translation key */}
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "overview" ? "border-red-500" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("overview")}
        >
          {t('Overview')}
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "transactionHistory"
              ? "border-red-500"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("transactionHistory")}
        >
          {t('Transaction History')}
        </p>
        <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "calculator"
              ? "border-red-500"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("calculator")}
        >
          {t('Calculator')}
        </p>
        {/* Uncomment and translate FAQ */}
        {/* <p
          className={`cursor-pointer inline-block border-b-2 ${
            selectedTab === "faqs" ? "border-red-500" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("faqs")}
        >
          {t('FAQ')}
        </p> */}
      </div>

      {/* Display the selected component */}
      <div className="mt-8 w-full">{getComponentContent()}</div>
    </main>
  );
}
