import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection, Commitment } from "@solana/web3.js";
import { getKoopaProgram, KOOPAA_PROGRAM_ID } from "../koopaa";

const connection = new Connection("https://api.devnet.solana.com", "confirmed" as Commitment);
const provider = new AnchorProvider(connection, {} as any, { commitment: "confirmed" });
const program = getKoopaProgram(provider);

// 👇 This is the handler you will implement later
function handleKoopaEvent(eventName: string, eventData: any) {
  console.log(`📣 Event Triggered: ${eventName}`);
  console.dir(eventData, { depth: null });
}

async function listenToKoopaEvents() {
  console.log("🟢 Listening for Koopa events...\n");

  connection.onLogs(
    KOOPAA_PROGRAM_ID,
    ({ logs }) => {
      console.log(logs, "all logs");

      for (const log of logs) {
        if (!log.startsWith("Program data: ")) continue;

        const base64Data = log.replace("Program data: ", "");
        const rawData = Buffer.from(base64Data, "base64");

        try {
          const decodedEvent = program.coder.events.decode(rawData.toString());
          if (decodedEvent) {
            handleKoopaEvent(decodedEvent.name, decodedEvent.data);
          }
        } catch (err) {
          // Not an event or decoding failed — skip
        }
      }
    },
    "confirmed"
  );
}

export default listenToKoopaEvents;
