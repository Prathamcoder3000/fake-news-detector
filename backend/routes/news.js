const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const axios = require("axios");
const cheerio = require("cheerio");

// TEXT + URL SUPPORT
router.post("/check-news", async (req, res) => {
let { news, url } = req.body;

try {
// If URL is provided → extract text from webpage
if (url && url.trim() !== "") {
const response = await axios.get(url);
const $ = cheerio.load(response.data);
news = $("p").text(); // get all paragraph text
}


exec(`py ai_model.py "${news}"`, (error, stdout) => {
  if (error) {
    return res.json({ result: "Error", confidence: 0 });
  }

  const [result, confidence] = stdout.trim().split(",");

  let explanation = "";

  if (result === "Fake") {
    explanation = "The model detected patterns similar to fake news.";
  } else {
    explanation = "The content matches patterns of real news.";
  }

  res.json({ result, confidence, explanation });
});

} catch (err) {
res.json({ result: "Error", confidence: 0 });
}
});

module.exports = router;
