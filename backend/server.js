const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let leads = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Save lead
app.post("/leads", (req, res) => {
  const lead = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    source: req.body.source,
    date: new Date().toLocaleString()
  };

  leads.push(lead);
  res.status(201).json({ message: "Lead saved" });
});

// Get all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
