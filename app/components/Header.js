// app/components/Header.js
"use client";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/assets/logo.png";
import hamburger from "../../public/assets/hamburger.png";
import cross from "../../public/assets/crossNew.png";
import drop from "../../public/assets/drop.png";
import Image from "next/image";
import WalletModal from "./WalletModal";
import Mainbutton from "../utilities/Mainbutton";
import dynamic from "next/dynamic";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const WalletButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

export default function Header() {
  const { translations } = useLanguage();
  const t = (key) => translations[key] || key;
  const [menu, setMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConnect = () => {
    console.log("wallet connecting...");
  };

  const wallets = ["Softflair", "Burner Wallet", "Phantom", "Trust"];

  const handleMobWallet = () => {
    setMenu(false);
    setIsModalOpen(true);
  };

  return (
    <header className="bg-[#222429] relative text-white py-4 px-12 shadow-md">
      {/* Desktop Header */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // available={modalData.available}
        wallets={wallets}
        onConnect={handleConnect}
      />
      <div className="items-center justify-between mx-auto font-semibold hidden lg:flex">
        <div className="flex items-center space-x-3">
          <Image src={logo} width={50} height={50} alt="App Logo" />
        </div>
        <div className="flex gap-10 items-center">
          <nav className="flex space-x-16 font-poppins text-[14px]">
            <Link href="/dashboard.html">BCT</Link>
            <Link
              href="/dashboard.html"
              className=" flex items-center text-center text-[#E41E34] gap-1"
            >
              {/* {translations.overview} */}
              {t("overview")}
              {/* EVERYTHING ABOUT US */}
              <Image
                className="flex align-middle"
                src={drop}
                width={8}
                height={7}
                alt="Dropdown"
              />
            </Link>
            <Link href="/dashboard.html"> {t("ROADMAP")}</Link>
            <Link href="/dashboard.html"> {t("FAQS")} </Link>
            <Link href="/dashboard.html"> {t("CONTACT")} </Link>
            <LanguageSelector />
          </nav>
          {/* <Mainbutton title="SELECT WALLET" func={handleOpenModal} /> */}
          <WalletButton />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between">
        <Image
          src={logo}
          width={50}
          height={50}
          alt="App Logo"
          className={`transition-transform duration-300 ease-in-out ${
            menu ? "translate-x-[140px]" : "translate-x-0"
          }`}
        />
        <Image
          className="bg-transparent cursor-pointer"
          src={hamburger}
          onClick={handleMenu}
          width={40}
          height={40}
          alt="Menu Toggle"
        />
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`fixed inset-0 top-0 h-full bg-[#222429] z-50 p-6 flex flex-col items-end transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Animated Cross Icon */}
          <Image
            className={`bg-transparent cursor-pointer transition-opacity duration-300 ease-in-out transform ${
              menu ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            src={cross}
            onClick={handleMenu}
            width={40}
            height={40}
            alt="Close Menu"
          />

          {/* Sliding Logo Inside Menu */}
          <Image
            src={logo}
            width={50}
            height={50}
            alt="App Logo"
            className={`transition-transform duration-300 ease-in-out ${
              menu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          />
        </div>
        <div className="flex items-right space-x-2 bg-[#E41E34] p-2 rounded-md font-poppins text-[12px] mt-10">
          {/* <button className="text-sm" onClick={handleMobWallet}>
            SELECT WALLET
          </button> */}
          <WalletButton />
        </div>
        <nav className="flex flex-col mt-10 text-right gap-8 text-lg font-poppins text-[11px]">
          <Link href="/dashboard.html" onClick={() => setMenu(false)}>
            BCT
          </Link>
          <Link
            href="/dashboard.html"
            className=" text-[#E41E34] flex items-center gap-1"
            onClick={() => setMenu(false)}
          >
            {t("EVERYTHING ABOUT US")}
          </Link>
          <Link href="/dashboard.html" onClick={() => setMenu(false)}>
          {t("ROADMAP")}
          </Link>
          {/* <Link href="/dashboard.html" onClick={() => setMenu(false)}>
            FAQS
          </Link> */}
          <Link href="/dashboard.html" onClick={() => setMenu(false)}>
          {t("CONTACT")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
