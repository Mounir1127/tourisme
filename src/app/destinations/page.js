"use client";

import { useState } from "react";
import PlaceCard from "../../components/PlaceCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const allPlaces = [
    {
        id: 1,
        name: "Amphitheatre of El Jem",
        location: "Mahdia, Tunisia",
        rating: 4.9,
        price: 35,
        category: "Monument",
        description: "One of the most impressive Roman remains in Africa, a UNESCO World Heritage monument that once hosted 35,000 spectators.",
        image: "/images/destinations/el_jem.png"
    },
    {
        id: 2,
        name: "Djerba Island",
        location: "Medenine, Tunisia",
        rating: 4.8,
        price: 150,
        category: "Resort",
        description: "A beautiful Mediterranean island known for its white sandy beaches, traditional architecture, and vibrant Berber and Jewish cultural heritage.",
        image: "/images/destinations/djerba.png"
    },
    {
        id: 3,
        name: "Ichkeul National Park",
        location: "Bizerte, Tunisia",
        rating: 4.7,
        price: 20,
        category: "Nature",
        description: "A UNESCO World Heritage site, offering incredible bird watching for migratory flamingos and untouched wetland natural beauty.",
        image: "/images/destinations/ichkeul.png"
    },
    {
        id: 4,
        name: "Ruins of Carthage",
        location: "Tunis, Tunisia",
        rating: 4.8,
        price: 45,
        category: "History",
        description: "Explore the ancient remains of the once-powerful Carthaginian Empire, a UNESCO World Heritage site overlooking the Mediterranean Sea.",
        image: "/images/destinations/carthage.png"
    },
    {
        id: 5,
        name: "Sahara Desert Safari",
        location: "Douz, Tunisia",
        rating: 5.0,
        price: 120,
        category: "Adventure",
        description: "Experience the magic of the vast Sahara Desert with camel treks, 4x4 dunes bashing, and unforgettable stargazing nights.",
        image: "/images/destinations/sahara.png"
    },
    {
        id: 6,
        name: "Sidi Bou Said",
        location: "Tunis, Tunisia",
        rating: 4.9,
        price: 80,
        category: "Resort",
        description: "A picturesque coastal village perched on cliffs, famous for its iconic blue and white buildings and stunning Mediterranean views.",
        image: "/images/destinations/sidi_bou_said.png"
    },
    {
        id: 7,
        name: "Medina of Tunis",
        location: "Tunis, Tunisia",
        rating: 4.8,
        price: 0,
        category: "History",
        description: "A vibrant UNESCO World Heritage medina with over 700 historic monuments, labyrinthine souks, and stunning Zitouna Mosque.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Medina_old_Town_of_Tunis.jpeg/960px-Medina_old_Town_of_Tunis.jpeg"
    },
    {
        id: 8,
        name: "Great Mosque of Kairouan",
        location: "Kairouan, Tunisia",
        rating: 4.9,
        price: 30,
        category: "Monument",
        description: "One of the oldest and most important mosques in North Africa and the Islamic world, a UNESCO site founded in 670 CE.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Great_Mosque_of_Kairouan_Panorama_-_Grande_Mosqu%C3%A9e_de_Kairouan_Panorama.jpg/960px-Great_Mosque_of_Kairouan_Panorama_-_Grande_Mosqu%C3%A9e_de_Kairouan_Panorama.jpg"
    },
    {
        id: 9,
        name: "Hammamet Beach",
        location: "Nabeul, Tunisia",
        rating: 4.7,
        price: 100,
        category: "Resort",
        description: "Tunisia's most famous beach resort town with crystal clear waters, white sandy beaches, and a charming historic medina.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%D0%A5%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B5%D1%821.jpg/960px-%D0%A5%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B5%D1%821.jpg"
    },
    {
        id: 10,
        name: "Sousse Medina",
        location: "Sousse, Tunisia",
        rating: 4.7,
        price: 25,
        category: "History",
        description: "A well-preserved UNESCO World Heritage medina with a remarkable ribat fortress, Kasbah museum, and vibrant local culture.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Tunezja%2C_Sousse_-_panoramio_%283%29.jpg/960px-Tunezja%2C_Sousse_-_panoramio_%283%29.jpg"
    },
    {
        id: 11,
        name: "Bardo National Museum",
        location: "Tunis, Tunisia",
        rating: 4.8,
        price: 20,
        category: "Monument",
        description: "Home to one of the world's most impressive collections of Roman mosaics, housed in a magnificent former Husainid palace.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Le_Bardo_%28Tunisie%29%2C_mus%C3%A9e_national.jpg/900px-Le_Bardo_%28Tunisie%29%2C_mus%C3%A9e_national.jpg"
    },
    {
        id: 12,
        name: "Tozeur Oasis & Medina",
        location: "Tozeur, Tunisia",
        rating: 4.7,
        price: 60,
        category: "Nature",
        description: "An enchanting oasis town at the edge of the Sahara, famous for its palm groves, unique brick architecture, and Star Wars filming locations nearby.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Tozeur_sud_tunisien.jpg/960px-Tozeur_sud_tunisien.jpg"
    },
    {
        id: 13,
        name: "Matmata Troglodyte Village",
        location: "Gabes, Tunisia",
        rating: 4.6,
        price: 40,
        category: "Adventure",
        description: "A unique Berber village built underground, with cave homes carved from rock. Also famous as a Star Wars filming location (Tatooine).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Matmata%2C_Tunisia.JPG/960px-Matmata%2C_Tunisia.JPG"
    },
    {
        id: 14,
        name: "Tabarka",
        location: "Jendouba, Tunisia",
        rating: 4.6,
        price: 90,
        category: "Resort",
        description: "A lush resort town on the northern coast surrounded by forests and coral reefs, perfect for diving, hiking, and music festivals.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ile_de_tabarka_1.jpg/960px-Ile_de_tabarka_1.jpg"
    },
    {
        id: 15,
        name: "Chott el-Djerid Salt Lake",
        location: "Tozeur, Tunisia",
        rating: 4.8,
        price: 50,
        category: "Nature",
        description: "The largest salt lake in the Sahara, creating stunning mirages and otherworldly landscapes at the edge of the desert.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chott_el_Djerid_001.jpg/960px-Chott_el_Djerid_001.jpg"
    },
    {
        id: 16,
        name: "Ksar Ouled Soltane",
        location: "Tataouine, Tunisia",
        rating: 4.7,
        price: 25,
        category: "History",
        description: "One of Tunisia's most impressive ksour (fortified Berber granaries), with its multi-story ghorfas arranged around two stunning courtyards.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Ksar_Ouled_Soltane_01.jpg/960px-Ksar_Ouled_Soltane_01.jpg"
    },
    {
        id: 17,
        name: "Monastir Ribat",
        location: "Monastir, Tunisia",
        rating: 4.7,
        price: 30,
        category: "Monument",
        description: "A magnificent 8th-century Islamic fortress by the sea, one of the most beautiful ribats in the Maghreb and a medieval marvel.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Grand_Ribat_Monastir.JPG/960px-Grand_Ribat_Monastir.JPG"
    },
    {
        id: 18,
        name: "Cap Bon Peninsula",
        location: "Nabeul, Tunisia",
        rating: 4.6,
        price: 70,
        category: "Adventure",
        description: "A rugged and beautiful peninsula offering dramatic cliffs, pristine coves, ancient ruins at Kerkouane and lush agricultural valleys.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Kerkouane.JPG/960px-Kerkouane.JPG"
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
