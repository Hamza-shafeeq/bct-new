import React, { useEffect } from "react";

import { useState } from "react";
import DayButton from "./DayButton";
import { calculateDaysRewards, formatDecimal } from "@/app/integration/stake_func";
const StakeCalcCard = ({
  stakeTab,
  setStakeTab,
  dayActive,
  setDayActive,
  handleOpenModal,
}) => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0)
  const handleStake = (index) => {
    setStakeTab(index);
    setTotalRewards(calculateDaysRewards(stakeAmount))

  };

  const handleMaxClick = () => {
    setStakeAmount("4996.2476"); // Set this to the max stake value
  };

  const handleClick = (day) => {
    setDayActive(day)
    
  };

  const getButtonStyles = (index) => ({
    backgroundColor: stakeTab === index ? "#FFFFFF" : "#2E3037",
    color: stakeTab === index ? "#E41E34" : "#FFFFFF",
  });

  const dayData = {
    0: {
      JährlicheRendite: "0.01831087 BCT",
      currentAmount: "0.01831087 BCT",
      dailyRewards: "0.89629221 BCT",
    },
    1: {
      JährlicheRendite: "0.01941087 BCT",
      currentAmount: "0.02831087 BCT",
      dailyRewards: "0.59629221 BCT",
    },
    2: {
      JährlicheRendite: "0.02231087 BCT",
      currentAmount: "0.03831087 BCT",
      dailyRewards: "0.79629221 BCT",
    },
    3: {
      JährlicheRendite: "0.02431087 BCT",
      currentAmount: "0.04831087 BCT",
      dailyRewards: "0.89629221 BCT",
    },
  };

  const selectedData = dayData[dayActive];


  useEffect(() => {
    let active = 30;

    switch (dayActive) {
      case 1:
        active = 60;
        break;
      case 2:
        active = 90;
        break;
      case 3:
        active = 120;
        break;
      default:
        active = 30;
    }
    setTotalRewards(calculateDaysRewards(stakeAmount,active))
  }, [dayActive, stakeAmount])
  

  return (
    <div
      className="bg-gradient-to-b flex flex-col justify-around from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-8 md:px-[20px] py-8"
      style={{ border: "2px solid #222429", height: "-webkit-fill-available" }}
    >
      <p className="flex justify-center text-center text-[16px] text-[#FFFFFF] font-semibold">
      Berechne deine mögliche Rendite

      </p>

      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
        className="text-[#FFFFFF] h-[40px] text-[50px] mt-4 mb-8 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        min="0"
      />

      <p className="flex justify-center text-center text-[16px] text-[#FFFFFF] font-semibold">
      Stakingzeitraum
      </p>

      {stakeTab === 0 && (
        <div className="flex justify-between mt-4 flex-wrap">
          <DayButton
            text="30 Tage"
            index={0}
            dayActive={dayActive}
            onClick={() => { handleClick(0) }}
          />
          <DayButton
            text="60 Tage"
            index={1}
            dayActive={dayActive}
            onClick={() => { handleClick(1) }}
          />
          <DayButton
            text="90 Tage"
            index={2}
            dayActive={dayActive}
            onClick={() => { handleClick(2) }}
          />
          <DayButton
            text="120 Tage"
            index={3}
            dayActive={dayActive}
            onClick={() => { handleClick(3) }}
          />
        </div>
      )}

<div className="flex flex-col items-center mt-6">
  <p className="text-center text-[14px] text-[#FFFFFF] font-semibold">
    Zusammenfassung
  </p>
  <p className="text-center text-[14px] text-[#858585]">
  Jährliche Rendite <span className="text-[#FFFFFF]">{selectedData.APY}</span>
  </p>
  <p className="text-[#53F3C3] mt-3 font-semibold md:text-[50px] text-center">
    {totalRewards ? formatDecimal(totalRewards) : 0}
  </p>
  <p className="text-center text-[14px] mt-[-10px] text-[#858585]">
  Erwartete BCT
  </p>
</div>

    </div>
  );
};

export default StakeCalcCard;
