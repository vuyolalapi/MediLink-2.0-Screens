import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/Badge";
import {
  MessageSquare,
  Search,
  Send,
  User,
  Users,
  Clock,
  Paperclip,
  Star,
  MoreVertical,
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  fromRole: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  starred: boolean;
  type: "patient" | "colleague" | "system";
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

const messages: Message[] = [
  { id: "M001", from: "John Smith", fromRole: "Patient", subject: "Follow-up Question", preview: "Doctor, I wanted to ask about my medication...", timestamp: "10:30 AM", unread: true, starred: false, type: "patient" },
  { id: "M002", from: "Dr. Michael Chen", fromRole: "Neurology", subject: "Consultation Request", preview: "I have a patient I'd like to refer for cardiac...", timestamp: "9:45 AM", unread: true, starred: true, type: "colleague" },
  { id: "M003", from: "Mary Johnson", fromRole: "Patient", subject: "Appointment Reschedule", preview: "I need to reschedule my appointment tomorrow...", timestamp: "Yesterday", unread: false, starred: false, type: "patient" },
  { id: "M004", from: "Lab Department", fromRole: "System", subject: "Lab Results Ready", preview: "Lab results for patient P-2402 are now available...", timestamp: "Yesterday", unread: true, starred: false, type: "system" },
  { id: "M005", from: "Dr. Emily Brown", fromRole: "Pediatrics", subject: "Case Discussion", preview: "Would you be available for a quick consult on...", timestamp: "2 days ago", unread: false, starred: true, type: "colleague" },
  { id: "M006", from: "James Brown", fromRole: "Patient", subject: "Medication Side Effects", preview: "I've been experiencing some dizziness after...", timestamp: "2 days ago", unread: false, starred: false, type: "patient" },
];

const chatHistory: ChatMessage[] = [
  { id: "C001", sender: "John Smith", content: "Doctor, I wanted to ask about my medication. I've been taking Lisinopril for a week now.", time: "10:25 AM", isMe: false },
  { id: "C002", sender: "You", content: "Hello John, how are you feeling? Any side effects from the medication?", time: "10:28 AM", isMe: true },
  { id: "C003", sender: "John Smith", content: "I've been feeling a bit dizzy in the mornings. Is that normal?", time: "10:30 AM", isMe: false },
];

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
  const [newMessage, setNewMessage] = useState("");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "patient":
        return "bg-accent/20 text-accent";
      case "colleague":
        return "bg-primary/20 text-primary";
      case "system":
        return "bg-warning/20 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            Messages
            {unreadCount > 0 && (
              <Badge variant="urgent">{unreadCount} new</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Communicate with patients and colleagues</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Message List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-2">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id
                      ? "bg-accent/10 border border-accent"
                      : msg.unread
                      ? "bg-muted/50 hover:bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        {msg.type === "patient" ? (
                          <User className="w-4 h-4 text-accent" />
                        ) : msg.type === "colleague" ? (
                          <Users className="w-4 h-4 text-primary" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${msg.unread ? "text-foreground" : "text-muted-foreground"}`}>
                          {msg.from}
                        </div>
                        <div className="text-xs text-muted-foreground">{msg.fromRole}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {msg.starred && <Star className="w-3 h-3 text-warning fill-warning" />}
                      {msg.unread && <span className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                  </div>
                  <div className={`text-sm mt-2 ${msg.unread ? "font-medium" : ""}`}>{msg.subject}</div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">{msg.preview}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Clock className="w-3 h-3" />
                    {msg.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail / Chat */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedMessage ? (
            <>
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedMessage.from}</div>
                      <div className="text-sm text-muted-foreground">{selectedMessage.subject}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(selectedMessage.type)}`}>
                      {selectedMessage.type}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Star className={`w-4 h-4 ${selectedMessage.starred ? "text-warning fill-warning" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex ${chat.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          chat.isMe
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{chat.content}</div>
                        <div className={`text-xs mt-1 ${chat.isMe ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                          {chat.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[40px] max-h-[120px]"
                    rows={1}
                  />
                  <Button className="bg-accent text-accent-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a message to view
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
