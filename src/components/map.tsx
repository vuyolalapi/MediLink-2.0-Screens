import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [-26.2041, 28.0473];

// Helper component to set view safely in v4
function SetView({ coords, zoom }: { coords: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

export default function OpenStreetMap() {
  return (
    <MapContainer style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <SetView coords={position} zoom={13} />

      <Marker position={position}>
        <Popup>MediLink Location</Popup>
      </Marker>
    </MapContainer>
  );
}
