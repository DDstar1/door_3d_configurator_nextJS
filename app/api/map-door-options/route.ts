// app/api/map-door-options/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DOOR_VALUES, INITIAL_DOOR_STATE } from "@/utils/door_config";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

/* ===============================
   BUILD VALUES REFERENCE
=============================== */
function buildValuesReference(): string {
  return Object.entries(DOOR_VALUES)
    .map(([category, options]) => {
      const values = Object.values(options).join(" | ");
      return `${category}: ${values}`;
    })
    .join("\n");
}

/* ===============================
   ROUTE
=============================== */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const rawDict: Record<string, string | null> = body.options;

  if (!rawDict || typeof rawDict !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const valuesRef = buildValuesReference();

  // ✅ Dynamically get store keys
  const STORE_KEYS = Object.keys(INITIAL_DOOR_STATE);

  const prompt = `
You are a mapping assistant for a door configurator.

You will receive a raw dictionary of door options scraped from a product page.
Your job is to map each value to the closest matching value from the allowed DOOR_VALUES below.

Rules:
- Match case-insensitively and tolerate minor spelling differences or abbreviations.
- If a value clearly corresponds to one of the allowed values, return that exact allowed value.
- If the value contains numbers with units (e.g., "1985 mm") or ranges (e.g., "2000 - 2014 mm"), extract the most relevant number.
- If a value contains extra text or suffixes (like "_0"), ignore it for matching.
- Always return values as strings (even if numeric), except null.

IMPORTANT:
- DO NOT use the original input keys.
- You MUST map values to the correct STORE KEYS below.

STORE KEYS:
${STORE_KEYS.join("\n")}

Key mapping hints:
- Türtyp → doorType_store
- Breite → width_store
- Höhe → height_store
- Zargen → zarge_store
- Einsteckschlösser → schloss_store
- Lüftungsbohrung → lueftung_store
- Bodendichtung → boden_store
- Verglasung → verglasung_store
- Anschlag → anschlag_store
- Ignore anything that does not match a store key.

ALLOWED DOOR_VALUES:
${valuesRef}

RAW INPUT DICTIONARY:
${JSON.stringify(rawDict, null, 2)}

Return ONLY a valid JSON object using STORE KEYS.

Example:
{
  "doorType_store": "Gefalzt",
  "width_store": "985",
  "height_store": "1985"
}
`.trim();

  let raw = "";

  /* ===============================
     CALL GROQ (RETRY LOGIC)
  =============================== */
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  /* ===============================
     PARSE + NORMALIZE
  =============================== */
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    let mapped = JSON.parse(clean);

    // ✅ Convert numeric fields
    if (mapped.width_store) mapped.width_store = Number(mapped.width_store);

    if (mapped.height_store) mapped.height_store = Number(mapped.height_store);

    // ✅ Optional: merge with defaults (safer)
    const final = {
      ...INITIAL_DOOR_STATE,
      ...mapped,
    };

    console.log("[map-door-options] FINAL MAPPED →", final);

    return NextResponse.json({ mapped: final });
  } catch {
    console.error("[map-door-options] Failed to parse Groq response:", raw);
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 },
    );
  }
}
