import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  AlertTriangle,
  Search,
  Download,
  Clock,
  User,
  MapPin,
  Monitor,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ip: string;
  status: "Success" | "Failed";
}

interface SecurityAlert {
  id: string;
  type: string;
  severity: "High" | "Medium" | "Low";
  message: string;
  timestamp: string;
  status: "Active" | "Resolved" | "Investigating";
}

const auditLogs: AuditLog[] = [
  { id: "A001", user: "Dr. Sarah Johnson", action: "VIEW", resource: "Patient Record P-2401", timestamp: "Jan 26, 2026 10:45 AM", ip: "192.168.1.105", status: "Success" },
  { id: "A002", user: "Admin User", action: "CREATE", resource: "User Account U006", timestamp: "Jan 26, 2026 10:30 AM", ip: "192.168.1.100", status: "Success" },
  { id: "A003", user: "Unknown", action: "LOGIN", resource: "Admin Portal", timestamp: "Jan 26, 2026 10:15 AM", ip: "45.33.32.156", status: "Failed" },
  { id: "A004", user: "EMT Unit 5", action: "UPDATE", resource: "Emergency Report ER-789", timestamp: "Jan 26, 2026 09:45 AM", ip: "192.168.1.112", status: "Success" },
  { id: "A005", user: "Dr. Michael Chen", action: "EXPORT", resource: "Medical Records", timestamp: "Jan 26, 2026 09:30 AM", ip: "192.168.1.108", status: "Success" },
  { id: "A006", user: "Unknown", action: "LOGIN", resource: "Doctor Portal", timestamp: "Jan 26, 2026 09:00 AM", ip: "45.33.32.156", status: "Failed" },
  { id: "A007", user: "System", action: "BACKUP", resource: "Database", timestamp: "Jan 26, 2026 00:00 AM", ip: "localhost", status: "Success" },
];

const securityAlerts: SecurityAlert[] = [
  { id: "S001", type: "Brute Force Attempt", severity: "High", message: "Multiple failed login attempts from IP 45.33.32.156", timestamp: "10 min ago", status: "Investigating" },
  { id: "S002", type: "Unusual Access Pattern", severity: "Medium", message: "User accessed records outside normal hours", timestamp: "2 hours ago", status: "Active" },
  { id: "S003", type: "System Update", severity: "Low", message: "Security patch available for installation", timestamp: "1 day ago", status: "Active" },
  { id: "S004", type: "Data Export", severity: "Medium", message: "Large data export detected from user Dr. Chen", timestamp: "2 days ago", status: "Resolved" },
];

const accessLogs = [
  { user: "Dr. Sarah Johnson", department: "Cardiology", device: "Desktop - Chrome", location: "Main Building", time: "10:45 AM", status: "Active" },
  { user: "EMT Unit 5", department: "Emergency", device: "Mobile - App", location: "En Route", time: "10:42 AM", status: "Active" },
  { user: "Admin User", department: "Administration", device: "Desktop - Firefox", location: "Admin Office", time: "10:30 AM", status: "Active" },
  { user: "Nurse Williams", department: "Pediatrics", device: "Tablet - Safari", location: "Ward 3", time: "10:15 AM", status: "Idle" },
  { user: "Dr. Michael Chen", department: "Neurology", device: "Desktop - Chrome", location: "Clinic B", time: "09:30 AM", status: "Offline" },
];

export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "High":
        return "urgent";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "info";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Investigating":
        return "warning";
      case "Resolved":
        return "info";
      case "Idle":
        return "pending";
      case "Offline":
        return "pending";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            Security & Compliance
          </h1>
          <p className="text-muted-foreground">Monitor security events, access logs, and compliance status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-success/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="font-bold text-lg">HIPAA Compliant</p>
                <p className="text-sm text-muted-foreground">Last audit: Jan 15, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="font-bold text-lg">POPIA Compliant</p>
                <p className="text-sm text-muted-foreground">Last audit: Jan 15, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="font-bold text-lg">{securityAlerts.filter(a => a.status !== "Resolved").length} Active Alerts</p>
                <p className="text-sm text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="view">VIEW</SelectItem>
                    <SelectItem value="create">CREATE</SelectItem>
                    <SelectItem value="update">UPDATE</SelectItem>
                    <SelectItem value="delete">DELETE</SelectItem>
                    <SelectItem value="login">LOGIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded bg-muted text-xs font-mono">{log.action}</span>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">{log.ip}</TableCell>
                      <TableCell>
                        {log.status === "Success" ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-urgent" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Logs Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-accent" />
                Current Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">{log.user}</div>
                        <div className="text-sm text-muted-foreground">{log.department}</div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Monitor className="w-4 h-4" />
                        {log.device}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {log.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {log.time}
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(log.status) as any}>{log.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.severity === "High" ? "border-l-urgent" :
                alert.severity === "Medium" ? "border-l-warning" : "border-l-accent"
              }`}>
                <CardContent className="pt-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.severity === "High" ? "text-urgent" :
                        alert.severity === "Medium" ? "text-warning" : "text-accent"
                      }`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">{alert.type}</span>
                          <Badge variant={getSeverityVariant(alert.severity) as any}>{alert.severity}</Badge>
                        </div>
                        <p className="text-muted-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(alert.status) as any}>{alert.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
