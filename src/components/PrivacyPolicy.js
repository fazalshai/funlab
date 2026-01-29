import React, { useEffect } from "react";
import Navbar from "./Navbar";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold mb-8 text-blue-400">Privacy Policy</h1>
                <p className="mb-4 text-gray-300">Last updated: January 29, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Welcome to <strong>Fun Lab</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong>funlab.co.in</strong>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
                    <p className="text-gray-400 leading-relaxed mb-2">
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                    </p>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you strictly voluntarily give to us when you register with the Site or simply choose to participate in various activities related to the Site.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">3. Use of Information</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-400 mt-2 space-y-1">
                        <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                        <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Enable player-to-player communications.</li>
                        <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">4. Google AdSense</h2>
                    <p className="text-gray-400 leading-relaxed">
                        We use Google AdSense to display ads on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
                        You may opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 underline" target="_blank" rel="noreferrer">Google Ads Settings</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">5. Contact Us</h2>
                    <p className="text-gray-400 leading-relaxed">
                        If you have questions or comments about this Privacy Policy, please contact us at:<br />
                        <strong>fazalshaik24434@gmail.com</strong>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
