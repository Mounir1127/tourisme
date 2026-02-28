"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Bonjour 👋 Comment puis-je vous aider avec votre voyage ?", isBot: true }
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
        <>
            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 p-4 rounded-full premium-gradient text-white shadow-2xl z-50 transition-transform hover:scale-110 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
            >
                <MessageCircle className="w-7 h-7" />
            </button>

            {/* Chatbot Window */}
            <div className={`fixed bottom-6 right-6 w-96 h-[32rem] max-w-[calc(100vw-3rem)] bg-background border border-border/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all origin-bottom-right duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}>

                {/* Header */}
                <div className="premium-gradient p-4 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Tourisia Guide</h3>
                            <div className="flex items-center gap-1.5 text-xs text-white/80">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-foreground/[0.02]">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 flex gap-3 ${msg.isBot ? "bg-white border border-border/50 text-gray-900 rounded-tl-sm shadow-sm" : "premium-gradient text-white rounded-tr-sm shadow-md"}`}>
                                <div className="text-sm leading-relaxed">{msg.text}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-border/50 text-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-background border-t border-border/50 flex gap-2 shrink-0">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Posez votre question..."
                        className="flex-1 bg-foreground/[0.03] border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center pointer-events-auto"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </>
    );
}
