import { PublicKey } from "@solana/web3.js";
import type { BN } from "@coral-xyz/anchor";

declare global {
  type AjoParticipant = {
    pubkey: PublicKey;
    contributionRound: number;
    refundAmount: BN;
  };
}

export {};
