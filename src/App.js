import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";

// Team Images
import MuzakkirImg from "./images/muzakkir.jpg";
import FirojImg from "./images/firojgazi.jpeg";
import AshwiniImg from "./images/ashwini.jpg";
import SamiSirImg from "./images/sami sir.jpg";
import HemanthImg from "./images/hemanth.jpg";
import SurayyaImg from "./images/Surayya-A.jpg";
import MadhuImg from "./images/madhu.jpg";
import NandhiniImg from "./images/nandhini.jpg";
import sahadeb from "./images/sahadeb.png";
import sulthan from "./images/sulthan.jpg";

// Carousel Images
import c1 from "./images/1.jpg";
import c2 from "./images/2.jpg";
import c3 from "./images/3.jpg";
import c4 from "./images/4.jpg";
import c5 from "./images/c1.JPG";
import c6 from "./images/5.jpg";
//import c7 from "./images/6.jpg";

// Publications Data
const professorPublications = {
  "Dr. Muzakkir Hussain": {
    Journals: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Optimal Deployment of Multiple IoT Applications on the Fog Computing</li>
        <li>Resource management in fog computing: Overview and mathematical foundation</li>
        <li>Evolutionary Algorithms for Edge Server Placement in Vehicular Edge Computing</li>
        <li>Swarm Intelligence Theory and Applications in Fog Computing...</li>
        <li>Application Aware Computation Offloading in Vehicular Fog Computing (VFC)</li>
        <li>Facility Location in 6G-aware Vehicular Edge Computing</li>
        <li>Enhanced resource provisioning and migrating virtual machines...</li>
        <li>SONG: A Multi-Objective Evolutionary Algorithm...</li>
        <li>Music Generation Using Deep Learning</li>
        <li>Post-quantum distributed ledger technology...</li>
        <li>Tiered sentence based topic model for multi-document summarization</li>
      </ul>
    ),
  },
  "Dr. Firoj Gazi": {
    Journals: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Resource management in fog computing...</li>
        <li>Evolutionary Algorithms for Edge Server Placement in Vehicular Edge Computing</li>
      </ul>
    ),
    Patents: (
      <ul className="list-disc pl-5 space-y-2">
        <li>System and method for air quality monitoring and alert generation using AI</li>
        <li>Automated attendance registration system</li>
        <li>Medical image analysis using federated edge learning</li>
        <li>Underwater data transmission and object detection</li>
      </ul>
    ),
  },
   "Dr. Aswani Devi": {
    Journals: (
      <>
        <p>Blockchain-Based Resilient Pairing and Bonding of BLE Devices Using Deep Reinforcement Learning - Aguru Aswani Devi; Erukala Suresh Babu; Rajkumar Singh Rathore; Rutvij H. Jhaveri; Francesco Benedetto - IEEE Transactions on Consumer Electronics (2024)</p>
        <hr className="my-3" />
        <p>Reliable-RPL: A Reliability-Aware RPL Protocol Using Trust-Based Blockchain System for Internet of Things - Aswani Devi Aguru; Amrit Pandey; Suresh Babu Erukala; Ali Kashif Bashir; Yaodong Zhu; Rajesh Kaluri - IEEE Transactions on Reliability (2024)</p>
        <hr className="my-3" />
        <p>SCS: A Secure Cloud Storage Framework with Enhanced Integrity and Auditability Using Consortium Blockchain System - Aguru Aswani Devi; Erukala Suresh Babu; Mekala Srinivasa Rao; Rajesh Kaluri; Thippa Reddy Gadekallu - 2024 IEEE International Conference on Smart Internet of Things (SmartIoT), Shenzhen, China.</p>
        <hr className="my-3" />
        <p>A lightweight multi-vector DDoS detection framework for IoT-enabled mobile health informatics systems using deep learning - AD Aguru, SB Erukala - Information Sciences 662, 120209 (2024)</p>
        <hr className="my-3" />
        <p>OTI-IoT: A Blockchain-based Operational Threat Intelligence Framework for Multi-vector DDoS Attacks - A Aguru, S Erukala - ACM Transactions on Internet Technology (2024)</p>
        <hr className="my-3" />
        <p>Blockchain-based Edge Device Authentication Mechanism in SDN-enabled IoT Networks - AD Aguru, SB Erukala - 2024 IEEE 9th International Conference for Convergence in Technology (I2CT), 1-6 (2024)</p>
        <hr className="my-3" />
        <p>Blockchain-based Authentication Mechanism for Edge Devices in Fog-enabled IoT Networks- ES Babu, AA Devi, I Kavati, BKN Srinivasarao - TENCON 2023-2023 IEEE Region 10 Conference (TENCON), 558-563 (2023)</p>
        <hr className="my-3" />
        <p>A lightweight DDoS detection mechanism in IoT networks using entropy and expectation of packet size - AD Aguru, SB Erukala - 2022 IEEE International Symposium on Smart Electronic Systems (iSES), 101-106 (2022)</p>
        <hr className="my-3" />
        <p>A Trust-Based Blockchain System for Secured Migration of BLE Devices in IoT Networks - ES Babu, AA Devi, B Padma - International Symposium on Mobile Internet Security, 308-322 (2022)</p>
        <hr className="my-3" />
        <p>Integrated industrial reference architecture for smart healthcare in internet of things: a systematic investigation - AD Aguru, ES Babu, SR Nayak, A Sethy, A Verma - Algorithms 15 (9), 309 (2022)</p>
        <hr className="my-3" />
        <p>Smart contract based next-generation public key infrastructure (PKI) using permissionless blockchain, AD Aguru, SB Erukala, I Kavati - International Conference on Hybrid Intelligent Systems, 625-635, (2021)</p>
        <hr className="my-3" />
        <p>Text and Non Text for Visually Scene Image Classification Impaired Through Alexnet Transfer Learning Model - AAD, Anil kumar B, Sriramamurthy V - International Journal of Recent Technology and Engineering 8 (1), (2019)</p>
        <hr className="my-3" />
        <p>Chaotic based Lightweight Image Encryption Algorithm for Real-time Application Systems - AA Devi, AV Ramana - International Journal of Recent Technology and Engineering 7 (6S5), (2019)</p>
      </>
    )
  },
  "Dr. Mohammad Abdussami": {
    Journals: (
      <>
        <p>Mohd Shariq, Mauro Conti, Karan Singh, Sanjeev Kumar Dwivedi, Mohammad Abdussami, Ruhul Amin, Mehedi Masud, “Design of Provably Secure and Lightweight Authentication Protocol for Unmanned Aerial Vehicle systems", Computer Communications, Elsevier, vol. 228, December, 2024.</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami, Ruhul Amin, Satyanarayana Vollala, “LASSI: a lightweight authenticated key agreement protocol for fog-enabled IoT deployment", International Journal of Information Security, Springer, Vol. 21, Issue. 6, pp. 1373–1387, September 2022</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami, Ruhul Amin, Satyanarayana Vollala, “Provably secure lightweight authentication protocol for modern health industry using IoMT", Adhoc Networks, Elsevier, vol. 141, pp. 103094, March, 2023</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami, Ruhul Amin, Saravanan Paramasivam, Satyanarayana Vollala, “BSAPM: BlockChain based computationally efficient secured authentication protocol for large scale WSN", Computer Communications, Elsevier, vol. 209, pp. 63–77, September, 2023</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami, Sanjeev Kumar Dwivedi, Taher Al-Shehari, Saravanan Paramasivam, Mohammed Kadrie, Taha Alfakih, Hussain Alsalman, Ruhul Amin, “DEAC-IoT: Design of Lightweight Authenticated Key Agreement Protocol for Intra and Inter-IoT device Communication using ECC with FPGA Implementation", Computers and Electrical Engineering, Elsevier, vol. 120, Part A, September, 2024</p>
        <hr className="my-3" />
        <p>SK Dwivedi, Mohammad Abdussami, Ruhul Amin, Muhammad Khurram Khan, “D3APTS: Design of ECC Based Authentication Protocol and Data Storage for Tactile Internet enabled IoD System with Blockchain", IEEE Transactions on Consumer Electronics, December, 2023.</p>
        <hr className="my-3" />
        <p>Bimal Kumar Meher, Ruhul Amin, Mohammad Abdussami, Venkatasamy Sureshkumar, Md Ajaharul Hossain, “Efficient Certificateless Anonymous Mutual Authentication in WBANs for Smart Healthcare", IEEE Transactions on Intelligent Transportation Systems, June, 2024.</p>
        <hr className="my-3" />
        <p>Isha Pali, Mohammad Abdussami, Ruhul Amin, Taher Al-Shehari, Muna Al-Razgan, Taha Alfakih S2DN: Design of robust authentication protocol with session key establishment in multi-controller based software-defined VANETs", Vehicular Communications, Elsevier, vol. 47, pp. 100767, June, 2024.</p>
        <hr className="my-3" />
        <p>Ruhul Amin, Sakshita Jayaswal, Venkatasamy Sureshkumar, Balram Rathore, Ananya Jha, Mohammad Abdussami, IoDseC++: authenticated key exchange protocol for cloud-enable internet of drone communication", Journal of Ambient Intelligence and Humanized Computing, Springer, vol. 14, pp. 9529–9542, May, 2023.</p>
        <hr className="my-3" />
        <p>Isha Pali, Ruhul Amin, Mohammad Abdussami, “Autonomous vehicle security: Current survey and future research challenges", Security and Privacy, Wiley, January, 2024.</p>
      </>
    ),
    Conferences: (
      <>
        <p>Soham Banerjee, Anubhav Garg, Mohammad S Obaidat, Mohammad Abdussami, Ruhul Amin "SFLAB: Smart FIR Lodging Architecture and Solution Using Blockchain and IPFS Technology", International Conference on Deep Sciences for Computing and Communications, September 2024.</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami et al., “Cryptanalysis and improvement of a blockchain based lightweight authentication and key agreement scheme for Internet of vehicles,” In 2023 International Conference on Communications, Computing, Cybersecurity, and Informatics (CCCI), IEEE, October 18-20, Chongqing, China, 2023, https://doi.org/10.1109/CCCI58712.2023.10290821 (IEEE Xplore)</p>
        <hr className="my-3" />
        <p>Mohammad Abdussami, Ruhul Amin, Satyanarayana Vollala, “Cryptanalysis on ESEAP: ECC based secure and efficient mutual authentication protocol using smart card,” In 2021 International Conference on Computing, Communication and Cyber-security (IC4S), Springer, October 30-31, Ghaziabad, Uttar Pradesh, India, 2021, https://doi.org/10.1007/978-981-19-1142-2.</p>
        </>
    )
  },

  "Dr Sahadeb Shit": {
    Awards: (
      <ul className="list-disc pl-5 space-y-2">
        <li>2023 – Best Paper Award – 3rd IEEE AISP</li>
        <li>2024 – Best Paper Award – IEEE IICCCS</li>
      </ul>
    )
  }
};

// (continued in part 2...)
const teamMembers = [
  { name: "Dr. Muzakkir Hussain", role: "Assistant Professor", department: "Department of Computer Science and Engineering", img: MuzakkirImg },
  { name: "Dr. Firoj Gazi", role: "Assistant Professor", department: "Department of Computer Science and Engineering", img: FirojImg },
  { name: "Dr. Aswani Devi", role: "Assistant Professor", department: "Department of Computer Science and Engineering", img: AshwiniImg },
  { name: "Dr. Mohammad Abdussami", role: "Assistant Professor", department: "Department of Computer Science and Engineering", img: SamiSirImg },
  { name: "Dr Sahadeb Shit", role: "Assistant Professor", department: "Department of Computer Science and Engineering", img: sahadeb },
  { name: "Ms Surayya", role: "PhD Scholar", img: SurayyaImg },
  { name: "Sripalli Hemanth Durga Kumar", role: "PhD Scholar", img: HemanthImg },
  { name: "Madhu Bhushan", role: "PhD Scholar", img: MadhuImg },
  { name: "Sultan Khan", role: "PhD Scholar", img: sulthan },
];

const carouselSlides = [
  { image: c1, title: "Research day-4 winners 2024 (2 golds, 1 silver)" },
  { image: c2, title: "Workshop on AI&ML, IoT 2024" },
  { image: c3, title: "5th Research day winners 2025 (1 gold, 2 silver)" },
  { image: c4, title: "Techpreneur Event presentations 2024" },
  { image: c6, title: "Best Conference paper (2025) TU Darmstadt, Germany" },
  { image: c5, title: "EBC-3.0 Winner & ₹50k cash prize 2025" },
 // { image: c7, title: "MSME grant (2025) ₹10.3 lakhs" },
];

function PublicationContent({ content }) {
  return <div className="prose prose-sm prose-gray max-h-[70vh] overflow-auto">{content}</div>;
}

function MainApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const [activePubSection, setActivePubSection] = useState("Journals");
  const dialogRef = useRef(null);

  const professorsWithPublications = new Set(Object.keys(professorPublications));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOpenDialogIndex(null);
        setActivePubSection("Journals");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      {/* Header */}
      <section className="flex flex-col justify-center items-center text-center py-12 px-6 bg-black">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Fun Lab</h1>
        <p className="max-w-3xl text-base sm:text-lg text-gray-300">Computing for Secure and Intelligent Networks Lab — pushing the edge of technology to the future.</p>
      </section>

      {/* Navbar */}
      <nav className="bg-black py-4 text-center border-b border-gray-700 sticky top-0 z-40">
        <div className="flex justify-center gap-10 uppercase tracking-widest font-semibold text-sm sm:text-base">
          {["Our Team", "Research", "Publications", "Projects", "Contact Us"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-gray-400">{item}</a>
          ))}
        </div>
      </nav>

      {/* Carousel */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-black rounded-lg mx-auto max-w-7xl mt-8 shadow-lg">
        {carouselSlides.map(({ image, title }, i) => (
          <div key={i} className={`absolute top-0 left-1/2 w-full max-w-none max-h-[60vh] -translate-x-1/2 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <img src={image} alt={`Slide ${i + 1}`} className="w-full max-h-[60vh] object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-center px-6 pb-8">
              <h2 className="text-3xl font-bold">{title}</h2>
            </div>
          </div>
        ))}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-30 rounded-full p-1">❮</button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-30 rounded-full p-1">❯</button>
      </section>

      {/* Our Team */}
      <section id="our-team" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-10">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map(({ name, role, department, img }, index) => (
            <div key={name} className="text-center">
              <img
                src={img}
                alt={name}
                className={`w-32 h-32 rounded-full object-cover mx-auto mb-4 cursor-pointer ${professorsWithPublications.has(name) ? "hover:brightness-125" : "opacity-70"}`}
                onClick={() => professorsWithPublications.has(name) && setOpenDialogIndex(index)}
              />
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="text-gray-400 mt-2">{role}{department ? `, ${department}` : ""}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {openDialogIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-20 z-50 overflow-auto px-4">
            <div ref={dialogRef} className="relative max-w-5xl w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
              <button className="absolute top-4 right-4 text-3xl font-bold" onClick={() => { setOpenDialogIndex(null); setActivePubSection("Journals"); }}>&times;</button>
              <nav className="w-full md:w-48 mb-6 md:mb-0 md:mr-8 border-b md:border-b-0 md:border-r border-gray-300">
                {professorPublications[teamMembers[openDialogIndex].name] &&
                  Object.keys(professorPublications[teamMembers[openDialogIndex].name]).map((section) => (
                    <button key={section} className={`block w-full text-left py-3 px-4 hover:bg-gray-200 ${activePubSection === section ? "font-bold bg-gray-200" : ""}`} onClick={() => setActivePubSection(section)}>{section}</button>
                  ))}
              </nav>
              <PublicationContent content={professorPublications[teamMembers[openDialogIndex].name]?.[activePubSection]} />
            </div>
          </div>
        )}
      </section>

      {/* Sections: Research, Publications, Projects, Contact */}
      <section id="research" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Research</h2>
        <p className="text-gray-300 text-xl">Our lab focuses on containerization in vehicular edge computing, microservice orchestration, Kubernetes-based edge service deployment, and cutting-edge AI at the edge.</p>
      </section>

      <section id="publications" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Publications</h2>
        <ul className="list-disc text-gray-300 space-y-3 text-lg max-w-3xl">
          <li>“Energy-Efficient Microservice Placement in VEC,” IEEE Transactions on Cloud Computing, 2025.</li>
          <li>“Reinforcement Learning for Microservice Orchestration,” ACM Symposium on Edge Computing, 2024.</li>
        </ul>
      </section>

      <section id="projects" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Projects</h2>
        <ul className="list-disc text-gray-300 space-y-4 text-lg max-w-3xl">
          <li><strong>Federated Microservice Deployment:</strong> RL-based orchestration in vehicular edge computing.</li>
          <li><strong>Energy Optimization in VEC:</strong> Algorithms for energy-efficient edge server placement.</li>
        </ul>
      </section>

      <section id="contact-us" className="text-center max-w-xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Contact Us</h2>
        <p className="text-gray-400 mb-4 text-xl"><strong>Email:</strong> funlab@example.com</p>
        <p className="text-gray-400 text-xl"><strong>Phone:</strong> +1 (555) 123-4567</p>
      </section>

      <footer className="border-t border-gray-700 py-6 text-center text-gray-500 text-base">
        © {new Date().getFullYear()} Fun Lab. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
