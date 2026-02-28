"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../lib/i18n";
import { Globe, Menu, X, User } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, setLang, t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t("destinations"), href: "/destinations" },
        { name: t("planner"), href: "/planner" },
        { name: "AI Assistant", href: "/chatbot" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 glass" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform group-hover:scale-110">
                        T
                    </div>
                    <span className={`text-2xl font-bold tracking-tight text-foreground`}>
                        Tourisia
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-bold text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-border mx-2"></div>

                    <button
                        onClick={() => setLang(lang === "en" ? "fr" : "en")}
                        className="flex items-center gap-1.5 text-xs font-black text-foreground/40 hover:text-primary transition-colors uppercase tracking-widest"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        {lang}
                    </button>

                    <Link href="/auth" className="btn-primary py-2 px-6 text-xs flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        Sign In
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass absolute top-full left-0 right-0 p-6 flex flex-col gap-4 shadow-2xl border-t border-border animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-bold py-2 border-b border-border/50 text-foreground/80"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => { setLang(lang === "en" ? "fr" : "en"); setIsMobileMenuOpen(false); }}
                            className="font-black text-primary flex items-center gap-2"
                        >
                            <Globe className="w-4 h-4" />
                            {lang === "en" ? "English" : "Français"}
                        </button>
                        <Link href="/auth" className="btn-primary py-2 px-8" onClick={() => setIsMobileMenuOpen(false)}>
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
