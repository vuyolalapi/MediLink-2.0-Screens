import  Logo  from "/public/Medilogo.png";
import { Button } from "./ui/button";
import { LogOut, Bell, Menu } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  role: string;
  department?: string;
  onMenuClick?: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ userName, role, department, onMenuClick, onLogout }: DashboardHeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="header-gradient text-primary-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-0,5">
            <div className="w-10 h-10 rounded-full from-primary-foreground/20 to-accent flex items-center justify-center text-xl font-bold">
              
             <img
    src={Logo}
    alt="MediLink Logo"
    className="w-10 h-10 rounded-full object-contain"
  />

            </div>
            <span className="font-bold text-xl hidden sm:block">
              MEDI<span className="text-accent">LINK</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-primary-foreground/80">
              {role} {department && `• ${department}`}
            </div>
          </div>

          <div className="hidden sm:block text-xs text-primary-foreground/80">
            {today}
          </div>

          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-urgent rounded-full" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
