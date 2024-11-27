import db from './db';

// Add claim data
export const addClaim = async (walletAddress) => {
  const claimedAt = new Date().getTime();
  await db.claims.put({ walletAddress, claimedAt });
};

// Check if the user can stake/unstake
export const canStakeOrUnstake = async (walletAddress) => {
  const claim = await db.claims.where("walletAddress").equals(walletAddress).first();
  if (claim) {
    const now = new Date().getTime();
    const hoursPassed = (now - claim.claimedAt) / (1000 * 60 * 60);
    return hoursPassed >= 24;
  }
  return true; // Allow if no claim is found
};
