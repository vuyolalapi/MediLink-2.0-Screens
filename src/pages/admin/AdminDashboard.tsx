import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import UsersPage from "./UsersPage";
import HospitalManagementPage from "./HospitalManagementPage";
import ReportsPage from "./ReportsPage";
import SecurityPage from "./SecurityPage";
import EmergencyControlsPage from "./EmergencyControlsPage";
import SettingsPage from "./SettingsPage";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName="Admin User"
          role="Administrator"
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => navigate("/")}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="users/*" element={<UsersPage />} />
            <Route path="hospital/*" element={<HospitalManagementPage />} />
            <Route path="reports/*" element={<ReportsPage />} />
            <Route path="security/*" element={<SecurityPage />} />
            <Route path="emergency" element={<EmergencyControlsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";

function AdminOverview() {
  const recentActivity = [
    { user: "Dr. Sarah Johnson", action: "Logged in", time: "2 min ago", type: "info" },
    { user: "EMT Unit 5", action: "Emergency response completed", time: "15 min ago", type: "success" },
    { user: "Admin", action: "New user account created", time: "1 hour ago", type: "info" },
    { user: "System", action: "Database backup completed", time: "3 hours ago", type: "success" },
    { user: "Dr. Michael Chen", action: "Password reset requested", time: "5 hours ago", type: "warning" },
  ];

  const securityAlerts = [
    { message: "3 failed login attempts detected", severity: "warning" },
    { message: "System update available", severity: "info" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="medical-gradient rounded-lg p-6 border border-accent/30">
        <h1 className="text-2xl font-bold text-foreground mb-2">System Overview</h1>
        <p className="text-muted-foreground">
          Welcome back. Here's an overview of your hospital's staff portal activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={156} label="Total Staff" icon={Users} />
        <StatCard value={42} label="Active Now" icon={UserCheck} variant="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <span className="font-medium text-foreground">{item.user}</span>
                    <span className="text-muted-foreground"> — {item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Add New User
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                View Audit Logs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                System Status
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-urgent" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {securityAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg bg-muted/50"
                  >
                    <AlertTriangle
                      className={`w-4 h-4 mt-0.5 ${
                        alert.severity === "warning" ? "text-warning" : "text-accent"
                      }`}
                    />
                    <span className="text-sm text-foreground">{alert.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Staff Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Staff by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { dept: "Cardiology", count: 24, color: "bg-accent" },
              { dept: "Emergency", count: 32, color: "bg-urgent" },
              { dept: "Pediatrics", count: 18, color: "bg-success" },
              { dept: "Radiology", count: 12, color: "bg-warning" },
              { dept: "Surgery", count: 28, color: "bg-primary" },
              { dept: "Administration", count: 42, color: "bg-muted-foreground" },
            ].map((dept) => (
              <div key={dept.dept} className="text-center p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <div className={`w-3 h-3 rounded-full ${dept.color} mx-auto mb-2`} />
                <div className="text-xl font-bold">{dept.count}</div>
                <div className="text-xs text-muted-foreground">{dept.dept}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
