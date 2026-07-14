import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined. The trends API will serve premium local curated designs.");
  }

  // API Route: Trends Feed pulling luxury interior design styles relevant to the UAE market
  app.get("/api/trends", async (req, res) => {
    try {
      if (!ai) {
        // High quality fallback data if API key is not present
        return res.json({
          success: true,
          source: "curated",
          trends: [
            {
              title: "Modern Desert Brutalism",
              description: "A gorgeous mix of sand-textured Jotun microcement walls, raw brass trims, and expansive floor-to-ceiling glass to frame scenic desert dunes.",
              location: "Emirates Hills, Dubai",
              colors: ["#D4AF37", "#E6DFD3", "#4A453F"],
              materials: ["Travertine Marble", "Brushed Brass", "Textured Plaster"],
              jotunColors: ["Jotun 1024 Timeless", "Jotun 12182 Gentle Whisper"],
              popularity: "High demand in newly constructed Al Barari & Dubai Hills villas"
            },
            {
              title: "Symmetrical Neo-Classical Majlis",
              description: "The traditional meeting lounge elevated with gold-leaf moldings, custom ambient LED light channels, and majestic plush seating.",
              location: "Al Bateen, Abu Dhabi",
              colors: ["#C5A880", "#1E293B", "#F5F5F0"],
              materials: ["Walnut Wood Panels", "Gold-Leaf Trim", "Silk Wallpaper"],
              jotunColors: ["Jotun 1001 Egg White", "Jotun 10341 Limestone"],
              popularity: "Top choice for classic VIP family residential sectors"
            },
            {
              title: "Biophilic Beachfront Serenity",
              description: "Integrating indoor waterfall acoustics with lush vertical moss profiles, natural coral stone, and warm sand-inspired paints.",
              location: "Saadiyat Island, Abu Dhabi",
              colors: ["#2D5A27", "#EFECE6", "#C5A880"],
              materials: ["Coral Stone Plaster", "Teak Louvers", "Organic Linen Textiles"],
              jotunColors: ["Jotun 8252 Green Harmony", "Jotun 1875 Sense"],
              popularity: "Rising wave among beachside and modern eco-friendly villas"
            },
            {
              title: "Cosmic Charcoal Minimalist",
              description: "Deep, moody color palettes highlighted by warm linear illumination, black slate elements, and gold architectural accents.",
              location: "Palm Jumeirah, Dubai",
              colors: ["#1F1F1F", "#D4AF37", "#D1C7BD"],
              materials: ["Slate Stone Panels", "Gold PVD Steel", "Smoked Walnut"],
              jotunColors: ["Jotun 9938 Blackish", "Jotun 1141 Natural Clay"],
              popularity: "Extremely popular for penthouses and master suites"
            }
          ]
        });
      }

      const prompt = `You are an elite luxury interior design expert specializing in the UAE market (Dubai, Abu Dhabi, Sharjah).
Generate a JSON array of exactly 4 current luxury interior design trends highly relevant to the premium UAE villa/majlis market.
For each trend, provide:
1. "title": Elegant, distinctive name (e.g., 'Modern Desert Brutalism', 'Palatial Neo-Classical', 'Minimalist Sand Oasis').
2. "description": A short, rich 2-sentence description detailing the aesthetic.
3. "location": Specific prominent UAE neighborhood/area where this trend is highly popular (e.g. 'Palm Jumeirah', 'Al Bateen', 'Emirates Hills', 'Saadiyat Island').
4. "colors": Array of 3 luxury hex color codes (must be valid hex string like '#D4AF37').
5. "materials": Array of 3 premium materials used (e.g. 'Calacatta Marble', 'Polushed Brass', 'Smoked Oak').
6. "jotunColors": Array of 2 actual Jotun paint colors/codes popular in the UAE (e.g. 'Jotun 1024 Timeless', 'Jotun 1001 Egg White').
7. "popularity": High-end market interest tagline (e.g., 'High demand in new luxury villas').

Return ONLY the JSON array without markdown formatting or code fences. Ensure the response is valid, parsable JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const cleanText = response.text.trim();
      const trendsData = JSON.parse(cleanText);
      res.json({
        success: true,
        source: "gemini",
        trends: trendsData
      });
    } catch (err: any) {
      console.error("Gemini trends API failed: ", err);
      res.status(500).json({ error: err.message || "Failed to fetch luxury trends." });
    }
  });

  // Vite middleware setup for assets and SPA handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
