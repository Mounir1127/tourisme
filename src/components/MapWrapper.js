'use client';

import dynamic from 'next/dynamic';

const HotelMap = dynamic(() => import('./HotelMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] rounded-[2rem] bg-foreground/5 animate-pulse flex items-center justify-center border border-border/50">
            <div className="text-primary font-bold">Chargement de la carte interactive...</div>
        </div>
    )
});

export default function MapWrapper({ lat, lon, radius }) {
    return <HotelMap lat={lat} lon={lon} radius={radius} />;
}
