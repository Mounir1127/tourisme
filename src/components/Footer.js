import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                T
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">Tourisia</span>
                        </Link>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                            Explore the world with Tourisia. Your ultimate companion for discovering beautiful places and planning unforgettable journeys.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-foreground/60">
                            <li><Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
                            <li><Link href="/planner" className="hover:text-primary transition-colors">Trip Planner</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Local Events</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground">Community</h4>
                        <ul className="space-y-4 text-sm text-foreground/60">
                            <li><Link href="/reviews" className="hover:text-primary transition-colors">User Reviews</Link></li>
                            <li><Link href="/guides" className="hover:text-primary transition-colors">Travel Guides</Link></li>
                            <li><Link href="/support" className="hover:text-primary transition-colors">Customer Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground">Newsletter</h4>
                        <p className="text-sm text-foreground/60 mb-4">Subscribe to get special offers and travel inspiration.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-background border border-border rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="premium-gradient text-white px-4 py-2 rounded-lg text-sm font-medium">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-foreground/40">
                        © 2026 Tourisia Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-foreground/40 hover:text-primary transition-colors text-xs">Twitter</a>
                        <a href="#" className="text-foreground/40 hover:text-primary transition-colors text-xs">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
