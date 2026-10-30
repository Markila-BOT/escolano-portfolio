export const browserTools = [
  {
    id: "json-formatter",
    kind: "json",
    title: "JSON formatter",
    summary: "Turn compact JSON into readable, indented text.",
    guidance:
      "Paste standard JSON, then choose Format JSON. Uses two-space indentation and JavaScript number precision; duplicate keys keep their last value. Not a lossless converter.",
    placeholder: '{"name":"Mark","active":true}',
  },
  {
    id: "text-counter",
    kind: "counter",
    title: "Word & character counter",
    summary: "Check the length of a draft as you write.",
    guidance:
      "Words are nonempty sequences separated by Unicode whitespace. Characters are Unicode code points, including spaces and line breaks. Combining marks count separately.",
    placeholder: "Write or paste your text here…",
  },
  {
    id: "url-converter",
    kind: "url",
    title: "URL encoder / decoder",
    summary: "Encode or decode a single URL component.",
    guidance:
      "Uses encodeURIComponent and decodeURIComponent, not full-URL parsing. Spaces encode as %20; decoding keeps literal plus signs. Example: hello%20world.",
    placeholder: "hello world, or hello%20world",
  },
] as const;

export type BrowserToolDefinition = (typeof browserTools)[number];

export const browserToolsIdentity = {
  title: "Browser Tools | Mark Escolano",
  description:
    "Format JSON, count words and characters, and encode URL components with small tools that process your text locally in your browser.",
} as const;
