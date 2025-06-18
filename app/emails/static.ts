import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

const samplePubkey = new PublicKey(
  "7ZkBpEAhQyKfD9h8g3A7J9MQDcF1yXY9oYZCqQrWJ6iW"
);

const contributionMadeEvent: ContributionMadeEvent = {
  groupName: "MarketMakers",
  contributor: samplePubkey,
  contributionAmount: new BN(5000000), // 5 USDC if using 6 decimals
  currentRound: 2,
};

const ajoGroupCreatedEvent: AjoGroupCreatedEvent = {
  groupName: "MarketMakers",
  securityDeposit: new BN(10000000),
  contributionAmount: new BN(5000000),
  numParticipants: 5,
  contributionInterval: 1,
  payoutInterval: 7,
};

const ajoGroupStartedEvent: AjoGroupStartedEvent = {
  groupName: "MarketMakers",
  startTimestamp: new BN(Date.now() / 1000),
};

const participantJoinedEvent: ParticipantJoinedEvent = {
  groupName: "MarketMakers",
  participant: samplePubkey,
  joinTimestamp: new BN(Date.now() / 1000),
};

const payoutMadeEvent: PayoutMadeEvent = {
  groupName: "MarketMakers",
  recipient: samplePubkey,
  payoutAmount: new BN(25000000),
  payoutRound: 1,
};

const ajoGroupClosedEvent: AjoGroupClosedEvent = {
  groupName: "MarketMakers",
  totalVotes: 4,
  groupSize: 5,
};

const refundClaimedEvent: RefundClaimedEvent = {
  groupName: "MarketMakers",
  participant: samplePubkey,
  amount: new BN(10000000),
};

export {
  contributionMadeEvent,
  ajoGroupCreatedEvent,
  ajoGroupStartedEvent,
  participantJoinedEvent,
  payoutMadeEvent,
  ajoGroupClosedEvent,
  refundClaimedEvent,
};
