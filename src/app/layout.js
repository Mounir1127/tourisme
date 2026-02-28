import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../lib/i18n";
import Chatbot from "../components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tourisia | Premium Tourism Experience",
  description: "Discover the world with AI-powered recommendations and smart itinerary planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
