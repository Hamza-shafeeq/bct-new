"use client"; // Optional, only needed if you use client-side features
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="grid grid-cols-2 gap-6 px-12 bg-[050505]" style={{ minHeight: 'calc(100vh - 72px)' }}>
      {/* Left Column (50% Width, content aligned to left) */}
      <div className="flex flex-col items-start justify-center space-y-8">
        <p className="text-lg text-gray-700">
          HOW TO BECOME PART OF THE BCT ECOSYSTEM
        </p>
        <h1 className="text-4xl font-bold mb-4">Become a part of the community</h1>
        <p className="text-lg text-gray-700">
          Here we explain how you can buy, hold and manage your BCT.
        </p>
        <div className="flex gap-3">
          <div className="flex items-center space-x-2 bg-[#E41E34] p-2 rounded-md font-poppins text-[14px]">
            <button className="text-sm">Here you can stake the BCT Token</button>
          </div>
          <Link href="/staking" className="block p-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go
          </Link>
          <Link href="/staking" className="block p-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go
          </Link>
          <Link href="/staking" className="block p-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go
          </Link>
        </div>
      </div>

      {/* Right Column (50% Width, for future content) */}
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500">Content will go here.</p>
      </div>
    </main>
  );
}
