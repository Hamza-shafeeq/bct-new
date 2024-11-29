import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const useCooldown = (wallet, forceRecheckCooldown) => {
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [btnsDisabled, setBtnsDisabled] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState(null);

  useEffect(() => {
    const checkCooldown = async () => {
      if (!wallet) return;

      const userRef = doc(db, "unstake", wallet.publicKey.toString());
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const claimData = userDoc.data();
        const claimDate = claimData.claimDate; // ISO string
        const currentTime = new Date().getTime();

        // Parse the claimDate to a Date object
        const claimTime = new Date(claimDate).getTime();

        // Check if 24 hours (86400000 ms) have passed
        const timeDifference = currentTime - claimTime;

        if (timeDifference < 86400000) {
          setIsCooldownActive(true);
        } 
        else if(timeDifference >= 0 ){
            setBtnsDisabled(true);
        }
        else {
          setIsCooldownActive(false);
        }
        // Optionally save the claim time to state
        setLastClaimTime(claimTime);
      } else {
        setIsCooldownActive(false);
        setBtnsDisabled(false); //
      }
    };

    checkCooldown();
  }, [wallet, forceRecheckCooldown]);

  return { isCooldownActive, lastClaimTime, btnsDisabled };
};

export default useCooldown;
