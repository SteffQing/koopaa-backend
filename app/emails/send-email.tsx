import { render } from "@react-email/render";
import { AjoGroupCreatedEmail, ContributionMadeEmail } from "./templates";
import PayoutMadeEmail from "./templates/payout-made";
import { resend } from "../utils/config";

export async function sendAjoGroupCreatedEmail(to: string, event: AjoGroupCreatedEvent) {
  const emailHtml = await render(AjoGroupCreatedEmail({ ...event }));

  return await resend.emails.send({
    from: "KooPaa <noreply@koopaa.com>",
    to,
    subject: `New Ajo Group "${event.groupName}" Created!`,
    html: emailHtml,
  });
}

export async function sendContributionMadeEmail(to: string, event: ContributionMadeEvent) {
  const emailHtml = await render(ContributionMadeEmail({ ...event }));

  return await resend.emails.send({
    from: "KooPaa <noreply@koopaa.com>",
    to,
    subject: `Contribution Made to "${event.groupName}"`,
    html: emailHtml,
  });
}

export async function sendPayoutMadeEmail(to: string, event: PayoutMadeEvent) {
  const emailHtml = await render(<PayoutMadeEmail {...event} />);

  return await resend.emails.send({
    from: "KooPaa <noreply@updates.algomeme.fun>",
    to,
    subject: `Payout Distributed from [${event.groupName}]`,
    // html: emailHtml,
    react: <PayoutMadeEmail {...event} />,
  });
}
