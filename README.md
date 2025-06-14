# KooPaa 🪙 — Group Savings, Automated

**KooPaa** brings the power of traditional _ajo_ (rotational savings) into the decentralized world — where trust is built on code, and payouts happen like magic.

KooPaa is a smart savings protocol on Solana, and this repo is its **backend companion**.

## ✨ What It Does

The KooPaa backend powers automation and coordination for the protocol — built to:

- 📬 **Notify users** of group activity (like new contributions or payouts)
- 🤖 **Monitor onchain events** (e.g. contribution made, participant joined)
- 💸 **Handle scheduled payouts** — automatically triggered when conditions are met
- 🔗 (Coming soon) Expose APIs to integrate with external dashboards or tools

It ensures the smart contract stays reactive to real-world dynamics — even when Solana doesn't support cron jobs natively.

## 🔔 Tracked Events

These onchain events are decoded and monitored:

- `AjoGroupCreatedEvent`
- `ParticipantJoinedEvent`
- `ContributionMadeEvent`
- `PayoutMadeEvent`
- `AjoGroupClosedEvent`
- `RefundClaimedEvent`

Each one is captured in real time and passed to custom handlers for notification or automation.

## 🛠️ Stack

- **Node.js** — Event-driven backend
- **TypeScript** — Full type safety
- **Solana** + **Anchor** — IDL-based decoding and program access
- **Redis** — For caching, job scheduling, and real-time coordination
- **PostgreSQL** (planned) — For historical logging and metrics

## ⚙️ Features in Progress

- ⏳ **Historical event scanner** — recover past logs missed while offline
- 📬 **Email/push notification system** — for user engagement
- 🧠 **Payout intelligence** — determines when payouts can be made, even without a specific "started" flag

## 📂 Repository

This is the `koopaa-backend` — designed to work alongside the KooPaa Solana program.

> 💡 Frontend + program source are in separate directories/repos.

## 📎 Want to Help or Integrate?

Follow [@steffqing](https://x.com/steffqing) for open development updates, or contribute via PRs as we modularize the logic.

## 📄 License

MIT
