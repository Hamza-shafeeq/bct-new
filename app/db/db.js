// Dexie setup for IndexedDB
import Dexie from 'dexie';

const db = new Dexie("RewardsDB");

db.version(1).stores({
  claims: "++id, walletAddress, claimedAt"
});

export default db;
