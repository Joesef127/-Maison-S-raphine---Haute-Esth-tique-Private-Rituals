import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware for parsing JSON (allow larger payloads for base64 images)
app.use(express.json({ limit: "25mb" }));

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", atelier: "Maison Séraphine" });
});

// Chat endpoint: Multi-turn chat with conversation history and role system instruction
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, complexity = "general" } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const ai = getAiClient();
    
    // Choose model based on requirements:
    // gemini-3.1-pro-preview for particularly complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
    let modelName = "gemini-3.5-flash";
    if (complexity === "complex") {
      modelName = "gemini-3.1-pro-preview";
    } else if (complexity === "fast") {
      modelName = "gemini-3.1-flash-lite";
    }

    const systemInstruction = 
      "You are Madame Éléonore, Senior Aesthetician and Private Concierge at Maison Séraphine — a high-end luxury beauty sanctuary. " +
      "You speak with warm, poised elegance, deep expertise in skincare biology, Japanese gel nail craftsmanship, cashmere lash architecture, " +
      "bespoke brow design, and red-carpet artistry. " +
      "Always address clients with polite warmth. Provide tailored recommendations, explain ritual benefits, suggest complementary add-ons, " +
      "advise on contraindications, and recommend booking our signature services: The Grand Soirée, Japanese Gel Sculpting, Cashmere Featherweight Lashes, " +
      "Buccal Sculpting Facial, or 24K Gold Collagen Infusion.";

    // Convert messages to GenAI contents format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      // Fallback to gemini-3.5-flash if pro-preview is rate-limited or fails
      if (modelName !== "gemini-3.5-flash") {
        console.warn(`Fallback to gemini-3.5-flash from ${modelName}:`, err.message);
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        return res.json({ reply: fallbackResponse.text });
      }
      throw err;
    }
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: error?.message || "Failed to process aesthetic consultation.",
    });
  }
});

// Image Analysis endpoint: Analyzes beauty reference or selfie using gemini-3.1-pro-preview
app.post("/api/analyze-image", async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", prompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "imageBase64 is required" });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");
    const ai = getAiClient();

    const analysisPrompt =
      prompt ||
      "Perform a refined, luxury aesthetic consultation based on this image. " +
      "1. Aesthetic & Facial/Hand Harmonic Assessment (skin undertone, texture, bone structure, or nail plate profile). " +
      "2. Bespoke Recommendations (tailored nail shape/palette, lash mapping style like Cat Eye vs Wet Look, brow elevation, or targeted facial ritual). " +
      "3. Curated Maison Séraphine Services match (select 2-3 specific atelier treatments from: Buccal Sculpting Facial, Japanese Gel Art, Cashmere Lash Extensions, Hybrid Stain Brows, or Grand Soirée Ritual). " +
      "4. Homecare Preparation & Longevity Advice. Keep the tone sophisticated, encouraging, and editorial.";

    const systemInstruction =
      "You are the Creative Aesthetic Director at Maison Séraphine luxury beauty atelier. " +
      "Deliver an exquisite, highly professional aesthetic diagnostic analysis formatted with clear, elegant markdown headings and bullet points.";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: analysisPrompt,
            },
          ],
        },
        config: {
          systemInstruction,
        },
      });

      return res.json({ analysis: response.text });
    } catch (err: any) {
      console.warn("Primary image analysis model error, attempting fallback to gemini-3.5-flash:", err.message);
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: analysisPrompt,
            },
          ],
        },
        config: {
          systemInstruction,
        },
      });
      return res.json({ analysis: fallbackResponse.text });
    }
  } catch (error: any) {
    console.error("Image analysis error:", error);
    res.status(500).json({
      error: error?.message || "Failed to analyze beauty image.",
    });
  }
});

// Text-to-Speech endpoint: Uses gemini-3.8-flash-tts
app.post("/api/tts", async (req: Request, res: Response) => {
  try {
    const { text, speaker = "Concierge", style = "Poised, serene, luxury aesthetician" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: text.slice(0, 1000), // safe length
              speechMetadata: {
                speaker,
                style,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            // High quality prebuilt voice 'Kore' or 'Zephyr'
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(502).json({ error: "No audio data returned by model." });
    }

    res.json({
      audioBase64: base64Audio,
      mimeType: "audio/wav",
    });
  } catch (error: any) {
    console.error("TTS error:", error);
    res.status(500).json({
      error: error?.message || "Failed to generate audio narration.",
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Maison Séraphine atelier server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
