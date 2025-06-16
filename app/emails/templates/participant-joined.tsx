import { Heading, Text, Section } from "@react-email/components";
import { EmailLayout } from "./layout";
import { formatAddress, formatDate, formatNumber } from "../../utils";

export const ParticipantJoinedEmail = ({ groupName, participant, joinTimestamp }: ParticipantJoinedEvent) => (
  <EmailLayout preview={`New participant joined "${groupName}"`}>
    <Section style={content}>
      <Heading style={h1}>👋 New Participant Joined!</Heading>

      <Text style={text}>Exciting news! A new participant has joined your Ajo group.</Text>

      <Section style={eventCard}>
        <Heading style={groupNameStyle}>{groupName}</Heading>

        <Text style={participantText}>
          <strong>New Participant:</strong> {formatAddress(participant.toBase58())}
        </Text>

        <Text style={timestampText}>Joined: {formatDate(new Date(formatNumber(joinTimestamp, 0)))}</Text>
      </Section>

      <Text style={text}>Your group is growing! The more participants, the stronger your savings circle becomes.</Text>
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

const eventCard = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #0ea5e9",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const groupNameStyle = {
  color: "#0ea5e9",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const participantText = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0 0 8px",
};

const timestampText = {
  color: "#8898aa",
  fontSize: "14px",
  margin: "0",
};

export default ParticipantJoinedEmail;
