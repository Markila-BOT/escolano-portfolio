import { cn } from "@/lib/utils";
import type { ChangeEventHandler } from "react";
import { Label } from "@/components/ui/label";

type FieldProps = {
  multiline?: boolean;
  className?: string;
  name: string;
  id: string;
  label: string;
  description: string;
  autoComplete?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "email" | "text";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
};

export function Field({
  multiline = false,
  className,
  type = "text",
  id,
  label,
  description,
  ...props
}: FieldProps) {
  const classes = cn(
    "w-full rounded-lg border border-input bg-background text-foreground transition-all",
    multiline ? "h-52 p-4" : "h-14 px-4",
    className,
  );

  const descriptionId = `${id}-description`;

  return (
    <div className="space-y-2 text-left">
      <Label htmlFor={id}>
        {label}
        {props.required ? " (required)" : ""}
      </Label>
      {multiline ? (
        <textarea
          id={id}
          aria-describedby={descriptionId}
          className={classes}
          {...props}
        />
      ) : (
        <input
          id={id}
          aria-describedby={descriptionId}
          className={classes}
          type={type}
          {...props}
        />
      )}
      <p id={descriptionId} className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
