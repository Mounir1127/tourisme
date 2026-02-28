"use client";

import { useState } from "react";
import { Star, MapPin, Calendar, Clock, ArrowLeft, Heart, Share2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allPlaces = [
    {
        id: 1,
        name: "Eiffel Tower",
        location: "Paris, France",
        rating: 4.9,
        price: 120,
        category: "Monument",
        description: "The Eiffel Tower is an iron lattice tower on the Champ de Mars in Paris, France. Named after the engineer Gustave Eiffel, whose company designed and built the tower. Locally nicknamed \"La dame de fer\", it was constructed from 1887 to 1889 as the centerpiece of the 1889 World's Fair. \n\nStanding 330 metres tall, it provides spectacular panoramic views of Paris. Visitors can take lifts or climb the stairs to the first and second levels, while only lifts reach the summit. It remains the most-visited paid monument in the world.",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce765f?q=80&w=1000&auto=format&fit=crop",
        amenities: ["Elevator Access", "Restaurant Inside", "Souvenir Shop", "Guided Tours"],
        itinerary: [
            { time: "09:00 AM", activity: "Security check and entry" },
            { time: "10:00 AM", activity: "Explore 2nd floor views" },
            { time: "11:30 AM", activity: "Summit visit and photos" },
            { time: "01:00 PM", activity: "Lunch at 58 Tour Eiffel" }
        ]
    }
];

export default function PlaceDetailPage({ params }) {
    // Normally we'd fetch based on params.id
    const place = allPlaces[0];
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="pt-24 pb-20">
            {/* Back Button & Actions */}
            <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                <Link href="/destinations" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Destinations
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-3 rounded-full glass border border-border/50 transition-all ${isLiked ? "text-red-500 bg-red-50/50" : "text-foreground/40"}`}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </button>
                    <button className="p-3 rounded-full glass border border-border/50 text-foreground/40 hover:text-primary transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="relative h-[60vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
                            <Image
                                src={place.image}
                                alt={place.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div className="flex items-center gap-2 text-sm font-semibold mb-2 text-white/80">
                                    <MapPin className="w-4 h-4" />
                                    {place.location}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">{place.name}</h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-accent fill-accent" />
                                        <span className="font-bold">{place.rating}</span>
                                        <span className="text-white/60">(1.2k Reviews)</span>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {place.category}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-3xl font-bold mb-6">About this <span className="text-gradient">Experience</span></h2>
                                <div className="text-foreground/60 leading-relaxed space-y-4 text-lg">
                                    {place.description.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold mb-6">What's <span className="text-gradient">Included</span></h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {place.amenities.map((item, i) => (
                                        <div key={i} className="glass p-4 rounded-2xl flex flex-col items-center text-center border border-border/50">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold mb-6">Suggested <span className="text-gradient">Itinerary</span></h3>
                                <div className="space-y-4">
                                    {place.itinerary.map((step, i) => (
                                        <div key={i} className="flex gap-6 items-start relative pb-8 last:pb-0">
                                            {i !== place.itinerary.length - 1 && <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border/50"></div>}
                                            <div className="w-6 h-6 rounded-full premium-gradient flex items-center justify-center shadow-lg relative z-10 shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                            <div>
                                                <div className="text-primary font-bold text-sm mb-1">{step.time}</div>
                                                <div className="text-foreground font-semibold">{step.activity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar / Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 glass p-8 rounded-[2rem] shadow-xl border border-border/50">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-foreground/40 text-sm block">Starting from</span>
                                    <span className="text-4xl font-black text-foreground">${place.price}</span>
                                    <span className="text-foreground/40 font-medium"> / person</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-green-500 font-bold text-sm flex items-center justify-end gap-1">
                                        <Zap className="w-3 h-3 fill-current" />
                                        Bestseller
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="p-4 bg-background border border-border rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-primary w-5 h-5" />
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-foreground/40">Date</div>
                                            <div className="text-sm font-bold">Select Date</div>
                                        </div>
                                    </div>
                                    <ArrowDown className="w-4 h-4 text-foreground/40" />
                                </div>
                                <div className="p-4 bg-background border border-border rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Users className="text-primary w-5 h-5" />
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-foreground/40">Guests</div>
                                            <div className="text-sm font-bold">2 Persons</div>
                                        </div>
                                    </div>
                                    <ArrowDown className="w-4 h-4 text-foreground/40" />
                                </div>
                            </div>

                            <button className="w-full btn-primary py-4 mb-4 text-lg shadow-primary/25 shadow-xl">
                                Book Experience
                            </button>

                            <button className="w-full glass border border-border/50 py-4 rounded-full font-bold text-foreground/60 hover:text-primary transition-all">
                                Add to Itinerary
                            </button>

                            <div className="mt-8 pt-8 border-t border-border/50 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-foreground/60">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>Duration: 4-6 hours</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-foreground/60">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>Perfect for couples & families</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Mocking icons that were missing in the template
const Zap = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ArrowDown = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
