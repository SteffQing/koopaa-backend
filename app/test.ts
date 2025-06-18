import testMail from "./emails/test";
import fetchPastEvents from "./past-events";

async function scanPastEvents() {
  console.log("🚀 Scanning past Koopa events...\n");

  let lastSig: string | undefined = undefined;
  for (let i = 0; i < 3; i++) {
    lastSig = await fetchPastEvents(lastSig);
    if (!lastSig) break;
  }

  console.log("✅ Done scanning.");
}

(async () => {
  await testMail("emolasholawilson@gmail.com");
  await testMail("Svdeeque11@gmail.com");
  process.exit(0);
})();
