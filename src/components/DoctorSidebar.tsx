import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "/public/Medilogo.png";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

function SidebarItem({ to, icon: Icon, label, badge }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="bg-urgent text-urgent-foreground text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

interface DoctorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
  const navItems: SidebarItemProps[] = [
    { to: "/doctor", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/doctor/patients", icon: Users, label: "My Patients" },
    { to: "/doctor/appointments", icon: Calendar, label: "Appointments", badge: 3 },
    { to: "/doctor/records", icon: FileText, label: "Medical Records" },
    { to: "/doctor/prescriptions", icon: Pill, label: "Prescriptions" },
    { to: "/doctor/messages", icon: MessageSquare, label: "Messages", badge: 5 },
    { to: "/doctor/emergency", icon: AlertTriangle, label: "Emergency Alerts", badge: 2 },
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
            <div className="w-10 h-10 rounded-full from-sidebar-foreground/20 to-sidebar-primary flex items-center justify-center text-xl font-bold text-sidebar-foreground">
              
             <img
    src={Logo}
    alt="MediLink Logo"
    className="w-10 h-10 rounded-full object-contain"
  />

            </div>
            <div>
              <span className="font-bold text-lg text-sidebar-foreground">
                MEDI<span className="text-sidebar-primary">LINK</span>
              </span>
              <div className="text-xs text-sidebar-foreground/60">Doctor Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/50 text-center">
            © 2026 MEDILINK
          </div>
        </div>
      </aside>
    </>
  );
}
