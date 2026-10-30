"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  convertUrlComponent,
  countText,
  formatJson,
  isToolInputWithinLimit,
  toolInputLimitMessage,
} from "@/lib/browser-tools";
import type { BrowserToolDefinition } from "@/lib/browser-tools-data";

type BrowserToolProps = { tool: BrowserToolDefinition };

export default function BrowserTool({ tool }: BrowserToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const revision = useRef(0);
  const counts = tool.kind === "counter" ? countText(input) : null;
  const descriptionId = `${tool.id}-guidance`;
  const errorId = `${tool.id}-error`;
  const inputId = `${tool.id}-input`;
  const outputId = `${tool.id}-output`;
  const buttonClassName =
    "h-auto min-h-10 max-w-full whitespace-normal break-words";
  const fieldClassName =
    "min-h-44 w-full min-w-0 resize-y rounded-xl border border-input bg-background p-4 font-mono text-base leading-relaxed text-foreground placeholder:text-muted-foreground dark:placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  function handleInput(value: string) {
    revision.current += 1;
    setOutput(null);
    setFeedback("");
    if (!isToolInputWithinLimit(value)) {
      setError(toolInputLimitMessage);
      return;
    }
    setInput(value);
    setError("");
  }

  function handleTransform(action: "format" | "encode" | "decode") {
    revision.current += 1;
    setFeedback("");
    const result =
      action === "format"
        ? formatJson(input)
        : convertUrlComponent(input, action);
    if (!result.success) {
      setError(result.error);
      setOutput(null);
      return;
    }
    setError("");
    setOutput(result.output);
    setFeedback("Result ready.");
  }

  function handleReset() {
    revision.current += 1;
    setInput("");
    setOutput(null);
    setError("");
    setFeedback("");
  }

  async function handleCopy() {
    if (output === null || error) return;
    const currentRevision = revision.current;
    setFeedback("");
    try {
      await navigator.clipboard.writeText(output);
      if (revision.current === currentRevision) setFeedback("Result copied.");
    } catch {
      if (revision.current === currentRevision)
        setFeedback(
          "Copy unavailable. Select the result and use your device’s Copy command.",
        );
    }
  }

  return (
    <section
      id={tool.id}
      aria-labelledby={`${tool.id}-title`}
      className="min-w-0 scroll-mt-32 break-words border-t border-border py-10 sm:py-14"
    >
      <div className="mb-6 max-w-2xl">
        <h2
          id={`${tool.id}-title`}
          className="text-2xl font-semibold sm:text-3xl"
        >
          {tool.title}
        </h2>
        <p
          id={descriptionId}
          className="mt-3 leading-relaxed text-muted-foreground dark:text-foreground"
        >
          {tool.guidance} Limit: 100,000 UTF-16 code units.
        </p>
      </div>
      <div className="min-w-0 space-y-3">
        <Label htmlFor={inputId}>Input for {tool.title}</Label>
        <textarea
          id={inputId}
          value={input}
          onChange={(event) => handleInput(event.target.value)}
          aria-describedby={`${descriptionId}${error ? ` ${errorId}` : ""}`}
          aria-invalid={Boolean(error)}
          placeholder={tool.placeholder}
          spellCheck={false}
          autoComplete="off"
          className={fieldClassName}
        />
        <p
          id={errorId}
          role="alert"
          aria-atomic="true"
          className="text-sm font-medium text-foreground"
        >
          {error}
        </p>
        {counts && (
          <dl className="flex flex-wrap gap-x-10 gap-y-4 py-2">
            <div>
              <dt className="text-sm text-muted-foreground dark:text-foreground">
                Words
              </dt>
              <dd className="font-mono text-3xl tabular-nums">
                {counts.words.toLocaleString("en-US")}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground dark:text-foreground">
                Characters
              </dt>
              <dd className="font-mono text-3xl tabular-nums">
                {counts.characters.toLocaleString("en-US")}
              </dd>
            </div>
          </dl>
        )}
        <div className="flex flex-wrap gap-3">
          {tool.kind === "json" && (
            <Button
              className={buttonClassName}
              type="button"
              onClick={() => handleTransform("format")}
            >
              Format JSON
            </Button>
          )}
          {tool.kind === "url" && (
            <>
              <Button
                className={buttonClassName}
                type="button"
                onClick={() => handleTransform("encode")}
              >
                Encode component
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={cn(buttonClassName, "dark:text-foreground")}
                onClick={() => handleTransform("decode")}
              >
                Decode component
              </Button>
            </>
          )}
          <Button
            className={buttonClassName}
            type="button"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        {tool.kind !== "counter" && (
          <div className="min-w-0 space-y-3 pt-5">
            <Label htmlFor={outputId}>Result for {tool.title}</Label>
            <textarea
              id={outputId}
              value={output ?? ""}
              readOnly
              spellCheck={false}
              autoComplete="off"
              placeholder="Your result will appear here."
              className={fieldClassName}
            />
            <Button
              type="button"
              variant="secondary"
              className={cn(buttonClassName, "dark:text-foreground")}
              disabled={output === null || Boolean(error)}
              onClick={handleCopy}
            >
              Copy result
            </Button>
          </div>
        )}
        <p
          role="status"
          aria-atomic="true"
          className="min-h-6 text-sm text-muted-foreground dark:text-foreground"
        >
          {feedback}
        </p>
      </div>
    </section>
  );
}
