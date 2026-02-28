"use client";

import { useState } from "react";
import PlaceCard from "../../components/PlaceCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const allPlaces = [
    {
        id: 1,
        name: "Eiffel Tower",
        location: "Paris, France",
        rating: 4.9,
        price: 120,
        category: "Monument",
        description: "The iconic iron lady of Paris, offering breathtaking panoramic views of the city of lights.",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce765f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Santorini Oia",
        location: "Cyclades, Greece",
        rating: 4.8,
        price: 350,
        category: "Resort",
        description: "Stunning blue-domed churches and whitewashed houses overlooking the crystal clear Aegean Sea.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Mount Fuji",
        location: "Honshu, Japan",
        rating: 5.0,
        price: 200,
        category: "Nature",
        description: "Japan's highest peak and an immortal symbol of Japanese culture and natural beauty.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Colosseum",
        location: "Rome, Italy",
        rating: 4.7,
        price: 80,
        category: "Monument",
        description: "The largest ancient amphitheatre ever built, standing as a testament to Roman engineering.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Machu Picchu",
        location: "Cusco, Peru",
        rating: 4.9,
        price: 450,
        category: "History",
        description: "An Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Great Barrier Reef",
        location: "Queensland, Australia",
        rating: 4.8,
        price: 500,
        category: "Nature",
        description: "The world's largest coral reef system, composed of over 2,900 individual reefs.",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1000&auto=format&fit=crop"
    }
];

const categories = ["All", "Monument", "Resort", "Nature", "History", "Adventure"];

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPlaces = allPlaces.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <div className="max-w-3xl mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore <span className="text-gradient">Destinations</span></h1>
                <p className="text-foreground/60 text-lg">
                    Discover breathtaking locations worldwide. Filter by category, search for specific places, and plan your next journey.
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <input
                        type="text"
                        placeholder="Search by name or city..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 rounded-2xl text-primary font-bold text-sm shrink-0">
                        <Filter className="w-4 h-4" />
                        Categories
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 ${selectedCategory === cat
                                    ? "premium-gradient text-white shadow-lg"
                                    : "glass border border-border/50 text-foreground/60 hover:border-primary/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats/Results Count */}
            <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-medium text-foreground/40">
                    Showing <span className="text-foreground font-bold">{filteredPlaces.length}</span> results
                </p>
                <button className="flex items-center gap-2 text-sm font-bold text-primary">
                    <SlidersHorizontal className="w-4 h-4" />
                    More Filters
                </button>
            </div>

            {/* Results Grid */}
            {filteredPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPlaces.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                        <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No results found</h3>
                    <p className="text-foreground/60">We couldn't find any destinations matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
