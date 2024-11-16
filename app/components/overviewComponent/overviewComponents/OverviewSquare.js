

import Image from 'next/image'
export default function OverviewSquare ({hTwo, graph, arrowIcon, bitcoin})  {
  return (
    <div
      className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505]  rounded-[22px] p-6"
      style={{ border: "2px solid #222429" }}
    >
      <div className="flex justify-start align-middle text-left gap-2">
        {/* <p className="text-[#E1E1E1] text-[12px] font-normal" >Last update: 45 minutes ago</p> */}
        <Image
          className="h-[47px]"
          src={bitcoin}
          width={47}
          height={35}
          alt=""
        />

        <div>
          <h2 className="text-[22px] font-semibold">{hTwo}</h2>
          <p className="text-[12px] font-light mt-0">BTC</p>
        </div>
      </div>

      <Image className="w-full" src={graph} width={100} height={100} alt="" />

      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold text-[#FFFFFF]">
          21.3412 BTC
        </h2>
        <p className="text-[12px] font-light flex items-center gap-1">
          + 6.75%{" "}
          <Image
            className="mb-[2px]"
            src={arrowIcon}
            width={14}
            height={14}
            alt=""
          />
        </p>
      </div>
    </div>
  );
}
