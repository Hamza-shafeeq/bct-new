import { Connection, clusterApiUrl } from "@solana/web3.js";
// export const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
export const connection = new Connection("https://explorer-api.devnet.solana.com", 'confirmed');
// export const connection = new Connection("https://rpc.shyft.to/?api_key=6qgEDmJbmOqBsbXq", 'confirmed');
