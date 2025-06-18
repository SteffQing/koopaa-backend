import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { EmailLayout } from "./layout";
import { formatAddress, formatNumber } from "../../utils";

export const ContributionMadeEmail = ({
  groupName,
  contributionAmount,
  contributor,
  currentRound,
}: ContributionMadeEvent) => (
  <EmailLayout preview={`Contribution made to "${groupName}"`}>
    <Section style={content}>
      <Heading style={h1}>💰 Contribution Received!</Heading>

      <Text style={text}>
        A contribution has been made to your Ajo group. Keep up the great
        savings momentum!
      </Text>

      <Section style={contributionCard}>
        <Heading style={groupNameStyle}>{groupName}</Heading>

        <Row>
          <Column style={statColumn}>
            <Text style={statLabel}>Contributor</Text>
            <Text style={statValue}>
              {formatAddress(contributor.toBase58())}
            </Text>
          </Column>
          <Column style={statColumn}>
            <Text style={statLabel}>Amount</Text>
            <Text style={statValue}>
              {formatNumber(contributionAmount)} USDC
            </Text>
          </Column>
        </Row>

        <Text style={roundText}>Round {currentRound}</Text>
      </Section>

      <Text style={text}>
        Every contribution brings your group closer to achieving your collective
        savings goals!
      </Text>
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

const contributionCard = {
  backgroundColor: "#f0fdf4",
  border: "2px solid #22c55e",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const groupNameStyle = {
  color: "#22c55e",
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
  color: "#22c55e",
  fontSize: "18px",
  fontWeight: "600",
  margin: "16px 0 0",
  textAlign: "center" as const,
};

export default ContributionMadeEmail;
