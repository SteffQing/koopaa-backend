import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { EmailLayout } from "./layout";

export const GroupClosedEmail = ({
  groupName,
  groupSize,
  totalVotes,
}: AjoGroupClosedEvent) => (
  <EmailLayout preview={`"${groupName}" has been closed`}>
    <Section style={content}>
      <Heading style={h1}>📋 Group Closed</Heading>

      <Text style={text}>
        Your Ajo group has been officially closed. Thank you for participating
        in this savings cycle!
      </Text>

      <Section style={closedCard}>
        <Heading style={groupNameStyle}>{groupName}</Heading>

        <Row>
          <Column style={statColumn}>
            <Text style={statLabel}>Total Votes</Text>
            <Text style={statValue}>{totalVotes}</Text>
          </Column>
          <Column style={statColumn}>
            <Text style={statLabel}>Group Size</Text>
            <Text style={statValue}>{groupSize}</Text>
          </Column>
        </Row>
      </Section>

      <Text style={text}>
        We hope you had a great savings experience. Look out for new groups to
        join!
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

const closedCard = {
  backgroundColor: "#fef2f2",
  border: "2px solid #ef4444",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const groupNameStyle = {
  color: "#ef4444",
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

export default GroupClosedEmail;
