import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-6 tracking-tight"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500">
                    FUN LAB
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl text-lg sm:text-2xl text-gray-400 font-light leading-relaxed"
            >
                Computing for <span className="text-blue-400 font-medium">Secure</span> and <span className="text-purple-400 font-medium">Intelligent</span> Networks. <br />
                Pushing the edge of technology to the future.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 animate-bounce text-gray-500"
            >
                ↓ Scroll to Discover
            </motion.div>
        </section>
    );
}
