import * as mails from "./static";
import * as send from "./send-email";
import { getProgram } from "../utils/provider";

const program = getProgram();

export default async function testMail(to: string) {
  // Test all email types using static data
  await send.sendAjoGroupCreatedEmail(to, mails.ajoGroupCreatedEvent);
  await send.sendContributionMadeEmail(to, mails.contributionMadeEvent);
  await send.sendPayoutMadeEmail(to, mails.payoutMadeEvent);
  await send.sendParticipantJoinedEmail(to, mails.participantJoinedEvent);
  await send.sendGroupStartedEmail(to, mails.ajoGroupStartedEvent);
  await send.sendGroupClosedEmail(to, mails.ajoGroupClosedEvent);
  await send.sendRefundClaimedEmail(to, mails.refundClaimedEvent);
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
  console.log("🚀 Sending test email...");
  const event = await getPayout();

  const email = await send.sendPayoutMadeEmail("steveola23@gmail.com", event);

  console.log("✅ Email sent:", email);
  // await scanPastEvents();
}
