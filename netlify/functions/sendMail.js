const mailgun = require("mailgun-js")({
  apiKey: "bb9b86482012c493668dd3f1c1975aa8-1900dca6-f85545e9",
  domain: "sandboxda11485f93964619b3377c277b3e6e5f.mailgun.org",
});

async function sendEmail(to, subject, text) {
  const data = {
    from: "fandrewj@amazon.com",
    to,
    subject,
    text,
  };

  try {
    const response = await mailgun.messages().send(data);
    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Usage example:
sendEmail("andrewjacob756@example.com", "Hello", "This is the email body.");
