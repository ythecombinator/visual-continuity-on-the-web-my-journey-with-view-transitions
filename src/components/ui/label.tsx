import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
