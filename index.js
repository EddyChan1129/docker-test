const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://mongo:27017/dockerdb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🎉 Hello from Dockerized Node + Mongo App!");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("App running on http://localhost:3000");
});
