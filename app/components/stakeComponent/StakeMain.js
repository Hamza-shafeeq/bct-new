"use client"; // Optional, only needed if you use client-side features
import { useState } from "react";
import Strategy from "../Strategy";
import RewardRedeemModal from "../RewardRedeemModal";
import StakeMainCard from "./stakeComponents/StakeMainCard";
import StakeUnstakeBtn from "./stakeComponents/StakeUnstakeBtn";
import CurrentBalance from "./stakeComponents/CurrentBalance";
import StakeUnstakeCard from "./stakeComponents/StakeUnstakeCard";

export default function StakeComponent() {
  const [dayActive, setDayActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakeTab, setStakeTab] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const modalData = {
    available: "6.01831087",
    spotWallet: "Spot Wallet",
    summary: "This is a summary of your rewards.",
    referrer: "1vDEX=100DEX",
    ratio: "85.0885 DEX",
    earnedDex: "85.0885",
    exitFeeRate: 15,
  };

  const handleRedeem = () => {
    console.log("Redeem button clicked");
    handleCloseModal();
  };

  const handleClick = (index) => {
    setDayActive(index);
  };

  return (
    <main
      className=" px-6 bg-[050505] w-full"
      style={{
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RewardRedeemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        available={modalData.available}
        spotWallet={modalData.spotWallet}
        summary={modalData.summary}
        referrer={modalData.referrer}
        ratio={modalData.ratio}
        earnedDex={modalData.earnedDex}
        exitFeeRate={modalData.exitFeeRate}
        onRedeem={handleRedeem}
      />
      <div
        className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505]  rounded-[22px] px-8 py-10"
        style={{ border: "2px solid #222429" }}
      >
        {/* Top content */}
        <StakeMainCard />

        {/* // bottom content */}
        <div className="flex mt-6 text-left flex-col md:flex-row gap-14 items-end">
          <CurrentBalance />
          <StakeUnstakeBtn />
        </div>
      </div>

      {/* bottom section having two blocks */}
      <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-[calc(55%-0.5rem)_calc(45%-0.5rem)] gap-4 mt-5">
        <div
          className={`flex flex-col bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] text-left rounded-[22px] px-3 md:px-6 py-6 gap-6 hide-scrollbar max-w-full ${
            stakeTab === 1 ? "md:h-[667px]" : "md:h-[610px]"
          }`}
          style={{
            border: "2px solid #222429",
            overflow: "auto",
          }}
        >
          <p className="font-semibold text-[#FFFFFF]">Recommended Strategies</p>
          <Strategy />
          {/* <Strategy />
          <Strategy />
          <Strategy /> */}
        </div>

        <StakeUnstakeCard
          stakeTab={stakeTab}
          dayActive={dayActive}
          setStakeTab={setStakeTab}
          handleOpenModal={handleOpenModal}
        />
        {/* </div> */}
      </div>
    </main>
  );
}
