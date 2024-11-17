import React from 'react'
import up from "../../../../public/assets/up.png";
import down from "../../../../public/assets/downRed.png";
import diamond from "../../../../public/assets/diamond.png";
import Image from "next/image";
const StakeMainCard = ({stakedTokens}) => {
  return (
    <div className="grid grid-flow-row md:grid-flow-col gap-4">
      {/* Left content */}
      <div className="flex justify-start flex-col md:flex-row text-left">
        <div className="">
          {/* <p className="text-[#E1E1E1] text-[12px] font-normal">
          Letztes Update: Vor 45 Minuten
          </p> */}
          <div className="text-[20px] md:text-[24px] text-[#ffffff]">
            Staked BlackChain Tokens : <span className="text-[#F92C2C]"> {`${stakedTokens > 0 ? stakedTokens : 0}`} BCT</span>
          </div>
          {/* <p className="text-[#F92C2C] text-[12px] font-normal">
          Letztes Update: Vor 45 Minuten
          </p> */}
        </div>
      </div>

      {/*Top Right content */}
      <div className="flex flex-col md:flex-row justify-end align-middle gap-4 md:gap-16">
        <div className="flex justify-end flex-col text-start">
          <p className="text-[#E1E1E1] text-[13px] font-normal italic ">
            Gesamtgewinn
          </p>
          <p className="text-[#53F3C3] flex items-center gap-1">
            {" "}
            <Image src={up} width={10} height={10} alt="" /> 2.52% (+$324.82)
          </p>
        </div>

        <div className="flex items-end text-start gap-1">
          {/* <Image className="mb-4" width={13} height={13} alt="" /> */}

          <div>
            <p className="text-[#E1E1E1] text-[13px] font-normal italic ">
              Bester Performer
            </p>

            <p className="text-[#53F3C3] flex items-center gap-1">
              {" "}
              <Image src={up} width={10} height={10} alt="" /> 2.52% (+$324.82)
            </p>
          </div>
        </div>

        {/* <div className="flex justify-end flex-col text-start">
          <p className="text-[#E1E1E1] text-[13px] font-normal italic ">
            Worst performer
          </p>
          <p className="text-[#F92C2C] flex items-center gap-1">
            <Image src={down} width={10} height={10} alt="" /> 2.52% (+$324.82)
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default StakeMainCard
