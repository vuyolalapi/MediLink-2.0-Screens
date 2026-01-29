import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/Badge";
import {
  FileText,
  Search,
  Plus,
  Upload,
  Download,
  Clock,
  User,
  FlaskConical,
  Pill,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: "diagnosis" | "lab-result" | "prescription" | "note" | "imaging";
  title: string;
  date: string;
  doctor: string;
  status: "complete" | "pending" | "review";
  summary: string;
}

const records: MedicalRecord[] = [
  { id: "R001", patientId: "P-2401", patientName: "John Smith", type: "diagnosis", title: "Cardiac Assessment", date: "Jan 10, 2026", doctor: "Dr. Sarah Johnson", status: "complete", summary: "Patient presents with mild hypertension. ECG shows normal sinus rhythm." },
  { id: "R002", patientId: "P-2402", patientName: "Mary Johnson", type: "lab-result", title: "Blood Panel Results", date: "Jan 25, 2026", doctor: "Lab Tech", status: "review", summary: "Elevated troponin levels detected. Recommend immediate cardiology consult." },
  { id: "R003", patientId: "P-2401", patientName: "John Smith", type: "prescription", title: "Medication Update", date: "Jan 10, 2026", doctor: "Dr. Sarah Johnson", status: "complete", summary: "Prescribed Lisinopril 10mg daily for blood pressure management." },
  { id: "R004", patientId: "P-2403", patientName: "Robert Davis", type: "note", title: "Initial Assessment Notes", date: "Jan 5, 2026", doctor: "Dr. Sarah Johnson", status: "complete", summary: "New patient intake. Referred for cardiac screening due to family history." },
  { id: "R005", patientId: "P-2405", patientName: "James Brown", type: "imaging", title: "Echocardiogram Report", date: "Jan 12, 2026", doctor: "Dr. Sarah Johnson", status: "pending", summary: "Echo completed. Awaiting detailed analysis from imaging department." },
];

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "diagnosis":
        return Stethoscope;
      case "lab-result":
        return FlaskConical;
      case "prescription":
        return Pill;
      case "imaging":
        return FileText;
      default:
        return FileText;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "complete":
        return "completed";
      case "pending":
        return "pending";
      case "review":
        return "urgent";
      default:
        return "scheduled";
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-accent" />
            Medical Records
          </h1>
          <p className="text-muted-foreground">View and manage patient medical records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnoses</TabsTrigger>
            <TabsTrigger value="lab-result">Lab Results</TabsTrigger>
            <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
          </TabsList>
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-0">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Records List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Records ({filteredRecords.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRecords.map((record) => {
                    const TypeIcon = getTypeIcon(record.type);
                    return (
                      <div
                        key={record.id}
                        onClick={() => setSelectedRecord(record)}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedRecord?.id === record.id
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-accent/20">
                            <TypeIcon className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{record.title}</span>
                              <Badge variant={getStatusVariant(record.status) as any}>{record.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {record.patientName} ({record.patientId})
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {record.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {record.doctor}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Record Details */}
            <Card>
              <CardHeader>
                <CardTitle>Record Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRecord ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-accent/10 text-center">
                      <div className="font-bold text-lg">{selectedRecord.title}</div>
                      <div className="text-sm text-muted-foreground">{selectedRecord.type}</div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Patient</div>
                        <div className="font-medium">{selectedRecord.patientName}</div>
                        <div className="text-sm text-muted-foreground">{selectedRecord.patientId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Date</div>
                        <div className="font-medium">{selectedRecord.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Recorded By</div>
                        <div className="font-medium">{selectedRecord.doctor}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground mb-2">Summary</div>
                      <p className="text-sm">{selectedRecord.summary}</p>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button className="flex-1">
                        Edit Record
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Select a record to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnosis">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                Showing diagnosis records only
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-result">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                Showing lab result records only
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescription">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                Showing prescription records only
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-accent" />
            Quick Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Patient ID or Name" />
              <Input placeholder="Note Title" />
            </div>
            <Textarea placeholder="Enter your clinical notes here..." rows={4} />
            <div className="flex justify-end">
              <Button>Save Note</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
