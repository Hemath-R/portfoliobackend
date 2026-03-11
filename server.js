const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Backend server running successfully 🚀");
});

// Contact form API
app.post("/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    const newData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date()
    };

    // Read existing data
    fs.readFile("data.json", "utf8", (err, data) => {

        let jsonData = [];

        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        jsonData.push(newData);

        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {

            if (err) {
                res.status(500).send("Error saving data");
            } else {
                res.send("Message saved successfully");
            }

        });

    });

});

// Server start
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});