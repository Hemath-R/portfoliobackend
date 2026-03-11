const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/contact", (req, res) => {

  console.log("Form Data:", req.body);

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newMessage = {
    name,
    email,
    subject,
    message,
    date: new Date().toISOString()
  };

  // JSON FILE SAVE
  const jsonFile = path.join(__dirname, "data.json");

  let messages = [];

  if (fs.existsSync(jsonFile)) {
    const data = fs.readFileSync(jsonFile);
    messages = JSON.parse(data);
  }

  messages.push(newMessage);

  fs.writeFileSync(jsonFile, JSON.stringify(messages, null, 2));

  // TEXT FILE SAVE
  const txtFile = path.join(__dirname, "messages.txt");

  const textData = `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
Date: ${new Date().toLocaleString()}
------------------------------------
`;

  fs.appendFileSync(txtFile, textData);

  console.log("Saved to JSON & TXT");

  res.json({ message: "Message saved successfully" });

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});