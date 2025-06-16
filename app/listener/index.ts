import { KOOPAA_PROGRAM_ID } from "../koopaa";
import { redis } from "../utils/config";
import { getProgram, connection } from "../utils/provider";

const program = getProgram();

// 👇 This is the handler you will implement later
function handleKoopaEvent(eventName: EventName, eventData: any) {
  console.log(`📣 Event Triggered: ${eventName}`);
  console.dir(eventData, { depth: null });
  switch (eventName) {
    case "payoutMadeEvent":
      // call notify function
      break;
    case "contributionMadeEvent":
      break;
    case "participantJoinedEvent":
      // call notify function
      break;
    case "ajoGroupCreatedEvent":
      // call notify function
      break;

    default:
      console.log("Unhandled event: ", eventName);
      break;
  }
}

function listenToKoopaEvents() {
  console.log("🟢 Listening for Koopa events...\n");

  connection.onLogs(
    KOOPAA_PROGRAM_ID,
    ({ logs }) => {
      for (const log of logs) {
        if (!log.startsWith("Program data: ")) continue;

        const base64Data = log.replace("Program data: ", "");
        const rawData = Buffer.from(base64Data, "base64");

        try {
          const decodedEvent = program.coder.events.decode(rawData.toString());
          if (decodedEvent) {
            handleKoopaEvent(decodedEvent.name as EventName, decodedEvent.data);
          }
        } catch (err) {
          redis.set("koopa:events:failed", JSON.stringify(err)).then(() => {
            console.log("Failed to decode event: ", err);
          });
        }
      }
    },
    "confirmed"
  );
}

export default listenToKoopaEvents;
