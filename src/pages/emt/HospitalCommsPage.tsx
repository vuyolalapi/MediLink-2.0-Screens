import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/Badge";
import {
  Building2,
  Phone,
  MessageSquare,
  Clock,
  User,
  Stethoscope,
  Bed,
  Send,
  AlertTriangle,
} from "lucide-react";

interface HospitalContact {
  id: string;
  hospital: string;
  department: string;
  contact: string;
  status: "Available" | "Busy" | "Offline";
  lastContact?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

const hospitalContacts: HospitalContact[] = [
  { id: "HC001", hospital: "MEDILINK General", department: "ER Reception", contact: "(021) 555-0100", status: "Available" },
  { id: "HC002", hospital: "MEDILINK General", department: "Trauma Unit", contact: "(021) 555-0101", status: "Available" },
  { id: "HC003", hospital: "MEDILINK General", department: "Cardiology On-Call", contact: "(021) 555-0102", status: "Busy" },
  { id: "HC004", hospital: "City Central", department: "ER Reception", contact: "(021) 555-0200", status: "Available" },
  { id: "HC005", hospital: "City Central", department: "ICU", contact: "(021) 555-0201", status: "Available" },
  { id: "HC006", hospital: "St. Mary's Medical", department: "ER Reception", contact: "(021) 555-0300", status: "Offline" },
];

const messageHistory: Message[] = [
  { id: "M001", sender: "ER Reception", content: "EMT Unit 5, we are preparing Bay 3 for your incoming patient.", time: "10:42 AM", isMe: false },
  { id: "M002", sender: "You", content: "Copy. Patient is 67-year-old male, suspected cardiac emergency. ETA 5 minutes.", time: "10:43 AM", isMe: true },
  { id: "M003", sender: "ER Reception", content: "Understood. Cardiology team has been alerted and will be standing by.", time: "10:44 AM", isMe: false },
  { id: "M004", sender: "You", content: "Patient vitals: BP 160/95, HR 110, O2 sat 94%. Started oxygen therapy.", time: "10:45 AM", isMe: true },
];

export default function HospitalCommsPage() {
  const [selectedContact, setSelectedContact] = useState<HospitalContact | null>(hospitalContacts[0]);
  const [newMessage, setNewMessage] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "success";
      case "Busy":
        return "warning";
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
            <Building2 className="w-6 h-6 text-accent" />
            Hospital Communications
          </h1>
          <p className="text-muted-foreground">Direct communication with hospital departments</p>
        </div>
      </div>

      {/* Pre-Alert Banner */}
      <Card className="border-urgent/50 bg-urgent/10">
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-urgent" />
              <div>
                <div className="font-bold">Pre-Alert System</div>
                <div className="text-sm text-muted-foreground">Notify hospital before patient arrival</div>
              </div>
            </div>
            <Button className="bg-urgent text-urgent-foreground hover:bg-urgent/90">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Send Pre-Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Hospital Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hospitalContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{contact.department}</div>
                      <div className="text-sm text-muted-foreground">{contact.hospital}</div>
                    </div>
                    <Badge variant={getStatusColor(contact.status) as any}>{contact.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {contact.contact}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Panel */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b border-border">
            {selectedContact ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">{selectedContact.department}</div>
                    <div className="text-sm text-muted-foreground">{selectedContact.hospital}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            ) : (
              <CardTitle>Select a contact</CardTitle>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col pt-4">
            {selectedContact ? (
              <>
                {/* Messages */}
                <div className="flex-1 space-y-4 mb-4 max-h-[300px] overflow-auto">
                  {messageHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.isMe
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{msg.content}</div>
                        <div className={`text-xs mt-1 ${msg.isMe ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px]"
                    rows={2}
                  />
                  <Button className="bg-accent text-accent-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Messages */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm">ETA Update</Button>
                  <Button variant="outline" size="sm">Patient Vitals</Button>
                  <Button variant="outline" size="sm">Request Specialist</Button>
                  <Button variant="outline" size="sm">Confirm Arrival</Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a contact to start communication
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Dial */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Dial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Stethoscope className="w-6 h-6 text-accent" />
              <span>Doctor On-Call</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Bed className="w-6 h-6 text-primary" />
              <span>Bed Management</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <User className="w-6 h-6 text-success" />
              <span>Dispatch Center</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <MessageSquare className="w-6 h-6 text-warning" />
              <span>Supervisor</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
