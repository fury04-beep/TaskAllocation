// functions/sendMail.js
const axios = require("axios");

exports.handler = async (event, context) => {
  const { name, email, message } = JSON.parse(event.body);

  const mailgunData = {
    from: "fandrewj@amazon.com",
    to: "andrewjacob756@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const response = await axios.post(
      `https://api.mailgun.net/v3/https://app.mailgun.com/app/sending/domains/sandboxda11485f93964619b3377c277b3e6e5f.mailgun.org/messages`,
      mailgunData,
      {
        auth: {
          username: "api",
          password: "bb9b86482012c493668dd3f1c1975aa8-1900dca6-f85545e9",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email" }),
    };
  }
};
