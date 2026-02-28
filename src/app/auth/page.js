"use client";

import { useState } from "react";
import { Mail, Lock, User, Github, Chrome, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
    const [mode, setMode] = useState("login"); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);

    const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

    return (
        <div className="min-h-screen pt-20 pb-20 flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 premium-gradient opacity-10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 premium-gradient opacity-10 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-md mx-auto">
                    {/* Logo/Back to Home */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                T
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-foreground">Tourisia</span>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">
                            {mode === "login" ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-foreground/60">
                            {mode === "login"
                                ? "Sign in to access your planned adventures"
                                : "Join the community of global explorers today"}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="glass p-8 rounded-[2.5rem] shadow-2xl border border-border/50">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {mode === "signup" && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 pl-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 pl-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center pl-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Password</label>
                                    {mode === "login" && (
                                        <button className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {mode === "signup" && (
                                <p className="text-[10px] text-foreground/40 leading-relaxed px-2 text-center">
                                    By signing up, you agree to our <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Privacy Policy</span>.
                                </p>
                            )}

                            <button className="w-full btn-primary py-4 mt-4 shadow-primary/25 shadow-xl flex items-center justify-center gap-2 group">
                                {mode === "login" ? "Sign In" : "Create Account"}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-4 text-foreground/40 font-bold">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border border-border font-bold text-sm hover:bg-foreground/5 transition-all">
                                <Chrome className="w-4 h-4" />
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border border-border font-bold text-sm hover:bg-foreground/5 transition-all">
                                <Github className="w-4 h-4" />
                                GitHub
                            </button>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <div className="text-center mt-8">
                        <p className="text-foreground/60 text-sm">
                            {mode === "login" ? "New to Tourisia?" : "Already have an account?"}{" "}
                            <button
                                onClick={toggleMode}
                                className="text-primary font-black hover:underline underline-offset-4"
                            >
                                {mode === "login" ? "Create an account" : "Sign in now"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
