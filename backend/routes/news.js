const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");   // ← use spawn, NOT exec
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const AI_SCRIPT = path.join(__dirname, "..", "ai_model.py");

async function extractTextFromURL(url) {
  try {
    const response = await axios.get(url, { 
      timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const $ = cheerio.load(response.data);
    
    // 1. Remove noise elements
    $("nav, footer, header, aside, .ad, .advertisement, script, style").remove();

    // 2. Extract meaningful text from <p> tags
    let extractedText = "";
    $("article p, main p, p").each((_, element) => {
      extractedText += $(element).text() + " ";
    });

    // 3. Clean and remove line breaks/extra spaces
    let cleanText = extractedText
      .replace(/[\r\n]+/g, " ")        // Remove line breaks
      .replace(/\s{2,}/g, " ")         // Remove extra spaces
      .trim();

    // 4. Debug Logging
    console.log("--- URL Extraction Debug ---");
    console.log(`Original Length: ${cleanText.length} chars`);

    // 5. Filter out short text
    if (cleanText.length < 100) {
      throw new Error("Insufficient content");
    }

    // 6. Limit text length (first 2000 chars)
    const finalText = cleanText.slice(0, 2000);
    console.log(`Final Sent Length: ${finalText.length} chars`);
    console.log(`Preview: ${finalText.slice(0, 100)}...`);
    console.log("----------------------------");

    return finalText;

  } catch (error) {
    if (error.message === "Insufficient content") throw error;
    throw new Error("Unable to extract content from URL");
  }
}

// TEXT + URL SUPPORT
router.post("/check-news", async (req, res) => {
  let { news, url } = req.body;

  try {
    // If URL is provided → extract text from webpage
    if (url && url.trim() !== "") {
      try {
        news = await extractTextFromURL(url);
      } catch (error) {
        return res.json({ result: "Error", confidence: 0, explanation: error.message });
      }
    }

    if (!news || news.trim() === "") {
      return res.json({ result: "Error", confidence: 0, explanation: "No text provided." });
    }

    // SAFE: user input passed as a separate argument array, never injected into shell string
    const py = spawn("py", [AI_SCRIPT, news], {
      timeout: 30000,   // 30s max — first run may train the model
      shell: false,     // no shell = no injection
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => { stdout += data.toString(); });
    py.stderr.on("data", (data) => { stderr += data.toString(); });

    py.on("close", (code) => {
      if (code !== 0 || !stdout.trim()) {
        console.error("Python error:", stderr);
        return res.json({ result: "Error", confidence: 0, explanation: "Model error. Is the backend configured correctly?" });
      }

      const parts = stdout.trim().split(",");
      const result = parts[0] || "Error";
      const confidence = parts[1] || "0";

      const explanation =
        result === "Fake"
          ? "The model detected patterns similar to fake news."
          : result === "Real"
            ? "The content matches patterns of real news."
            : "Unable to determine the result.";

      res.json({ result, confidence, explanation });
    });

    py.on("error", (err) => {
      console.error("Failed to start Python:", err.message);
      res.json({ result: "Error", confidence: 0, explanation: "Could not start Python. Make sure Python is installed." });
    });

  } catch (err) {
    console.error("Route error:", err.message);
    res.json({ result: "Error", confidence: 0, explanation: "Failed to process the request." });
  }
});

module.exports = router;

