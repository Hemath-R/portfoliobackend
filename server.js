const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// middleware: enable CORS for cross-origin requests from GitHub Pages
app.use(cors());
// JSON body parser: required to populate req.body from JSON payload
app.use(express.json());

// root route for health check and quick verify
app.get("/", (req, res) => {
  res.send("Backend server running successfully 🚀");
});

// contact form API
app.post("/contact", (req, res) => {

  console.log("Contact endpoint hit", new Date().toISOString());
  console.log("Form Data Received:", req.body);

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    console.warn("Validation failed: missing field", { name, email, subject, message });
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMessage = {
    name,
    email,
    subject,
    message,
    date: new Date().toISOString()
  };

  // read existing data
  const dbFile = path.join(__dirname, "data.json");
  fs.readFile(dbFile, "utf8", (err, data) => {

    let messages = [];

    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch (parseErr) {
        console.error("Invalid data.json content; starting fresh", parseErr);
        messages = [];
      }
    }

    messages.push(newMessage);

    // save new data
    fs.writeFile(dbFile, JSON.stringify(messages, null, 2), (err) => {

      if (err) {
        console.error("Error saving message:", err);
        return res.status(500).json({ error: "Error saving message" });
      }

      console.log("Message saved successfully", newMessage);
      return res.json({ status: "ok", message: "Message saved successfully" });

    });

  });

});

// server start
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});