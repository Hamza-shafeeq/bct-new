// components/RewardRedeemModal.js
'use client'
import React from "react";
const RewardRedeemModal = ({
  isOpen,
  onClose,
  stakeUnstake,
  stakeTab,
  userBalance,
  spotWallet,
  Zusammenfassung,
  referrer,
  ratio,
  earnedDex,
  exitFeeRate,
  onRedeem,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div
        className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-2xl  p-6 w-80 text-white relative z-10"
        onClick={(e) => e.stopPropagation()} // Prevents click from closing modal when inside content
      >
        <button
          onClick={onClose}
          className="absolute top-3 w-7 h-7 flex justify-center items-center right-3 text-gray-300 bg-black rounded-full hover:text-white"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-5">Rewards auszahlen</h2>

        {/* <div className="text-sm mb-4">
          <p className="text-right  text-white text-[13px] font-normal mr-2"><strong className="text-[#858585]">Available:</strong> {available}</p>
            <select className="w-full mt-2 bg-[#121316] text-white p-2 rounded-xl border border-[#2E3037]">
            <option value="Wallet1">Spot Wallet</option>
            <option value="Wallet2">Wallet 2</option>
            <option value="Wallet3">Wallet 3</option>
            </select>
        </div> */}

        <div className="text-sm mb-4">
          <h3 className="font-semibold text-left">Zusammenfassung</h3>
          {/* <p>{Zusammenfassung}</p> */}
        </div>

        <p className="text-right flex justify-between text-white text-[13px] font-normal mr-2">
          <strong className="text-[#858585]">Available</strong>
          {userBalance}
        </p>

        <p className="text-right flex justify-between text-white text-[13px] font-normal mr-2">
          <strong className="text-[#858585]">{stakeTab == 1 ?  "Unstake Amount" : stakeTab == 2 ? "Claim Amount" : "Stake Amount" }</strong>
          {stakeUnstake}
        </p>

        {/* <p className="text-right flex justify-between text-white text-[13px] font-normal mr-2 mt-2">
          <strong className="text-[#858585]">Ratio</strong>
          {ratio}
        </p> */}

        {/* <p className="text-right flex justify-between text-white text-[13px] font-normal mr-2  mt-2">
          <strong className="text-[#858585]">DEX</strong>+ {earnedDex}
        </p> */}

        {/* <div className="text-sm mb-4 flex justify-between">
          <h3 className="font-semibold"> DEX</h3>
          <p>- {exitFeeRate} </p>
        </div> */}

        {/* <p className="text-right flex justify-between text-white text-[13px] font-normal mr-2  mt-2">
          <strong className="text-[#858585]">Current Exit Fee Rate:</strong>
          {exitFeeRate}%
        </p> */}

        {/* <div className="text-sm mb-4 flex justify-between">
          <p><strong>Current Exit Fee Rate:</strong> {exitFeeRate}%</p>
        </div> */}

        <button
          onClick={onRedeem}
          className="bg-[#E41E34] text-white rounded-lg px-4 py-2 w-full font-semibold mt-6"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default RewardRedeemModal;
