import Strategy from './Strategy';
import { useTranslation } from 'react-i18next';
export default function StrategyList() {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-6 py-6 gap-4" style={{ border: '2px solid #222429' }}>
      <p className="text-white"> {t('Recommended_Strategies')}</p>
      <Strategy />
      <Strategy />
      <Strategy />
    </div>
  );
}
