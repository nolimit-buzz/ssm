import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Battery, 
  Navigation2, 
  Sun, 
  Moon, 
  ChevronDown, 
  Crosshair, 
  Zap,
  Info,
  Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Marker Icon
const customIcon = new L.DivIcon({
  html: `<div class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-emerald-500/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12V22L22 10H13V2Z" />
          </svg>
        </div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Nigeria Geo Data Mapping
const NIGERIA_GEO_DATA: Record<string, string[]> = {
  "Lagos": ["Ikeja", "Victoria Island", "Lekki Phase 1", "Surulere", "Ikorodu", "Yaba", "Apapa", "Epe"],
  "Abuja (FCT)": ["Garki", "Wuse", "Maitama", "Gwarinpa", "Asokoro", "Jabi"],
  "Rivers": ["Port Harcourt City", "Obio-Akpor", "Eleme", "Oyigbo"],
  "Kano": ["Kano Municipal", "Tarauni", "Nassarawa"],
  "Oyo": ["Ibadan North", "Ibadan South West", "Oluyole"],
  "Delta": ["Warri South", "Asaba", "Uvwie"]
};

// Mock Station Data
const MOCK_STATIONS = [
  { id: 1, name: "Ikeja Tech Hub Station", state: "Lagos", lga: "Ikeja", lat: 6.5965, lng: 3.3366, address: "Innovation Way, Ikeja", available: 12, total: 16, type: "Solar-Hybrid" },
  { id: 2, name: "VI Waterfront Depot", state: "Lagos", lga: "Victoria Island", lat: 6.4281, lng: 3.4219, address: "Adetokunbo Ademola St, VI", available: 8, total: 24, type: "Grid-Primary" },
  { id: 3, name: "Lekki Circle Hub", state: "Lagos", lga: "Lekki Phase 1", lat: 6.4478, lng: 3.4737, address: "Lekki Expressway, Phase 1", available: 15, total: 15, type: "Solar-Hybrid" },
  { id: 4, name: "Garki Power Station", state: "Abuja (FCT)", lga: "Garki", lat: 9.0350, lng: 7.4833, address: "Area 11, Garki", available: 6, total: 12, type: "Smart-Grid" },
  { id: 5, name: "Maitama Premium Swap", state: "Abuja (FCT)", lga: "Maitama", lat: 9.0833, lng: 7.5000, address: "Mississippi St, Maitama", available: 18, total: 20, type: "Solar-Hybrid" },
  { id: 6, name: "PH City Center Depot", state: "Rivers", lga: "Port Harcourt City", lat: 4.7774, lng: 7.0134, address: "Aba Road, PH", available: 4, total: 12, type: "Grid-Primary" }
];

// Helper to center map
function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

interface LocatorPageProps {
  onNavigate: (page: any) => void;
}

const LocatorPage: React.FC<LocatorPageProps> = ({ onNavigate }) => {
  const [mapTheme, setMapTheme] = useState<'dark' | 'light'>('dark');
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLga, setSelectedLga] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([9.0820, 8.6753]); // Nigeria Center
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStations = useMemo(() => {
    return MOCK_STATIONS.filter(s => {
      const matchState = !selectedState || s.state === selectedState;
      const matchLga = !selectedLga || s.lga === selectedLga;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchLga && matchSearch;
    });
  }, [selectedState, selectedLga, searchQuery]);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      }, (err) => {
        console.error("Geolocation error:", err);
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 bg-[#020617]">
      {/* Sidebar Filter */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full lg:w-[400px] bg-slate-950/80 backdrop-blur-2xl border-r border-white/5 p-8 overflow-y-auto z-20 flex flex-col"
      >
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Station Finder</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Live Status</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search stations or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
              />
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select State</label>
              <div className="relative">
                <select 
                  value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setSelectedLga(""); }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white appearance-none focus:outline-none focus:border-emerald-500 transition-all font-medium cursor-pointer"
                >
                  <option value="" className="bg-slate-900">All Nigeria</option>
                  {Object.keys(NIGERIA_GEO_DATA).map(state => (
                    <option key={state} value={state} className="bg-slate-900">{state}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* LGA Filter */}
            <div className={`space-y-2 transition-opacity ${!selectedState ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Local Government Area</label>
              <div className="relative">
                <select 
                  value={selectedLga}
                  onChange={(e) => setSelectedLga(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white appearance-none focus:outline-none focus:border-emerald-500 transition-all font-medium cursor-pointer"
                >
                  <option value="" className="bg-slate-900">All LGAs</option>
                  {selectedState && NIGERIA_GEO_DATA[selectedState].map(lga => (
                    <option key={lga} value={lga} className="bg-slate-900">{lga}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <button 
              onClick={handleUseMyLocation}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
            >
              <Crosshair className="w-4 h-4" />
              Use My Location
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Available Hubs ({filteredStations.length})
            </h3>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence>
              {filteredStations.map((s) => (
                <motion.div 
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setMapCenter([s.lat, s.lng])}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white text-base tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">{s.name}</h4>
                    <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded-lg">
                      <Battery className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-500">{s.available}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">{s.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">{s.type}</span>
                    <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                      Directions <Navigation2 className="w-3 h-3 fill-emerald-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Map Area */}
      <div className="flex-grow relative h-full">
        {/* Map Theme Toggle */}
        <div className="absolute top-6 right-6 z-[1000] flex gap-2 p-1.5 bg-slate-900/90 backdrop-blur shadow-2xl rounded-[15rem] border border-white/10">
          <button 
            onClick={() => setMapTheme('dark')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${mapTheme === 'dark' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Moon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setMapTheme('light')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${mapTheme === 'light' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Sun className="w-5 h-5" />
          </button>
        </div>

        <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} className="h-full w-full">
          <RecenterMap coords={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={mapTheme === 'dark' 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
          />
          {filteredStations.map((station) => (
            <Marker 
              key={station.id} 
              position={[station.lat, station.lng]} 
              icon={customIcon}
            >
              <Popup closeButton={false} minWidth={260}>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-white tracking-tight leading-none">{station.name}</h4>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">{station.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                      </div>
                      <div className="text-xl font-black text-white">{station.available} <span className="text-[10px] text-slate-500">/ {station.total}</span></div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                      </div>
                      <div className="text-sm font-black text-emerald-400">OPEN 24/7</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{station.address}</p>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-[15rem] font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
                    Start Navigation
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocatorPage;