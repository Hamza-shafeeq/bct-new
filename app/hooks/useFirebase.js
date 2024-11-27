import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useCooldown = (wallet) => {
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState(null);

  useEffect(() => {
    const checkCooldown = async () => {
      if (!wallet) return;

      const userRef = doc(db, 'claims', wallet.publicKey.toString());
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const claimData = userDoc.data();
        const claimDate = claimData.claimDate;
        const currentTime = new Date().getTime();
        const claimTime = new Date(claimDate).getTime();

        // Check if 24 hours have passed (86400000 ms)
        const res = currentTime - claimTime;
        // console.log("currentTime - claimTime", res)
        // for one minute for testing use 600000
        if (currentTime - claimTime < 86400000) {
          
          setIsCooldownActive(true);
        } else {
          setIsCooldownActive(false);
        }

        // Save the claim time to state (optional, if you need to display it)
        setLastClaimTime(claimTime);
      } else {
        setIsCooldownActive(false);
      }
    };

    checkCooldown();
  }, [wallet]);

  return { isCooldownActive, lastClaimTime };
};

export default useCooldown;