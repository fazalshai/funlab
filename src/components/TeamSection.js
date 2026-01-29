import React, { useState } from "react";
import { teamMembers, alumniMembers } from "../data/team";
import professorPublications from "../data/publications";
import PublicationModal from "./PublicationModal";
import { motion } from "framer-motion";

export default function TeamSection() {
    const [openDialogIndex, setOpenDialogIndex] = useState(null);
    const [activePubSection, setActivePubSection] = useState("Journals");

    const professorsWithPublications = new Set(Object.keys(professorPublications));

    const handleMemberClick = (index, name) => {
        if (professorsWithPublications.has(name)) {
            setOpenDialogIndex(index);
            setActivePubSection("Journals");
        }
    };

    const closeModal = () => {
        setOpenDialogIndex(null);
    };

    const renderMemberCard = (member, index, isAlumni = false) => {
        const { name, role, department, img } = member;
        // For Alumni, we might disable clicking even if they were professors, or keep it. 
        // Assuming Alumni don't need publication modal for now unless specified.
        const hasPublications = !isAlumni && professorsWithPublications.has(name);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={name}
                className={`glass p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 group ${hasPublications ? "hover:border-blue-500/50 cursor-pointer" : "hover:border-gray-600"}`}
                onClick={() => hasPublications && handleMemberClick(index, name)}
            >
                <div
                    className={`relative w-40 h-40 mb-6 rounded-full p-1 overflow-hidden ${hasPublications ? "bg-gradient-to-tr from-blue-500 to-purple-600" : "bg-gray-800"}`}
                >
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <h3 className={`text-xl font-bold mb-2 transition-colors ${hasPublications ? "group-hover:text-blue-400" : "text-white"}`}>
                    {name}
                </h3>
                <p className="text-gray-400 text-sm font-medium mb-1">{role}</p>
                {department && <p className="text-gray-500 text-xs px-4">{department}</p>}
            </motion.div>
        );
    };

    return (
        <section id="our-team" className="max-w-7xl mx-auto px-6 py-20 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10" />

            {/* Active Team */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">
                Meet <span className="text-gradient">The Team</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {teamMembers.map((member, index) => renderMemberCard(member, index))}
            </div>

            {/* Alumni Section */}
            {alumniMembers && alumniMembers.length > 0 && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-10"
                    >
                        <div className="h-[1px] w-20 bg-gray-700"></div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-400 uppercase tracking-widest">
                            Alumni
                        </h2>
                        <div className="h-[1px] w-20 bg-gray-700"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {alumniMembers.map((member, index) => renderMemberCard(member, index, true))}
                    </div>
                </>
            )}

            {openDialogIndex !== null && (
                <PublicationModal
                    isOpen={true}
                    onClose={closeModal}
                    professorName={teamMembers[openDialogIndex].name}
                    publications={professorPublications[teamMembers[openDialogIndex].name]}
                    activeSection={activePubSection}
                    setActiveSection={setActivePubSection}
                />
            )}
        </section>
    );
}
