import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection, Commitment, PublicKey, Keypair } from "@solana/web3.js";
import { getKoopaProgram } from "../koopaa";
import { getEnv } from "./config";
import bs58 from "bs58";

const USDC = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const PRIVATE_KEY = getEnv("PRIVATE_KEY");

const connection = new Connection("https://api.devnet.solana.com", "confirmed" as Commitment);

function getProgram() {
  const provider = new AnchorProvider(connection, {} as any, { commitment: "confirmed" });
  return getKoopaProgram(provider);
}

function getProgramWithSigner() {
  const secretKey = bs58.decode(PRIVATE_KEY);
  const key = Keypair.fromSecretKey(secretKey);
  const wallet = new Wallet(key);

  const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
  const program = getKoopaProgram(provider);
  return { program, wallet };
}

export { getProgram, getProgramWithSigner, connection, USDC };
