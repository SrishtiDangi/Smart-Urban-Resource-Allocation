import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CityMap.css';
import L from 'leaflet';

// Fix for default Leaflet icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom colored icons for bins
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const redIcon = createCustomIcon('red');
const yellowIcon = createCustomIcon('gold');
const greenIcon = createCustomIcon('green');

const CityMap = () => {
  // Mock data for Delhi wards (latitude, longitude)
  const center = [28.6139, 77.2090]; // New Delhi center

  // Hardcoded bins for visual demo
  const bins = [
    { id: "BIN-001", position: [28.6239, 77.2190], status: "Red", fill: 92 },
    { id: "BIN-002", position: [28.6150, 77.2000], status: "Yellow", fill: 65 },
    { id: "BIN-003", position: [28.6000, 77.2250], status: "Green", fill: 20 },
    { id: "BIN-004", position: [28.6300, 77.1950], status: "Red", fill: 95 },
    { id: "BIN-005", position: [28.6100, 77.2300], status: "Green", fill: 10 },
  ];

  // Hardcoded optimized truck route (connects Depot to BIN-001 and BIN-004)
  const truckRoute = [
    [28.6139, 77.2090], // Depot (Center)
    [28.6239, 77.2190], // BIN-001
    [28.6300, 77.1950], // BIN-004
    [28.6139, 77.2090], // Back to Depot
  ];

  const getIconForStatus = (status) => {
    switch (status) {
      case 'Red': return redIcon;
      case 'Yellow': return yellowIcon;
      default: return greenIcon;
    }
  };

  return (
    <div className="city-map-container">
      <h3>City Waste Map & Optimized Routes</h3>
      <div className="map-wrapper">
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%', borderRadius: '12px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {bins.map((bin) => (
            <Marker key={bin.id} position={bin.position} icon={getIconForStatus(bin.status)}>
              <Popup>
                <strong>{bin.id}</strong><br />
                Fill Level: {bin.fill}%<br />
                Status: {bin.status}
              </Popup>
            </Marker>
          ))}

          {/* Draw the optimized route for Truck 1 */}
          <Polyline positions={truckRoute} color="#1890ff" weight={4} dashArray="10, 10">
            <Popup>Optimized Route: Truck 1</Popup>
          </Polyline>

        </MapContainer>
      </div>
    </div>
  );
};

export default CityMap;
