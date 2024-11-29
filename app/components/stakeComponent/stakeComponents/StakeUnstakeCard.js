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
import useCooldown from '../../../hooks/useFirebase'; 
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
  const [forceRecheckCooldown, setForceRecheckCooldown] = useState(false);

  const [refetch, setRefetch] = useState(false);
  const wallet = useAnchorWallet();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // From Firebase
  // const { cooldown, isCooldownActive, setClaimCooldown } = useFirebase(wallet ? wallet.publicKey.toString() : null);
  const { isCooldownActive, lastClaimTime, btnsDisabled } = useCooldown(wallet, forceRecheckCooldown);
  const [stakingDisabled, setStakingDisabled] = useState(false);
  // Handle stakeTab change (either stake or unstake)
  const handleStake = (index) => {
    setStakeTab(index);
  };

  // console.log("btnsDisabled", btnsDisabled)


  // console.log("forceRecheckCooldown", forceRecheckCooldown)
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

  // const dayData = {
  //   0: {
  //     JährlicheRendite: "0.01831087 BCT",
  //     currentAmount: "0.01831087 BCT",
  //     dailyRewards: "0.89629221 BCT",
  //   },
  //   1: {
  //     JährlicheRendite: "0.01941087 BCT",
  //     currentAmount: "0.02831087 BCT",
  //     dailyRewards: "0.59629221 BCT",
  //   },
  //   2: {
  //     JährlicheRendite: "0.02231087 BCT",
  //     currentAmount: "0.03831087 BCT",
  //     dailyRewards: "0.79629221 BCT",
  //   },
  //   3: {
  //     JährlicheRendite: "0.02431087 BCT",
  //     currentAmount: "0.04831087 BCT",
  //     dailyRewards: "0.89629221 BCT",
  //   },
  // };

  // const selectedData = dayData[dayActive];
  // const claimButtonDisabled = isCooldownActive;
  useEffect(() => {
    // console.log("Wallet updated:", wallet); // Log to check wallet changes
  }, [wallet]);
  
  const stakePool = async () => {
    handleCloseModal();
    try {
      // console.log("isCooldownActive before check:", isCooldownActive); // Debugging log
      // if () {

      // }
      if (isCooldownActive || btnsDisabled) {
       toast.error('You have unstaked your tokens. This process takes 24 hours, during which you cannot interact with the dashboard. Your tokens will be credited to your account within 24 hours.');
        return;
      }
      // console.log("stakeAmount", stakeAmount);
      if (stakeAmount < 10) {
        toast.error("Für den Einsatz sind mindestens 10 Token erforderlich");
        return;
      }

      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }

      if (wallet) {
        const tx = await stakeTokens(wallet, stakeAmount);

        if (!tx) {
          return;
        }
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );

        toast.success("Abgesteckte Token");
        // console.log("signature", txId);
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
// console.log("isCooldownActive", isCooldownActive)
  const unstakePool = async () => {
    handleCloseModal();
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }
      if(unstakeAmount < 1) {
        toast.error('Für den unstake sind mindestens 1 Token erforderlich');
        return;
      }
      if (isCooldownActive) {
        toast.error('You must wait 24 hours after last claimed rewards.');
        return;
      }
 
      if (wallet) {
        const tx = await unstakeTokens(wallet, unstakeAmount);

        if (!tx) {
          return;
        }
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const signedTx = await wallet.signTransaction(tx);
        const txId = await sendAndConfirmRawTransaction(
          connection,
          signedTx.serialize()
        );
        
      // Ensure the transaction is confirmed
      const txResult = await connection.getTransaction(txId, { commitment: 'confirmed' });
  
      if (!txResult) {
        toast.error("Transaction not confirmed.");
        return;
      }

      // Proceed only if transaction confirmed
      const Amount = unstakeAmount;
      const claimData = {
        walletAddress: wallet.publicKey.toString(),
        Amount,
        // txId,
        claimDate: new Date().toISOString(),
      };
  
      // Firestore update
      const userRef = doc(db, 'unstake', wallet.publicKey.toString());
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        await setDoc(userRef, {
          ...claimData,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } else {
        await setDoc(userRef, claimData);
      }
  
      setRefetch(!refetch);
      setForceRecheckCooldown(prevState => !prevState);

        if (btnsDisabled) {
          await deleteDoc(userRef);
          toast.success("Token nicht eingesetzt");
        }
        
        toast.success("You have unstaked your tokens. This process takes 24 hours, during which you cannot interact with the dashboard. Your tokens will be credited to your account within 24 hours.");
      

        // console.log("signature", txId);
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

  const claimPool = async () => {
    handleCloseModal();
    
    if (isCooldownActive || btnsDisabled) {
      toast.error('You have unstaked your tokens. This process takes 24 hours, during which you cannot interact with the dashboard. Your tokens will be credited to your account within 24 hours.');
      return;
    }
    
    try {
      if (!wallet) {
        toast.error("Bitte Wallet anschließen");
        return;
      }
  
      const tx = await claimReward(wallet);  // Assuming claimReward initiates a transaction
  
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
  
      toast.success("Beanspruchte Token");
      // console.log("signature", txId);
  
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
  const formattedLastClaimTime = lastClaimTime 
  ? new Date(lastClaimTime).toLocaleString() // Adjust locale if needed
  : '';

  return (
    <div
      className="bg-gradient-to-b flex flex-col justify-around from-[rgba(34,36,41,0.5)] to-[#050505] rounded-[22px] px-8 md:px-[70px] py-8 max-w-full"
      style={{ border: "2px solid #222429", height: "-webkit-fill-available" }}
    >
        <RewardRedeemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        stakeUnstake={stakeTab === 1 ? unstakeAmount : stakeTab === 0 ? stakeAmount : claimableRewards }
        userStakeData = {userStakeData}
        userBalance = {userBalance}
        unstakeAmount = {unstakeAmount}
        stakeTab={stakeTab}
        // spotWallet={modalData.spotWallet}
        // Zusammenfassung={modalData.Zusammenfassung}
        // referrer={modalData.referrer}
        // ratio={modalData.ratio}
        // earnedDex={modalData.earnedDex}
        // exitFeeRate={modalData.exitFeeRate}
        onRedeem={stakeTab === 1 ? unstakePool : stakeTab === 2 ? claimPool : stakePool}
      />

      <div  className="flex flex-col gap-3">
      {lastClaimTime && (
  <p className="text-[#E1E1E1]">Unstake Initialized at: {formattedLastClaimTime}</p>
)}
        <div>
        <button
          className=" text-[13px] font-bold px-6 py-1 rounded-md "
          style={getButtonStyles(0)}
          index={0}
          onClick={() => handleStake(0)}
          min="0"
        >
          Stake
        </button>
        <button
          className="text-[13px] font-bold px-6 py-1 ml-[-3px] rounded-r-md"
          style={getButtonStyles(1)}
          index={1}
          onClick={() => handleStake(1)}
          min="0"
        >
          Unstake
        </button>
        <button
          className="text-[13px] font-bold px-6 py-1 ml-[-3px] rounded-r-md"
          style={getButtonStyles(2)}
          index={1}
          onClick={() => handleStake(2)}
          min="0"
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
          {/* <Image
          src={maxRound}
          width={50}
          height={50}
          alt="Set Max Stake"
          className="cursor-pointer"
        /> */}
        </div>
      ) : null}

      {/* {stakeTab === 1 ? (
            <>
              <p className="text-[#858585] text-[13px] font-normal flex text-left mt-4">
                Redeem to
              </p>
              <select className="w-full mt-2 bg-[#121316] text-white p-2 rounded-lg border border-[#2E3037]">
                <option value="Wallet1">Spot Wallet</option>
                <option value="Wallet2">Wallet 2</option>
                <option value="Wallet3">Wallet 3</option>
              </select>
            </>
          ) : (
            <>
              {" "}
              <p className="text-[#858585] text-[13px] font-normal flex text-left mt-4">
                Select strategy{" "}
              </p>
              <select className="w-full mt-2 bg-[#121316] text-white p-2 rounded-lg border border-[#2E3037]">
                <option value="strategy1">Strategy 1</option>
                <option value="strategy2">Strategy 2</option>
                <option value="strategy3">Strategy 3</option>
              </select>{" "}
            </>
          )} */}

      {/* {stakeTab === 0 && (
            <div className="flex justify-between mt-8">
              <DayButton
                text="30 days"
                index={0}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="60 days"
                index={1}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="90 days"
                index={2}
                dayActive={dayActive}
                onClick={handleClick}
              />
              <DayButton
                text="120 days"
                index={3}
                dayActive={dayActive}
                onClick={handleClick}
              />
            </div>
          )} */}

      {/* <div className="grid grid-cols-2 gap-4 mt-5"> */}
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
