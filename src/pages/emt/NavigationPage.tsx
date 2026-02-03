import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import MiniMap from "../../components/map"
import {
  Navigation,
  MapPin,
  Clock,
  Phone,
  Building2,
  AlertTriangle,
  Compass,
  ArrowRight,
  LocateFixed,
} from "lucide-react";

interface Destination {
  id: string;
  name: string;
  type: "patient" | "hospital";
  address: string;
  distance: string;
  eta: string;
  priority?: "HIGH" | "CRITICAL";
}

const activeNavigation: Destination = {
  id: "NAV001",
  name: "123 Main Street",
  type: "patient",
  address: "123 Main Street, Cape Town CBD",
  distance: "2.4 km",
  eta: "5 min",
  priority: "HIGH",
};

const nearbyHospitals = [
  { id: "H001", name: "MEDILINK General Hospital", address: "456 Hospital Drive", distance: "1.2 km", eta: "3 min", beds: 12, er: "Available" },
  { id: "H002", name: "City Central Hospital", address: "789 Medical Way", distance: "3.5 km", eta: "8 min", beds: 5, er: "Busy" },
  { id: "H003", name: "St. Mary's Medical Center", address: "321 Health Street", distance: "5.1 km", eta: "12 min", beds: 8, er: "Available" },
  { id: "H004", name: "University Hospital", address: "555 Academic Blvd", distance: "6.8 km", eta: "15 min", beds: 20, er: "Available" },
];

export default function NavigationPage() {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Navigation className="w-6 h-6 text-accent" />
            Navigation
          </h1>
          <p className="text-muted-foreground">GPS navigation and hospital routing</p>
        </div>
        <Button className="bg-accent text-accent-foreground">
          <LocateFixed className="w-4 h-4 mr-2" />
          My Location
        </Button>
      </div>

      {/* Active Navigation */}
      <Card className="border-2 border-urgent bg-urgent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-urgent animate-pulse" />
            Active Navigation
            <Badge variant="urgent">{activeNavigation.priority}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-urgent/20">
                <MapPin className="w-8 h-8 text-urgent" />
              </div>
              <div>
                <div className="text-xl font-bold">{activeNavigation.name}</div>
                <div className="text-muted-foreground">{activeNavigation.address}</div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-accent">
                    <ArrowRight className="w-4 h-4" />
                    <span className="font-medium">{activeNavigation.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">ETA: {activeNavigation.eta}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Patient
              </Button>
              <Button size="lg" className="bg-urgent text-urgent-foreground hover:bg-urgent/90">
                <Navigation className="w-5 h-5 mr-2" />
                Start Navigation
              </Button>
            </div>
          </div>

          {/* Mini Map Placeholder */}
         <MiniMap />

        </CardContent>
      </Card>

      {/* Nearby Hospitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Nearby Hospitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {nearbyHospitals.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedHospital === hospital.id
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold">{hospital.name}</div>
                    <div className="text-sm text-muted-foreground">{hospital.address}</div>
                  </div>
                  <Badge variant={hospital.er === "Available" ? "success" : "warning"}>
                    ER: {hospital.er}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {hospital.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {hospital.eta}
                    </span>
                  </div>
                  <span className="text-accent font-medium">{hospital.beds} beds available</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Navigation className="w-3 h-3 mr-1" />
                    Navigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Building2 className="w-6 h-6 text-accent" />
              <span>Nearest Hospital</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertTriangle className="w-6 h-6 text-urgent" />
              <span>Trauma Center</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <LocateFixed className="w-6 h-6 text-success" />
              <span>Share Location</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Phone className="w-6 h-6 text-primary" />
              <span>Call Dispatch</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
