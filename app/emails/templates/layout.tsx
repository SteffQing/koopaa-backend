import { Body, Container, Head, Html, Img, Preview, Section } from "@react-email/components";
import type * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
  preview: string;
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src="http://www.koopaa.fun/assets/koopaa_logo.png" width="208" height="41" alt="KooPaa" style={logo} />
        </Section>
        {children}
        <Section style={footer}>
          <p style={footerText}>
            This email was sent by KooPaa. If you have any questions, please contact our support team.
          </p>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px 24px",
  borderBottom: "1px solid #e6ebf1",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const footer = {
  padding: "24px",
  borderTop: "1px solid #e6ebf1",
  marginTop: "32px",
};

const footerText = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "0",
  textAlign: "center" as const,
};
