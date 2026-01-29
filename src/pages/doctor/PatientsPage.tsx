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
  Users,
  Search,
  Filter,
  Eye,
  FileText,
  Calendar,
  Heart,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
  status: "Active" | "Discharged" | "Critical" | "Follow-up";
}

const patients: Patient[] = [
  { id: "P-2401", name: "John Smith", age: 45, gender: "Male", condition: "Cardiac Follow-up", bloodType: "O+", allergies: ["Penicillin"], chronicConditions: ["Hypertension"], lastVisit: "Jan 10, 2026", status: "Active" },
  { id: "P-2402", name: "Mary Johnson", age: 62, gender: "Female", condition: "Emergency Consult", bloodType: "A-", allergies: [], chronicConditions: ["Diabetes"], lastVisit: "Today", status: "Critical" },
  { id: "P-2403", name: "Robert Davis", age: 38, gender: "Male", condition: "Initial Assessment", bloodType: "B+", allergies: ["Sulfa"], chronicConditions: [], lastVisit: "Jan 5, 2026", status: "Active" },
  { id: "P-2404", name: "Emily Wilson", age: 29, gender: "Female", condition: "Post-Surgery", bloodType: "AB+", allergies: [], chronicConditions: [], lastVisit: "Jan 8, 2026", status: "Discharged" },
  { id: "P-2405", name: "James Brown", age: 71, gender: "Male", condition: "Cardiac Monitoring", bloodType: "O-", allergies: ["Aspirin", "Ibuprofen"], chronicConditions: ["Heart Disease", "Hypertension"], lastVisit: "Jan 12, 2026", status: "Follow-up" },
  { id: "P-2406", name: "Sarah Martinez", age: 55, gender: "Female", condition: "Arrhythmia Treatment", bloodType: "A+", allergies: [], chronicConditions: ["Arrhythmia"], lastVisit: "Jan 15, 2026", status: "Active" },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "active";
      case "Critical":
        return "urgent";
      case "Discharged":
        return "completed";
      case "Follow-up":
        return "scheduled";
      default:
        return "pending";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" />
            My Patients
          </h1>
          <p className="text-muted-foreground">View and manage your assigned patients</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Discharged">Discharged</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patients Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient List ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className={`cursor-pointer ${selectedPatient?.id === patient.id ? "bg-accent/10" : ""}`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {patient.id} • {patient.age}y • {patient.gender}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell className="text-muted-foreground">{patient.lastVisit}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(patient.status) as any}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Patient Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-border">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-2xl mb-2">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div className="font-bold text-lg">{selectedPatient.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedPatient.id}</div>
                  <Badge variant={getStatusVariant(selectedPatient.status) as any} className="mt-2">
                    {selectedPatient.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">{selectedPatient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="font-medium">{selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blood Type</span>
                    <span className="font-medium text-urgent">{selectedPatient.bloodType}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="font-medium">Allergies</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPatient.allergies.length > 0 ? (
                      selectedPatient.allergies.map((allergy) => (
                        <span key={allergy} className="px-2 py-1 bg-warning/20 text-warning text-xs rounded">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">None known</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="font-medium">Chronic Conditions</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPatient.chronicConditions.length > 0 ? (
                      selectedPatient.chronicConditions.map((condition) => (
                        <span key={condition} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                          {condition}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Records
                  </Button>
                  <Button className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a patient to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
