'use client';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer} from "react-leaflet";

const Map = () => {
  const position = [51.505, -0.09]
  return (
    <MapContainer style={{ height: "100%", width: "100%", borderRadius: "10px"}} center={position} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
  );
};

export default Map;

