import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (id) => {
        setMobileMenuOpen(false);
        if (id === "alumni") {
            navigate("/alumni");
            return;
        }

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const section = document.getElementById(id);
                if (section) section.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const section = document.getElementById(id);
            if (section) section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = ["Our Team", "Research", "Publications", "Projects", "Alumni", "Contact Us"];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-xl border-b border-gray-800" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="md:w-48 w-32 cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/images/funlab_logo_full.png" alt="FUN LAB" className="w-full object-contain" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 uppercase tracking-widest font-semibold text-sm">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item.toLowerCase().replace(/\s+/g, "-"))}
                                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white text-2xl focus:outline-none z-50 relative"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                onClick={() => handleNavClick(item.toLowerCase().replace(/\s+/g, "-"))}
                                className="text-2xl font-bold text-white hover:text-blue-500 tracking-wider"
                            >
                                {item}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
