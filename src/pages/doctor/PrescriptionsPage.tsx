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
  Pill,
  Search,
  Plus,
  Clock,
  User,
  AlertTriangle,
  Check,
  RefreshCw,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Prescription {
  id: string;
  patient: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: "Active" | "Completed" | "Pending Approval" | "Refill Needed";
  prescribedDate: string;
  refillsRemaining: number;
  interactions?: string;
}

const prescriptions: Prescription[] = [
  { id: "RX001", patient: "John Smith", patientId: "P-2401", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "90 days", status: "Active", prescribedDate: "Jan 10, 2026", refillsRemaining: 2 },
  { id: "RX002", patient: "Mary Johnson", patientId: "P-2402", medication: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days", status: "Pending Approval", prescribedDate: "Jan 25, 2026", refillsRemaining: 3 },
  { id: "RX003", patient: "James Brown", patientId: "P-2405", medication: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "Ongoing", status: "Refill Needed", prescribedDate: "Dec 1, 2025", refillsRemaining: 0, interactions: "Patient has aspirin allergy on file!" },
  { id: "RX004", patient: "Robert Davis", patientId: "P-2403", medication: "Atorvastatin", dosage: "20mg", frequency: "Once daily (evening)", duration: "90 days", status: "Active", prescribedDate: "Jan 5, 2026", refillsRemaining: 2 },
  { id: "RX005", patient: "Sarah Martinez", patientId: "P-2406", medication: "Amiodarone", dosage: "200mg", frequency: "Once daily", duration: "30 days", status: "Active", prescribedDate: "Jan 15, 2026", refillsRemaining: 1 },
  { id: "RX006", patient: "Emily Wilson", patientId: "P-2404", medication: "Omeprazole", dosage: "20mg", frequency: "Once daily (morning)", duration: "14 days", status: "Completed", prescribedDate: "Jan 1, 2026", refillsRemaining: 0 },
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPrescriptions = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "active";
      case "Completed":
        return "completed";
      case "Pending Approval":
        return "pending";
      case "Refill Needed":
        return "urgent";
      default:
        return "scheduled";
    }
  };

  const stats = {
    active: prescriptions.filter((p) => p.status === "Active").length,
    pending: prescriptions.filter((p) => p.status === "Pending Approval").length,
    refillNeeded: prescriptions.filter((p) => p.status === "Refill Needed").length,
    interactions: prescriptions.filter((p) => p.interactions).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Pill className="w-6 h-6 text-accent" />
            Prescriptions
          </h1>
          <p className="text-muted-foreground">Manage patient prescriptions and medication orders</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-accent/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Pill className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">{stats.active}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-urgent/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-urgent" />
              <div>
                <div className="text-2xl font-bold">{stats.refillNeeded}</div>
                <div className="text-sm text-muted-foreground">Refill Needed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-urgent/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-urgent" />
              <div>
                <div className="text-2xl font-bold">{stats.interactions}</div>
                <div className="text-sm text-muted-foreground">Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient or medication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                <SelectItem value="Refill Needed">Refill Needed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Prescriptions ({filteredPrescriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Refills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((rx) => (
                <TableRow key={rx.id} className={rx.interactions ? "bg-urgent/5" : ""}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rx.patient}</div>
                      <div className="text-sm text-muted-foreground">{rx.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rx.medication}</span>
                      {rx.interactions && (
                        <AlertTriangle className="w-4 h-4 text-urgent" />
                      )}
                    </div>
                    {rx.interactions && (
                      <div className="text-xs text-urgent mt-1">{rx.interactions}</div>
                    )}
                  </TableCell>
                  <TableCell>{rx.dosage}</TableCell>
                  <TableCell>
                    <div>
                      <div>{rx.frequency}</div>
                      <div className="text-xs text-muted-foreground">{rx.duration}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(rx.status) as any}>{rx.status}</Badge>
                  </TableCell>
                  <TableCell>{rx.refillsRemaining}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {rx.status === "Pending Approval" && (
                        <Button variant="outline" size="sm" className="text-success">
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {rx.status === "Refill Needed" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
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
