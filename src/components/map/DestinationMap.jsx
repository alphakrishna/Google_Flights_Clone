import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const cities = [
  { name: "New York", coords: [40.7128, -74.0060] },
  { name: "Delhi", coords: [28.7041, 77.1025] },
  { name: "London", coords: [51.5074, -0.1278] },
];

export const DestinationMap = ({ onCitySelect }) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: '100%', height: '300px', borderRadius: 20 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={city.coords}
          eventHandlers={{
            click: () => onCitySelect(city.name),
          }}
        >
          <Popup>{city.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
