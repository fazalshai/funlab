import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carouselSlides from "../data/carousel";

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

    if (!carouselSlides || carouselSlides.length === 0) {
        return null;
    }

    if (!carouselSlides[currentSlide]) {
        return null; // Safety check
    }

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-black mx-auto mt-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {/* LAYER 1: Blurred Background (Ambient Fill) */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={carouselSlides[currentSlide].image}
                            alt=""
                            initial={{ scale: 1.2, filter: "blur(20px)" }}
                            animate={{ scale: 1.3, filter: "blur(20px)" }}
                            transition={{ duration: 6 }}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40" /> {/* Darken blur */}
                    </div>

                    {/* LAYER 2: Main Image (Unified Height Gallery Mode) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative z-10 flex items-center justify-center pointer-events-none"
                        style={{ height: '65vh' }}
                    >
                        <img
                            src={carouselSlides[currentSlide].image}
                            alt={carouselSlides[currentSlide].title}
                            className="h-full w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-xl border-2 border-white/20"
                        />
                    </motion.div>

                    {/* LAYER 3: Text & Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-20 pointer-events-none" />

                    <div className="absolute bottom-20 left-0 right-0 z-30 flex flex-col items-center text-center px-6">
                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-wide drop-shadow-xl"
                        >
                            {carouselSlides[currentSlide].title}
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center items-center gap-6">
                <button onClick={prevSlide} className="text-white/60 hover:text-white text-5xl transition-colors focus:outline-none">‹</button>
                <div className="flex gap-3">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-gray-600 hover:bg-gray-500"}`}
                        />
                    ))}
                </div>
                <button onClick={nextSlide} className="text-white/60 hover:text-white text-5xl transition-colors focus:outline-none">›</button>
            </div>
        </section>
    );
}
