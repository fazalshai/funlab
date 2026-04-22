import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import BiometricAttendance from "./BiometricAttendance";
import Alumni from "./components/Alumni";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import TeamSection from "./components/TeamSection";
import ResearchSection from "./components/ResearchSection";
import PublicationsSection from "./components/PublicationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
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
        <Route path="/biometric_attendance" element={<BiometricAttendance />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
      </Routes>
    </Router>
  );
}