import { PublicKey } from "@solana/web3.js";
import { findAjoGroupPDA } from "./utils";
import { USDC, getProgramWithSigner } from "./utils/provider";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { KOOPAA_PROGRAM_ID } from "./koopaa";

const { program, wallet } = getProgramWithSigner();

async function payout(groupName: string) {
  const [ajoGroupPDA] = findAjoGroupPDA(groupName);
  const ajoGroup = await program.account.ajoGroup.fetch(ajoGroupPDA);
  console.log(groupName, ajoGroupPDA.toBase58(), "Ajo Group");

  const { payoutRound, participants } = ajoGroup;
  const recipient: AjoParticipant = participants[payoutRound];
  console.log(recipient, "Recipient");

  const recipientTokenAccount = getAssociatedTokenAddressSync(USDC, recipient.pubkey);
  console.log(recipientTokenAccount, "Recipient token account");

  const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
    KOOPAA_PROGRAM_ID
  );
  const [groupSigner] = PublicKey.findProgramAddressSync(
    [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
    KOOPAA_PROGRAM_ID
  );

  console.log(groupTokenVaultPda, "Group token vault");
  console.log(groupSigner, "Group signer");

  const simulation = await program.methods
    .payout()
    .accountsStrict({
      ajoGroup: ajoGroupPDA,
      caller: wallet.publicKey,
      tokenMint: USDC,
      recipient: recipientTokenAccount,
      groupTokenVault: groupTokenVaultPda,
      groupSigner,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .simulate();

  console.log(simulation, "Sim res");

  //     const signature = await program.methods
  //       .payout()
  //       .accountsStrict({
  //         ajoGroup: ajoGroupPDA,
  //         caller: wallet.publicKey,
  //         tokenMint: USDC,
  //         recipient: recipientTokenAccount,
  //         groupTokenVault: groupTokenVaultPda,
  //         groupSigner,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //       })
  //       .rpc();

  //   console.log("✅ Payout successful: ", signature);
  //   return signature;
}

export default payout;
