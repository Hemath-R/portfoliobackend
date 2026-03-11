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


// contact API
app.post("/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    const newMessage = {
        name,
        email,
        subject,
        message,
        date: new Date()
    };

    fs.readFile("data.json", "utf8", (err, data) => {

        let messages = [];

        if (!err && data) {
            messages = JSON.parse(data);
        }

        messages.push(newMessage);

        fs.writeFile("data.json", JSON.stringify(messages, null, 2), (err) => {

            if (err) {
                res.status(500).send("Error saving data");
            } else {
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