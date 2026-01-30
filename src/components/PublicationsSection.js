import React from "react";
import { motion } from "framer-motion";

export default function PublicationsSection() {
    const papers = [
        {
            title: "Evolutionary algorithm for Edge Server Placement in Vehicular edge computing",
            venue: "IEEE Access",
            link: "https://ieeexplore.ieee.org/abstract/document/10981771"
        },
        {
            title: "OULHM: Optimized UAV Localization Using Hybrid Metaheuristic Techniques",
            venue: "IEEE Journal of Indoor and Seamless Positioning and Navigation",
            link: "https://ieeexplore.ieee.org/abstract/document/10989237"
        },
        {
            title: "Deploying TinyML for Energy-Efficient Object Detection and Communication in Low-Power EdgeAI Systems",
            venue: "Scientific Reports",
            link: "https://www.nature.com/articles/s41598-025-27818-9"
        },
        {
            title: "Facility location in 6G-aware Vehicular Edge Computing",
            venue: "IEEE ANTS 2024",
            link: "https://ieeexplore.ieee.org/abstract/document/10898406"
        },
        {
            title: "Towards Efficient Deployment of Compressed Neural Networks on MCU for EdgeAI Applications",
            venue: "ICMC2025",
            link: "https://link.springer.com/chapter/10.1007/978-981-96-6941-7_11"
        },
        {
            title: "ProTSF: IoT-Based Outdoor Air Pollution Forecasting Using Bayesian Optimization-based LSTM",
            venue: "ICMC2025",
            link: "https://link.springer.com/chapter/10.1007/978-981-96-6941-7_32"
        },
        {
            title: "Leveraging Edge Resources for Indoor Localization for Improved Accuracy",
            venue: "IE2025",
            link: "https://ieeexplore.ieee.org/abstract/document/11130135"
        },
        {
            title: "Integrated Underwater Data Transmission and Object Detection System Using TinyML and Multi-Hop Networks",
            venue: "IE2025",
            link: "https://ieeexplore.ieee.org/abstract/document/11130056"
        },
        {
            title: "ConFi: A Confidence-Aware Framework for Ultra-Precise Indoor Localization in 6G Networks Using UAV-Assisted Wi-Fi Fingerprints",
            venue: "PIMRC 2025",
            link: "https://ieeexplore.ieee.org/document/11275139"
        },
        {
            title: "A Blockchain-Based DDoS Attack Mitigation Framework for Mission-Critical IIoT Environments",
            venue: "PIMRC 2025",
            link: "https://ieeexplore.ieee.org/document/11275504"
        },
        {
            title: "Transparent Intrusion Detection Using ML: Integrating Explainable Models for Cybersecurity",
            venue: "PIMRC 2025",
            link: "https://ieeexplore.ieee.org/document/11274841/"
        },
        {
            title: "Towards Efficient IoUT Vision: Simulated Compressed Image Transmission and Detection",
            venue: "FNWF 2025",
            link: "https://ieeexplore.ieee.org/document/11317199"
        },
        {
            title: "A UAV-Assisted Architecture for Fault-Tolerant LoRa-Based V2I Communication",
            venue: "FNWF 2025",
            link: "https://ieeexplore.ieee.org/document/11317612"
        },
        {
            title: "Dependency-Aware Microservice Placement in Dynamic Vehicular Edge Computing",
            venue: "FNWF 2025",
            link: "https://ieeexplore.ieee.org/document/11317627"
        },
        {
            title: "Resource Management in Fog computing: Overview and Mathematical Foundation",
            venue: "Book Chapter",
            link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781032693217-1/resource-management-fog-computing-surayya-muzakkir-hussain-dinesh-reddy-ahsan-halimi-firoj-gazi"
        }
    ];

    const patents = [
        { title: "A System for Smart Indoor Localization and the Method Thereof", id: "202441067500" },
        { title: "ATTENDEDGE: An EdgeAI-based Smart Attendance System using 3D Object Detection", id: "202441077282" },
        { title: "SYSTEM AND METHOD FOR MEDICAL IMAGE ANALYSIS USING FEDERATED EDGE LEARNING WITH GENERATIVE ADVERSARIAL NETWORKS (FEELGANs)", id: "202441083307" },
        { title: "A SYSTEM FOR DETECTING RETINAL DISEASES", id: "202441066371" },
        { title: "SYSTEM AND METHOD FOR AIR QUALITY MONITORING AND ALERT GENERATION USING ARTIFICIAL INTELLIGENCE", id: "202541000511" },
        { title: "Integrated Underwater Data Transmission and Object Detection System Using TinyML and Multi-Hop Networks", id: "202541016043" },
        { title: "A TinyML test-bed for Real-Time Object Detection in Resource-Constrained Environments", id: "202541087210" }
    ];

    return (
        <section id="publications" className="max-w-7xl mx-auto px-6 py-20">
            {/* Papers Section */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center sm:text-left">
                Latest <span className="text-gradient">Publications</span>
            </h2>
            <div className="space-y-4 max-w-5xl mb-20">
                {papers.map((pub, i) => (
                    <motion.a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="block glass p-6 rounded-xl border-l-[6px] border-l-purple-500 hover:translate-x-2 transition-transform cursor-pointer"
                    >
                        <h3 className="text-gray-200 text-lg font-semibold">{pub.title}</h3>
                        <p className="text-purple-400 text-sm mt-1">{pub.venue}</p>
                    </motion.a>
                ))}
            </div>

            {/* Patents Section */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center sm:text-left">
                <span className="text-gradient">Patents</span>
            </h2>
            <div className="space-y-4 max-w-5xl">
                {patents.map((pat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-xl border-l-[6px] border-l-blue-500 hover:translate-x-2 transition-transform"
                    >
                        <h3 className="text-gray-200 text-lg font-semibold">{pat.title}</h3>
                        <p className="text-blue-400 text-sm mt-1">Application No: {pat.id}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
