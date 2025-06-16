import sendEmail from "../emails";
import { KOOPAA_PROGRAM_ID } from "../koopaa";
import { redis } from "../utils/config";
import { getProgram, connection } from "../utils/provider";
import {
  handleAjoGroupClosedEvent,
  handleAjoGroupCreatedEvent,
  handleAjoGroupStartedEvent,
  handleContributionMadeEvent,
  handleParticipantJoinedEvent,
  handlePayoutMadeEvent,
} from "./event";

const program = getProgram();

export async function handleKoopaEvent(eventName: EventName, eventData: OnchainEvent["data"]) {
  switch (eventName) {
    case "payoutMadeEvent":
      await handlePayoutMadeEvent(eventData as PayoutMadeEvent);
      break;
    case "contributionMadeEvent":
      await handleContributionMadeEvent(eventData as ContributionMadeEvent);
      break;
    case "participantJoinedEvent":
      await handleParticipantJoinedEvent(eventData as ParticipantJoinedEvent);
      break;
    case "ajoGroupCreatedEvent":
      await handleAjoGroupCreatedEvent(eventData as AjoGroupCreatedEvent);
      break;
    case "ajoGroupClosedEvent":
      await handleAjoGroupClosedEvent(eventData as AjoGroupClosedEvent);
      break;
    case "ajoGroupStartedEvent":
      await handleAjoGroupStartedEvent(eventData as AjoGroupStartedEvent);
      break;
    case "refundClaimedEvent":
      const participant = (eventData as RefundClaimedEvent).participant.toBase58();
      await sendEmail(participant, { name: eventName, data: eventData });
      break;
  }
}

function listenToKoopaEvents() {
  console.log("🟢 Listening for Koopa events...\n");

  connection.onLogs(
    KOOPAA_PROGRAM_ID,
    async ({ logs }) => {
      for (const log of logs) {
        if (!log.startsWith("Program data: ")) continue;

        const base64Data = log.replace("Program data: ", "");
        const rawData = Buffer.from(base64Data, "base64");

        try {
          const decodedEvent = program.coder.events.decode(rawData.toString());
          if (decodedEvent) {
            await handleKoopaEvent(decodedEvent.name as EventName, decodedEvent.data);
          }
        } catch (err) {
          await redis.set("koopa:events:failed", JSON.stringify(err));
          console.log("Failed to decode event: ", err);
        }
      }
    },
    "confirmed"
  );
}

export default listenToKoopaEvents;
