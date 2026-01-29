import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "urgent" | "scheduled" | "completed" | "pending" | "active" | "success" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const variantClasses = {
    urgent: "bg-urgent/10 text-urgent",
    scheduled: "bg-primary/10 text-primary",
    completed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    active: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-accent/10 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-bold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
