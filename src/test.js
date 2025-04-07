const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key:
    process.env.MAILGUN_API_KEY ||
    "062c0d78563f0b026409a6ffedf9a202-78f6ccbe-6498a8b1",
});

mg.messages
  .create("sandbox9e8caf2d66fa4751b1f14ce3aef8f7bf.mailgun.org", {
    from: "fandrewj@amazon.com",
    to: ["andrewjacob756@gmail.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error
