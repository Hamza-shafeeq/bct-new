"use client"; // Optional, only needed if you use client-side features
import { useEffect, useState } from "react";
import up from "../../../public/assets/up.png";
import down from "../../../public/assets/downRed.png";
import diamond from "../../../public/assets/diamond.png";
import maxRound from "../../../public/assets/maxRound.png";
import bitcoin from "../../../public/assets/logo.png";
import orangeArrow from "../../../public/assets/orangeArrow.png";
import graph from "../../../public/assets/graphOneImp.png";
import graphTwo from "../../../public/assets/graphTwoImp.png";
import graph3 from "../../../public/assets/graphThreeImp.png";
import graph4 from "../../../public/assets/graphFourImp.png";
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
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { formatDecimal, getWalletStakes, TOKEN_LAMPORTS } from "@/app/integration/stake_func";

export default function () {
  const wallet = useAnchorWallet()
  const [dayActive, setDayActive] = useState(0);
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

  const hTwo = "Gesamteinsatz";

  function calculateRewards(initialAmount, startTimeUnix,) {
    const rewardRate = 0.0019933;
    const rewards = initialAmount * rewardRate * calculateNumberOf12HourPeriodsUTC(startTimeUnix);
    return rewards;
  }

  function calculate24hrsRewards(initialAmount) {
    const rewardRate = 0.0019933;
    const rewards = initialAmount * rewardRate * 2;
    return rewards;
  }

  function formatTimestamp(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp * 1000);

    // Options for formatting the date and time
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    };

    // Format the date and time
    return date.toLocaleString('en-US', options);
  }


  const calculateNumberOf12HourPeriodsUTC = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const currentDate = new Date(); // Current local time
    const currentUTC = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
    const hours = date.getUTCHours(); 
    let firstPeriodStart;
    if (hours >= 0 && hours < 12) {
      firstPeriodStart = new Date(date.setUTCHours(0, 0, 0, 0)); // Set time to 12 AM UTC today
    } else {
      firstPeriodStart = new Date(date.setUTCHours(12, 0, 0, 0)); // Set time to 12 PM UTC today
    }
    const timeDifference = currentUTC - firstPeriodStart.getTime(); // Difference in milliseconds
    const numberOfPeriods = Math.floor(timeDifference / (12 * 60 * 60 * 1000)); // 12 hours in milliseconds
  
    return numberOfPeriods;
  };

  useEffect(() => {
    (async () => {
      if (!wallet) return
      const data = await getWalletStakes(wallet)
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
      {/* Top four boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewSquare
          graph={graph}
          bitcoin={bitcoin}
          arrowIcon={orangeArrow}
          hTwo={hTwo}
          amount={
            userStakeData
              ? formatDecimal(
                  Number(userStakeData?.account?.amount) / TOKEN_LAMPORTS
                )
              : 0
          }
        />
        <OverviewSquare
          graph={graphTwo}
          bitcoin={bitcoin}
          arrowIcon={orangeArrow}
          hTwo="Verfügbar"
          amount={
            userStakeData
              ? formatDecimal(
                  (calculateRewards(
                    Number(userStakeData?.account?.amount),
                    Number(userStakeData?.account?.lastStakedAt)
                  ) +
                    Number(userStakeData?.account?.rewards)) /
                    TOKEN_LAMPORTS
                )
              : 0
          }
        />
        <OverviewSquare
          graph={graph3}
          bitcoin={bitcoin}
          arrowIcon={orangeArrow}
          hTwo="Gesamtprämien"
          amount={
            userStakeData
              ? formatDecimal(
                  (calculateRewards(
                    Number(userStakeData?.account?.amount),
                    Number(userStakeData?.account?.lastStakedAt)
                  ) +
                    Number(userStakeData?.account?.claimed) +
                    Number(userStakeData?.account?.rewards)) /
                    TOKEN_LAMPORTS
                )
              : 0
          }
        />
        <OverviewSquare
          graph={graph4}
          bitcoin={bitcoin}
          arrowIcon={orangeArrow}
          hTwo="24-Stunden-Prämien"
          amount={
            userStakeData
              ? formatDecimal(
                  calculate24hrsRewards(
                    Number(userStakeData?.account?.amount)
                  ) / TOKEN_LAMPORTS
                )
              : 0
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[calc(70%-0.5rem)_calc(30%-0.5rem)]  gap-4 mt-5">
        <div className="flex flex-col  text-left md:px-6 py-6 gap-2 hide-scrollbar">
          <p className="font-semibold text-[19px] md:text-[30px] flex justify-between text-[#FFFFFF]">
            Deine Belohnungen{" "}
            <span className="text-[#53F3C3] font-semibold">
              {userStakeData
                ? Number(userStakeData?.account?.claimed) / TOKEN_LAMPORTS
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
            {/* <div className="flex justify-between text-[#FFFFFF]">
              <DayButton text="30" index="1" />
              <DayButton text="60" index="2" />
              <DayButton text="90" index="3" />
              <DayButton text="120" index="4" />
            </div> */}
          </div>

          {/* <Image className="w-full" src={graphMain} alt="" /> */}
        </div>

        {/* Bottom right section */}
        <div
          className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] p-4 flex flex-col gap-5 lg:h-[600px] custom-scrollbar text-[#FFFFFF]"
          style={{ border: "2px solid #222429", overflow: "auto" }}
        >
          <ReturnsSquare
            hTwo="Aktuelle monatliche Rendite"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
            amount={
              userStakeData
                ? formatDecimal(
                    (calculate24hrsRewards(
                      Number(userStakeData?.account?.amount)
                    ) *
                      30) /
                      TOKEN_LAMPORTS
                  )
                : 0
            }
            percentage={11.9598}
          />
          <ReturnsSquare
            hTwo="Erwartete tägliche Rendite"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
            amount={
              userStakeData
                ? formatDecimal(
                    calculate24hrsRewards(
                      Number(userStakeData?.account?.amount)
                    ) / TOKEN_LAMPORTS
                  )
                : 0
            }
            percentage={0.39866}
          />
          <ReturnsSquare
            hTwo="Erwartete wöchentliche Rendite"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
            amount={
              userStakeData
                ? formatDecimal(
                    (calculate24hrsRewards(
                      Number(userStakeData?.account?.amount)
                    ) *
                      7) /
                      TOKEN_LAMPORTS
                  )
                : 0
            }
            percentage={2.79062}
          />
          <ReturnsSquare
            hTwo="Erwartete jährliche Rendite"
            graph={graph}
            bitcoin={bitcoin}
            arrowIcon={up}
            amount={
              userStakeData
                ? formatDecimal(
                    (calculate24hrsRewards(
                      Number(userStakeData?.account?.amount)
                    ) *
                      365) /
                      TOKEN_LAMPORTS
                  )
                : 0
            }
            percentage={145.511}
          />
        </div>
      </div>
    </main>
  );
}
