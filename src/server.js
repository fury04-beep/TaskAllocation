const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Replace with your Mailgun API key and domain
const mailgunApiKey = "";
const mailgunDomain = "";
const mg = mailgun({ apiKey: mailgunApiKey, domain: mailgunDomain });

app.post("/send-email", (req, res) => {
  const { to, subject, html } = req.body;

  const data = {
    from: "andrewjacob756@gmail.com",
    to,
    subject,
    html,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error sending email" });
    }

    console.log(body);
    res.status(200).json({ message: "Email sent successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
