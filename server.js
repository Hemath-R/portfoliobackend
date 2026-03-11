const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Backend server running successfully 🚀");
});

// contact form API
app.post("/contact", (req, res) => {

  console.log("Form Data Received:");
  console.log(req.body);

  const { name, email, subject, message } = req.body;

  const newMessage = {
    name,
    email,
    subject,
    message,
    date: new Date()
  };

  // read existing data
  fs.readFile("data.json", "utf8", (err, data) => {

    let messages = [];

    if (!err && data) {
      messages = JSON.parse(data);
    }

    messages.push(newMessage);

    // save new data
    fs.writeFile("data.json", JSON.stringify(messages, null, 2), (err) => {

      if (err) {
        console.log("Error saving message:", err);
        res.status(500).send("Error saving message");
      } else {
        console.log("Message saved successfully");
        res.send("Message saved successfully");
      }

    });

  });

});

// server start
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});