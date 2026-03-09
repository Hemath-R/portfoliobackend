const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    const data = `Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}\n`;

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

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});