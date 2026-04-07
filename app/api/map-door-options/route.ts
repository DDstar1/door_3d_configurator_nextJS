// app/api/map-door-options/route.ts
import { NextRequest, NextResponse } from "next/server";
import DOOR_VALUES from "@/utils/door_config";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

function buildValuesReference(): string {
  return Object.entries(DOOR_VALUES)
    .map(([category, options]) => {
      const values = Object.values(options).join(" | ");
      return `${category}: ${values}`;
    })
    .join("\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const rawDict: Record<string, string | null> = body.options;

  if (!rawDict || typeof rawDict !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const valuesRef = buildValuesReference();

  console.log("[map-door-options] Received raw options:", valuesRef);

  const prompt = `
You are a mapping assistant for a door configurator.

You will receive a raw dictionary of door options scraped from a product page.
Your job is to map each value to the closest matching value from the allowed DOOR_VALUES below.

Rules:
- Match case-insensitively and tolerate minor spelling differences or abbreviations.
- If a value clearly corresponds to one of the allowed values, return that exact allowed value.
- If no match can be found, return null for that key.
- Return ONLY a valid JSON object. No markdown, no explanation, no extra text.
- Keep the same keys from the input dictionary.

ALLOWED DOOR_VALUES:
${valuesRef}

RAW INPUT DICTIONARY:
${JSON.stringify(rawDict, null, 2)}

Return format:
{
  "key1": "matched value or null",
  "key2": "matched value or null"
}
`.trim();

  let raw = "";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ GROQ_API_KEY is server-only — never exposed to the client
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.0,
          max_tokens: 1000,
          stream: false,
        }),
      });

      if (!response.ok) {
        console.warn(
          `[map-door-options] HTTP ${response.status} on attempt ${attempt}`,
        );
        continue;
      }

      const data = await response.json();
      raw = data.choices?.[0]?.message?.content ?? "";

      if (raw.trim()) break;

      console.warn(
        `[map-door-options] Empty response on attempt ${attempt}, retrying...`,
      );
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`[map-door-options] Groq error (attempt ${attempt}):`, err);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    const mapped = JSON.parse(clean);
    return NextResponse.json({ mapped });
  } catch {
    console.error("[map-door-options] Failed to parse Groq response:", raw);
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 },
    );
  }
}
