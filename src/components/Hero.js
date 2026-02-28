import { Search, MapPin, Calendar, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-background">
                <div className="absolute inset-0 premium-gradient opacity-5"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
                        Discover the <span className="text-gradient">Unknown</span>
                    </h1>

                    <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
                        Your travel companion. Tailor-made itineraries and hidden gems for your next adventure.
                    </p>

                    <div className="glass p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2">
                        <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full border-b md:border-b-0 md:border-r border-border/50">
                            <MapPin className="text-primary w-5 h-5 shrink-0" />
                            <input
                                type="text"
                                placeholder="Where to next?"
                                className="bg-transparent border-none focus:outline-none w-full text-foreground font-medium placeholder:text-foreground/40"
                            />
                        </div>

                        <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full border-b md:border-b-0 md:border-r border-border/50">
                            <Calendar className="text-primary w-5 h-5 shrink-0" />
                            <span className="text-foreground/40 font-medium text-sm">When?</span>
                        </div>

                        <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full">
                            <Users className="text-primary w-5 h-5 shrink-0" />
                            <span className="text-foreground/40 font-medium text-sm">How many?</span>
                        </div>

                        <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 group">
                            <Search className="w-4 h-4" />
                            <span>Explore</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
