import type { PreparedTextWithSegments } from "@chenglou/pretext";

type TextEngine = Pick<
  typeof import("@chenglou/pretext"),
  "prepareWithSegments" | "layoutWithLines"
>;
export type ParagraphMetrics = {
  font: string;
  letterSpacing: number;
  lineHeight: number;
  generation: number;
};

export function createParagraphLayout(engine: TextEngine, limit = 64) {
  const cache = new Map<string, PreparedTextWithSegments>();

  return (text: string, width: number, metrics: ParagraphMetrics) => {
    if (width <= 0 || !Number.isFinite(width)) return null;
    const key = JSON.stringify([
      text,
      metrics.font,
      metrics.letterSpacing,
      metrics.generation,
    ]);
    let prepared = cache.get(key);
    if (!prepared) {
      prepared = engine.prepareWithSegments(text, metrics.font, {
        letterSpacing: metrics.letterSpacing,
      });
      cache.set(key, prepared);
      if (cache.size > limit) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) cache.delete(oldest);
      }
    }
    const result = engine.layoutWithLines(prepared, width, metrics.lineHeight);
    const lines: string[] = [];
    let cursor = 0;
    for (const line of result.lines) {
      const start = text.indexOf(line.text, cursor);
      if (!line.text || start < cursor || text.slice(cursor, start).trim())
        return null;
      if (lines.length) lines[lines.length - 1] += text.slice(cursor, start);
      else if (start !== 0) return null;
      lines.push(line.text);
      cursor = start + line.text.length;
    }
    if (!lines.length || text.slice(cursor).trim()) return null;
    lines[lines.length - 1] += text.slice(cursor);
    if (lines.join("") !== text) return null;
    return { lines, height: result.height };
  };
}

let enginePromise:
  Promise<ReturnType<typeof createParagraphLayout>> | undefined;

export function loadParagraphLayout() {
  enginePromise ??= import("@chenglou/pretext")
    .then(createParagraphLayout)
    .catch((error: unknown) => {
      enginePromise = undefined;
      throw error;
    });
  return enginePromise;
}
