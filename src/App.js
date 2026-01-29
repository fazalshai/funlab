import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import TeamSection from "./components/TeamSection";
import ResearchSection from "./components/ResearchSection";
import PublicationsSection from "./components/PublicationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./App.css"; // Ensure standard styles are loaded

function MainApp() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <Carousel />
      <TeamSection />
      <ResearchSection />
      <PublicationsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}