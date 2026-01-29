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
                <div className="space-y-4">
                    <p className="text-gray-300 text-xl font-light">
                        <span className="font-semibold text-white block mb-1">Email</span>
                        <a href="mailto:edgeaisrm@srmap.edu.in" className="text-blue-400 hover:underline">edgeaisrm@srmap.edu.in</a>
                    </p>
                    <div className="w-16 h-[1px] bg-gray-700 mx-auto my-6" />
                    <p className="text-gray-300 text-xl font-light">
                        <span className="font-semibold text-white block mb-1">Phone</span>
                        +1 (555) 123-4567
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
