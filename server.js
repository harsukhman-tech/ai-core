import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { business, offer } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Write a short Instagram caption for ${business} offering ${offer}.`
          }]
        }]
      })
    }
  );

  const data = await response.json();
  res.json({ caption: data.candidates[0].content.parts[0].text });
});

app.listen(3000, () => console.log("Gemini AI running"));
