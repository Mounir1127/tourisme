"use client";

import { useState } from "react";
import { Plus, Calendar, MapPin, Clock, Trash2, GripVertical, ChevronDown, CheckCircle2 } from "lucide-react";

export default function ItineraryPlanner() {
    const [activeDay, setActiveDay] = useState(1);
    const [itinerary, setItinerary] = useState({
        days: [
            {
                id: 1,
                title: "Day 1: Arrival & Exploration",
                activities: [
                    { id: 101, time: "09:00 AM", title: "Arrival at Hotel", location: "Grand Plaza Paris", icon: "Hotel" },
                    { id: 102, time: "11:30 AM", title: "Eiffel Tower Visit", location: "Champ de Mars", icon: "Camera" },
                    { id: 0, time: "01:30 PM", title: "Lunch at Le Meurice", location: "Rue de Rivoli", icon: "Utensils" }
                ]
            },
            {
                id: 2,
                title: "Day 2: Art & Culture",
                activities: []
            }
        ]
    });

    const addActivity = (dayId) => {
        const newActivity = {
            id: Date.now(),
            time: "Select Time",
            title: "New Activity",
            location: "Add Location",
            icon: "MapPin"
        };

        setItinerary({
            ...itinerary,
            days: itinerary.days.map(day =>
                day.id === dayId
                    ? { ...day, activities: [...day.activities, newActivity] }
                    : day
            )
        });
    };

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sidebar: Day Selection */}
                <div className="lg:w-80 shrink-0">
                    <div className="glass p-6 rounded-[2rem] border border-border/50 sticky top-32">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="text-primary w-5 h-5" />
                            Your Trip
                        </h2>

                        <div className="space-y-3">
                            {itinerary.days.map((day, idx) => (
                                <button
                                    key={day.id}
                                    onClick={() => setActiveDay(day.id)}
                                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${activeDay === day.id
                                            ? "premium-gradient text-white shadow-lg"
                                            : "glass border border-border/50 text-foreground/60 hover:text-primary"
                                        }`}
                                >
                                    <div className="text-left">
                                        <div className="text-[10px] font-bold uppercase opacity-60">Day {idx + 1}</div>
                                        <div className="text-sm font-bold truncate max-w-[120px]">{day.title.split(": ")[1]}</div>
                                    </div>
                                    <CheckCircle2 className={`w-4 h-4 ${activeDay === day.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                                </button>
                            ))}

                            <button
                                className="w-full p-4 mt-6 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-foreground/40 font-bold text-sm hover:border-primary/40 hover:text-primary transition-all"
                                onClick={() => setItinerary({ ...itinerary, days: [...itinerary.days, { id: Date.now(), title: `Day ${itinerary.days.length + 1}: New Day`, activities: [] }] })}
                            >
                                <Plus className="w-4 h-4" />
                                Add Day
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main: Itinerary Details */}
                <div className="flex-1">
                    {itinerary.days.filter(d => d.id === activeDay).map(day => (
                        <div key={day.id}>
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <h1 className="text-4xl font-black mb-2">{day.title}</h1>
                                    <p className="text-foreground/40 font-medium">Manage your activities and schedule for this day</p>
                                </div>
                                <button className="btn-primary py-3 px-8 text-sm">Save Day</button>
                            </div>

                            <div className="space-y-6">
                                {day.activities.length > 0 ? (
                                    day.activities.map((activity, i) => (
                                        <div key={activity.id} className="group relative flex gap-6 items-start">
                                            <div className="hidden md:flex flex-col items-center pt-2">
                                                <div className="w-12 h-12 rounded-2xl glass border border-border/50 flex items-center justify-center text-primary group-hover:premium-gradient group-hover:text-white transition-all shadow-sm">
                                                    <GripVertical className="w-4 h-4" />
                                                </div>
                                                {i !== day.activities.length - 1 && <div className="w-0.5 h-16 bg-border/30 mt-4"></div>}
                                            </div>

                                            <div className="flex-1 glass p-6 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                                                <div className="flex items-center gap-6 w-full md:w-auto">
                                                    <div className="w-16 h-16 rounded-[1.5rem] premium-gradient/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                                                        <Clock className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">{activity.time}</div>
                                                        <h3 className="text-xl font-bold text-foreground">{activity.title}</h3>
                                                        <div className="flex items-center gap-1.5 text-xs text-foreground/40 font-medium mt-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {activity.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                                    <button className="p-3 rounded-xl border border-border hover:bg-foreground/5 transition-all text-foreground/40 hover:text-foreground">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-3 rounded-xl border border-border hover:bg-red-500/10 transition-all text-foreground/40 hover:text-red-500"
                                                        onClick={() => {
                                                            setItinerary({
                                                                ...itinerary,
                                                                days: itinerary.days.map(d => d.id === day.id ? { ...d, activities: d.activities.filter(a => a.id !== activity.id) } : d)
                                                            });
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 flex flex-col items-center text-center glass rounded-[3rem] border-2 border-dashed border-border">
                                        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                                            <Calendar className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Empty Day</h3>
                                        <p className="text-foreground/60 max-w-xs">Start planning your day by adding some activities or locations.</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => addActivity(day.id)}
                                    className="w-full py-8 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-foreground/40 font-bold hover:border-primary/40 hover:text-primary transition-all group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center relative z-10 transition-transform group-hover:scale-110">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="relative z-10">Add Activity to Itinerary</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
