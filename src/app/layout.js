import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../lib/i18n";
import Chatbot from "../components/Chatbot";
import AuthProvider from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tourisia | Premium Tourism Experience",
  description: "Discover the world with AI-powered recommendations and smart itinerary planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Chatbot />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
