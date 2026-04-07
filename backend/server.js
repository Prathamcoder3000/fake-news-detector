require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// Simple test POST to check if express works
app.post("/test-post", (req, res) => {
    res.json({ message: "POST works", body: req.body });
});

// connect routes
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const historyRoutes = require("./routes/history");

app.use("/api/auth", authRoutes);
app.use("/api", newsRoutes);
app.use("/api", historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});