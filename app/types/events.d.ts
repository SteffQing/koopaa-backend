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
    adminInvited: bool;
  };

  type JoinRequestRejectedEvent = {
    groupName: string;
    participant: PublicKey;
  };

  type ParticipantInWaitingRoomEvent = {
    groupName: string;
    participant: PublicKey;
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
    | "ajoGroupStartedEvent"
    | "joinRequestRejectedEvent"
    | "participantInWaitingRoomEvent";

  type OnchainEvent = {
    name: EventName;
    data:
      | ContributionMadeEvent
      | AjoGroupCreatedEvent
      | AjoGroupStartedEvent
      | ParticipantJoinedEvent
      | PayoutMadeEvent
      | AjoGroupClosedEvent
      | RefundClaimedEvent
      | ParticipantInWaitingRoomEvent
      | JoinRequestRejectedEvent;
  };
}

export {};
