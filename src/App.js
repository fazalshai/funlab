import React from "react";
import MuzakkirImg from "./images/Muzakkir Hussain.jpeg";
import Firojimg from "./images/firojgazi.jpeg";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-x-hidden">

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')`,
        }}
        aria-label="Lab Introduction"
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-5xl px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
            Fun Lab
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-300 max-w-4xl mx-auto">
            Computing for Secure and Intelligent Networks Lab — pushing the edge of technology to the future.
          </p>
        </div>
        <nav
          className="relative z-10 mt-8 flex flex-wrap justify-center gap-8 uppercase tracking-widest font-semibold text-xs sm:text-sm select-none"
          aria-label="Primary navigation"
        >
          {["Our Team", "Research", "Publications", "Projects", "Contact Us"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-gray-400 transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                {item}
              </a>
            )
          )}
        </nav>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-16 space-y-28 bg-black">

        {/* Our Team */}
        <section id="our-team" aria-labelledby="our-team-title">
          <h2
            id="our-team-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide border-b border-gray-700 pb-3 mb-10 text-white"
          >
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                name: "Muzakkir Hussain",
                role: "Info",
                img: MuzakkirImg,
              },
              {
                name: "Firoj Gazi",
                role: "Info",
                img: Firojimg,
              },
              { name: "PhD Scholar 2", role: "Researcher", color: "bg-neonPink" },
              { name: "Research Engineer", role: "Software & Systems", color: "bg-purple-600" },
              { name: "Lab Manager", role: "Operations & Coordination", color: "bg-indigo-600" },
              { name: "Intern", role: "Research Assistant", color: "bg-pink-600" },
            ].map(({ name, role, color, img }) => (
              <article
                key={name}
                className="flex flex-col items-center cursor-default"
                tabIndex={0}
                aria-label={`${name}, ${role}`}
              >
                {img ? (
                  <img
                    src={img}
                    alt={name}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover mb-5 shadow-lg"
                  />
                ) : (
                  <div
                    className={`${color} w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mb-5`}
                  >
                    <span className="text-white text-4xl font-bold select-none">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">{name}</h3>
                <p className="text-gray-400 text-center mt-2 text-sm sm:text-base md:text-lg">{role}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" aria-labelledby="research-title">
          <h2
            id="research-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide border-b border-gray-700 pb-3 mb-8"
          >
            Research
          </h2>
          <p className="text-gray-300 max-w-full sm:max-w-3xl text-base sm:text-lg md:text-xl">
            Our lab focuses on containerization in vehicular edge computing, microservice orchestration, Kubernetes-based edge service deployment, and cutting-edge AI at the edge.
          </p>
        </section>

        {/* Publications */}
        <section id="publications" aria-labelledby="publications-title">
          <h2
            id="publications-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide border-b border-gray-700 pb-3 mb-8"
          >
            Publications
          </h2>
          <ul className="list-disc list-inside text-gray-300 max-w-full sm:max-w-3xl space-y-3 text-base sm:text-lg">
            <li>“Energy-Efficient Microservice Placement in VEC,” IEEE Transactions on Cloud Computing, 2025.</li>
            <li>“Reinforcement Learning for Microservice Orchestration,” ACM Symposium on Edge Computing, 2024.</li>
            <li>“Containerization Techniques in Vehicular Networks,” Journal of Network and Systems Management, 2023.</li>
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-title">
          <h2
            id="projects-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide border-b border-gray-700 pb-3 mb-8"
          >
            Projects
          </h2>
          <ul className="space-y-4 max-w-full sm:max-w-3xl list-disc list-inside text-gray-300 text-base sm:text-lg">
            <li>
              <strong>Federated Microservice Deployment:</strong> Implementation of RL-based microservice orchestration in vehicular edge computing environments using Kubernetes.
            </li>
            <li>
              <strong>Energy Optimization in VEC:</strong> Multi-objective optimization algorithms for energy-efficient edge server placement.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section
          id="contact-us"
          aria-labelledby="contact-us-title"
          className="max-w-full sm:max-w-md mx-auto text-center px-4"
        >
          <h2
            id="contact-us-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide border-b border-gray-700 pb-3 mb-8"
          >
            Contact Us
          </h2>
          <p className="text-gray-400 mb-4 text-lg sm:text-xl">
            <strong>Email:</strong> funlab@example.com
          </p>
          <p className="text-gray-400 mb-8 text-lg sm:text-xl">
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6 text-center text-gray-500 text-sm sm:text-base select-none">
        © {new Date().getFullYear()} Fun Lab. All rights reserved.
      </footer>
    </div>
  );
}
