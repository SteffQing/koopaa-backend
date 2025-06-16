import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { EmailLayout } from "./layout";
import { formatAddress, formatNumber } from "../../utils";

export default function PayoutMadeEmail({ groupName, recipient, payoutAmount, payoutRound }: PayoutMadeEvent) {
  return (
    <EmailLayout preview={`Payout made from "${groupName}"`}>
      <Section style={content}>
        <Heading style={h1}>🎉 Payout Distributed!</Heading>

        <Text style={text}>Congratulations! A payout has been successfully distributed from your Ajo group.</Text>

        <Section style={payoutCard}>
          <Heading style={groupNameStyle}>{groupName}</Heading>

          <Row>
            <Column style={statColumn}>
              <Text style={statLabel}>Recipient</Text>
              <Text style={statValue}>{formatAddress(recipient.toBase58())}</Text>
            </Column>
            <Column style={statColumn}>
              <Text style={statLabel}>Amount</Text>
              <Text style={statValue}>{formatNumber(payoutAmount)} USDC</Text>
            </Column>
          </Row>

          <Text style={roundText}>Payout Round {payoutRound}</Text>
        </Section>

        <Text style={text}>
          This is the power of collective savings in action! Keep contributing to maintain the cycle.
        </Text>
      </Section>
    </EmailLayout>
  );
}

const content = {
  padding: "24px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const payoutCard = {
  backgroundColor: "#fefce8",
  border: "2px solid #eab308",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const groupNameStyle = {
  color: "#eab308",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const statColumn = {
  padding: "8px",
  textAlign: "center" as const,
};

const statLabel = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0 0 4px",
  textTransform: "uppercase" as const,
};

const statValue = {
  color: "#1a1a1a",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const roundText = {
  color: "#eab308",
  fontSize: "18px",
  fontWeight: "600",
  margin: "16px 0 0",
  textAlign: "center" as const,
};
