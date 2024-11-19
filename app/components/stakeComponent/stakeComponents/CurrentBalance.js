import React from "react";
import up from "../../../../public/assets/up.png";
import Image from "next/image";
import bitcoin from "../../../../public/assets/logo.png";
const CurrentBalance = ({ amount }) => {
  return (
    <div className="flex gap-2">
      <p className="text-[#F92C2C] flex items-baseline gap-2">
        {" "}
        <span className="text-[#E1E1E1] h-[20px] text-[15px] font-normal ">
          Aktuelle Rewards :
        </span>
        <span className="text-[#E1E1E1] h-[20px] text-[15px] flex items-center gap-2">
          {amount}{" "}
          <Image
            className="h-[37px]"
            src={bitcoin}
            width={37}
            height={35}
            alt=""
          />
        </span>{" "}
        {/* <Image src={up} width={10} height={10} alt="" /> 2.52% */}
      </p>
    </div>
  );
};

export default CurrentBalance;
