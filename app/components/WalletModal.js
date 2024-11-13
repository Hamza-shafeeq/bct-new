// components/WalletModal.js
import React from "react";

const WalletModal = ({ isOpen, onClose, wallets, onConnect }) => {
  if (!isOpen) return null;
  console.log("wallets", wallets);
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div
        className="bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] rounded-2xl  p-6 w-80 text-white relative z-10"
        onClick={(e) => e.stopPropagation()} // Prevents click from closing modal when inside content
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex justify-center items-center text-gray-300 hover:text-white p-2 bg-black rounded-full"
        >
          X
        </button>
        <h2 className="text-2xl font-medium mb-5">
          Connect a wallet on Solana to continue
        </h2>

        {wallets.length > 0 &&
          wallets.map((wallet) => (
            <p
              key={wallet}
              className="text-right flex justify-between text-[17px] text-white font-normal p-2 mr-2 mt-3 rounded-lg hover:bg-[#E41E34]"
            >
              {wallet}
            </p>
          ))}

        <button
          onClick={onConnect}
          className="bg-[#E41E34] text-white rounded-lg px-4 py-2 w-full font-semibold mt-6"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
