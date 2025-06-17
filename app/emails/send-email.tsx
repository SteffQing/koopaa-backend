import { render } from "@react-email/render";
import {
  AjoGroupCreatedEmail,
  ContributionMadeEmail,
  GroupStartedEmail,
  PayoutMadeEmail,
  RefundClaimedEmail,
  GroupClosedEmail,
  ParticipantJoinedEmail,
} from "./templates";
import { resend } from "../utils/config";

const from = "KooPaa <notifications@updates.koopaa.fun>";

export async function sendAjoGroupCreatedEmail(to: string, event: AjoGroupCreatedEvent) {
  const text = await render(AjoGroupCreatedEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `New Ajo Group [${event.groupName}] Created!`,
    react: <AjoGroupCreatedEmail {...event} />,
    text,
  });
}

export async function sendContributionMadeEmail(to: string, event: ContributionMadeEvent) {
  const text = await render(ContributionMadeEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Contribution Made to [${event.groupName}]`,
    react: <ContributionMadeEmail {...event} />,
    text,
  });
}

export async function sendPayoutMadeEmail(to: string, event: PayoutMadeEvent) {
  const text = await render(PayoutMadeEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Payout Distributed from [${event.groupName}]`,
    react: <PayoutMadeEmail {...event} />,
    text,
  });
}

export async function sendGroupStartedEmail(to: string, event: AjoGroupStartedEvent) {
  const text = await render(GroupStartedEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Group Started [${event.groupName}]`,
    react: <GroupStartedEmail {...event} />,
    text,
  });
}

export async function sendGroupClosedEmail(to: string, event: AjoGroupClosedEvent) {
  const text = await render(GroupClosedEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Group Closed [${event.groupName}]`,
    react: <GroupClosedEmail {...event} />,
    text,
  });
}

export async function sendRefundClaimedEmail(to: string, event: RefundClaimedEvent) {
  const text = await render(RefundClaimedEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Refund Claimed from [${event.groupName}]`,
    react: <RefundClaimedEmail {...event} />,
    text,
  });
}

export async function sendParticipantJoinedEmail(to: string, event: ParticipantJoinedEvent) {
  const text = await render(ParticipantJoinedEmail({ ...event }), { plainText: true });

  return await resend.emails.send({
    from,
    to,
    subject: `Participant Joined [${event.groupName}]`,
    react: <ParticipantJoinedEmail {...event} />,
    text,
  });
}
