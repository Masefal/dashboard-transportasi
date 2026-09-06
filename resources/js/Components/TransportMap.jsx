import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const isDataLengkap = (kota) => {
    const kunciWajib = ['umr', 'waktu_tempuh', 'armada_online', 'kendaraan_pribadi', 'tarif_min'];
    return kunciWajib.every(key => kota[key] !== null && kota[key] !== undefined && kota[key] !== '');
};

function MapCamera({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 9, { animate: true, duration: 1.5 });
        }
    }, [lat, lng, map]);
    return null;
}

export default function TransportMap({ activeCity, allCities, onCityClick }) {
    const defaultCenter = activeCity && activeCity.latitude 
        ? [activeCity.latitude, activeCity.longitude] 
        : [-0.5022, 117.1536];
    
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch('/geojson/batas-kota.json') 
            .then(response => response.json())
            .then(data => setGeoData(data))
            .catch(error => console.error("Gagal memuat GeoJSON:", error));
    }, []);

    const getGeoStyle = (feature) => {
        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase();
        const dataKota = allCities.find(kota => kota.nama.toLowerCase() === namaPeta);

        if (!dataKota) return { opacity: 0, fillOpacity: 0, weight: 0 };

        const isActive = activeCity && activeCity.id === dataKota.id;

        if (isActive) {
            return { 
                color: '#22c55e', 
                weight: 3, 
                dashArray: '5, 5', 
                fillColor: '#22c55e', 
                fillOpacity: 0.1, 
                opacity: 1 
            };
        } else {
            const lengkap = isDataLengkap(dataKota);
            const warnaUtama = lengkap ? '#3b82f6' : '#ef4444';
            return { 
                color: warnaUtama, 
                weight: 1, 
                fillColor: warnaUtama, 
                fillOpacity: 0.2, 
                opacity: 0.5 
            };
        }
    };

    const onEachFeature = (feature, layer) => {
        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase();
        const dataKota = allCities.find(kota => kota.nama.toLowerCase() === namaPeta);

        if (dataKota) {
            layer.bindTooltip(`<div class="font-bold text-slate-800">${dataKota.nama}</div>`, {
                sticky: true,
                className: 'bg-white border-none rounded shadow-md px-2 py-1 text-xs'
            });
            layer.on({
                click: (e) => {
                    onCityClick(dataKota);
                    e.target._map.fitBounds(e.target.getBounds(), { padding: [50, 50], animate: true, duration: 1.5 });
                }
            });
        }
    };

    return (
        <div className="w-full h-full relative">
            <MapContainer 
                center={defaultCenter} 
                zoom={5} 
                scrollWheelZoom={true} 
                className="w-full h-full bg-[#1a1d24]" 
                zoomControl={false} 
                attributionControl={false}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
                
                {geoData && (
                    <GeoJSON 
                        key={activeCity ? activeCity.id : 'init'} 
                        data={geoData} 
                        style={getGeoStyle} 
                        onEachFeature={onEachFeature} 
                    />
                )}
                
                {activeCity && <MapCamera lat={activeCity.latitude} lng={activeCity.longitude} />}
            </MapContainer>
        </div>
    );
}