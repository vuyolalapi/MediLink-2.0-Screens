import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import {
  Building2,
  Settings,
  Link2,
  Plus,
  Edit,
  Users,
  Bed,
  Activity,
  Database,
  Cloud,
  Stethoscope,
  Pill,
  FlaskConical,
  CreditCard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Department {
  id: string;
  name: string;
  head: string;
  staff: number;
  beds: number;
  occupancy: number;
  status: "Active" | "Limited" | "Full";
}

const departments: Department[] = [
  { id: "D001", name: "Emergency", head: "Dr. James Wilson", staff: 32, beds: 20, occupancy: 85, status: "Active" },
  { id: "D002", name: "Cardiology", head: "Dr. Sarah Johnson", staff: 24, beds: 30, occupancy: 70, status: "Active" },
  { id: "D003", name: "Neurology", head: "Dr. Michael Chen", staff: 18, beds: 25, occupancy: 60, status: "Active" },
  { id: "D004", name: "Pediatrics", head: "Dr. Emily Brown", staff: 22, beds: 40, occupancy: 45, status: "Active" },
  { id: "D005", name: "Surgery", head: "Dr. Robert Taylor", staff: 28, beds: 35, occupancy: 90, status: "Limited" },
  { id: "D006", name: "Radiology", head: "Dr. Lisa Anderson", staff: 12, beds: 0, occupancy: 0, status: "Active" },
  { id: "D007", name: "ICU", head: "Dr. David Martinez", staff: 20, beds: 15, occupancy: 100, status: "Full" },
];

const integrations = [
  { name: "Laboratory System", icon: FlaskConical, status: "Connected", lastSync: "2 min ago" },
  { name: "Pharmacy System", icon: Pill, status: "Connected", lastSync: "5 min ago" },
  { name: "Billing System", icon: CreditCard, status: "Connected", lastSync: "10 min ago" },
  { name: "External Specialists", icon: Stethoscope, status: "Pending", lastSync: "Never" },

];

export default function HospitalManagementPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Limited":
        return "warning";
      case "Full":
        return "urgent";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-accent" />
            Hospital Management
          </h1>
          <p className="text-muted-foreground">Manage departments, system settings, and integrations</p>
        </div>
      </div>

      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Hospital Departments</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="hover:border-accent/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <Badge variant={getStatusVariant(dept.status) as any}>{dept.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <div>
                        <div className="text-sm font-medium">{dept.staff}</div>
                        <div className="text-xs text-muted-foreground">Staff</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{dept.beds}</div>
                        <div className="text-xs text-muted-foreground">Beds</div>
                      </div>
                    </div>
                  </div>
                  {dept.beds > 0 && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Occupancy</span>
                        <span className="font-medium">{dept.occupancy}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dept.occupancy >= 90 ? "bg-urgent" : dept.occupancy >= 70 ? "bg-warning" : "bg-success"
                          }`}
                          style={{ width: `${dept.occupancy}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Automatic Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out inactive users after 30 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email alerts for critical system events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable maintenance mode for system updates</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Daily automatic database backups at midnight</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">HIPAA Compliance Mode</Label>
                    <p className="text-sm text-muted-foreground">Enhanced security and audit logging for HIPAA compliance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="font-medium">Database</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Operational - 99.9% uptime</p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="font-medium">API Services</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All endpoints responding</p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="font-medium">Storage</span>
                  </div>
                  <p className="text-sm text-muted-foreground">45% used (550GB free)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">External Integrations</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Link2 className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.name} className="hover:border-accent/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/20">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{integration.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${
                            integration.status === "Connected" ? "bg-success" : "bg-warning"
                          }`} />
                          <span className={`text-sm ${
                            integration.status === "Connected" ? "text-success" : "text-warning"
                          }`}>
                            {integration.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Last sync: {integration.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Activity className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
