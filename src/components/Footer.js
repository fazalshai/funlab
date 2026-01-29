import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">FUN LAB</h2>
                    <p className="text-gray-500 text-sm">Computing for Secure and Intelligent Networks</p>
                </div>

                <div className="flex gap-6 text-sm font-medium text-gray-400">
                    <a href="#research" className="hover:text-blue-400 transition-colors">Research</a>
                    <a href="#publications" className="hover:text-blue-400 transition-colors">Publications</a>
                    <a href="#contact-us" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>

                <p className="text-gray-600 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
