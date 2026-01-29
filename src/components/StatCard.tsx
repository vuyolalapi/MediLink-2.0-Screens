import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "urgent" | "success" | "warning";
  className?: string;
}

export function StatCard({ value, label, icon: Icon, variant = "default", className }: StatCardProps) {
  const variantClasses = {
    default: "border-accent/30 hover:border-accent",
    urgent: "border-urgent/30 hover:border-urgent",
    success: "border-success/30 hover:border-success",
    warning: "border-warning/30 hover:border-warning",
  };

  const iconColors = {
    default: "text-accent",
    urgent: "text-urgent",
    success: "text-success",
    warning: "text-warning",
  };

  return (
    <div
      className={cn(
        "bg-card border rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        variantClasses[variant],
        className
      )}
    >
      {Icon && <Icon className={cn("w-6 h-6 mx-auto mb-2", iconColors[variant])} />}
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
