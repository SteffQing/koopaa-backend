import payout from "../payout";
import { redis } from "../utils/config";

async function handleContributionMadeEvent(event: ContributionMadeEvent) {
  const { contributor, currentRound, groupName } = event;
  const participant = contributor.toBase58();
  const groupKey = `group:${groupName}`;

  await redis.set(`${groupKey}:participant:${participant}:round`, currentRound);
  // TODO: Send notification

  // Check if payout is due
  const participants = await redis.smembers(`${groupKey}:participants`);
  const [participantsRounds, groupData] = await Promise.all([
    Promise.all(
      participants.map(async (participant) => {
        const round = await redis.get<number>(`${groupKey}:participant:${participant}:round`);
        return { participant, round: round ? Number(round) : 0 };
      })
    ),
    redis.hgetall<{ payoutRound: number; interval: number }>(groupKey),
  ]);

  if (!groupData) return;

  const required_contributions_for_payout = (groupData.payoutRound + 1) * groupData.interval;
  const meets_requirement = participantsRounds.every((p) => p.round >= required_contributions_for_payout);

  if (meets_requirement) await payout(groupName);
}

async function handleAjoGroupCreatedEvent(event: AjoGroupCreatedEvent) {
  const interval = event.payoutInterval / event.contributionInterval;
  const groupKey = `group:${event.groupName}`;
  await redis.hset(groupKey, {
    payoutRound: 0,
    interval,
  });
}

async function handleParticipantJoinedEvent(event: ParticipantJoinedEvent) {
  const participant = event.participant.toBase58();
  const groupKey = `group:${event.groupName}`;

  await redis.sadd(`${groupKey}:participants`, participant);
  await redis.set(`${groupKey}:participant:${participant}:round`, 0);

  // TODO: Send them a notification
}

async function handlePayoutMadeEvent(event: PayoutMadeEvent) {
  const { recipient, payoutRound, groupName } = event;
  const participant = recipient.toBase58();
  const groupKey = `group:${groupName}`;

  await redis.hset(groupKey, {
    payoutRound,
  });

  // TODO: Send them a notification
}
