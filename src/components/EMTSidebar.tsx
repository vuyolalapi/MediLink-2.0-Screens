import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  User,
  Navigation,
  Building2,
  FileText,
} from "lucide-react";

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  urgent?: boolean;
}

function SidebarItem({ to, icon: Icon, label, badge, urgent }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
          urgent && "animate-pulse-gentle"
        )
      }
    >
      <Icon className={cn("w-5 h-5", urgent && "text-urgent")} />
      <span className="flex-1 font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full font-bold",
          urgent ? "bg-urgent text-urgent-foreground" : "bg-accent text-accent-foreground"
        )}>
          {badge}
        </span>
      )}
    </NavLink>
  );
}

interface EMTSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EMTSidebar({ isOpen, onClose }: EMTSidebarProps) {
  const navItems: SidebarItemProps[] = [
    { to: "/emt", icon: AlertTriangle, label: "Active Calls", badge: 2, urgent: true },
    { to: "/emt/patient", icon: User, label: "Patient Info" },
    { to: "/emt/navigation", icon: Navigation, label: "Navigation" },
    { to: "/emt/hospital", icon: Building2, label: "Hospital Comms" },
    { to: "/emt/reports", icon: FileText, label: "Incident Reports" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-urgent to-sidebar-primary flex items-center justify-center text-xl font-bold text-sidebar-foreground">
              🚑
            </div>
            <div>
              <span className="font-bold text-lg text-sidebar-foreground">
                MEDI<span className="text-sidebar-primary">LINK</span>
              </span>
              <div className="text-xs text-sidebar-foreground/60">EMT Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </nav>

        {/* Active Unit Status */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-sidebar-foreground/70">Unit Status</span>
              <span className="text-xs text-success font-bold">AVAILABLE</span>
            </div>
            <div className="text-sm text-sidebar-foreground font-medium">
              EMT Unit 5
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
