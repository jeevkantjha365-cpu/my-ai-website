require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
    const message = req.body.message?.trim();

    if (!message) {
        return res.status(400).json({
            reply: "Please type a message."
        });
    }

    try {
        const response = await
        client.chat.completions.create({
            model:
         "groq/compound-mini",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({
            reply:
        response.choices[0].message.content
        });

         

        res.json({
            reply: response.output_text
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            reply: "AI se response nahi mil pa raha. Thodi der baad try karo."
        });
    }
});

app.listen(port, () => {
    console.log(`Website chal rahi hai: http://localhost:${port}`);
});