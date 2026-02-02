import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import logo from "/public/Medilogo.png"
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Shield,
  Settings,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  children?: { to: string; label: string }[];
}

function SidebarItem({ to, icon: Icon, label, children }: SidebarItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(
    children?.some((child) => location.pathname === child.to) ?? false
  );
  const hasChildren = children && children.length > 0;
  const isActive = location.pathname === to || children?.some((c) => location.pathname === c.to);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="flex-1 text-left">{label}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                  )
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {child.label}
              </NavLink>

            ))}
          </div>
        )}
      </div>
    );
  }

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
      <span>{label}</span>
    </NavLink>
  );
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const navItems: SidebarItemProps[] = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview" },
    {
      to: "/admin/users",
      icon: Users,
      label: "Users & Roles",
    
    },
    {
      to: "/admin/hospital",
      icon: Building2,
      label: "Hospital Management",
      children: [
        { to: "/admin/hospital/departments", label: "Departments" },
        { to: "/admin/hospital/settings", label: "System Settings" },
        { to: "/admin/hospital/integrations", label: "Integrations" },
      ],
    },

     { to: "/admin/appointments", 
      icon: Calendar, 
      label: "Appointments" },

    {
      to: "/admin/reports",
      icon: BarChart3,
      label: "Reports & Analytics",
      children: [
        { to: "/admin/reports", label: "Usage Reports" },
        { to: "/admin/reports/medical", label: "Medical Stats" },
        { to: "/admin/reports/emergency", label: "Emergency Metrics" },
      ],
      
    },
    {
      to: "/admin/security",
      icon: Shield,
      label: "Security & Compliance",
      children: [
        { to: "/admin/security", label: "Audit Logs" },
        { to: "/admin/security/access", label: "Access Logs" },
        { to: "/admin/security/alerts", label: "Security Alerts" },
      ],
    },
    { to: "/admin/emergency", icon: AlertTriangle, label: "Emergency Controls" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
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
    src={logo}
    alt="MediLink Logo"
    className="w-10 h-10 rounded-full object-contain"
  />

            </div>
            <div>
              <span className="font-bold text-lg text-sidebar-foreground">
                MEDI<span className="text-sidebar-primary">LINK</span>
              </span>
              <div className="text-xs text-sidebar-foreground/60">Admin Portal</div>
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
