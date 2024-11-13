import Image from "next/image";
export default function ReturnsSquare({ hTwo, graph, arrowIcon, bitcoin }) {
  return (
    <div
      className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505]  rounded-[22px] p-5 "
      style={{ border: "2px solid #222429" }}
    >
      <div className="flex justify-start items-center align-middle text-left gap-2">
        {/* <p className="text-[#E1E1E1] text-[12px] font-normal" >Last update: 45 minutes ago</p> */}
        <Image
          className="h-[47px]"
          src={bitcoin}
          width={47}
          height={35}
          alt=""
        />

        <h2 className="text-[21px] font-semibold leading-6">{hTwo}</h2>
      </div>

      <div className="flex justify-between mt-4">
        <div className="leading-5">
          <h2 className="text-[19px] flex text-left font-semibold">
            21.3412 BTC
          </h2>

          <p className="text-[13px] text-[#53F3C3] font-light flex items-center gap-1">
            + 6.75%{" "}
            <Image
              className="mb-[2px]"
              src={arrowIcon}
              width={10}
              height={8}
              alt=""
            />
          </p>
        </div>
        <Image className="" src={graph} width={90} height={90} alt="" />
      </div>
    </div>
  );
}
