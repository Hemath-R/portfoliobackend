const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/contact", (req, res) => {

  console.log("Contact endpoint hit");
  console.log("Form Data Received:", req.body);

  const { name, email, subject, message } = req.body;

  const newMessage = {
    name,
    email,
    subject,
    message,
    date: new Date()
  };

  const filePath = path.join(__dirname, "data.json");

  let messages = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    messages = JSON.parse(data);
  }

  messages.push(newMessage);

  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  console.log("Message saved successfully");

  res.json({ success: true });

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});