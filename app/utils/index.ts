import { PublicKey } from "@solana/web3.js";
import { KOOPAA_PROGRAM_ID } from "../koopaa";
import { BN } from "@coral-xyz/anchor";

const findAjoGroupPDA = (name: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("ajo-group"), Buffer.from(name)],
    KOOPAA_PROGRAM_ID
  );
};

// use decimals if BN is for token else pass 0: for timestamp values for example
function formatNumber(bn: BN, decimals: number = 6): number {
  const base = new BN(10).pow(new BN(decimals));
  const whole = bn.div(base).toString();
  const fractional = bn.mod(base).toString().padStart(decimals, "0");

  const trimmed = fractional.replace(/0+$/, "");
  const amount = `${whole}${trimmed ? "." + trimmed : ""}`;

  return Number(amount);
}

function formatAddress(address: string) {
  return address.slice(0, 7) + "..." + address.slice(-5);
}

const formatDate = (dateArg: Date | string): string => {
  const date = typeof dateArg === "string" ? new Date(dateArg) : dateArg;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Handle special cases 11th, 12th, 13th
  const suffix =
    day >= 11 && day <= 13 ? "th" : ["th", "st", "nd", "rd"][day % 10] || "th";

  return `${day}${suffix} ${month}, ${year}`;
};

export { findAjoGroupPDA, formatNumber, formatAddress, formatDate };
