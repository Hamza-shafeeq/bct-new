import React from "react";
import up from "../../../../public/assets/up.png";
import Image from "next/image";
const CurrentBalance = ({amount}) => {
  return (
    <div className="">
      <p className="text-[#E1E1E1] text-[12px] font-normal ">
        Current Reward balance. AVAX
      </p>
      <p className="text-[#53F3C3] flex  items-baseline gap-2">
        {" "}
        <span className="text-[#FFFFFF] h-[20px] text-[35px]">
          {amount}
        </span>{" "}
        <Image src={up} width={10} height={10} alt="" /> 2.52%
      </p>
    </div>
  );
};

export default CurrentBalance;
