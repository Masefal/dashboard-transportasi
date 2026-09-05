import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const isDataLengkap = (kota) => {
    const kunciWajib = ['umr', 'waktuTempuh', 'armadaOnline', 'kendaraanPribadi', 'jumlahPenduduk', 'rataJarak', 'kepadatan', 'tarifMin', 'emisi'];
    return kunciWajib.every(key => kota[key] !== null && kota[key] !== undefined && kota[key] !== '');
};

const createCustomIcon = (kota) => {
    const lengkap = isDataLengkap(kota);
    const warna = lengkap ? '#3b82f6' : '#ef4444'; 
    
    return L.divIcon({
        className: 'bg-transparent border-none',
        html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="${warna}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="#ffffff"></circle></svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
};

function MapCamera({ koordinat }) {
    const map = useMap();
    useEffect(() => {
        if (koordinat) {
            map.flyTo(koordinat, 9, { animate: true, duration: 1.5 });
        }
    }, [koordinat, map]);
    return null;
}

export default function TransportMap({ activeCity, allCities, onCityClick }) {
    const defaultCenter = activeCity ? activeCity.koordinat : [-0.5022, 117.1536];
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json')
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch((err) => console.error(err));
    }, []);

    const geoStyle = {
        fillColor: '#2d4975',
        weight: 1,
        opacity: 1,
        color: '#60a5fa',
        fillOpacity: 0.8
    };

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={defaultCenter}
                zoom={5}
                scrollWheelZoom={true}
                className="w-full h-full bg-[#1a1d24]"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                />

                {geoData && <GeoJSON data={geoData} style={geoStyle} />}
                
                {activeCity && <MapCamera koordinat={activeCity.koordinat} />}

                {allCities && allCities.map((kota) => (
                    <Marker 
                        key={kota.id} 
                        position={kota.koordinat}
                        icon={createCustomIcon(kota)}
                        eventHandlers={{
                            click: () => onCityClick(kota),
                        }}
                    >
                        <Popup>
                            <div className="text-slate-900 px-2 py-1 min-w-[120px]">
                                <h4 className="font-bold text-sm mb-1">{kota.nama}</h4>
                                {!isDataLengkap(kota) && (
                                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Data Incomplete</span>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}