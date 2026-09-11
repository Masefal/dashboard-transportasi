import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const isDataLengkap = (kota) => {
    const kunciWajib = ['umr', 'waktu_tempuh', 'armada_online', 'kendaraan_pribadi', 'tarif_min'];
    return kunciWajib.every(key => kota[key] !== null && kota[key] !== undefined && kota[key] !== '');
};

function MapCamera({ activeCity, geoData }) {
    const map = useMap();
    
    useEffect(() => {
        if (activeCity) {
            try {
                if (activeCity.latitude && activeCity.longitude) {
                    const lat = parseFloat(activeCity.latitude);
                    const lng = parseFloat(activeCity.longitude);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        map.flyTo([lat, lng], 9, { animate: true, duration: 1.5 });
                        return;
                    }
                }
                
                if (geoData) {
                    const targetFeature = geoData.features.find(feature => {
                        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase().trim();
                        return namaPeta === (activeCity.nama || "").toLowerCase().trim();
                    });

                    if (targetFeature) {
                        const layer = L.geoJSON(targetFeature);
                        const bounds = layer.getBounds();
                        
                        if (bounds && bounds.isValid()) {
                            map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [activeCity, geoData, map]);
    
    return null;
}

export default function TransportMap({ activeCity, allCities, onCityClick }) {
    const defaultCenter = [-0.5022, 117.1536];
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch('/geojson/batas-kota.json') 
            .then(response => response.json())
            .then(data => setGeoData(data))
            .catch(error => console.error(error));
    }, []);

    const completeCount = allCities.filter(c => isDataLengkap(c)).length;

    const getBaseStyle = (feature) => {
        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase().trim();
        const dataKota = allCities.find(kota => (kota.nama || "").toLowerCase().trim() === namaPeta);

        if (!dataKota) return { opacity: 0, fillOpacity: 0, weight: 0 };

        const lengkap = isDataLengkap(dataKota);
        return { 
            color: lengkap ? '#3b82f6' : '#ef4444', 
            weight: 1, 
            fillColor: lengkap ? '#3b82f6' : '#ef4444', 
            fillOpacity: 0.2, 
            opacity: 0.5 
        };
    };

    const onEachFeature = (feature, layer) => {
        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase().trim();
        const dataKota = allCities.find(kota => (kota.nama || "").toLowerCase().trim() === namaPeta);

        if (dataKota) {
            layer.bindTooltip(`<div class="font-bold text-slate-800">${dataKota.nama}</div>`, {
                sticky: true,
                className: 'bg-white border-none rounded shadow-md px-2 py-1 text-xs'
            });
            layer.on({
                click: () => onCityClick(dataKota)
            });
        }
    };

    const activeFeature = (activeCity && geoData) ? geoData.features.find(feature => {
        const namaPeta = (feature.properties.name || feature.properties.KABKOT || feature.properties.WADMKK || feature.properties.NAME_2 || feature.properties.Propinsi || "").toLowerCase().trim();
        return namaPeta === (activeCity.nama || "").toLowerCase().trim();
    }) : null;

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
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                
                {geoData && (
                    <GeoJSON 
                        key={`base-${completeCount}`} 
                        data={geoData} 
                        style={getBaseStyle} 
                        onEachFeature={onEachFeature} 
                    />
                )}
                
                {activeFeature && (
                    <GeoJSON 
                        key={`active-${activeCity.id}`} 
                        data={activeFeature} 
                        style={{ 
                            color: '#22c55e', 
                            weight: 3, 
                            dashArray: '5, 5', 
                            fillColor: '#22c55e', 
                            fillOpacity: 0.2, 
                            opacity: 1 
                        }} 
                    />
                )}
                
                <MapCamera activeCity={activeCity} geoData={geoData} />
            </MapContainer>
        </div>
    );
}