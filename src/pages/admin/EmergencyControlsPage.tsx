import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import {
  AlertTriangle,
  Radio,
  Users,
  Truck,
  Phone,
  MapPin,
  Clock,
  Settings,
  Bell,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const emtUnits = [
  { id: "EMT-01", name: "Unit 1", status: "Available", location: "Station A", lastCall: "2 hours ago" },
  { id: "EMT-02", name: "Unit 2", status: "On Call", location: "Highway N1", lastCall: "In progress" },
  { id: "EMT-03", name: "Unit 3", status: "Available", location: "Station B", lastCall: "4 hours ago" },
  { id: "EMT-04", name: "Unit 4", status: "Maintenance", location: "Garage", lastCall: "1 day ago" },
  { id: "EMT-05", name: "Unit 5", status: "On Call", location: "Cape Town CBD", lastCall: "In progress" },
  { id: "EMT-06", name: "Unit 6", status: "Available", location: "Station C", lastCall: "30 min ago" },
];

const recentIncidents = [
  { id: "INC-001", type: "Cardiac Emergency", location: "123 Main Street", time: "10:45 AM", unit: "Unit 5", status: "In Progress" },
  { id: "INC-002", type: "Vehicle Accident", location: "Highway N1, km 45", time: "11:02 AM", unit: "Unit 2", status: "In Progress" },
  { id: "INC-003", type: "Fall Injury", location: "456 Oak Avenue", time: "09:30 AM", unit: "Unit 1", status: "Completed" },
  { id: "INC-004", type: "Respiratory Distress", location: "789 Beach Road", time: "08:15 AM", unit: "Unit 3", status: "Completed" },
];

export default function EmergencyControlsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "success";
      case "On Call":
        return "urgent";
      case "Maintenance":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-urgent" />
            Emergency Controls
          </h1>
          <p className="text-muted-foreground">Manage EMT teams, emergency workflows, and incident tracking</p>
        </div>
        <Button className="bg-urgent hover:bg-urgent/90 text-urgent-foreground">
          <Bell className="w-4 h-4 mr-2" />
          Broadcast Emergency Alert
        </Button>
      </div>

      {/* Emergency Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-success/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{emtUnits.filter(u => u.status === "Available").length}</div>
                <div className="text-xs text-muted-foreground">Available Units</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-urgent/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-urgent/20">
                <Truck className="w-5 h-5 text-urgent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{emtUnits.filter(u => u.status === "On Call").length}</div>
                <div className="text-xs text-muted-foreground">On Call</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recentIncidents.filter(i => i.status === "In Progress").length}</div>
                <div className="text-xs text-muted-foreground">Active Incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-accent/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{emtUnits.length}</div>
                <div className="text-xs text-muted-foreground">Total Units</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* EMT Units */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" />
              EMT Units Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {emtUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-accent" />
                      <span className="font-bold">{unit.name}</span>
                    </div>
                    <Badge variant={getStatusColor(unit.status) as any}>{unit.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {unit.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Last call: {unit.lastCall}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Radio className="w-3 h-3 mr-1" />
                      Dispatch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Workflow Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              Workflow Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Auto-Dispatch</Label>
                <p className="text-sm text-muted-foreground">Automatically assign nearest unit</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Hospital Pre-Alert</Label>
                <p className="text-sm text-muted-foreground">Notify hospital before arrival</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">GPS Tracking</Label>
                <p className="text-sm text-muted-foreground">Real-time unit tracking</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Escalation Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert supervisors after 10 min</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Mass Casualty Mode</Label>
                <p className="text-sm text-muted-foreground">Activate emergency protocols</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-urgent" />
            Recent Emergency Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border ${
                  incident.status === "In Progress" ? "border-urgent/50 bg-urgent/5" : "border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    incident.status === "In Progress" ? "bg-urgent/20" : "bg-muted"
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      incident.status === "In Progress" ? "text-urgent" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <div className="font-bold">{incident.type}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {incident.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        {incident.unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <Badge variant={incident.status === "In Progress" ? "urgent" : "success"}>
                    {incident.status}
                  </Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
