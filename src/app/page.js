import Hero from "../components/Hero";
import PlaceCard from "../components/PlaceCard";
import AIExplorer from "../components/AIExplorer";
import { ArrowRight, Compass, Shield, Zap } from "lucide-react";
import MapWrapper from "../components/MapWrapper";

const featuredPlaces = [
  {
    id: 1,
    name: "Amphitheatre of El Jem",
    location: "Mahdia, Tunisia",
    rating: 4.9,
    price: 35,
    category: "Monument",
    description: "One of the most impressive Roman remains in Africa, famous for its massive and well-preserved amphitheater.",
    image: "https://images.unsplash.com/photo-1621217646702-0eeb7ccecf6c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Djerba Island",
    location: "Medenine, Tunisia",
    rating: 4.8,
    price: 150,
    category: "Resort",
    description: "A beautiful Mediterranean island known for its white sandy beaches, traditional architecture, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1590723820257-23190be6107b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sahara Desert Safari",
    location: "Douz, Tunisia",
    rating: 5.0,
    price: 120,
    category: "Adventure",
    description: "Experience the magic of the vast Sahara Desert with camel treks, 4x4 dunes bashing, and stargazing.",
    image: "https://images.unsplash.com/photo-1588691880918-028a2b53e77f?q=80&w=1000&auto=format&fit=crop"
  }
];

const features = [
  {
    icon: <Compass className="w-6 h-6 text-primary" />,
    title: "AI Discovery",
    description: "Our intelligent engine suggests hidden gems tailored to your unique travel style."
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Secure Booking",
    description: "Book hotels, flights, and activities with complete peace of mind and 24/7 support."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Fast Planning",
    description: "Create optimized itineraries in seconds with our advanced distance-time algorithms."
  }
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* AI Recommendations Section */}
      <AIExplorer />

      {/* Featured Destinations */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Trending <span className="text-gradient">Destinations</span></h2>
            <p className="text-foreground/60 max-w-lg">
              Explore the most loved places by our community. Handpicked for their beauty and unique experiences.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold group">
            Check all places
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-t border-border/50 pt-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Hôtels <span className="text-gradient">à proximité</span></h2>
            <p className="text-foreground/60 max-w-lg">
              Découvrez les hébergements autour de Sousse, générés en temps réel et placés sur la carte via l'<strong>OpenStreetMap Overpass API</strong>.
            </p>
          </div>
        </div>
        <MapWrapper lat={35.8256} lon={10.6084} radius={2000} />
      </section>

      {/* Features Multi-language Promo */}
      <section className="bg-foreground/[0.02] py-24 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-[2rem] premium-gradient/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Itineraries</h3>
              <p className="text-foreground/40 text-sm">Save time with AI-optimized routes and schedules.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-[2rem] premium-gradient/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe Journeys</h3>
              <p className="text-foreground/40 text-sm">24/7 support and verified recommendations.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-[2rem] premium-gradient/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-foreground/40 text-sm">Real-time translation for global accessibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-20">
        <div className="premium-gradient p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Compass className="w-40 h-40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to <span className="opacity-60">Begin?</span></h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of travelers who plan their perfect trips with Tourisia.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
            <button className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Create My Trip
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Watch Guide
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
