'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

export default function HotelMap({ lat = 35.8256, lon = 10.6084, radius = 2000 }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined' || !mapRef.current) return;

        let L;
        try {
            L = require('leaflet');
            // Fix default icon paths in Next.js
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });
        } catch (e) {
            console.error("Leaflet not loaded", e);
            return;
        }

        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([lat, lon], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);
        }

        const fetchHotels = async () => {
            setLoading(true);
            try {
                const query = `
          [out:json];
          node
            ["tourism"="hotel"]
            (around:${radius},${lat},${lon});
          out;
        `;

                const url = 'https://overpass-api.de/api/interpreter';

                const response = await fetch(url, {
                    method: 'POST',
                    body: query
                });

                const data = await response.json();

                data.elements.forEach(hotel => {
                    if (hotel.lat && hotel.lon) {
                        const name = hotel.tags?.name || "Hôtel Inconnu";
                        const stars = hotel.tags?.stars ? `<br/>⭐ ${hotel.tags.stars} Étoiles` : "";
                        const website = hotel.tags?.website ? `<br/><a href="${hotel.tags.website}" target="_blank" class="text-primary underline">Site Web</a>` : "";

                        const popupContent = `
              <div class="text-foreground p-1">
                <b class="text-lg">${name}</b>
                ${stars}
                ${website}
              </div>
            `;

                        L.marker([hotel.lat, hotel.lon])
                            .addTo(mapInstance.current)
                            .bindPopup(popupContent);
                    }
                });
            } catch (error) {
                console.error("Error fetching hotels from Overpass API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();

        // Cleanup specific markers if lat/lon changes would go here
        // but we'll avoid completely destroying the map on every render
    }, [lat, lon, radius]);

    return (
        <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-0 bg-background">
            {loading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-[1000] flex flex-col items-center justify-center text-primary font-bold">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    Recherche d'hôtels via Overpass...
                </div>
            )}
            <div ref={mapRef} className="w-full h-full z-0" style={{ zIndex: 0 }} />
        </div>
    );
}
