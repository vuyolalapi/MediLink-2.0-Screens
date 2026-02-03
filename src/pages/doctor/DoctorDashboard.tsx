import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Clock,
  FileText,
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  Calendar,
  Plus,
} from "lucide-react";
import PatientsPage from "./PatientsPage";
import AppointmentsPage from "./AppointmentsPage";
import MedicalRecordsPage from "./MedicalRecordsPage";
import PrescriptionsPage from "./PrescriptionsPage";
import MessagesPage from "./MessagesPage";
import EmergencyAlertsPage from "./EmergencyAlertsPage";

export default function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DoctorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName=""
          role=""
          department=""
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => navigate("/")}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route index element={<DoctorOverview />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="records" element={<MedicalRecordsPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="emergency" element={<EmergencyAlertsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DoctorOverview() {
  const todaySchedule = [
    {
      time: "9:00 AM",
      patient: "John Smith",
      type: "Follow-up Consultation",
      room: "Room 205",
      status: "scheduled" as const,
    },
    {
      time: "10:30 AM",
      patient: "Mary Johnson",
      type: "Emergency Consult",
      room: "ER - Bay 3",
      status: "urgent" as const,
    },
    {
      time: "2:00 PM",
      patient: "Robert Davis",
      type: "Initial Assessment",
      room: "Room 207",
      status: "scheduled" as const,
    },
    {
      time: "3:30 PM",
      patient: "Department Meeting",
      type: "Team Meeting",
      room: "Conference Room A",
      status: "completed" as const,
    },
  ];

  const notifications = [
    "Lab results ready for review",
    "Prescription approval needed",
    "Team meeting at 3:00 PM",
    "New patient referral from Dr. Chen",
    "Medication interaction alert for P-2405",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="medical-gradient rounded-lg p-6 border border-accent/30">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome, Dr. Sarah Johnson
        </h1>
        <p className="text-muted-foreground">
          Cardiology Department • Today: {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={12} label="Today's Patients" icon={Users} />
        <StatCard value={3} label="Pending Tasks" icon={Clock} variant="warning" />
        <StatCard value={7} label="Lab Results" icon={FileText} variant="success" />
        <StatCard value={2} label="Urgent" icon={AlertTriangle} variant="urgent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Today's Schedule
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              View Full Schedule <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3 border-b border-border last:border-0"
                >
                  <Badge variant={item.status}>{item.time}</Badge>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{item.patient}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.type} • {item.room}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Patients
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient Note
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Request Lab Test
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-accent" />
                  Notifications
                </span>
                <span className="text-sm font-normal text-muted-foreground">({notifications.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.slice(0, 4).map((note, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="text-accent mt-1">•</span>
                    {note}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Recent Patients</CardTitle>
          <Button variant="ghost" size="sm" className="text-accent">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "John Smith", id: "P-2401", condition: "Cardiology Follow-up", lastVisit: "Jan 10" },
              { name: "Mary Johnson", id: "P-2402", condition: "Emergency Consult", lastVisit: "Today" },
              { name: "Robert Davis", id: "P-2403", condition: "Initial Assessment", lastVisit: "Jan 5" },
            ].map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
              >
                <div className="font-medium text-foreground">{patient.name}</div>
                <div className="text-xs text-muted-foreground mb-2">ID: {patient.id}</div>
                <div className="text-sm text-accent">{patient.condition}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last Visit: {patient.lastVisit}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
