import React from "react";
import maxRound from "../../../../public/assets/maxRound.png";
import Cryptocurrency from "../../../../public/assets/Cryptocurrency.png";
import Image from "next/image";
import { useState } from "react";
const StakeUnstakeCard = ({
  stakeTab,
  setStakeTab,
  dayActive,
  handleOpenModal,
}) => {
  const [stakeAmount, setStakeAmount] = useState("4996.2476");
  const handleStake = (index) => {
    setStakeTab(index);
  };

  const handleMaxClick = () => {
    setStakeAmount("4996.2476"); // Set this to the max stake value
  };

  const getButtonStyles = (index) => ({
    backgroundColor: stakeTab === index ? "#FFFFFF" : "#2E3037",
    color: stakeTab === index ? "#E41E34" : "#FFFFFF",
  });

  const dayData = {
    0: {
      APY: "0.01831087 USDT",
      currentAmount: "0.01831087 USDT",
      dailyRewards: "0.89629221 USDT",
    },
    1: {
      APY: "0.01941087 USDT",
      currentAmount: "0.02831087 USDT",
      dailyRewards: "0.59629221 USDT",
    },
    2: {
      APY: "0.02231087 USDT",
      currentAmount: "0.03831087 USDT",
      dailyRewards: "0.79629221 USDT",
    },
    3: {
      APY: "0.02431087 USDT",
      currentAmount: "0.04831087 USDT",
      dailyRewards: "0.89629221 USDT",
    },
  };

  const selectedData = dayData[dayActive];

  return (
    <div
      className="bg-gradient-to-b flex flex-col justify-around from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-8 md:px-[70px] py-8 max-w-full"
      style={{ border: "2px solid #222429", height: "-webkit-fill-available" }}
    >
      <div>
        <button
          className=" text-[13px] font-bold px-6 py-1 rounded-md"
          style={getButtonStyles(0)}
          index={0}
          onClick={() => handleStake(0)}
        >
          Stake
        </button>
        <button
          className="text-[13px] font-bold px-6 py-1 ml-[-3px] rounded-r-md"
          style={getButtonStyles(1)}
          index={1}
          onClick={() => handleStake(1)}
        >
          Unstake
        </button>
      </div>

      {stakeTab === 1 && (
        <>
          <div className="flex justify-between p-3 my-5 bg-[#2E3037] rounded-2xl">
            <p className="text-[#E1E1E1] text-[11px] font-normal flex gap-1">
              Token
            </p>
            <p className="text-[#E1E1E1] text-[11px] font-normal ">APY</p>
            <p className="text-[#E1E1E1] text-[11px] font-normal ">
              Claimable Rewards
            </p>
          </div>

          <div className="flex justify-between px-3 pb-3">
            <p className="text-[#E1E1E1] text-[11px] font-normal flex gap-1">
              <Image src={Cryptocurrency} width={15} height={15} alt="" /> USDT
            </p>
            <p className="text-[#E1E1E1] text-[11px] font-normal "> 6.83%</p>
            <p className="text-[#E1E1E1] text-[11px] font-normal ">
              {" "}
              6.01831087
            </p>
          </div>
          <div
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-poppins text-[12px] font-bold mt-2"
            style={{ height: "fit-content", border: "1px solid #E41E34" }}
          >
            <button className="text-sm w-full">Claim Rewards</button>
          </div>
        </>
      )}

      <input
        type="text"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        className="text-[#FFFFFF] h-[40px] text-[20px] md:text-[37px] mt-6 mb-12 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
      />

      <p className="text-[#858585] text-[11px] font-normal">
        {stakeTab === 1 ? "Staked balance:" : "Available balance:"}{" "}
        <span className="text-[#E1E1E1]">4996.2476 USDT</span>
      </p>

      <div className="flex justify-center mt-3">
        <Image
          src={maxRound}
          width={50}
          height={50}
          alt="Set Max Stake"
          onClick={handleMaxClick}
          className="cursor-pointer"
        />
      </div>

      {/* {stakeTab === 1 ? (
            <>
              <p className="text-[#858585] text-[13px] font-normal flex text-left mt-4">
                Redeem to
              </p>
              <select className="w-full mt-2 bg-[#121316] text-white p-2 rounded-lg border border-[#2E3037]">
                <option value="Wallet1">Spot Wallet</option>
                <option value="Wallet2">Wallet 2</option>
                <option value="Wallet3">Wallet 3</option>
              </select>
            </>
          ) : (
            <>
              {" "}
              <p className="text-[#858585] text-[13px] font-normal flex text-left mt-4">
                Select strategy{" "}
              </p>
              <select className="w-full mt-2 bg-[#121316] text-white p-2 rounded-lg border border-[#2E3037]">
                <option value="strategy1">Strategy 1</option>
                <option value="strategy2">Strategy 2</option>
                <option value="strategy3">Strategy 3</option>
              </select>{" "}
            </>
          )} */}

      {/* {stakeTab === 0 && (
            <div className="flex justify-between mt-8">
              <DayButton
                text="30 days"
                index={0}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="60 days"
                index={1}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="90 days"
                index={2}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="120 days"
                index={3}
                dayActive={dayActive}
                onClick={handleClick}
              />
            </div>
          )} */}

      {/* <div className="grid grid-cols-2 gap-4 mt-5"> */}
      {stakeTab === 0 ? (
        <div className="flex gap-2 flex-col mt-6">
          <p className="flex justify-between text-left text-[14px] text-[#FFFFFF] font-semibold">
            Summary
          </p>
          <p className="flex justify-between text-left text-[14px] text-[#858585]">
            APY <span className="text-[#FFFFFF]">{selectedData.APY}</span>
          </p>
          <p className="flex justify-between text-left text-[14px] text-[#858585]">
            Current Amount{" "}
            <span className="text-[#FFFFFF]">{selectedData.currentAmount}</span>
          </p>
          <p className="flex justify-between text-left text-[14px] text-[#858585]">
            Daily est. rewards{" "}
            <span className="text-[#53F3C3]">{selectedData.dailyRewards}</span>
          </p>
          <div
            className="flex items-center justify-center space-x-2 bg-[#E41E34] py-2 px-4 rounded-lg font-poppins text-[12px] font-bold mt-4"
            style={{ height: "fit-content", border: "1px solid #E41E34" }}
          >
            <button className="text-sm w-full">Stake</button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-col mt-6">
          <p className="flex justify-between text-left text-[14px] text-[#FFFFFF] font-semibold">
            Summary
          </p>
          <p className="flex justify-between text-left text-[14px] text-[#858585]">
            APY <span className="text-[#FFFFFF]">{selectedData.APY}</span>
          </p>
          <p className="flex justify-between text-left text-[14px] text-[#858585]">
            Claimable rewards
            <span className="text-[#FFFFFF]">{selectedData.currentAmount}</span>
          </p>

          <div
            className="flex items-center justify-center space-x-2 bg-[#E41E34] py-2 px-4 rounded-lg font-poppins text-[12px] font-bold mt-4"
            style={{ height: "fit-content", border: "1px solid #E41E34" }}
          >
            <button className="text-sm w-full" onClick={handleOpenModal}>
              Unstake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakeUnstakeCard;
