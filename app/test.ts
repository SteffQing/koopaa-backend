import { sendPayoutMadeEmail } from "./emails/send-email";
import fetchPastEvents from "./past-events";
import { getProgram } from "./utils/provider";

const program = getProgram();

async function scanPastEvents() {
  console.log("🚀 Scanning past Koopa events...\n");

  let lastSig: string | undefined = undefined;
  for (let i = 0; i < 3; i++) {
    lastSig = await fetchPastEvents(lastSig);
    if (!lastSig) break;
  }

  console.log("✅ Done scanning.");
}

async function getPayout() {
  const raw = Buffer.from(
    "1t7np9AkzV0QAAAAV2UgV2luLCBUb2dldGhlcrv5p2XlVcOpy23Qh1QtOWkhAURcDDYYXJwZsqdjH+FWAIeTAwAAAAABAA==",
    "base64"
  );
  const event = program.coder.events.decode(raw as unknown as string);

  return event?.data as PayoutMadeEvent;
}

async function testEmail() {
  // console.log("🚀 Sending test email...");
  // const event = await getPayout();

  // const email = await sendPayoutMadeEmail("steveola23@gmail.com", event);

  // console.log("✅ Email sent:", email);
  await scanPastEvents();
}

(async () => {
  await testEmail();
  process.exit(0);
})();
