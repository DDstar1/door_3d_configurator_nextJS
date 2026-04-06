// ── The mapper ─────────────────────────────────────────────────────────────
export async function mapDoorOptions(
  rawDict: Record<string, string | null>,
): Promise<Record<string, string | null>> {
  try {
    const response = await fetch("/api/map-door-options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ options: rawDict }),
    });

    if (!response.ok) {
      console.error("[mapDoorOptions] API error:", response.status);
      return {};
    }

    const data = await response.json();
    console.log("[mapDoorOptions] mapped →", data.mapped);
    return data.mapped ?? {};
  } catch (err) {
    console.error("[mapDoorOptions] fetch failed:", err);
    return {};
  }
}
