import sendEmail from "../emails";
import payout from "../payout";
import { findAjoGroupPDA, formatNumber } from "../utils";
import { redis } from "../utils/config";
import prisma from "../utils/prisma";

async function handleContributionMadeEvent(event: ContributionMadeEvent) {
  const { contributor, currentRound, groupName } = event;
  const participant = contributor.toBase58();
  const groupKey = `group:${groupName}`;

  await redis.set(`${groupKey}:participant:${participant}:round`, currentRound);
  await sendEmail(participant, {
    name: "contributionMadeEvent",
    data: event,
  });

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

  await sendEmail(participant, {
    name: "participantJoinedEvent",
    data: event,
  });
}

async function handlePayoutMadeEvent(event: PayoutMadeEvent) {
  const { recipient, payoutRound, groupName } = event;
  const participant = recipient.toBase58();
  const groupKey = `group:${groupName}`;

  await redis.hset(groupKey, {
    payoutRound,
  });

  await sendEmail(participant, {
    name: "payoutMadeEvent",
    data: event,
  });
}

async function handleAjoGroupClosedEvent(event: AjoGroupClosedEvent) {
  const { groupName } = event;
  const groupKey = `group:${groupName}`;

  const [pda] = findAjoGroupPDA(groupName);
  await prisma.group.update({
    where: {
      pda: pda.toBase58(),
    },
    data: {
      closed_at: new Date(),
    },
  });

  const participants = await redis.smembers(`${groupKey}:participants`);
  await Promise.all(
    participants.map(async (participant) => {
      await sendEmail(participant, {
        name: "ajoGroupClosedEvent",
        data: event,
      });
    })
  );

  await redis.del(groupKey);
  await redis.del(`${groupKey}:participants`);
}

async function handleAjoGroupStartedEvent(event: AjoGroupStartedEvent) {
  const { groupName, startTimestamp } = event;
  const groupKey = `group:${groupName}`;

  const [pda] = findAjoGroupPDA(groupName);
  const startDate = new Date(formatNumber(startTimestamp, 0));
  await prisma.group.update({
    where: {
      pda: pda.toBase58(),
    },
    data: {
      started_at: startDate,
    },
  });

  const participants = await redis.smembers(`${groupKey}:participants`);
  await Promise.all(
    participants.map(async (participant) => {
      await sendEmail(participant, {
        name: "ajoGroupStartedEvent",
        data: event,
      });
    })
  );
}

export {
  handleContributionMadeEvent,
  handleAjoGroupCreatedEvent,
  handleParticipantJoinedEvent,
  handlePayoutMadeEvent,
  handleAjoGroupClosedEvent,
  handleAjoGroupStartedEvent,
};
