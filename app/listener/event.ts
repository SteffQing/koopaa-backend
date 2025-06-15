import { findAjoGroupPDA, formatNumber } from "../utils";
import { redis } from "../utils/config";

async function handleContributionMadeEvent(event: ContributionMadeEvent) {}

async function handleAjoGroupCreatedEvent(event: AjoGroupCreatedEvent) {
  await redis.hset(event.groupName, {
    contributionAmount: formatNumber(event.contributionAmount),
    numParticipants: event.numParticipants,
    contributionInterval: event.contributionInterval,
    payoutInterval: event.payoutInterval,
    started: false,
  });
}

async function handleParticipantJoinedEvent(event: ParticipantJoinedEvent) {
  const participant = event.participant.toBase58();
  const groupKey = `group:${event.groupName}`;

  await redis.sadd(`${groupKey}:participants`, participant);
  await redis.set(`${groupKey}:participant:${participant}:round`, 0);

  // TODO: Send them a notification
}
