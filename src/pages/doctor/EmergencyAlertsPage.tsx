import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import {
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Phone,
  Heart,
  Droplets,
  Eye,
  Bell,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EmergencyAlert {
  id: string;
  patient: string;
  patientId: string;
  age: number;
  type: string;
  location: string;
  time: string;
  status: "Active" | "Acknowledged" | "Resolved";
  bloodType: string;
  allergies: string[];
  conditions: string[];
  assignedUnit?: string;
}

const alerts: EmergencyAlert[] = [
  {
    id: "E001",
    patient: "Mary Johnson",
    patientId: "P-2402",
    age: 62,
    type: "Cardiac Arrest",
    location: "ER - Bay 3",
    time: "5 min ago",
    status: "Active",
    bloodType: "A-",
    allergies: [],
    conditions: ["Diabetes", "Hypertension"],
    assignedUnit: "EMT Unit 5",
  },
  {
    id: "E002",
    patient: "James Brown",
    patientId: "P-2405",
    age: 71,
    type: "Respiratory Distress",
    location: "Ward 4 - Room 412",
    time: "15 min ago",
    status: "Acknowledged",
    bloodType: "O-",
    allergies: ["Aspirin", "Ibuprofen"],
    conditions: ["Heart Disease", "COPD"],
  },
];

const recentResolved = [
  { patient: "Robert Wilson", type: "Syncope", resolvedTime: "2 hours ago", outcome: "Stabilized" },
  { patient: "Lisa Anderson", type: "Allergic Reaction", resolvedTime: "4 hours ago", outcome: "Discharged" },
  { patient: "Michael Chen", type: "Chest Pain", resolvedTime: "Yesterday", outcome: "Admitted" },
];

export default function EmergencyAlertsPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "urgent";
      case "Acknowledged":
        return "pending";
      case "Resolved":
        return "completed";
      default:
        return "scheduled";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-urgent" />
            Emergency Alerts
            <Badge variant="urgent">{alerts.filter((a) => a.status === "Active").length} Active</Badge>
          </h1>
          <p className="text-muted-foreground">Monitor and respond to emergency patient alerts</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-2 ${
              alert.status === "Active" ? "border-urgent bg-urgent/5" : "border-warning bg-warning/5"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${alert.status === "Active" ? "bg-urgent/20" : "bg-warning/20"}`}>
                      <AlertTriangle className={`w-6 h-6 ${alert.status === "Active" ? "text-urgent animate-pulse" : "text-warning"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{alert.patient}</span>
                        <Badge variant={getStatusVariant(alert.status) as any}>{alert.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {alert.patientId} • {alert.age} years old
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-urgent font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        {alert.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {alert.time}
                      </div>
                      {alert.assignedUnit && (
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <User className="w-4 h-4" />
                          {alert.assignedUnit} responding
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-urgent" />
                        <span className="text-sm">Blood Type:</span>
                        <span className="font-bold text-urgent">{alert.bloodType}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                        <div>
                          <span className="text-sm">Allergies:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert.allergies.length > 0 ? (
                              alert.allergies.map((a) => (
                                <span key={a} className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded">
                                  {a}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">None known</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-accent mt-0.5" />
                        <div>
                          <span className="text-sm">Conditions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert.conditions.map((c) => (
                              <span key={c} className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[150px]">
                  {alert.status === "Active" && (
                    <Button className="bg-urgent hover:bg-urgent/90 text-urgent-foreground">
                      Acknowledge
                    </Button>
                  )}
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Records
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Resolved */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResolved.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="font-medium">{item.patient}</div>
                    <div className="text-sm text-muted-foreground">{item.type}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="completed">{item.outcome}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{item.resolvedTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              Alert Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Cardiac Emergencies</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for cardiac events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Respiratory Emergencies</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for respiratory events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">My Patients Only</Label>
                <p className="text-sm text-muted-foreground">Only receive alerts for assigned patients</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound for critical alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
