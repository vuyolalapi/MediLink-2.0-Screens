import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { EMTSidebar } from "@/components/EMTSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  User,
  Heart,
  Droplets,
  AlertCircle,
  Navigation,
  CheckCircle,
  Truck,
} from "lucide-react";
import PatientInfoPage from "./PatientInfoPage";
import NavigationPage from "./NavigationPage";
import HospitalCommsPage from "./HospitalCommsPage";
import ReportsPage from "./ReportsPage";

export default function EMTDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <EMTSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName="EMT Unit 5"
          role="Emergency Medical Team"
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => navigate("/")}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route index element={<EMTOverview />} />
            <Route path="patient" element={<PatientInfoPage />} />
            <Route path="navigation" element={<NavigationPage />} />
            <Route path="hospital" element={<HospitalCommsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function EMTOverview() {
  const [activeEmergency, setActiveEmergency] = useState<number | null>(0);

  const emergencies = [
    {
      id: 1,
      patient: "James Williams",
      age: 67,
      location: "123 Main Street, Cape Town",
      type: "Cardiac Emergency",
      time: "10:45 AM",
      priority: "HIGH",
      bloodType: "O+",
      allergies: ["Penicillin"],
      conditions: ["Diabetes", "Hypertension"],
      contact: "(555) 123-4567",
    },
    {
      id: 2,
      patient: "Unknown",
      age: null,
      location: "Highway N1, km 45",
      type: "Vehicle Accident",
      time: "11:02 AM",
      priority: "CRITICAL",
      bloodType: "Unknown",
      allergies: [],
      conditions: [],
      contact: "911 Dispatch",
    },
  ];

  const selectedEmergency = activeEmergency !== null ? emergencies[activeEmergency] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Banner */}
      <div className="bg-urgent/10 border-2 border-urgent rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-urgent animate-pulse" />
          <div>
            <div className="font-bold text-foreground">Active Emergency Calls</div>
            <div className="text-sm text-muted-foreground">{emergencies.length} calls awaiting response</div>
          </div>
        </div>
        <Badge variant="urgent">{emergencies.length} ACTIVE</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Emergency List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-urgent" />
              Emergency Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencies.map((emergency, index) => (
              <div
                key={emergency.id}
                onClick={() => setActiveEmergency(index)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  activeEmergency === index
                    ? "border-urgent bg-urgent/5"
                    : "border-border hover:border-urgent/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={emergency.priority === "CRITICAL" ? "urgent" : "pending"}>
                    {emergency.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{emergency.time}</span>
                </div>
                <div className="font-medium text-foreground">{emergency.patient}</div>
                <div className="text-sm text-muted-foreground">{emergency.type}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <MapPin className="w-3 h-3" />
                  {emergency.location.substring(0, 25)}...
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Details */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Patient Emergency Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {selectedEmergency ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Patient Name</div>
                      <div className="font-bold text-lg text-foreground">{selectedEmergency.patient}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Age</div>
                      <div className="font-medium text-foreground">{selectedEmergency.age ?? "Unknown"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Emergency Type</div>
                      <div className="font-medium text-urgent">{selectedEmergency.type}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-urgent" />
                      <span className="text-sm text-muted-foreground">Blood Type:</span>
                      <span className="font-bold text-foreground">{selectedEmergency.bloodType}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Allergies:</span>
                        <div className="font-medium text-foreground">
                          {selectedEmergency.allergies.length > 0
                            ? selectedEmergency.allergies.join(", ")
                            : "None known"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-accent mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Conditions:</span>
                        <div className="font-medium text-foreground">
                          {selectedEmergency.conditions.length > 0
                            ? selectedEmergency.conditions.join(", ")
                            : "None known"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="font-medium text-foreground">Location</span>
                  </div>
                  <div className="text-sm text-foreground">{selectedEmergency.location}</div>
                </div>

                {/* Response Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Hospital
                  </Button>
                  <Button variant="outline">
                    <Truck className="w-4 h-4 mr-2" />
                    En Route
                  </Button>
                </div>

                {/* Quick Status Updates */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm">Mark "En route"</Button>
                  <Button variant="outline" size="sm">Mark "Patient stabilised"</Button>
                  <Button variant="outline" size="sm">Mark "Transported to hospital"</Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select an emergency to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Communication */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Phone className="w-6 h-6 text-accent" />
              <span>Call Dispatch</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Phone className="w-6 h-6 text-success" />
              <span>Call Hospital</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <User className="w-6 h-6 text-primary" />
              <span>Doctor on Duty</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertCircle className="w-6 h-6 text-warning" />
              <span>Emergency Contact</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
