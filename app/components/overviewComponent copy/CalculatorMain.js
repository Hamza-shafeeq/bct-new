"use client"; // Optional, only needed if you use client-side features
import { useEffect, useState } from "react";
import graphMain from "../../../public/assets/mainGraph.png";
import Image from "next/image";
import DayButton from "./calculatorComponents/DayButton";
import StakeCalcCard from "./calculatorComponents/StakeCalcCard";
import { formatDecimal, getWalletStakes, TOKEN_LAMPORTS } from "@/app/integration/stake_func";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export default function () {
  const wallet = useAnchorWallet()
  const [dayActive, setDayActive] = useState(1);
  const [stakeTab, setStakeTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userStakeData, setUserStakeData] = useState()

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const modalData = {
    available: "6.01831087",
    spotWallet: "Spot Wallet",
    Zusammenfassung: "This is a Zusammenfassung of your rewards.",
    referrer: "1vDEX=100DEX",
    ratio: "85.0885 DEX",
    earnedDex: "85.0885",
    exitFeeRate: 15,
  };

  const hTwo = "Total Staked";
  useEffect(() => {
    (async () => {
      if (!wallet) return
      const data = await getWalletStakes(wallet);
      setUserStakeData(data[0])
    })();
  }, [wallet])

  return (
    <main
      className=" px-6 bg-[050505] w-full"
      style={{
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[calc(30%-0.5rem)_calc(70%-0.5rem)]  gap-4">
        <StakeCalcCard
          stakeTab={stakeTab}
          dayActive={dayActive}
          setDayActive={setDayActive}
          setStakeTab={setStakeTab}
          handleOpenModal={handleOpenModal}
        />
        <div
          className="flex flex-col  text-left px-4 md:px-6 py-6 gap-2 hide-scrollbar bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px]"
          style={{ border: "2px solid #222429", overflow: "auto" }}
        >
          <p className=" font-semibold text-[19px] md:text-[30px] flex justify-between text-[#FFFFFF]">
            Deine Belohnungen{" "}
            <span className="text-[#53F3C3] font-semibold">
              {userStakeData
                ? formatDecimal(
                    userStakeData?.account?.claimed / TOKEN_LAMPORTS
                  )
                : 0}{" "}
              BCT
            </span>
          </p>

          <div className="flex justify-between md:flex-row gap-4 md:gap-0 flex-col">
            {/* <p className="text-[#53F3C3] text-[10px] md:text-[15px] flex gap-2">
              +007.543364 BCT{" "}
              <span className="text-[#858585] font">
                Past 24 Hours based on the BCT price of $29,457.03{" "}
              </span>
            </p> */}
            <div className="flex justify-between gap-2">
              <DayButton text="30" index="1" />
              <DayButton text="60" index="2" />
              <DayButton text="90" index="3" />
              <DayButton text="120" index="4" />
            </div>
          </div>

          <Image className="w-full" src={graphMain} alt="" />
        </div>
      </div>
    </main>
  );
}
