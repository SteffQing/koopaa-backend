import testMail from "./emails/test";
import fetchPastEvents from "./past-events";

async function scanPastEvents() {
  console.log("🚀 Scanning past Koopa events...\n");

  let lastSig: string | undefined = undefined;
  lastSig = await fetchPastEvents(lastSig);

  console.log("✅ Done scanning.", lastSig);
}

(async () => {
  scanPastEvents();
  // process.exit(0);
})();
