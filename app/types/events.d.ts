import { PublicKey } from "@solana/web3.js";
import type { BN } from "@coral-xyz/anchor";

declare global {
  type ContributionMadeEvent = {
    groupName: string;
    contributor: PublicKey; // Pubkey
    contributionAmount: BN;
    currentRound: number;
  };

  type AjoGroupCreatedEvent = {
    groupName: string;
    securityDeposit: BN;
    contributionAmount: BN;
    numParticipants: number;
    contributionInterval: number;
    payoutInterval: number;
  };

  type ParticipantJoinedEvent = {
    groupName: string;
    participant: PublicKey;
    joinTimestamp: BN;
  };
}

export {};
