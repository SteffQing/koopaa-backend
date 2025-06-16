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

  type AjoGroupStartedEvent = {
    groupName: string;
    startTimestamp: BN;
  };

  type ParticipantJoinedEvent = {
    groupName: string;
    participant: PublicKey;
    joinTimestamp: BN;
  };

  type PayoutMadeEvent = {
    groupName: string;
    recipient: PublicKey;
    payoutAmount: BN;
    payoutRound: number;
  };

  type AjoGroupClosedEvent = {
    groupName: string;
    totalVotes: number;
    groupSize: number;
  };

  type RefundClaimedEvent = {
    groupName: string;
    participant: PublicKey;
    amount: BN;
  };

  type EventName =
    | "ajoGroupCreatedEvent"
    | "participantJoinedEvent"
    | "contributionMadeEvent"
    | "payoutMadeEvent"
    | "ajoGroupClosedEvent"
    | "refundClaimedEvent"
    | "ajoGroupStartedEvent";

  type OnchainEvent = {
    name: EventName;
    data:
      | ContributionMadeEvent
      | AjoGroupCreatedEvent
      | AjoGroupStartedEvent
      | ParticipantJoinedEvent
      | PayoutMadeEvent
      | AjoGroupClosedEvent
      | RefundClaimedEvent;
  };
}

export {};
