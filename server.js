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

// CLI mode: node server.js save "Name" "Email" "Subject" "Message"
// or: node server.js "Name" "Email" "Subject" "Message" (auto save)
const runCliSave = () => {
    const args = process.argv[2] === "save" ? process.argv.slice(3) : process.argv.slice(2);
    if (args.length !== 4) {
        console.log("Usage:");
        console.log("  node server.js save \"Name\" \"Email\" \"Subject\" \"Message\"");
        console.log("  node server.js \"Name\" \"Email\" \"Subject\" \"Message\"");
        process.exit(1);
    }

    const [name, email, subject, message] = args;

    const data = `Name:${name} Email:${email} Subject:${subject} Message:${message}\n`;

    fs.appendFile("./message/contact.txt", data, (err) => {
        if (err) {
            console.error("Error saving message:", err);
            process.exit(1);
        }

        console.log("Saved in message/contact.txt");
        process.exit(0);
    });
};

if (process.argv.length > 2) {
    runCliSave();
} else {
    // IMPORTANT FOR RENDER
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}