import { PublicKey } from "@solana/web3.js";
import type { BN } from "@coral-xyz/anchor";
import { KOOPAA_PROGRAM_ID } from "../koopaa";

type ContributionMadeEvent = {
  groupName: string;
  contributor: PublicKey; // Pubkey
  contributionAmount: BN;
  currentRound: number;
};

const findAjoGroupPDA = (name: string) => {
  return PublicKey.findProgramAddressSync([Buffer.from("ajo-group"), Buffer.from(name)], KOOPAA_PROGRAM_ID);
};

async function handleContributionMadeEvent(event: ContributionMadeEvent) {
  console.log("📥 Contribution Received:");
  console.log(event);

  const [ajoGroupPDA] = findAjoGroupPDA(event.groupName);

  //   // Save to DB or in-memory store
  //   await recordContribution(event);

  //   // Check if current round is ready for payout
  //   const isReady = await isPayoutReady(event.group_name, event.current_round);
  //   if (isReady) {
  //     console.log(`🎯 Payout ready for group "${event.group_name}" at round ${event.current_round}`);
  //     await triggerPayout(event.group_name, event.current_round);
  //   }
}
