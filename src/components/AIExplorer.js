"use client";

import { useState, useEffect } from "react";
import { Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import PlaceCard from "../components/PlaceCard";

const recommendations = [
    {
        id: 5,
        name: "Machu Picchu",
        location: "Cusco, Peru",
        rating: 4.9,
        price: 450,
        category: "History",
        description: "An Incan citadel set high in the Andes Mountains in Peru, perfect for your interest in historical sites.",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Great Barrier Reef",
        location: "Queensland, Australia",
        rating: 4.8,
        price: 500,
        category: "Nature",
        description: "Since you love nature, the world's largest coral reef system is a must-visit destination.",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function AIExplorer() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [visibleItems, setVisibleItems] = useState(recommendations);

    const refreshMatches = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            // Simulate shuffling or new data
            setVisibleItems([...recommendations].reverse());
            setIsRefreshing(false);
        }, 1500);
    };

    return (
        <section className="container mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        AI Recommended
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold">Just For <span className="text-gradient">You</span></h2>
                    <p className="text-foreground/60 max-w-lg mt-4">
                        Based on your browsing history and preferred categories, we thought you might love these experiences.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={refreshMatches}
                        disabled={isRefreshing}
                        className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold text-foreground/60 hover:text-primary transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh Matches
                    </button>
                    <button className="btn-primary px-6 py-3 rounded-2xl flex items-center gap-2 group">
                        AI Engine
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 glass p-8 rounded-[2.5rem] border-2 border-dashed border-primary/20 flex flex-col justify-center items-center text-center bg-primary/[0.02]">
                    <div className="w-20 h-20 rounded-full premium-gradient flex items-center justify-center text-white mb-6 animate-pulse">
                        <Sparkles className="w-10 h-10 fill-current" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Refining Logic</h3>
                    <p className="text-sm text-foreground/40 leading-relaxed mb-8">
                        The more you explore, the better our AI understands your travel soul. Keep browsing to get perfect matches.
                    </p>
                    <div className="space-y-4 w-full">
                        <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 premium-gradient rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-foreground/40 uppercase">
                            <span>Learning</span>
                            <span>68% Complete</span>
                        </div>
                    </div>
                </div>

                {visibleItems.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </div>
        </section>
    );
}
