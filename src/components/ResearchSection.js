import React from "react";
import { motion } from "framer-motion";

export default function ResearchSection() {
    const researchAreas = [
        {
            title: "Federated Learning",
            description: "Privacy-preserving AI on Edge Devices, Healthcare systems, and Cyber Security applications."
        },
        {
            title: "Autonomous Systems",
            description: "Next-gen orchestration for Autonomous Vehicles and Robotics."
        },
        {
            title: "Edge AI & TinyML",
            description: "Deploying lightweight machine learning models on resource-constrained devices."
        },
        {
            title: "Cloud & Edge Computing",
            description: "Containerization, Microservice orchestration, and Kubernetes-based deployment."
        }
    ];

    return (
        <section id="research" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center sm:text-left">
                Our <span className="text-gradient">Research Focus</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {researchAreas.map((area, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-8 rounded-3xl border-l-4 border-l-blue-500 hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-2xl font-bold mb-3 text-white">{area.title}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {area.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
