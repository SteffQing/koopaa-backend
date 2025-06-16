import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { EmailLayout } from "./layout";
import { formatAddress, formatNumber } from "../../utils";

export const RefundClaimedEmail = ({ groupName, amount, participant }: RefundClaimedEvent) => (
  <EmailLayout preview={`Refund claimed from "${groupName}"`}>
    <Section style={content}>
      <Heading style={h1}>💸 Refund Claimed</Heading>

      <Text style={text}>A refund has been successfully claimed from your Ajo group.</Text>

      <Section style={refundCard}>
        <Heading style={groupNameStyle}>{groupName}</Heading>

        <Row>
          <Column style={statColumn}>
            <Text style={statLabel}>Participant</Text>
            <Text style={statValue}>{formatAddress(participant.toBase58())}</Text>
          </Column>
          <Column style={statColumn}>
            <Text style={statLabel}>Refund Amount</Text>
            <Text style={statValue}>{formatNumber(amount)} USDC</Text>
          </Column>
        </Row>
      </Section>

      <Text style={text}>The refund has been processed and sent to the participant's wallet.</Text>
    </Section>
  </EmailLayout>
);

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

const refundCard = {
  backgroundColor: "#f8fafc",
  border: "2px solid #64748b",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const groupNameStyle = {
  color: "#64748b",
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

export default RefundClaimedEmail;
