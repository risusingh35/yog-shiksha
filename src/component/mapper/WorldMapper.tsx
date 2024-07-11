import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";

// Dummy data for 25 countries
const deviceLocations = [
    { country: "India", lat: 20.5937, lng: 78.9629 },
    { country: "Japan", lat: 35.6762, lng: 139.6503 },
    { country: "Fiji", lat: -17.7134, lng: 178.065 },
    { country: "USA", lat: 37.0902, lng: -95.7129 },
    { country: "Brazil", lat: -14.235, lng: -51.9253 },
    { country: "Australia", lat: -25.2744, lng: 133.7751 },
    { country: "Canada", lat: 56.1304, lng: -106.3468 },
    { country: "Germany", lat: 51.1657, lng: 10.4515 },
    { country: "France", lat: 46.6034, lng: 1.8883 },
    { country: "UK", lat: 55.3781, lng: -3.436 },
    { country: "Russia", lat: 61.524, lng: 105.3188 },
    { country: "China", lat: 35.8617, lng: 104.1954 },
    { country: "South Africa", lat: -30.5595, lng: 22.9375 },
    { country: "Mexico", lat: 23.6345, lng: -102.5528 },
    { country: "Argentina", lat: -38.4161, lng: -63.6167 },
    { country: "Italy", lat: 41.8719, lng: 12.5674 },
    { country: "Spain", lat: 40.4637, lng: -3.7492 },
    { country: "Nigeria", lat: 9.082, lng: 8.6753 },
    { country: "Egypt", lat: 26.8206, lng: 30.8025 },
    { country: "Turkey", lat: 38.9637, lng: 35.2433 },
    { country: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
    { country: "South Korea", lat: 35.9078, lng: 127.7669 },
    { country: "Indonesia", lat: -0.7893, lng: 113.9213 },
    { country: "New Zealand", lat: -40.9006, lng: 174.886 },
    { country: "Norway", lat: 60.472, lng: 8.4689 },
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

const WorldMapper: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);

    // Load GeoJSON data for countries (you can replace this with your own GeoJSON data)
    fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  if (!isClient || !geoJsonData) {
    return null;
  }

  // Define style for regions with devices
  const geoJsonStyle = (feature: any) => {
    const hasDevice = deviceLocations.some((location) => location.country === feature.properties.ADMIN);
    return {
      fillColor: hasDevice ? "blue" : "gray",
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoJsonData} style={geoJsonStyle} />
      {deviceLocations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>{location.country}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMapper;
