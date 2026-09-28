import { cn } from "@/lib/utils";

type FieldProps = {
  multiline?: boolean;
  className?: string;
  name: string;
  type?: "email" | "text";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
};

export function Field({
  multiline = false,
  className,
  type = "text",
  ...props
}: FieldProps) {
  const classes = cn(
    "w-full rounded-lg border border-input bg-background text-foreground transition-all",
    multiline ? "h-52 p-4" : "h-14 px-4",
    className,
  );

  if (multiline) {
    return <textarea className={classes} {...props} />;
  }

  return <input className={classes} type={type} {...props} />;
}
