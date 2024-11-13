import Strategy from './Strategy';

export default function StrategyList() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-6 py-6 gap-4" style={{ border: '2px solid #222429' }}>
      <p className="text-white">Recommended Strategies</p>
      <Strategy />
      <Strategy />
      <Strategy />
    </div>
  );
}
