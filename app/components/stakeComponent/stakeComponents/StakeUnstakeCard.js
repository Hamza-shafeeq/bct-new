import React, { useEffect } from "react";
import maxRound from "../../../../public/assets/maxbtn.png";
import Cryptocurrency from "../../../../public/assets/Cryptocurrency.png";
import Image from "next/image";
import { useState } from "react";
import {
  calculateRewards,
  claimReward,
  formatDecimal,
  getErrorMessageFromFormattedString,
  getWalletStakes,
  stakeTokens,
  TOKEN_ADDRESS,
  TOKEN_LAMPORTS,
  unstakeTokens,
} from "@/app/integration/stake_func";
import { connection } from "@/app/integration/connection";
import { sendAndConfirmRawTransaction } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { toast } from "react-toastify";
import RewardRedeemModal from "../../RewardRedeemModal";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const StakeUnstakeCard = ({
  stakeTab,
  setStakeTab,
  dayActive,
  // handleOpenModal,
}) => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [userStakeData, setUserStakeData] = useState();
  const [refetch, setRefetch] = useState(false);
  const wallet = useAnchorWallet();
  const [unstakeCompleted, setUnstakeCompleted] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [postCooldown, setPostCooldown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const [blcDetail, setBlcDetail] = useState({
    total: 5000, // Simulating total balance
    staked: 2980, // Simulating staked balance
    available: 5000 - 2980,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // From Firebase
  // const { cooldown, isCooldownActive, setClaimCooldown } = useFirebase(wallet ? wallet.publicKey.toString() : null);
  const [stakingDisabled, setStakingDisabled] = useState(false);
  // Handle stakeTab change (either stake or unstake)
  const handleStake = (index) => {
    setStakeTab(index);
  };

  const handleMaxClick = () => {
    // When user clicks max, set stakeAmount to available balance for staking
    if (stakeTab === 0) {
      setStakeAmount(userBalance); // Max stake is the available balance
    } else {
      setUnstakeAmount(
        userStakeData ? Number(userStakeData?.account?.amount) / 1000000 : 0
      ); // Max unstake is the staked balance
    }
  };

  const getButtonStyles = (index) => ({
    backgroundColor: stakeTab === index ? "#FFFFFF" : "#2E3037",
    color: stakeTab === index ? "#E41E34" : "#FFFFFF",
  });

  useEffect(() => {
    checkCooldown();
  }, [wallet]);

  const checkCooldown = async () => {
    if (!wallet) return;

    const docRef = doc(db, "unstakeCooldowns", wallet.publicKey.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { timestamp } = docSnap.data();
      const now = Date.now();
      const elapsedTime = now - timestamp;

      if (elapsedTime < 36000) {
        // 1 hour in milliseconds
        setCooldownActive(true);
        setPostCooldown(false);
        setTimeRemaining(36000 - elapsedTime); // Update time remaining
      } else {
        setCooldownActive(false);
        setPostCooldown(true); // Mark that cooldown is over, but not yet unstaked
      }
    } else {
      setCooldownActive(false);
      setPostCooldown(false); // Default state
    }
  };

  const stakePool = async () => {
    handleCloseModal();
    try {
      console.log("stakeAmount", stakeAmount);
      if (stakeAmount < 10) {
        toast.error("Für den Einsatz sind mindestens 10 Token erforderlich");
        return;
      }

      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        // const tx = await stakeTokens(wallet, stakeAmount);

        // if (!tx) {
        //   return;
        // }
        // tx.feePayer = wallet.publicKey;
        // tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        // const signedTx = await wallet.signTransaction(tx);
        // const txId = await sendAndConfirmRawTransaction(
        //   connection,
        //   signedTx.serialize()
        // );
        toast.success("Abgesteckte Token");
        console.log("signature", txId);
        setRefetch(!refetch);
      }
    } catch (e) {
      console.log(e);
      const error = getErrorMessageFromFormattedString(e.message);
      toast.error(error);
      // toast.error(
      //   "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut"
      // );
    }
  };

  const handleUnstakeInit = async () => {
    if (!wallet) {
      toast.error("Bitte Wallet anschließen");
      return;
    }
  
    const docRef = doc(db, "unstakeCooldowns", wallet.publicKey.toString());
  
    // Set the cooldown timestamp only if it doesn't exist or the cooldown has expired
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      await setDoc(docRef, {
        timestamp: Date.now(),
      });
  
      toast.info("Unstake request initiated. Please wait 24 hours.");
      setCooldownActive(true);
      disableButtons();
    } else {
      toast.warning("Cooldown already active. Please wait.");
    }
  };
  
  const handleUnstake = async () => {
    if (!wallet) {
      toast.error("Bitte Wallet anschließen");
      return;
    }
  
    const docRef = doc(db, "unstakeCooldowns", wallet.publicKey.toString());
    const docSnapshot = await getDoc(docRef);
  
    // Check if the cooldown period is over
    const cooldownTime = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds
    const timestamp = docSnapshot.data()?.timestamp;
    
    if (Date.now() - timestamp >= cooldownTime) {
      try {
        // Perform unstake action
        await unstakePool();  // Assuming this is your unstake function
  
        // Remove the cooldown entry after successful unstake
        await deleteDoc(docRef);
  
        setCooldownActive(false);
        toast.success("Tokens successfully unstaked!");
      } catch (error) {
        console.error("Unstake failed:", error);
        toast.error("Unstaking failed. Please try again.");
      }
    } else {
      toast.warning("Cooldown not over yet. Please wait.");
    }
  };
  
  const unstakePool = async () => {
    handleCloseModal();
    if (cooldownActive) {
      toast.warn(
        `Please wait ${Math.ceil(timeRemaining / 3600000)} hours to unstake.`
      );
      return;
    }

    try {
      // Existing unstake logic
      // const tx = await unstakeTokens(wallet, unstakeAmount);
      // if (!tx) return;

      // tx.feePayer = wallet.publicKey;
      // tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      // const signedTx = await wallet.signTransaction(tx);
      // const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize());

      // await deleteDoc(doc(db, "unstakeCooldowns", wallet.publicKey.toString())); // Clear cooldown
      toast.success("Tokens successfully unstaked!");
      setRefetch(!refetch);
      enableButtons();
    } catch (e) {
      console.error(e);
      toast.error("Transaction failed. Please try again.");
    }
  };
  const disableButtons = () => {
    setStakingDisabled(true);
  };

  const enableButtons = () => {
    setStakingDisabled(false);
  };

  const claimPool = async () => {
    handleCloseModal();
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      const tx = await claimReward(wallet); // Assuming claimReward initiates a transaction

      if (!tx) {
        throw new Error("Transaction failed or canceled.");
      }

      tx.feePayer = wallet.publicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const signedTx = await wallet.signTransaction(tx);
      const txId = await sendAndConfirmRawTransaction(
        connection,
        signedTx.serialize()
      );

      // Ensure the transaction is confirmed
      const txResult = await connection.getTransaction(txId, {
        commitment: "confirmed",
      });

      if (!txResult) {
        toast.error("Transaction not confirmed.");
      }

      toast.success("Beanspruchte Token");
      console.log("signature", txId);
    } catch (e) {
      console.error(e);
      const error = getErrorMessageFromFormattedString(e.message);
      toast.error(error || "Transaction failed. Please try again.");
    }
  };

  useEffect(() => {
    (async () => {
      if (!wallet) return;
      const userAta = await getAssociatedTokenAddress(
        TOKEN_ADDRESS,
        wallet?.publicKey
      );
      const bal = await connection.getTokenAccountBalance(userAta);
      setUserBalance(bal?.value?.uiAmount);
    })();
  }, [wallet, refetch]);

  useEffect(() => {
    (async () => {
      if (!wallet) return;
      const data = await getWalletStakes(wallet);
      setUserStakeData(data[0]);
    })();
  }, [wallet, refetch]);

  const getClaimableRewards = (userStakeData, TOKEN_LAMPORTS) => {
    if (!userStakeData) return 0; // Return 0 if there's no stake data

    const stakedAmount = Number(userStakeData?.account?.amount) || 0;
    const lastStakedAt = Number(userStakeData?.account?.lastStakedAt) || 0;
    const existingRewards = Number(userStakeData?.account?.rewards) || 0;

    // Calculate total rewards
    const totalRewards =
      (calculateRewards(stakedAmount, lastStakedAt) + existingRewards) /
      TOKEN_LAMPORTS;

    // Format the result (assuming formatDecimal returns a formatted string/number)
    return formatDecimal(totalRewards);
  };

  const claimableRewards = getClaimableRewards(userStakeData, TOKEN_LAMPORTS);

  return (
    <div
      className="bg-gradient-to-b flex flex-col justify-around from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-8 md:px-[70px] py-8 max-w-full"
      style={{ border: "2px solid #222429", height: "-webkit-fill-available" }}
    >
      <RewardRedeemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        stakeUnstake={
          stakeTab === 1
            ? unstakeAmount
            : stakeTab === 0
            ? stakeAmount
            : claimableRewards
        }
        userStakeData={userStakeData}
        userBalance={userBalance}
        unstakeAmount={unstakeAmount}
        stakeTab={stakeTab}
        onRedeem={
          stakeTab === 1
            ? handleUnstakeInit
            : stakeTab === 2
            ? claimPool
            : stakePool
        }
      />

      <div className="flex flex-col gap-3">
        <div>
          {/* // Ensure stakingDisabled is only used when needed, and cooldownActive only affects Unstake. */}
          <button
            className="text-[13px] font-bold px-6 py-1 rounded-md"
            style={getButtonStyles(0)}
            onClick={() => handleStake(0)}
            disabled={cooldownActive || postCooldown} // Disable if cooldown active or postCooldown state
          >
            Stake
          </button>

          <button
            className="text-[13px] font-bold px-6 py-1 ml-[-3px] rounded-r-md"
            style={getButtonStyles(1)}
            onClick={() => handleStake(1)}
            disabled={!postCooldown} // Enable only if postCooldown state is true
          >
            {cooldownActive
              ? `Wait ${Math.ceil(timeRemaining / 60000)} min`
              : "Unstake"}
          </button>

          <button
            className="text-[13px] font-bold px-6 py-1 ml-[-3px] rounded-r-md"
            style={getButtonStyles(2)}
            onClick={() => handleStake(2)}
            disabled={cooldownActive || postCooldown} // Disable if cooldown or postCooldown is true
          >
            Claim Rewards
          </button>
        </div>
      </div>

      {stakeTab === 2 && (
        <div className="md:mb-[190px]">
          <div className="flex justify-between p-3  my-5 bg-[#2E3037] rounded-2xl">
            <p className="text-[#E1E1E1] text-[11px] font-normal flex gap-1">
              Token
            </p>
            {/* <p className="text-[#E1E1E1] text-[11px] font-normal ">
              JährlicheRendite
            </p> */}
            <p className="text-[#E1E1E1] text-[11px] font-normal ">
              Claimable Rewards
            </p>
          </div>

          <div className="flex justify-between items-center px-3 pb-3">
            <p className="text-[#E1E1E1] text-[11px] font-normal items-center flex gap-1">
              <img
                src="../../../../assets/logo.png" // Assuming the logo files are named based on asset
                alt="logo"
                className="w-8 h-8" // Tailwind CSS classes for size, adjust as needed
              />{" "}
              BCT
            </p>
            {/* <p className="text-[#E1E1E1] text-[11px] font-normal "> 6.83%</p> */}
            <p className="text-[#E1E1E1] text-[11px] items-center font-normal flex gap-1">
              {" "}
              {claimableRewards}
            </p>
          </div>
        </div>
      )}

      {stakeTab === 1 ? (
        <input
          type="number"
          value={unstakeAmount}
          onChange={(e) => {
            setUnstakeAmount(parseFloat(e.target.value));
          }}
          min="0"
          className="text-[#FFFFFF] h-[40px] text-[20px] md:text-[37px] mt-6 mb-12 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
      ) : stakeTab === 0 ? (
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => {
            setStakeAmount(parseFloat(e.target.value));
          }}
          min="10"
          className="text-[#FFFFFF] h-[40px] text-[20px] md:text-[37px] mt-6 mb-12 bg-transparent border-b-2 border-[#858585] text-center focus:outline-none"
        />
      ) : null}

      {stakeTab !== 2 ? (
        <p className="text-[#858585] text-[11px] font-normal">
          {stakeTab === 1 ? "Staked balance:" : "Available balance:"}{" "}
          <span className="text-[#E1E1E1]">
            {stakeTab === 1
              ? userStakeData
                ? formatDecimal(
                    Number(userStakeData?.account?.amount) / TOKEN_LAMPORTS
                  )
                : 0
              : formatDecimal(userBalance)
              ? formatDecimal(userBalance)
              : 0}{" "}
            BCT
          </span>
        </p>
      ) : null}

      {stakeTab !== 2 ? (
        <div className="flex justify-center mt-3">
          <button
            className="px-4 py-2 text-[#E41E34] text-[13px]"
            onClick={handleMaxClick}
            style={{ borderBottom: "1px solid #E41E34" }}
          >
            Max
          </button>
        </div>
      ) : null}
      <div className="flex gap-2 flex-col mt-6">
        {stakeTab === 0 && (
          <div>
            <div
              className="flex items-center justify-center space-x-2 bg-[#E41E34] py-2 px-4 rounded-lg font-poppins text-[12px] font-bold mt-4"
              style={{ height: "fit-content", border: "1px solid #E41E34" }}
            >
              <button
                className="text-sm w-full text-[#FFFFFF]"
                onClick={handleOpenModal}
              >
                Stake
              </button>
            </div>
          </div>
        )}

        {stakeTab === 1 && (
          <div>
            <div
              className="flex items-center justify-center space-x-2 bg-[#E41E34] py-2 px-4 rounded-lg font-poppins text-[12px] font-bold mt-4"
              style={{ height: "fit-content", border: "1px solid #E41E34" }}
            >
              <button
                className="text-sm w-full text-[#FFFFFF]"
                onClick={handleOpenModal}
              >
                Unstake
              </button>
            </div>
          </div>
        )}

        {stakeTab === 2 && (
          <div>
            <div
              className="flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-poppins text-[12px] font-bold mt-2"
              style={{ height: "fit-content", border: "1px solid #E41E34" }}
            >
              <button
                className="text-sm w-full text-[#FFFFFF]"
                onClick={handleOpenModal}
              >
                Claim Rewards
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakeUnstakeCard;
