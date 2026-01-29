import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PublicationContent({ content }) {
    return <div className="prose prose-invert prose-sm max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">{content}</div>;
}

export default function PublicationModal({ isOpen, onClose, professorName, publications, activeSection, setActiveSection }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    ref={dialogRef}
                    className="relative max-w-5xl w-full bg-gray-900 border border-gray-700 text-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row overflow-hidden"
                >
                    <button className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white transition-colors" onClick={onClose}>&times;</button>

                    {/* Sidebar Navigation */}
                    <nav className="w-full md:w-64 mb-6 md:mb-0 md:mr-8 border-b md:border-b-0 md:border-r border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-blue-400">{professorName}</h3>
                        <div className="flex overflow-x-auto md:flex-col gap-2 pb-2 md:pb-0">
                            {Object.keys(publications).map((section) => (
                                <button
                                    key={section}
                                    className={`text-left px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${activeSection === section
                                            ? "bg-blue-600/20 text-blue-400 border border-blue-600/50"
                                            : "hover:bg-gray-800 text-gray-300"
                                        }`}
                                    onClick={() => setActiveSection(section)}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Content Area */}
                    <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">{activeSection}</h4>
                        <PublicationContent content={publications[activeSection]} />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
