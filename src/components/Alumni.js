import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { alumniMembers } from "../data/team";
import { motion } from "framer-motion";

export default function Alumni() {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-blue-500 selection:text-white flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                        Our <span className="text-gradient">Alumni</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Celebrating the researchers and students who have been a vital part of our journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                    {alumniMembers.map((member, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={member.name}
                            className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-300 group"
                        >
                            <div className="relative w-40 h-40 mb-6 rounded-full p-1 overflow-hidden bg-gray-800 group-hover:bg-gradient-to-tr from-blue-500 to-purple-600 transition-colors">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-gray-400 text-sm font-medium mb-1">{member.role}</p>
                            {member.department && <p className="text-gray-500 text-xs px-4">{member.department}</p>}
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
