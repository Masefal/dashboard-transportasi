import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DUMMY_GEOJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Samarinda" }, geometry: { type: "Polygon", coordinates: [[[117.0, -0.6], [117.3, -0.6], [117.3, -0.4], [117.0, -0.4], [117.0, -0.6]]] } },
    { type: "Feature", properties: { name: "Surabaya" }, geometry: { type: "Polygon", coordinates: [[[112.6, -7.4], [112.8, -7.4], [112.8, -7.2], [112.6, -7.2], [112.6, -7.4]]] } },
    { type: "Feature", properties: { name: "Bandung" }, geometry: { type: "Polygon", coordinates: [[[107.5, -7.0], [107.7, -7.0], [107.7, -6.8], [107.5, -6.8], [107.5, -7.0]]] } },
    { type: "Feature", properties: { name: "Medan" }, geometry: { type: "Polygon", coordinates: [[[98.5, 3.5], [98.8, 3.5], [98.8, 3.8], [98.5, 3.8], [98.5, 3.5]]] } },
    { type: "Feature", properties: { name: "Jakarta" }, geometry: { type: "Polygon", coordinates: [[[106.7, -6.3], [106.9, -6.3], [106.9, -6.1], [106.7, -6.1], [106.7, -6.3]]] } },
    { type: "Feature", properties: { name: "Makassar" }, geometry: { type: "Polygon", coordinates: [[[119.3, -5.2], [119.5, -5.2], [119.5, -5.0], [119.3, -5.0], [119.3, -5.2]]] } }
  ]
};

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
    const defaultCenter = activeCity && activeCity.latitude ? [activeCity.latitude, activeCity.longitude] : [-0.5022, 117.1536];

    const getGeoStyle = (feature) => {
        const namaDiPeta = (feature.properties.name || "").toLowerCase();
        const dataKota = allCities.find(kota => kota.nama.toLowerCase() === namaDiPeta);

        if (!dataKota) return { opacity: 0, fillOpacity: 0 };

        const lengkap = isDataLengkap(dataKota);
        const isActive = activeCity && activeCity.id === dataKota.id;
        const warnaUtama = lengkap ? '#3b82f6' : '#ef4444';

        if (isActive) {
            return { color: warnaUtama, weight: 4, dashArray: '8, 8', fillColor: warnaUtama, fillOpacity: 0.3, opacity: 1 };
        } else {
            return { color: warnaUtama, weight: 0, fillColor: warnaUtama, fillOpacity: 0.3, opacity: 0 };
        }
    };

    const onEachFeature = (feature, layer) => {
        const namaDiPeta = (feature.properties.name || "").toLowerCase();
        const dataKota = allCities.find(kota => kota.nama.toLowerCase() === namaDiPeta);

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
            <MapContainer center={defaultCenter} zoom={5} scrollWheelZoom={true} className="w-full h-full bg-[#1a1d24]" zoomControl={false} attributionControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
                <GeoJSON key={activeCity ? activeCity.id : 'init'} data={DUMMY_GEOJSON} style={getGeoStyle} onEachFeature={onEachFeature} />
                {activeCity && <MapCamera lat={activeCity.latitude} lng={activeCity.longitude} />}
            </MapContainer>
        </div>
    );
}