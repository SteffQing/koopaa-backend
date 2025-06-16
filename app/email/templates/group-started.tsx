import { Heading, Text, Section } from "@react-email/components";
import { EmailLayout } from "./layout";

export const GroupStartedEmail = ({ groupName, startTimestamp }: AjoGroupStartedEvent) => (
  <EmailLayout preview={`"${groupName}" has officially started!`}>
    <Section style={content}>
      <Heading style={h1}>🚀 Group Started!</Heading>

      <Text style={text}>
        Exciting news! Your Ajo group has officially started and the savings cycle is now active.
      </Text>

      <Section style={startCard}>
        <Heading style={groupNameStyle}>{groupName}</Heading>

        <Text style={startText}>Started: {new Date(startTimestamp).toLocaleDateString()}</Text>
      </Section>

      <Text style={text}>
        The journey begins now! Make sure to contribute on time to keep the cycle running smoothly.
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

const startCard = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #3b82f6",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const groupNameStyle = {
  color: "#3b82f6",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const startText = {
  color: "#1a1a1a",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0",
};

export default GroupStartedEmail;
