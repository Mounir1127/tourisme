"use client";

import { createContext, useContext, useState, useEffect } from "react";

const translations = {
    en: {
        welcome: "Discover the Unknown",
        cta: "Start Your Journey",
        explore: "Explore",
        destinations: "Destinations",
        planner: "Trip Planner",
        ai_explorer: "AI Recommendations",
        search_placeholder: "Where to next?",
    },
    fr: {
        welcome: "Découvrez l'Inconnu",
        cta: "Commencez Votre Voyage",
        explore: "Explorer",
        destinations: "Destinations",
        planner: "Planificateur",
        ai_explorer: "Recommandations IA",
        search_placeholder: "Quelle est votre destination ?",
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("en");

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}
