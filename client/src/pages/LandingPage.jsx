import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, Zap, Activity, Heart, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#0a0f18] text-white overflow-hidden relative font-['Outfit',sans-serif]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Activity size={24} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        MediChain
                    </span>
                </div>
                <div className="hidden md:flex gap-8 text-gray-400 font-medium">
                    <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
                    <a href="#security" className="hover:text-teal-400 transition-colors">Security</a>
                </div>
                <Link to="/auth" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold transition-all backdrop-blur-md">
                    Log In
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-8"
                >
                    <ShieldCheck size={16} />
                    Secured by Blockchain-inspired Hashing
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
                >
                    Your Health History <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                        Unified & Protected
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    The next generation of medical record management. Fast, encrypted, and decentralized access 
                    to your complete health timeline, shared only with those you trust.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link to="/auth" className="px-10 py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-teal-500/20">
                        Start Your Profile
                    </Link>
                    <Link to="/auth" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
                        Explore Features
                    </Link>
                </motion.div>

                {/* Features Grid */}
                <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {[
                        { icon: <Shield className="text-teal-400" />, title: 'Military-Grade Security', desc: 'All records are hashed and encrypted. You hold the key to your data.' },
                        { icon: <Clock className="text-blue-400" />, title: 'Immutable Timeline', desc: 'Track every diagnosis and prescription in a permanent, chronological record.' },
                        { icon: <Zap className="text-teal-400" />, title: 'Instant Access', desc: 'Generate secure access codes for doctors in seconds. No more paperwork.' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md text-left group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Bottom Section */}
            <footer className="border-t border-white/5 py-12 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Heart size={16} className="text-teal-500" />
                        <span>Empowering patients worldwide</span>
                    </div>
                    <p>&copy; 2026 MediChain. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
