import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 text-xl",
    lg: "w-14 h-14 text-3xl",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-[0,5px]", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-primary-foreground font-bold",
          sizeClasses[size]
        )}
      >
        <img src="/Medilogo.png"
        alt="Medilink logo"
          className ="logo-img"
          style={{marginBottom:1}}>
       </img>

      </div>
      <span className={cn("font-bold text-foreground", textSizes[size])}>
        MEDI<span className="text-accent">LINK</span>
      </span>
    </div>
  );
}
