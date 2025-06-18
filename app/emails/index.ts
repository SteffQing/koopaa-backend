import db from "../utils/db";
import {
  sendAjoGroupCreatedEmail,
  sendContributionMadeEmail,
  sendGroupClosedEmail,
  sendGroupStartedEmail,
  sendParticipantJoinedEmail,
  sendPayoutMadeEmail,
  sendRefundClaimedEmail,
} from "./send-email";

export default async function sendEmail(to: string, event: OnchainEvent) {
  const user = await db.getUser(to);
  if (!user || !user.email) return; // when canReceiveMails is added, we add in its checks

  switch (event.name) {
    case "ajoGroupCreatedEvent":
      await sendAjoGroupCreatedEmail(
        user.email,
        event.data as AjoGroupCreatedEvent
      );
      break;

    case "contributionMadeEvent":
      await sendContributionMadeEmail(
        user.email,
        event.data as ContributionMadeEvent
      );
      break;

    case "payoutMadeEvent":
      await sendPayoutMadeEmail(user.email, event.data as PayoutMadeEvent);
      break;

    case "participantJoinedEvent":
      await sendParticipantJoinedEmail(
        user.email,
        event.data as ParticipantJoinedEvent
      );
      break;

    case "ajoGroupStartedEvent":
      await sendGroupStartedEmail(
        user.email,
        event.data as AjoGroupStartedEvent
      );
      break;

    case "ajoGroupClosedEvent":
      await sendGroupClosedEmail(user.email, event.data as AjoGroupClosedEvent);
      break;

    case "refundClaimedEvent":
      await sendRefundClaimedEmail(
        user.email,
        event.data as RefundClaimedEvent
      );
      break;
  }
}
