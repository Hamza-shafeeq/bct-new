import Image from 'next/image';
import up from '../../public/assets/up.png';
import { useLanguage } from "../../../context/LanguageContext";
export default function Balance() {
  const { translations } = useLanguage(); 
  const t = (key) => translations[key] || key;

  return (
    <div className="flex mt-6 text-left gap-8 items-end">
      <div>
        <p className="text-[#E1E1E1] text-[12px] font-normal">{t("currentRewardBalance")}</p>
        <p className="text-[#53F3C3] flex items-baseline gap-2">
          <span className="text-white text-[35px]">31.4568789</span> <Image src={up} width={10} height={10} alt="" /> 2.52%
        </p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center space-x-2 bg-[#E41E34] p-1 px-2 rounded-md text-[12px] font-bold border border-[#E41E34]">{t("Upgrade")}</button>
        <button className="flex items-center space-x-2 bg-transparent p-1 px-2 rounded-md text-[12px] font-bold border border-white">{t("Unstake")}</button>
      </div>
    </div>
  );
}
