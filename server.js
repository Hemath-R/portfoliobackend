const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> res.send("OK"));

app.post("/contact", (req,res)=>{
  console.log("Contact endpoint hit", new Date().toISOString());
  console.log("Form Data Received:", req.body);

  const {name,email,subject,message} = req.body;
  if(!name||!email||!subject||!message){
    console.warn("Missing field:", req.body);
    return res.status(400).json({error:"All fields are required"});
  }

  const newMessage = {name,email,subject,message,date:new Date().toISOString()};
  const dbFile = path.join(__dirname,"data.json");

  let messages = [];
  try{
    if(fs.existsSync(dbFile)){
      const raw = fs.readFileSync(dbFile,"utf8");
      messages = raw ? JSON.parse(raw) : [];
    }
  }catch(err){
    console.error("Read data.json failed:", err);
    messages = [];
  }

  messages.push(newMessage);

  try{
    fs.writeFileSync(dbFile, JSON.stringify(messages,null,2),"utf8");
    console.log("Message saved successfully:", newMessage);
    return res.json({status:"ok", message:"Message saved successfully"});
  }catch(err){
    console.error("Write data.json failed:", err);
    return res.status(500).json({error:"Error saving message"});
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log("Server running on port", PORT));