import React from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section id="contact-us" className="text-center max-w-3xl mx-auto px-6 pb-20 pt-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-12 rounded-3xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
                <div className="space-y-4 text-left inline-block">
                    <div className="mb-6">
                        <p className="text-xl font-bold text-white">Dr. Firoj Gazi</p>
                        <p className="text-blue-400">Assistant Professor</p>
                        <p className="text-gray-400 mt-1">+91 84207 27174</p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-700 my-4" />

                    <div className="mb-6">
                        <p className="text-xl font-bold text-white">Ch Madhu Bhushan</p>
                        <p className="text-green-400">PhD Scholar</p>
                        <a href="mailto:edgeaisrm@srmap.edu.in" className="text-gray-400 hover:text-white transition-colors block">edgeaisrm@srmap.edu.in</a>
                        <p className="text-gray-400 mt-1">+91 78719 47079</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
