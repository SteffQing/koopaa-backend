import { findAjoGroupPDA, formatNumber } from "../utils";
import { redis } from "../utils/config";

async function handleContributionMadeEvent(event: ContributionMadeEvent) {
  const { contributor, currentRound, groupName } = event;
  const participant = contributor.toBase58();
  const groupKey = `group:${groupName}`;

  await redis.set(`${groupKey}:participant:${participant}:round`, currentRound);

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

  if (meets_requirement) {
    await redis.hset(groupKey, {
      payoutRound: groupData.payoutRound + 1,
    });

    // call payout function
    // TODO: Send notification
  }
}

async function handleAjoGroupCreatedEvent(event: AjoGroupCreatedEvent) {
  const interval = event.payoutInterval / event.contributionInterval;
  const groupKey = `group:${event.groupName}`;
  await redis.hset(groupKey, {
    contributionAmount: formatNumber(event.contributionAmount),
    numParticipants: event.numParticipants,
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
