import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

const assertEmailConfig = () => {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Email service is not configured: ${missing.join(", ")}`);
  }
};

const sanitize = (value: string) => value.trim().replace(/\s+/g, " ");
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const validateContactPayload = (payload: ContactPayload) => {
  const name = sanitize(payload.name || "");
  const email = sanitize(payload.email || "");
  const subject = sanitize(payload.subject || "");
  const message = (payload.message || "").trim();

  if (!name || !email || !subject || !message) {
    throw new Error("Name, email, subject and message are required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("A valid email address is required");
  }

  if (message.length > 5000) {
    throw new Error("Message must be 5000 characters or less");
  }

  return { name, email, subject, message };
};

const sendContactMessage = async (payload: ContactPayload) => {
  assertEmailConfig();
  const contact = validateContactPayload(payload);

  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeSubject = escapeHtml(contact.subject);
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from,
    to,
    replyTo: contact.email,
    subject: `Website inquiry: ${contact.subject}`,
    text: [
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Subject: ${contact.subject}`,
      "",
      contact.message,
    ].join("\n"),
    html: `
      <h2>New website inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });

  return {
    message: "Message sent successfully",
  };
};

export const contactService = {
  sendContactMessage,
};
