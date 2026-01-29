import React from "react";
import { motion } from "framer-motion";

export default function ProjectsSection() {
    const projects = [
        { title: "Federated Microservice Deployment", description: "RL-based orchestration in vehicular edge computing." },
        { title: "Energy Optimization in VEC", description: "Algorithms for energy-efficient edge server placement." }
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
