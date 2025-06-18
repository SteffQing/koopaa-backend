// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import KoopaIDL from "./idl/koopa.json";
import type { Koopa } from "./types/koopa";

// Re-export the generated IDL and type
export type { Koopa };
export { KoopaIDL };

// The correct program ID
export const KOOPAA_PROGRAM_ID = new PublicKey(
  "33NAzyKNuayyqKNW6QMXbNT69CikAhCUhPbgwZn1LR3o"
);

// This is a helper function to get the Basic Anchor program.
export function getKoopaProgram(provider: AnchorProvider): Program<Koopa> {
  return new Program(
    {
      ...KoopaIDL,
      address: KOOPAA_PROGRAM_ID.toBase58(),
    } as Koopa,
    provider
  );
}
