const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// connect routes
const newsRoutes = require("./routes/news");
app.use("/", newsRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});