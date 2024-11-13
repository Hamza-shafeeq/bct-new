"use client"; // Optional, only needed if you use client-side features
import { useState } from "react";
import up from "../../../public/assets/up.png";
import down from "../../../public/assets/downRed.png";
import diamond from "../../../public/assets/diamond.png";
import maxRound from "../../../public/assets/maxRound.png";
import bitcoin from "../../../public/assets/bitcoin.png";
import orangeArrow from "../../../public/assets/orangeArrow.png";
import graph from "../../../public/assets/graph.png";
import graphTwo from "../../../public/assets/graphTwo.png";
import graph3 from "../../../public/assets/graph3.png";
import graph4 from "../../../public/assets/graph4.png";
import graphMain from "../../../public/assets/mainGraph.png";
import Cryptocurrency from "../../../public/assets/Cryptocurrency.png";
import CryptoBlue from "../../../public/assets/CryptoBlue.png";
import downRed from "../../../public/assets/downRed.png";
import Image from "next/image";
import Strategy from "../Strategy";
import DayButton from "./overviewComponents/DayButton";
import RewardRedeemModal from "../RewardRedeemModal";
import OverviewSquare from "./overviewComponents/OverviewSquare";
import ReturnsSquare from "./overviewComponents/ReturnsSquare";

export default function () {
  const [dayActive, setDayActive] = useState(0);
  const [stakeTab, setStakeTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const hTwo = "Total Staked";

  return (
    <main
      className=" px-6 bg-[050505] w-full"
      style={{
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top four boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewSquare
          graph={graph}
          bitcoin={bitcoin}
          arrowIcon={orangeArrow}
          hTwo={hTwo}
        />
        <OverviewSquare
          graph={graphTwo}
          bitcoin={CryptoBlue}
          arrowIcon={orangeArrow}
          hTwo="Available"
        />
        <OverviewSquare
          graph={graph3}
          bitcoin={CryptoBlue}
          arrowIcon={orangeArrow}
          hTwo="Total Rewards"
        />
        <OverviewSquare
          graph={graph4}
          bitcoin={CryptoBlue}
          arrowIcon={orangeArrow}
          hTwo="24h Rewards"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[calc(70%-0.5rem)_calc(30%-0.5rem)]  gap-4 mt-5">
        <div className="flex flex-col  text-left md:px-6 py-6 gap-2 hide-scrollbar">
          <p className="font-semibold text-[19px] md:text-[30px] flex justify-between">
            Rewards earned{" "}
            <span className="text-[#53F3C3] font-semibold">18.01390 BTC</span>
          </p>

          <div className="flex justify-between md:flex-row gap-4 md:gap-0 flex-col">
            <p className="text-[#53F3C3] text-[10px] md:text-[15px] flex gap-2">
              +007.543364 BTC{" "}
              <span className="text-[#858585] font">
                Past 24 Hours based on the BTC price of $29,457.03{" "}
              </span>
            </p>
            <div className="flex justify-between">
              <DayButton text="30" index="1" />
              <DayButton text="60" index="2" />
              <DayButton text="90" index="3" />
              <DayButton text="120" index="4" />
            </div>
          </div>

          <Image className="w-full" src={graphMain} alt="" />
        </div>

        {/* Bottom right section */}
        <div
          className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] p-4 flex flex-col gap-5 lg:h-[600px] custom-scrollbar"
          style={{ border: "2px solid #222429", overflow: "auto" }}
        >
          <ReturnsSquare
            hTwo="Current monthly returns"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
          />
          <ReturnsSquare
            hTwo="Current monthly returns"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
          />
          <ReturnsSquare
            hTwo="Current monthly returns"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
          />
          <ReturnsSquare
            hTwo="Current monthly returns"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
          />
        </div>
      </div>
    </main>
  );
}
