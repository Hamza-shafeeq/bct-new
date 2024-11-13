import React from "react";

const StakeUnstakeBtn = () => {
  return (
    <div className="flex gap-4 ">
      <div
        className="flex items-center space-x-2 bg-[#E41E34] p-1 px-2 rounded-md font-poppins text-[12px] font-bold"
        style={{ height: "fit-content", border: "1px solid #E41E34" }}
      >
        <button className="text-sm">Upgrade</button>
      </div>

      <div
        className="flex items-center space-x-2 p-1 px-2 rounded-md font-poppins text-[12px] font-bold"
        style={{ height: "fit-content", border: "1px solid #FFFFFF" }}
      >
        <button className="text-sm">Unstake</button>
      </div>
    </div>
  );
};

export default StakeUnstakeBtn;
