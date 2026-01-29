import React from "react";
import { motion } from "framer-motion";

export default function PublicationsSection() {
    const pubs = [
        "“Energy-Efficient Microservice Placement in VEC,” IEEE Transactions on Cloud Computing, 2025.",
        "“Reinforcement Learning for Microservice Orchestration,” ACM Symposium on Edge Computing, 2024."
    ];

    return (
        <section id="publications" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center sm:text-left">
                Latest <span className="text-gradient">Publications</span>
            </h2>
            <div className="space-y-4 max-w-5xl">
                {pubs.map((pub, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-xl border-l-[6px] border-l-purple-500 hover:translate-x-2 transition-transform"
                    >
                        <p className="text-gray-300 text-lg">{pub}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
