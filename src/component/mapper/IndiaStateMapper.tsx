import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import Spinner from "../spinner/Spinner";

// Dummy data for 20 states of India (latitude and longitude)
const stateLocations = [
  { state: "Andhra Pradesh", lat: 15.9129, lng: 79.74 },
  { state: "Arunachal Pradesh", lat: 27.1, lng: 93.62 },
  { state: "Assam", lat: 26.2, lng: 92.93 },
  { state: "Bihar", lat: 25.09, lng: 85.31 },
  { state: "Chhattisgarh", lat: 21.27, lng: 81.86 },
  { state: "Goa", lat: 15.3, lng: 74.12 },
  { state: "Gujarat", lat: 22.25, lng: 71.19 },
  { state: "Haryana", lat: 29.06, lng: 76.08 },
  { state: "Himachal Pradesh", lat: 31.1, lng: 77.17 },
  { state: "Jharkhand", lat: 23.61, lng: 85.27 },
  { state: "Karnataka", lat: 15.31, lng: 75.71 },
  { state: "Kerala", lat: 10.85, lng: 76.27 },
  { state: "Madhya Pradesh", lat: 22.97, lng: 78.65 },
  { state: "Maharashtra", lat: 19.75, lng: 75.71 },
  { state: "Manipur", lat: 24.66, lng: 93.9 },
  { state: "Meghalaya", lat: 25.46, lng: 91.36 },
  { state: "Mizoram", lat: 23.16, lng: 92.94 },
  { state: "Nagaland", lat: 26.16, lng: 94.56 },
  { state: "Odisha", lat: 20.95, lng: 85.09 },
  { state: "Punjab", lat: 31.14, lng: 75.34 },
];

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const IndiaStateMapper: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsClient(true);
    setIsLoading(true)
    // Load GeoJSON data for Indian states (you can find suitable GeoJSON or use your own)
    fetch("/india-states.geojson") // Replace with your GeoJSON file path
      .then((response) => response.json())
      .then((data) =>{
         setGeoJsonData(data)
         setIsLoading(false)
        });
  }, []);

  if (!isClient || !geoJsonData) {
    return null;
  }

  // Define style for states with device locations
  const geoJsonStyle = (feature: any) => {
    const stateName = feature.properties.NAME_1; // Adjust according to your GeoJSON properties
    const hasDevice = stateLocations.some((location) => location.state === stateName);
    return {
      fillColor: hasDevice ? "green" : "gray",
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
       <Spinner
        text="Loading..."
        closedIn={15000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoJsonData} style={geoJsonStyle} />
      {stateLocations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>{location.state}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IndiaStateMapper;
