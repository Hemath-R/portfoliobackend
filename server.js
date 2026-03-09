const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// CONTACT API
app.post("/contact", (req, res) => {

const { name, email, subject, message } = req.body;

console.log("Name:", name);
console.log("Email:", email);
console.log("Subject:", subject);
console.log("Message:", message);

const data = `Name:${name} Email:${email} Subject:${subject} Message:${message}\n`;

fs.appendFile("./message/contact.txt", data, (err) => {

if (err) {
console.log(err);
res.status(500).send("Error saving message");
return;
}

console.log("Saved in message/contact.txt");
res.send("Message saved successfully");

});

});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log("Server running on port", PORT);
});