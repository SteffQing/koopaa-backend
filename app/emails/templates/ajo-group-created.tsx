import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { EmailLayout } from "./layout";
import { formatNumber } from "../../utils";

export default function AjoGroupCreatedEmail({
  groupName,
  contributionAmount,
  numParticipants,
  contributionInterval,
  payoutInterval,
}: AjoGroupCreatedEvent) {
  return (
    <EmailLayout preview={`New Ajo Group "${groupName}" has been created!`}>
      <Section style={content}>
        <Heading style={h1}>🎉 New Ajo Group Created!</Heading>

        <Text style={text}>Great news! A new Ajo group has been created and is ready for participants to join.</Text>

        <Section style={groupCard}>
          <Heading style={groupNameStyle}>{groupName}</Heading>

          <Row>
            <Column style={statColumn}>
              <Text style={statLabel}>Contribution Amount</Text>
              <Text style={statValue}>{formatNumber(contributionAmount)} USDC</Text>
            </Column>
          </Row>

          <Row>
            <Column style={statColumn}>
              <Text style={statLabel}>Participants</Text>
              <Text style={statValue}>{numParticipants}</Text>
            </Column>
            <Column style={statColumn}>
              <Text style={statLabel}>Contribution Interval</Text>
              <Text style={statValue}>{contributionInterval} days</Text>
            </Column>
          </Row>

          <Row>
            <Column style={statColumn}>
              <Text style={statLabel}>Payout Interval</Text>
              <Text style={statValue}>{payoutInterval} days</Text>
            </Column>
          </Row>
        </Section>

        <Text style={text}>Join this group now to start your savings journey with KooPaa!</Text>
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

const groupCard = {
  backgroundColor: "#fff5f0",
  border: "2px solid #ff6b35",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const groupNameStyle = {
  color: "#ff6b35",
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
