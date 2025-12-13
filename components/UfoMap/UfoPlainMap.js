/* eslint-disable */
import React, { useEffect, useRef } from "react";
import L from "leaflet";

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const fallbackCenter = [-14.235, -51.9253]; // Brasil

// 👇 Ícone default configurado manualmente
const defaultIcon = L.icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function UfoPlainMap({ center, resultados }) {
    const mapRef = useRef(null);         // div
    const mapInstanceRef = useRef(null); // L.map
    const markersRef = useRef([]);       // para limpar marcadores

    useEffect(() => {
        if (!mapRef.current) return;
        if (mapInstanceRef.current) return;

        const map = L.map(mapRef.current).setView(
            center ? [center.lat, center.lon] : fallbackCenter,
            center ? 10 : 3
        );

        L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(map);

        mapInstanceRef.current = map;
    }, [center]);

    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !center) return;

        map.setView([center.lat, center.lon], 6);
    }, [center]);

    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        markersRef.current.forEach((m) => map.removeLayer(m));
        markersRef.current = [];

        if (!resultados || resultados.length === 0) return;

        resultados.forEach((a) => {
            //const marker = L.marker([a.lat, a.lon], { icon: defaultIcon }).addTo(map);
            const marker = L.marker([a.location.lat, a.location.lon], { icon: defaultIcon }).addTo(map);
            marker.bindPopup(
                `
          <div style="font-size: 0.85rem">
            <strong>${a.cidade} - ${a.estado}</strong><br/>
            Tipo: ${a.tipoObjeto}<br/>
            Conf.: ${a.confiabilidade}%<br/>
            <small>${a.descricao}</small>
          </div>
        `
            );

            markersRef.current.push(marker);
        });
    }, [resultados]);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
