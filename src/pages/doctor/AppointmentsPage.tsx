import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  patientId: string;
  type: "consultation" | "follow-up" | "emergency" | "telemedicine";
  time: string;
  duration: string;
  room: string;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  notes?: string;
}

const appointments: Record<string, Appointment[]> = {
  "2026-01-26": [
    { id: "A001", patient: "John Smith", patientId: "P-2401", type: "follow-up", time: "09:00 AM", duration: "30 min", room: "Room 205", status: "completed" },
    { id: "A002", patient: "Mary Johnson", patientId: "P-2402", type: "emergency", time: "10:30 AM", duration: "45 min", room: "ER - Bay 3", status: "in-progress" },
    { id: "A003", patient: "Robert Davis", patientId: "P-2403", type: "consultation", time: "02:00 PM", duration: "30 min", room: "Room 207", status: "scheduled" },
    { id: "A004", patient: "Emily Wilson", patientId: "P-2404", type: "telemedicine", time: "03:30 PM", duration: "20 min", room: "Virtual", status: "scheduled" },
    { id: "A005", patient: "James Brown", patientId: "P-2405", type: "follow-up", time: "04:30 PM", duration: "30 min", room: "Room 205", status: "scheduled" },
  ],
  "2026-01-27": [
    { id: "A006", patient: "Sarah Martinez", patientId: "P-2406", type: "consultation", time: "09:30 AM", duration: "45 min", room: "Room 210", status: "scheduled" },
    { id: "A007", patient: "Michael Lee", patientId: "P-2407", type: "follow-up", time: "11:00 AM", duration: "30 min", room: "Room 205", status: "scheduled" },
  ],
};

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState("2026-01-26");
  const todayAppointments = appointments[selectedDate] || [];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-urgent/20 text-urgent";
      case "telemedicine":
        return "bg-accent/20 text-accent";
      case "follow-up":
        return "bg-success/20 text-success";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "completed";
      case "in-progress":
        return "active";
      case "cancelled":
        return "urgent";
      default:
        return "scheduled";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent" />
            Appointments
          </h1>
          <p className="text-muted-foreground">Manage your daily schedule and patient appointments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>January 2026</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="py-2 text-muted-foreground font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const dateStr = `2026-01-${day.toString().padStart(2, "0")}`;
                const hasAppointments = appointments[dateStr]?.length > 0;
                const isSelected = selectedDate === dateStr;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-lg text-sm relative hover:bg-accent/20 transition-colors ${
                      isSelected ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    {day}
                    {hasAppointments && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-urgent" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Schedule for {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-lg border ${
                      apt.status === "in-progress" ? "border-accent bg-accent/5" : "border-border"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="text-center">
                          <div className="font-bold text-lg">{apt.time}</div>
                          <div className="text-xs text-muted-foreground">{apt.duration}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{apt.patient}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${getTypeColor(apt.type)}`}>
                              {apt.type}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">ID: {apt.patientId}</div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              {apt.type === "telemedicine" ? (
                                <Video className="w-3 h-3" />
                              ) : (
                                <MapPin className="w-3 h-3" />
                              )}
                              {apt.room}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(apt.status) as any}>{apt.status}</Badge>
                        {apt.status === "scheduled" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {apt.status === "in-progress" && (
                          <Button size="sm" className="bg-accent text-accent-foreground">
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No appointments scheduled for this day
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
              <div key={day} className="text-center p-4 rounded-lg border border-border">
                <div className="font-medium text-muted-foreground mb-2">{day}</div>
                <div className="text-2xl font-bold">{Math.floor(Math.random() * 6) + 2}</div>
                <div className="text-xs text-muted-foreground">appointments</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
