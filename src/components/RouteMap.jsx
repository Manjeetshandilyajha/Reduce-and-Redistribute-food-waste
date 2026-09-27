import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Truck, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Custom Leaflet Icons
const createCustomIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 11px;
    ">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const kitchenIcon = createCustomIcon('#16a34a', 'Kitchen');
const selectedNgoIcon = createCustomIcon('#f59e0b', 'NGO');
const regularNgoIcon = createCustomIcon('#334155', 'NGO');

// Helper to auto-fit map view bounds
function AutoFitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length >= 2) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [bounds, map]);
  return null;
}

export default function RouteMap({
  kitchenCoords = { lat: 28.5355, lng: 77.2610, name: 'Taj Palace Hotel Kitchen' },
  ngos = [],
  selectedNgo = null,
  onSelectNgo,
  pickupStatus = 'SEARCHING', // 'SEARCHING' | 'ACCEPTED' | 'EN_ROUTE' | 'DELIVERED'
  etaMins = 12,
  distanceKm = 4.2
}) {
  const [mapError, setMapError] = useState(false);

  // Selected NGO coordinates or default
  const selectedNgoCoords = selectedNgo
    ? { lat: kitchenCoords.lat + (selectedNgo.coords.y - 50) * 0.003, lng: kitchenCoords.lng + (selectedNgo.coords.x - 50) * 0.003 }
    : { lat: 28.5580, lng: 77.2790 };

  const routePolyline = [
    [kitchenCoords.lat, kitchenCoords.lng],
    [selectedNgoCoords.lat, selectedNgoCoords.lng]
  ];

  const bounds = [
    [kitchenCoords.lat, kitchenCoords.lng],
    [selectedNgoCoords.lat, selectedNgoCoords.lng]
  ];

  return (
    <div className="w-full space-y-3">
      {/* Map Header Overlay Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-2xl bg-darkbg-800/90 border border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-annagreen-400" />
          <span className="font-bold text-white">Live Route Navigation & Pickup Dispatch</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-300 font-mono">
          <span>Distance: <strong className="text-annagreen-400">{distanceKm} km</strong></span>
          <span>•</span>
          <span>ETA: <strong className="text-saffron-400">{etaMins} mins</strong></span>
        </div>
      </div>

      {/* Main Map Canvas Container */}
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden border border-annagreen-500/30 shadow-2xl bg-darkbg-900">
        
        {!mapError ? (
          <MapContainer
            center={[kitchenCoords.lat, kitchenCoords.lng]}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full z-10"
            style={{ background: '#0b1310' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <AutoFitBounds bounds={bounds} />

            {/* Kitchen Marker */}
            <Marker position={[kitchenCoords.lat, kitchenCoords.lng]} icon={kitchenIcon}>
              <Popup>
                <div className="p-1 text-xs">
                  <strong className="text-emerald-700 font-bold block">{kitchenCoords.name}</strong>
                  <span>Donor Kitchen Hub</span>
                </div>
              </Popup>
            </Marker>

            {/* Matching Radius Ring (5km) */}
            <Circle
              center={[kitchenCoords.lat, kitchenCoords.lng]}
              radius={5000}
              pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.1, weight: 1.5, dashArray: '6, 6' }}
            />

            {/* NGO Markers */}
            {ngos.map((ngo) => {
              const isSelected = selectedNgo && selectedNgo.id === ngo.id;
              const ngoLat = kitchenCoords.lat + (ngo.coords.y - 50) * 0.003;
              const ngoLng = kitchenCoords.lng + (ngo.coords.x - 50) * 0.003;
              return (
                <Marker
                  key={ngo.id}
                  position={[ngoLat, ngoLng]}
                  icon={isSelected ? selectedNgoIcon : regularNgoIcon}
                  eventHandlers={{
                    click: () => onSelectNgo && onSelectNgo(ngo)
                  }}
                >
                  <Popup>
                    <div className="p-1 text-xs">
                      <strong className="text-saffron-700 font-bold block">{ngo.name}</strong>
                      <span>{ngo.distanceKm} km away · Capacity: {ngo.mealCapacity} meals</span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Polyline Route */}
            <Polyline
              positions={routePolyline}
              pathOptions={{ color: '#f59e0b', weight: 4, opacity: 0.8, dashArray: '10, 10' }}
            />
          </MapContainer>
        ) : (
          /* SVG Interactive Radar Fallback */
          <div className="relative w-full h-full bg-darkbg-900 flex items-center justify-center p-4">
            <div className="text-center text-slate-400 text-xs">
              <p>Map loaded in offline vector mode</p>
            </div>
          </div>
        )}

        {/* Live Pickup Status Overlay Ribbon */}
        <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none">
          <div className="bg-darkbg-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 rounded-xl shadow-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-annagreen-500 animate-ping"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {pickupStatus === 'SEARCHING' && 'Searching Nearby Verified NGOs...'}
                {pickupStatus === 'ACCEPTED' && `${selectedNgo?.name || 'Sunrise Foundation'} Accepted Pickup!`}
                {pickupStatus === 'EN_ROUTE' && 'Driver / Volunteer En Route'}
                {pickupStatus === 'DELIVERED' && 'Delivered to Shelter Hub'}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-annagreen-500/20 text-annagreen-300">
              Live Tracker
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
