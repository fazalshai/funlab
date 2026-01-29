import React, { useEffect } from "react";
import Navbar from "./Navbar";

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold mb-8 text-blue-400">Terms and Conditions</h1>
                <p className="mb-4 text-gray-300">Last updated: January 29, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">1. Agreement to Terms</h2>
                    <p className="text-gray-400 leading-relaxed">
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Fun Lab</strong> ("we," "us" or "our"), concerning your access to and use of the <strong>funlab.co.in</strong> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">2. Intellectual Property Rights</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">3. User Representations</h2>
                    <p className="text-gray-400 leading-relaxed">
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">4. Modifications and Interruptions</h2>
                    <p className="text-gray-400 leading-relaxed">
                        We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">5. Contact Us</h2>
                    <p className="text-gray-400 leading-relaxed">
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:<br />
                        <strong>fazalshaik24434@gmail.com</strong>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
