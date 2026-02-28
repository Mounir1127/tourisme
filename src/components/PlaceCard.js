import { Star, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PlaceCard({ place }) {
    return (
        <div className="group relative glass rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 bg-card">
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={place.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/El_Djem_Amphitheatre.jpg/1200px-El_Djem_Amphitheatre.jpg"}
                    alt={place.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10">
                    <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        {place.rating}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                            <MapPin className="w-3 h-3" />
                            {place.location}
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {place.name}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>

                <p className="text-foreground/60 text-sm line-clamp-2 mb-6">
                    {place.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-sm">
                        <span className="font-bold text-lg text-foreground">${place.price}</span>
                        <span className="text-foreground/40 font-medium"> / person</span>
                    </div>
                    <div className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded-lg">
                        {place.category}
                    </div>
                </div>
            </div>
        </div>
    );
}
