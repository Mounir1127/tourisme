import Hero from "../components/Hero";
import PlaceCard from "../components/PlaceCard";
import AIExplorer from "../components/AIExplorer";
import { ArrowRight, Compass, Shield, Zap } from "lucide-react";
import MapWrapper from "../components/MapWrapper";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const featuredPlaces = [
  {
    id: 1,
    name: "Amphitheatre of El Jem",
    location: "Mahdia, Tunisia",
    rating: 4.9,
    price: 35,
    category: "Monument",
    description: "One of the most impressive Roman remains in Africa, famous for its massive and well-preserved amphitheater.",
    image: "/images/destinations/el_jem.png"
  },
  {
    id: 2,
    name: "Djerba Island",
    location: "Medenine, Tunisia",
    rating: 4.8,
    price: 150,
    category: "Resort",
    description: "A beautiful Mediterranean island known for its white sandy beaches, traditional architecture, and vibrant culture.",
    image: "/images/destinations/djerba.png"
  },
  {
    id: 3,
    name: "Sahara Desert Safari",
    location: "Douz, Tunisia",
    rating: 5.0,
    price: 120,
    category: "Adventure",
    description: "Experience the magic of the vast Sahara Desert with camel treks, 4x4 dunes bashing, and stargazing.",
    image: "/images/destinations/sahara.png"
  }
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Hero />

      {/* Welcome Section for Auth */}
      {session && (
        <section className="container mx-auto px-6 pt-10">
          <div className="glass p-6 rounded-2xl border-primary/20 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Resalut, {session.user?.name}!</h2>
              <p className="text-foreground/60 text-sm">Prêt pour votre prochaine aventure tunisienne ?</p>
            </div>
          </div>
        </section>
      )}

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
