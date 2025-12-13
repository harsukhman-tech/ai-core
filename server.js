import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

app.post("/generate", async (req, res) => {
  const { business, offer } = req.body;

  const r = await client.responses.create({
    model: "gpt-4o-mini",
    input: `Write a short Instagram caption for ${business} offering ${offer}.`,
    max_output_tokens: 100
  });

  res.json({ caption: r.output_text });
});

app.listen(3000, () => console.log("AI running"));
