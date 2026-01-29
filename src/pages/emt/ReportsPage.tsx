import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  FileText,
  Plus,
  Search,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  Download,
  Eye,
  Send,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IncidentReport {
  id: string;
  date: string;
  time: string;
  type: string;
  patient: string;
  location: string;
  status: "Draft" | "Submitted" | "Approved";
  responders: string;
  outcome: string;
}

const reports: IncidentReport[] = [
  { id: "IR-2026-001", date: "Jan 26, 2026", time: "10:45 AM", type: "Cardiac Emergency", patient: "James Williams", location: "123 Main Street", status: "Draft", responders: "EMT Unit 5", outcome: "Transported" },
  { id: "IR-2026-002", date: "Jan 26, 2026", time: "11:02 AM", type: "Vehicle Accident", patient: "Unknown", location: "Highway N1", status: "Draft", responders: "EMT Unit 5", outcome: "In Progress" },
  { id: "IR-2026-003", date: "Jan 25, 2026", time: "09:30 AM", type: "Fall Injury", patient: "Mary Thompson", location: "456 Oak Avenue", status: "Submitted", responders: "EMT Unit 5", outcome: "Transported" },
  { id: "IR-2026-004", date: "Jan 24, 2026", time: "02:15 PM", type: "Respiratory Distress", patient: "Robert Lee", location: "789 Beach Road", status: "Approved", responders: "EMT Unit 5", outcome: "Treated on Scene" },
  { id: "IR-2026-005", date: "Jan 23, 2026", time: "08:00 AM", type: "Allergic Reaction", patient: "Sarah Wilson", location: "321 Park Lane", status: "Approved", responders: "EMT Unit 5", outcome: "Transported" },
];

export default function ReportsPage() {
  const [showNewReport, setShowNewReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Draft":
        return "pending";
      case "Submitted":
        return "active";
      case "Approved":
        return "completed";
      default:
        return "info";
    }
  };

  const filteredReports = reports.filter(
    (r) =>
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-accent" />
            Incident Reports
          </h1>
          <p className="text-muted-foreground">Document and manage emergency incident reports</p>
        </div>
        <Button onClick={() => setShowNewReport(!showNewReport)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{reports.length}</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-warning">{reports.filter((r) => r.status === "Draft").length}</div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </CardContent>
        </Card>
        <Card className="border-accent/30">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-accent">{reports.filter((r) => r.status === "Submitted").length}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="border-success/30">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-success">{reports.filter((r) => r.status === "Approved").length}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
      </div>

      {/* New Report Form */}
      {showNewReport && (
        <Card className="border-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-accent" />
              New Incident Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" defaultValue="2026-01-26" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" defaultValue="10:45" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Incident Type</Label>
                  <Select defaultValue="cardiac">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                      <SelectItem value="trauma">Trauma/Accident</SelectItem>
                      <SelectItem value="respiratory">Respiratory Distress</SelectItem>
                      <SelectItem value="allergic">Allergic Reaction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="Enter incident location" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Incident Description</Label>
                  <Textarea placeholder="Describe the incident..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Treatment Provided</Label>
                  <Textarea placeholder="Describe treatment provided..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Select defaultValue="transported">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transported">Transported to Hospital</SelectItem>
                      <SelectItem value="treated">Treated on Scene</SelectItem>
                      <SelectItem value="refused">Patient Refused Transport</SelectItem>
                      <SelectItem value="deceased">Deceased</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button className="bg-accent text-accent-foreground">
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Recent Reports</CardTitle>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.date} {report.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-warning" />
                      {report.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {report.patient}
                    </div>
                  </TableCell>
                  <TableCell>{report.outcome}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(report.status) as any}>{report.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
