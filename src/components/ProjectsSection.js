import React from "react";
import { motion } from "framer-motion";

export default function ProjectsSection() {
    const projects = [
        { title: "Optimizing models for TinyML", description: "Efficient model compression and deployment on resource-constrained devices." },
        { title: "Underwater Sensor Networks", description: "Robust communication and data collection systems for underwater environments." },
        { title: "Robotics with LLM Integration", description: "Enhancing edge-based robotic decision making using Large Language Models." }
    ];

    return (
        <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center sm:text-left">
                Key <span className="text-gradient">Projects</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-8 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-2xl font-bold mb-3 text-blue-400">{proj.title}</h3>
                        <p className="text-gray-400 text-lg">{proj.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
