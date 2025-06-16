// import { render } from "@react-email/render"
// import { Resend } from "resend"
// import {
//   AjoGroupCreatedEmail,
//   ContributionMadeEmail,
//   PayoutMadeEmail,
//   type AjoGroupCreatedEvent,
//   type ContributionMadeEvent,
//   type PayoutMadeEvent,
// } from "./index"

// const resend = new Resend(process.env.RESEND_API_KEY)

// // Example usage for sending emails
// export async function sendAjoGroupCreatedEmail(to: string, event: AjoGroupCreatedEvent) {
//   const emailHtml = render(AjoGroupCreatedEmail({ event }))

//   return await resend.emails.send({
//     from: "KooPaa <noreply@koopaa.com>",
//     to,
//     subject: `New Ajo Group "${event.groupName}" Created!`,
//     html: emailHtml,
//   })
// }

// export async function sendContributionMadeEmail(to: string, event: ContributionMadeEvent) {
//   const emailHtml = render(ContributionMadeEmail({ event }))

//   return await resend.emails.send({
//     from: "KooPaa <noreply@koopaa.com>",
//     to,
//     subject: `Contribution Made to "${event.groupName}"`,
//     html: emailHtml,
//   })
// }

// export async function sendPayoutMadeEmail(to: string, event: PayoutMadeEvent) {
//   const emailHtml = render(PayoutMadeEmail({ event }))

//   return await resend.emails.send({
//     from: "KooPaa <noreply@koopaa.com>",
//     to,
//     subject: `Payout Distributed from "${event.groupName}"`,
//     html: emailHtml,
//   })
// }
