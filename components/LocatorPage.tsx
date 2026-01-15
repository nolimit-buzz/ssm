
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Clock,
  Loader2,
  Share2,
  Info,
  RotateCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Marker Icon
const customIcon = new L.DivIcon({
  html: `<div class="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl shadow-emerald-900/40 transform transition-transform hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12V22L22 10H13V2Z" />
          </svg>
        </div>`,
  className: 'custom-marker',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

// Nigeria Bounds to restrict map view
const NIGERIA_BOUNDS: L.LatLngBoundsExpression = [
  [4.0, 2.5],   // Southwest coordinates
  [14.0, 15.0]  // Northeast coordinates
];

const NIGERIA_GEO_DATA: Record<string, string[]> = {
  "Lagos": ["Ikeja", "Victoria Island", "Lekki Phase 1", "Surulere", "Ikorodu", "Yaba", "Apapa", "Epe"],
  "Abuja (FCT)": ["Garki", "Wuse", "Maitama", "Gwarinpa", "Asokoro", "Jabi"],
  "Rivers": ["Port Harcourt City", "Obio-Akpor", "Eleme", "Oyigbo"],
  "Kano": ["Kano Municipal", "Tarauni", "Nassarawa"],
  "Oyo": ["Ibadan North", "Ibadan South West", "Oluyole"],
  "Delta": ["Warri South", "Asaba", "Uvwie"]
};

const MOCK_STATIONS = [
  { id: 1, name: "Ikeja Tech Hub Station", state: "Lagos", lga: "Ikeja", lat: 6.5965, lng: 3.3366, address: "Innovation Way, Ikeja", available: 12, total: 16, type: "Solar-Hybrid" },
  { id: 2, name: "VI Waterfront Depot", state: "Lagos", lga: "Victoria Island", lat: 6.4281, lng: 3.4219, address: "Adetokunbo Ademola St, VI", available: 8, total: 24, type: "Grid-Primary" },
  { id: 3, name: "Lekki Circle Hub", state: "Lagos", lga: "Lekki Phase 1", lat: 6.4478, lng: 3.4737, address: "Lekki Expressway, Phase 1", available: 15, total: 15, type: "Solar-Hybrid" },
  { id: 4, name: "Garki Power Station", state: "Abuja (FCT)", lga: "Garki", lat: 9.0350, lng: 7.4833, address: "Area 11, Garki", available: 6, total: 12, type: "Smart-Grid" },
  { id: 5, name: "Maitama Premium Swap", state: "Abuja (FCT)", lga: "Maitama", lat: 9.0833, lng: 7.5000, address: "Mississippi St, Maitama", available: 18, total: 20, type: "Solar-Hybrid" },
  { id: 6, name: "PH City Center Depot", state: "Rivers", lga: "Port Harcourt City", lat: 4.7774, lng: 7.0134, address: "Aba Road, PH", available: 4, total: 12, type: "Grid-Primary" }
];

// --- Map Controller Component ---
// This component sits inside MapContainer to access the map instance via hook
// It handles:
// 1. Reporting the map instance back to the parent
// 2. Automatically fixing layout glitches on mount (invalidateSize)
// 3. Handling programmatic recentering based on props
const MapController = ({ 
  setMapInstance, 
  center, 
  zoom 
}: { 
  setMapInstance: (map: L.Map) => void,
  center: [number, number],
  zoom: number
}) => {
  const map = useMap();
  const isMounted = useRef(false);

  useEffect(() => {
    setMapInstance(map);
    
    // CRITICAL FIX: Leaflet maps often render partially if the container size isn't static on init.
    // We force a size invalidation after a short delay to ensure the container DOM is settled.
    const fixLayout = () => {
      map.invalidateSize();
    };

    // Immediate fix
    fixLayout();
    
    // Delayed fix for animations
    const timer1 = setTimeout(fixLayout, 100);
    const timer2 = setTimeout(fixLayout, 500); // Backup for slower transitions

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map, setMapInstance]);

  // Handle View Updates
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    map.setView(center, zoom, {
      animate: true,
      duration: 1.2
    });
  }, [center, zoom, map]);

  return null;
};

interface LocatorPageProps {
  onNavigate: (page: any) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const LocatorPage: React.FC<LocatorPageProps> = ({ onNavigate, isDarkMode, onToggleTheme }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLga, setSelectedLga] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([9.0820, 8.6753]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapLoading, setIsMapLoading] = useState(true);
  
  // State to hold the Leaflet Map Instance
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  
  // Store references to markers to open popups programmatically
  const markerRefs = useRef<Record<number, L.Marker | null>>({});

  useEffect(() => {
    // Reset loading state when theme changes
    setIsMapLoading(true);
    
    // Safety fallback: if tiles never load (e.g. offline), remove loader after 5s
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Memoize event handlers to avoid re-renders
  const tileLayerHandlers = useMemo(() => ({
    load: () => {
      // Tiles are completely loaded. 
      setTimeout(() => setIsMapLoading(false), 1200); 
    }
  }), []);

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
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          setMapZoom(13);
        },
        (err) => {
          console.error(`Geolocation error: ${err.message} (Code: ${err.code})`);
          if (err.code === 1) {
            console.warn("User denied geolocation permission.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleStationClick = (station: typeof MOCK_STATIONS[0]) => {
    setMapCenter([station.lat, station.lng]);
    setMapZoom(14); 
    
    // Access marker and open popup
    const marker = markerRefs.current[station.id];
    if (marker) {
      marker.openPopup();
    }
  };

  const resetMap = () => {
    if (mapInstance) {
      // 1. Force the map to recalculate its container size (Fixes the grey tile glitch)
      mapInstance.invalidateSize();
      
      // 2. Reset view state
      setMapCenter([9.0820, 8.6753]);
      setMapZoom(6);
      
      // 3. Clear filters
      setSelectedState("");
      setSelectedLga("");
      setSearchQuery("");
    }
  };

  // --- PREMIUM STYLING SYSTEM ---
  const pageBg = isDarkMode ? "bg-[#020617]" : "bg-slate-50";
  
  // Sidebar
  const sidebarClasses = isDarkMode 
    ? "bg-[#0B0E14] border-r border-white/5 shadow-[4px_0_24px_rgba(0,0,0,0.4)]" 
    : "bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.05)]";

  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-slate-500" : "text-slate-400";
  
  // Inputs
  const inputClasses = isDarkMode 
    ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:bg-white/10" 
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-sm";

  // Cards
  const cardClasses = isDarkMode 
    ? "bg-[#111620] border-white/5 hover:border-emerald-500/50 hover:bg-[#161b26]" 
    : "bg-white border-slate-100 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/5";

  const mapOverlayBg = isDarkMode ? "bg-[#020617]" : "bg-slate-100";

  return (
    <div className={`flex flex-col lg:flex-row h-screen pt-20 ${pageBg} transition-colors duration-500 overflow-hidden relative`}>
      {/* Dynamic Styles for Map & Popups */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#1e293b' : '#cbd5e1'};
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#334155' : '#94a3b8'};
        }
        
        /* Dark Mode Map Tint */
        .map-tiles-dark {
          filter: sepia(0.2) hue-rotate(190deg) saturate(3) brightness(0.8) contrast(1.2);
        }

        /* Override Global Popup Styles */
        #locator-view .leaflet-popup-content-wrapper {
          background: ${isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)'} !important;
          backdrop-filter: blur(12px);
          border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
          border-radius: 1.5rem !important;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
          padding: 0 !important;
          overflow: hidden;
        }
        
        #locator-view .leaflet-popup-tip {
          background: ${isDarkMode ? '#0f172a' : '#ffffff'} !important;
        }
      `}</style>

      {/* Sidebar Filter */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full lg:w-[420px] h-full ${sidebarClasses} flex flex-col z-30 relative`}
      >
        <div className="p-8 border-b border-inherit">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'}`}>
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-black ${textPrimary} tracking-tight uppercase leading-none mb-1`}>Station Finder</h2>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${textSecondary}`}>Live Network Status</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
              <input 
                type="text" 
                placeholder="Search stations, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium outline-none transition-all ${inputClasses}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select 
                  value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setSelectedLga(""); }}
                  className={`w-full rounded-xl px-4 py-3.5 text-xs appearance-none font-bold outline-none cursor-pointer transition-all ${inputClasses}`}
                >
                  <option value="">State</option>
                  {Object.keys(NIGERIA_GEO_DATA).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${textSecondary}`} />
              </div>
              <div className="relative">
                <select 
                  value={selectedLga}
                  onChange={(e) => setSelectedLga(e.target.value)}
                  disabled={!selectedState}
                  className={`w-full rounded-xl px-4 py-3.5 text-xs appearance-none font-bold outline-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${inputClasses}`}
                >
                  <option value="">Area</option>
                  {selectedState && NIGERIA_GEO_DATA[selectedState].map(lga => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${textSecondary}`} />
              </div>
            </div>

            <button 
              onClick={handleUseMyLocation}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-all text-xs font-black uppercase tracking-widest ${
                isDarkMode 
                ? 'border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10' 
                : 'border-emerald-100 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <Crosshair className="w-4 h-4" />
              Use My Location
            </button>

            <button 
              onClick={resetMap}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-all text-xs font-black uppercase tracking-widest ${
                isDarkMode
                ? 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reload Map View
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="px-2 pb-2 flex justify-between items-center">
             <span className={`text-[10px] font-black uppercase tracking-widest ${textSecondary}`}>Results</span>
             <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>{filteredStations.length} Stations</span>
          </div>
          
          <AnimatePresence mode='popLayout'>
            {filteredStations.map((s) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleStationClick(s)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group relative ${cardClasses}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${textPrimary} text-sm tracking-tight leading-tight pr-8`}>{s.name}</h4>
                  <div className={`absolute top-5 right-5 flex items-center gap-1.5 px-2 py-1 rounded-md ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                    <Battery className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-600">{s.available}</span>
                  </div>
                </div>
                <p className={`text-xs ${textSecondary} mb-4 line-clamp-1 font-medium`}>{s.address}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                    {s.type}
                  </span>
                  <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Navigate <Navigation2 className="w-3 h-3 fill-emerald-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Map Area */}
      <div id="locator-view" className={`flex-grow relative h-full w-full ${mapOverlayBg}`}>
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {isMapLoading && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`absolute inset-0 z-[1001] flex flex-col items-center justify-center ${mapOverlayBg}`}
            >
              <div className="relative">
                 <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Theme Toggle & Reload */}
        <div className="absolute top-6 right-6 z-[1000] flex items-center gap-4">
          <button 
            onClick={resetMap}
            className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-xl backdrop-blur-md transition-all cursor-pointer ${
               isDarkMode 
               ? 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white' 
               : 'bg-white/90 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title="Reset Map View (Fixes Glitch)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className={`flex p-1 rounded-full border shadow-xl backdrop-blur-md transition-colors ${isDarkMode ? 'bg-slate-900/80 border-white/10' : 'bg-white/90 border-slate-200'}`}>
            <button 
              onClick={() => !isDarkMode && onToggleTheme()}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${isDarkMode ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Moon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => isDarkMode && onToggleTheme()}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${!isDarkMode ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Sun className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Container Wrapper - Handles opacity transition to prevent staggered visual */}
        <div className={`h-full w-full transition-opacity duration-1000 ${!isMapLoading ? 'opacity-100' : 'opacity-0'}`}>
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            minZoom={6}
            maxZoom={16}
            scrollWheelZoom={true} 
            className="h-full w-full outline-none z-10"
            maxBounds={NIGERIA_BOUNDS}
            maxBoundsViscosity={1.0}
          >
            {/* MapController handles all logic for instance capture, resizing, and center updates */}
            <MapController 
              setMapInstance={setMapInstance} 
              center={mapCenter} 
              zoom={mapZoom} 
            />
            
            <TileLayer
              key={isDarkMode ? 'dark' : 'light'}
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url={isDarkMode 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              }
              className={isDarkMode ? 'map-tiles-dark' : ''}
              eventHandlers={tileLayerHandlers}
            />
            {filteredStations.map((station) => (
              <Marker 
                key={station.id} 
                position={[station.lat, station.lng]} 
                icon={customIcon}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[station.id] = ref;
                  } else {
                    delete markerRefs.current[station.id];
                  }
                }}
              >
                <Popup closeButton={false} minWidth={300} maxWidth={300} className="custom-popup">
                  <div>
                     {/* Popup Header with Gradient & Status */}
                     <div className={`p-5 relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-white'} border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />
                        <div className="flex justify-between items-start mb-2">
                           <div className={`text-[10px] font-black uppercase tracking-widest py-1 px-2 rounded-md ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                              {station.type}
                           </div>
                           <div className="flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Online</span>
                           </div>
                        </div>
                        <h3 className={`text-lg font-black leading-tight mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{station.name}</h3>
                        <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{station.address}</p>
                     </div>

                     {/* Popup Body - Stats Grid */}
                     <div className={`p-5 grid grid-cols-2 gap-3 ${isDarkMode ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
                        <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                           <Battery className="w-5 h-5 text-emerald-500 mb-2" />
                           <div className={`text-xl font-black leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {station.available}
                           </div>
                           <div className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Batteries</div>
                        </div>
                        
                        <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                           <Zap className="w-5 h-5 text-blue-500 mb-2" />
                           <div className={`text-xl font-black leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              3kW
                           </div>
                           <div className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Charging</div>
                        </div>
                     </div>

                     {/* Popup Footer */}
                     <div className={`p-4 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className="flex gap-2">
                          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all">
                             Navigate <Navigation className="w-3.5 h-3.5" />
                          </button>
                        </div>
                     </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocatorPage;
