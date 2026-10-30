export const toolInputLimit = 100_000;
export const toolInputLimitMessage =
  "Use 100,000 UTF-16 code units or fewer. Your previous input has been kept.";

export type ToolResult =
  { success: true; output: string } | { success: false; error: string };

export function isToolInputWithinLimit(input: string): boolean {
  return input.length <= toolInputLimit;
}

export function formatJson(input: string): ToolResult {
  if (!isToolInputWithinLimit(input))
    return { success: false, error: toolInputLimitMessage };
  try {
    return {
      success: true,
      output: JSON.stringify(JSON.parse(input), null, 2),
    };
  } catch {
    return {
      success: false,
      error: "Enter valid JSON. Check double quotes, commas, and brackets.",
    };
  }
}

export function countText(input: string) {
  return {
    words: input.trim() === "" ? 0 : input.trim().split(/\s+/).length,
    characters: Array.from(input).length,
  };
}

export function convertUrlComponent(
  input: string,
  action: "encode" | "decode",
): ToolResult {
  if (!isToolInputWithinLimit(input))
    return { success: false, error: toolInputLimitMessage };
  try {
    return {
      success: true,
      output:
        action === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input),
    };
  } catch {
    return {
      success: false,
      error:
        action === "encode"
          ? "Use valid Unicode text without unpaired surrogate characters."
          : "Enter valid percent-encoded UTF-8 text, such as hello%20world.",
    };
  }
}
