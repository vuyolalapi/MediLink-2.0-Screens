import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/Badge";
import {
  User,
  Search,
  Phone,
  MapPin,
  Heart,
  Droplets,
  AlertTriangle,
  Calendar,
  FileText,
  Pill,
} from "lucide-react";

interface EmergencyPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  emergencyContacts: { name: string; relation: string; phone: string }[];
  address: string;
  lastIncident?: string;
}

const patients: EmergencyPatient[] = [
  {
    id: "P-2401",
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin"],
    chronicConditions: ["Hypertension"],
    medications: ["Lisinopril 10mg"],
    emergencyContacts: [
      { name: "Jane Smith", relation: "Spouse", phone: "(555) 123-4567" },
      { name: "Mike Smith", relation: "Son", phone: "(555) 234-5678" },
    ],
    address: "123 Main Street, Cape Town",
    lastIncident: "Jan 10, 2026 - Chest Pain",
  },
  {
    id: "P-2402",
    name: "Mary Johnson",
    age: 62,
    gender: "Female",
    bloodType: "A-",
    allergies: [],
    chronicConditions: ["Diabetes", "Hypertension"],
    medications: ["Metformin 500mg", "Amlodipine 5mg"],
    emergencyContacts: [
      { name: "Robert Johnson", relation: "Husband", phone: "(555) 345-6789" },
    ],
    address: "456 Oak Avenue, Cape Town",
    lastIncident: "Jan 25, 2026 - Cardiac Emergency",
  },
  {
    id: "P-2405",
    name: "James Brown",
    age: 71,
    gender: "Male",
    bloodType: "O-",
    allergies: ["Aspirin", "Ibuprofen"],
    chronicConditions: ["Heart Disease", "COPD", "Hypertension"],
    medications: ["Amiodarone 200mg", "Warfarin 5mg", "Furosemide 40mg"],
    emergencyContacts: [
      { name: "Sarah Brown", relation: "Daughter", phone: "(555) 456-7890" },
      { name: "Tom Brown", relation: "Son", phone: "(555) 567-8901" },
    ],
    address: "789 Beach Road, Cape Town",
    lastIncident: "Jan 20, 2026 - Respiratory Distress",
  },
];

export default function PatientInfoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<EmergencyPatient | null>(patients[0]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <User className="w-6 h-6 text-accent" />
            Patient Emergency Info
          </h1>
          <p className="text-muted-foreground">Quick access to critical patient information</p>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="border-accent/30">
        <CardContent className="pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search patient by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {patient.id} • {patient.age}y • {patient.gender}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-urgent">{patient.bloodType}</div>
                      {patient.allergies.length > 0 && (
                        <AlertTriangle className="w-4 h-4 text-warning ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Emergency Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                    <div className="text-muted-foreground">
                      {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.gender}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-urgent/10 rounded-lg border border-urgent/30">
                    <Droplets className="w-6 h-6 text-urgent mx-auto mb-1" />
                    <div className="text-2xl font-bold text-urgent">{selectedPatient.bloodType}</div>
                    <div className="text-xs text-muted-foreground">Blood Type</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Critical Info */}
                  <div className="space-y-4">
                    {/* Allergies */}
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="font-bold text-warning">ALLERGIES</span>
                      </div>
                      {selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.allergies.map((allergy) => (
                            <span key={allergy} className="px-3 py-1 bg-warning/20 text-warning rounded-full font-medium">
                              {allergy}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No known allergies</span>
                      )}
                    </div>

                    {/* Chronic Conditions */}
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-accent" />
                        <span className="font-bold">Chronic Conditions</span>
                      </div>
                      {selectedPatient.chronicConditions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.chronicConditions.map((condition) => (
                            <span key={condition} className="px-3 py-1 bg-accent/20 text-accent rounded-full">
                              {condition}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </div>

                    {/* Current Medications */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-5 h-5 text-primary" />
                        <span className="font-bold">Current Medications</span>
                      </div>
                      <div className="space-y-1">
                        {selectedPatient.medications.map((med) => (
                          <div key={med} className="text-sm">{med}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-accent" />
                        <span className="font-bold">Address</span>
                      </div>
                      <div className="text-sm">{selectedPatient.address}</div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="w-5 h-5 text-success" />
                        <span className="font-bold">Emergency Contacts</span>
                      </div>
                      <div className="space-y-3">
                        {selectedPatient.emergencyContacts.map((contact, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-muted-foreground">{contact.relation}</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Phone className="w-3 h-3 mr-1" />
                              {contact.phone}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Last Incident */}
                    {selectedPatient.lastIncident && (
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <span className="font-bold">Last Incident</span>
                        </div>
                        <div className="text-sm">{selectedPatient.lastIncident}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Select a patient to view emergency profile
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
