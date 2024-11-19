// app/components/Header.js
"use client";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/assets/logo.png";
import drop from "../../public/assets/drop.png";
import Image from "next/image";
import up from "../../public/assets/up.png";
import diamond from "../../public/assets/diamond.png";

export default function Strategy() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div
        className="bg-[#2E3037]  rounded-[22px] px-7 py-5 max-w-full"
        style={{ border: "2px solid #222429" }}
      >
        <div className="grid grid-flow-col gap-4">
          <div className="flex justify-start text-left">
            <div>
              <div className="text-[14px] text-[#FFFFFF]">BCT Staking</div>
            </div>
          </div>
          <div className="flex justify-end align-middle gap-10">
            {/* <div
              className="flex items-center space-x-2 bg-[#E41E34] p-1 px-4 rounded-md font-poppins text-[12px] font-bold"
              style={{ height: "fit-content", border: "1px solid #E41E34" }}
            >
              <button className="text-sm text-[#FFFFFF]">Stake</button>
            </div> */}
          </div>
        </div>

        <div className="grid grid-flow-row lg:grid-flow-col gap-4">
          <div className="flex gap-5">
            <div className="flex flex-col mt-6 text-left items-baseline">
              <h3 className="text-[#FFFFFF] font-semibold text-left h-[20px] text-[20px] mb-3">
              145.511%
              </h3>
              <p className="text-[#E1E1E1] text-[12px] font-normal">BCT APR</p>
            </div>

            {/* <div className="flex flex-col text-[34px] mt-6 font-bold text-left items-baseline text-[#FFFFFF]">
              /
            </div> */}

            {/* <div className="flex flex-col mt-6 text-left items-baseline">
              <h3 className="text-[#FFFFFF] font-semibold text-left h-[20px] text-[20px] mb-3">
                29.41%
              </h3>
              <p className="text-[#E1E1E1] text-[12px] font-normal">USDC APR</p>
            </div> */}
          </div>

          <div className="flex justify-end flex-col text-start lg:ml-[80px]">
            <p className="text-[#E1E1E1] text-[12px] font-normal italic ">
            Gesamte Rewards
            </p>
            <p className="text-[#53F3C3] flex items-center gap-1">
              {" "}
              <Image src={up} width={10} height={10} alt="App Logo" /> 2.52%
              (+$324.82)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
