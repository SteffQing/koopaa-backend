import { Connection, PublicKey, ParsedTransactionWithMeta, ConfirmedSignatureInfo } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { getKoopaProgram, KOOPAA_PROGRAM_ID } from "../app/koopaa";
import { redis } from "./config";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new AnchorProvider(connection, {} as any, {});
const program = getKoopaProgram(provider);

const PROGRAM_ID = KOOPAA_PROGRAM_ID;
const LIMIT = 1000; // you can increase if needed

async function fetchPastEvents(before?: string) {
  const signatures: ConfirmedSignatureInfo[] = await connection.getSignaturesForAddress(
    PROGRAM_ID,
    {
      limit: LIMIT,
      before,
    },
    "confirmed"
  );

  console.log(`🔍 Found ${signatures.length} txs`);

  for (const sig of signatures) {
    const tx = await connection.getTransaction(sig.signature, {
      commitment: "confirmed",
    });

    if (!tx || !tx.meta || !tx.meta.logMessages) continue;

    const logs = tx.meta.logMessages;

    for (const log of logs) {
      if (!log.startsWith("Program data: ")) continue;

      const base64 = log.replace("Program data: ", "");
      const raw = Buffer.from(base64, "base64");

      try {
        const event = program.coder.events.decode(raw as unknown as string);

        if (event) {
          console.log(`📣 Past Event [${event.name}]:`);
          console.dir(event.data, { depth: null });

          // Optional: Save in Redis
          //   const key = `koopa:event:${event.name}:${sig.signature}`;
          //   await redis.set(key, JSON.stringify(event.data));
        }
      } catch {
        // not a valid Anchor event
      }
    }
  }

  // For pagination
  return signatures[signatures.length - 1]?.signature;
}

(async () => {
  console.log("🚀 Scanning past Koopa events...\n");

  let lastSig: string | undefined = undefined;
  for (let i = 0; i < 3; i++) {
    lastSig = await fetchPastEvents(lastSig);
    if (!lastSig) break;
  }

  console.log("✅ Done scanning.");
  process.exit(0);
})();
