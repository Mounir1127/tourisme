"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ChatbotPage() {
    const [messages, setMessages] = useState([
        { text: "Bonjour ! Je suis l'assistant IA de Tourisia. Comment puis-je vous aider à planifier votre prochain voyage d'exception ?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { text: data.response || "Désolé, erreur serveur.", isBot: true }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { text: "Impossible de contacter l'assistant (mode hors ligne).", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-12 bg-background flex flex-col">
            <div className="container mx-auto px-6 flex-1 flex flex-col max-w-5xl">

                {/* Header */}
                <div className="mb-8 text-center relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Retour
                        </Link>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-4 h-4 fill-current" />
                        AI Travel Concierge
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Votre <span className="text-gradient">Assistant Personnel</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Demandez-moi n'importe quoi sur vos prochaines destinations, des itinéraires personnalisés ou des conseils d'experts sur les meilleurs endroits à visiter.
                    </p>
                </div>

                {/* Chat UI */}
                <div className="flex-1 glass border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col bg-background/50 backdrop-blur-3xl relative">
                    {/* decorative blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 z-10 scrollbar-hide">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                                <div className={`flex gap-4 max-w-[85%] md:max-w-[70%] ${msg.isBot ? "flex-row" : "flex-row-reverse"}`}>
                                    {/* Avatar */}
                                    <div className="shrink-0 mt-1">
                                        {msg.isBot ? (
                                            <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center text-white shadow-lg">
                                                <Bot className="w-5 h-5" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/60 shadow-sm">
                                                <User className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`p-5 rounded-3xl shadow-sm text-[15px] leading-relaxed relative ${msg.isBot
                                        ? "bg-white border border-border/50 text-gray-900 rounded-tl-sm"
                                        : "premium-gradient text-white rounded-tr-sm shadow-xl shadow-primary/20"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-4 max-w-[85%] md:max-w-[70%]">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center text-white shadow-lg">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="bg-white border border-border/50 text-foreground rounded-3xl rounded-tl-sm p-5 shadow-sm flex items-center gap-2 h-[60px]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 md:p-8 border-t border-border/50 bg-white/50 backdrop-blur-md z-10">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Où voulez-vous aller ?"
                                className="w-full bg-background border border-border/80 rounded-full pl-8 pr-20 py-5 text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-foreground/40"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-3 p-3.5 bg-primary text-white rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-primary/30 flex items-center justify-center"
                            >
                                <Send className="w-5 h-5 -ml-0.5" />
                            </button>
                        </form>
                        <div className="mt-4 flex justify-center gap-6 text-xs text-foreground/40 font-medium">
                            <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"><MapPin className="w-3.5 h-3.5" /> Suggestions de destinations</span>
                            <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"><Calendar className="w-3.5 h-3.5" /> Créer un itinéraire</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
