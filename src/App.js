import React, { useState, useEffect, useRef } from "react";
import MuzakkirImg from "./images/muzakkir.jpg";
import Firojimg from "./images/firojgazi.jpeg";
import ashwinimam from "./images/ashwini.jpg";
import samisir from "./images/sami sir.jpg";
import hemanth from "./images/hemanth.jpg";
import Surayya from "./images/Surayya-A.jpg";
import madhu from "./images/madhu anna.jpg";
import nandhini from "./images/nandhini.jpg";
import c1 from "./images/c1.JPG";

const carouselImages = [
  c1, c1, c1, c1, c1, c1, c1, c1, c1,
];

// Publication data per professor keyed by their name
const professorPublications = {
  "Dr. Muzakkir Hussain": {
    Journals: (
      <>
        <p><strong>M M Hussain</strong>, M. M. Sufyan Beg, “CODE-V: Multi-Hop Computation Offloading in Vehicular Fog Computing”, Future Generation Computer Systems, vol-116, pp. 86-102, Elsevier (I.F.- 7.15)</p>
        <hr className="my-3" />
        <p><strong>M M Hussain</strong>, Ahmad Taher Azar, Rafeeq Ahmed, Syed Umar Amin, Basit Qureshi, V. Dinesh Reddy, Irfan Alam, and Zafar Iqbal Khan. "SONG: A Multi-Objective Evolutionary Algorithm for Delay and Energy Aware Facility Location in Vehicular Fog Networks." Sensors 23, no. 2 (2023): 667 (I.F.-3.8)</p>
        <hr className="my-3" />
        <p>Vemula, Dinesh Reddy, Mahesh Kumar Morampudi, Sonam Maurya, Ashu Abdul, <strong>M M Hussain</strong>, and Ilaiah Kavati. "Enhanced resource provisioning and migrating virtual machines in heterogeneous cloud data center." Journal of Ambient Intelligence and Humanized Computing (2022): 1-12 (I.F.- 7.1).</p>
        <hr className="my-3" />
        <p><strong>M M Hussain</strong>, M. M. Sufyan Beg, M. S. Alam, “Fog Computing for Big Data Analytics in IoT Aided Smart Grid Networks”, Wireless Personal Communications, Springer, 2020 (I.F.- 2.2)</p>
        <hr className="my-3" />
        <p><strong>M M Hussain</strong>, M. S. Alam, M. M. Sufyan Beg, Nadeem Akhtar, “Towards Minimizing Delay and Energy Consumption in Vehicular Fog Computing (VFC)”, Journal of Intelligent and Fuzzy Systems, IOS Press, 2020 (I.F.- 1.85)</p>
      </>
    ),
    Conferences: (
      <>
        <p>M M Hussain, Dinesh Reddy Vemula, Ashu Abdul, “A Novel Evolutionary Algorithm for Facility Location in Vehicular Fog Computing (VFC) Networks”, In 3rd International Conference on Machine Learning, Image Processing, Network Security and Data Sciences (MIND-2021), 11-12th December 2021, NIT Raipur, India</p>
        <hr className="my-3" />
        <p>M M Hussain, Mohammad Saad Alam, M.M. Sufyan Beg, “Fog Computing for Smart Grid transition-Requirements, Challenges and Status Quos”, In ACM BDCC,2019</p>
      </>
    ),
    Patents: (
      <>
        <p>M. S. Alam, M M Hussain, M.M.Sufyan Beg, “BIG DATA TO (B2V) ELECTRIC, PLUGIN HYBRID ELECTRIC VEHICLE'S (xEVS) KNOWLEDGE BASE MANAGEMENT SYSTEM” Patent published in India.</p>
      </>
    ),
    BookChapters: (
      <>
        <p>Dinesh Reddy Vemula, M M Hussain, “Nighttime Object Detection: A Night-Patrolling Mechanism Using Object Detection”, In Handbook of Research on AI Methods and Applications in Computer Engineering, IGI Global, 2023</p>
      </>
    )
  },
  "Dr. Firoj Gazi": {
    Journals: (
      <>
        <p>1. Towards smart city: sensing air quality in city based on opportunistic crowd-sensing J Dutta, C Chowdhury, S Roy, AI Middya, F Gazi - Proceedings of the 18th international conference on …, 2017</p>
        <hr className="my-3" />
        <p>2. Aquastream: Multihop multimedia streaming over acoustic channel in severely resource-constrained IoT networks A Mukherjee, F Gazi, N Pathak, S Misra - IEEE Internet of Things Journal, 2021</p>
        <hr className="my-3" />
        <p>3. ProStream: Programmable Underwater IoT Network for Multimedia Streaming F Gazi, N Ahmed, S Misra, MK Tiwari - IEEE Internet of Things Journal, 2022</p>
        <hr className="my-3" />
        <p>4. UnRest: Underwater reliable acoustic communication for multimedia streaming F Gazi, S Misra, N Ahmed, A Mukherjee, N Kumar - GLOBECOM 2020-2020 IEEE Global Communications …, 2020</p>
        <hr className="my-3" />
        <p>5. An IoT based intelligent traffic congestion control system for road crossings P Sadhukhan, F Gazi - … on Communication, Computing and Internet of Things …, 2018</p>
        <hr className="my-3" />
        <p>6. Measuring real-time road traffic queue length: a reliable approach using ultrasonic sensor A Mandal, P Sadhukhan, F Gaji, P Sharma - Proceedings of the 2nd International Conference on …, 2019</p>
        <hr className="my-3" />
        <p>7. Reinforcement learning-based MAC protocol for underwater multimedia sensor networks F Gazi, N Ahmed, S Misra, W Wei - ACM Transactions on Sensor Networks (TOSN), 2022</p>
        <hr className="my-3" />
        <p>8. RE-MAC: A Hybrid MAC Protocol for Underwater Multimedia Communication System F Gazi, N Ahmed, S Misra - IEEE Systems Journal, 2022</p>
      </>
    )
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
  }
};

// Helper component to render dynamic publications
function PublicationContent({ content }) {
  return (
    <div className="prose prose-sm prose-gray max-h-[70vh] overflow-auto">
      {content}
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const [activePubSection, setActivePubSection] = useState("Journals");
  const dialogRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target)
      ) {
        setOpenDialogIndex(null);
        setActivePubSection("Journals"); // reset tab on close
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Muzakkir Hussain",
      role: "Assistant Professor",
      department: "Department of Computer Science and Engineering",
      img: MuzakkirImg,
    },
    {
      name: "Dr. Firoj Gazi",
      role: "Assistant Professor",
      department: "Department of Computer Science and Engineering",
      img: Firojimg,
    },
    {
      name: "Dr. Aswani Devi",
      role: "Assistant Professor",
      department: "Department of Computer Science and Engineering",
      img: ashwinimam,
    },
    {
      name: "Dr. Mohammad Abdussami",
      role: "Assistant Professor",
      department: "Department of Computer Science and Engineering",
      img: samisir,
    },
    {
      name: "Ms Surayya",
      role: "PhD Scholar",
      img: Surayya,
    },
    {
      name: "Sripalli Hemanth Durga Kumar",
      role: "PhD Scholar",
      img: hemanth,
    },
    {
      name: "Madhu Bhushan",
      role: "PhD Scholar",
      img: madhu,
    },
    {
      name: "Nandhini",
      role: "PhD Scholar",
      img: nandhini,
    },
  ];

  const professorsWithPublications = new Set([
    "Dr. Muzakkir Hussain",
    "Dr. Firoj Gazi",
    "Dr. Aswani Devi",
    "Dr. Mohammad Abdussami"
  ]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));

  // Get the current selected professor name (if any)
  const currentProfessor = openDialogIndex !== null ? teamMembers[openDialogIndex].name : null;
  // Get publications content for current professor or empty
  const currentPublications = currentProfessor ? professorPublications[currentProfessor] || {} : {};

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-x-hidden relative">
      {/* Hero Text Section */}
      <section className="flex flex-col justify-center items-center text-center py-12 px-6 sm:px-10 bg-black">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
          Fun Lab
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-gray-300">
          Computing for Secure and Intelligent Networks Lab — pushing the edge of technology to the future.
        </p>
      </section>

      {/* Navigation Menu */}
      <nav className="bg-black py-4 text-center border-b border-gray-700 sticky top-0 z-40">
        <div className="flex justify-center gap-10 uppercase tracking-widest font-semibold text-sm sm:text-base">
          {["Our Team", "Research", "Publications", "Projects", "Contact Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Carousel Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-black rounded-lg mx-auto max-w-7xl mt-8 shadow-lg">
        {carouselImages.map((img, i) => (
          <img
            key={i}
            src={typeof img === "string" ? img : img}
            alt={`Slide ${i + 1}`}
            className={`absolute top-0 left-1/2 w-full max-w-none max-h-[50vh] -translate-x-1/2 object-cover transition-opacity duration-1000 ease-in-out rounded-lg ${
              i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="lazy"
          />
        ))}

        {/* Overlay for subtle darkening */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg pointer-events-none"></div>

        {/* Text overlay on carousel */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 z-20 pointer-events-none">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
            Welcome to Fun Lab
          </h2>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-300 drop-shadow-md">
            Computing for Secure and Intelligent Networks Lab — pushing the edge of technology to the future.
          </p>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 text-white text-4xl bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-60 transition"
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 text-white text-4xl bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-60 transition"
          aria-label="Next Slide"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-4 h-4 rounded-full ${
                i === currentSlide ? "bg-white" : "bg-white bg-opacity-40"
              } transition`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Our Team Section with modal dialog */}
      <section id="our-team" className="max-w-7xl mx-auto px-6 py-16 relative">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-10">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map(({ name, role, department, img }, index) => (
            <div key={name} className="relative text-center">
              <img
                src={img}
                alt={name}
                className={`w-32 h-32 md:w-36 md:h-36 rounded-full object-cover mx-auto shadow-lg mb-4 cursor-pointer ${
                  professorsWithPublications.has(name) ? "hover:brightness-125" : "opacity-70 cursor-default"
                }`}
                onClick={() => {
                  if (professorsWithPublications.has(name)) {
                    setOpenDialogIndex(index);
                  }
                }}
                tabIndex={professorsWithPublications.has(name) ? 0 : -1}
                onKeyDown={e => {
                  if ((e.key === "Enter" || e.key === " ") && professorsWithPublications.has(name)) {
                    setOpenDialogIndex(index);
                  }
                }}
              />
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="text-gray-400 mt-2">
                {role}
                {department ? `, ${department}` : ""}
              </p>
            </div>
          ))}
        </div>

        {/* Modal dialog */}
        {openDialogIndex !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-20 z-50 overflow-auto px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              ref={dialogRef}
              className="relative max-w-5xl w-full bg-white rounded-lg shadow-lg p-8 text-gray-900 flex flex-col md:flex-row"
            >
              <button
                className="absolute top-4 right-4 text-gray-900 text-3xl font-bold hover:text-red-600 transition"
                aria-label="Close publications dialog"
                onClick={() => {
                  setOpenDialogIndex(null);
                  setActivePubSection("Journals");
                }}
              >
                &times;
              </button>

              {/* Side nav */}
              <nav className="w-full md:w-48 mb-6 md:mb-0 md:mr-8 border-b md:border-b-0 md:border-r border-gray-300 text-gray-700">
                {Object.keys(professorPublications[teamMembers[openDialogIndex].name]).map((section) => (
                  <button
                    key={section}
                    className={`block w-full text-left py-3 px-4 hover:bg-gray-200 focus:bg-gray-200 transition ${
                      activePubSection === section ? "font-bold bg-gray-200" : ""
                    }`}
                    onClick={() => setActivePubSection(section)}
                  >
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                ))}
              </nav>

              {/* Content */}
              <PublicationContent content={professorPublications[teamMembers[openDialogIndex].name][activePubSection]} />
            </div>
          </div>
        )}
      </section>

      {/* Research Section */}
      <section id="research" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Research</h2>
        <p className="text-gray-300 max-w-3xl text-xl">
          Our lab focuses on containerization in vehicular edge computing,
          microservice orchestration, Kubernetes-based edge service deployment,
          and cutting-edge AI at the edge.
        </p>
      </section>

      {/* Publications Section */}
      <section id="publications" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Publications</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-3 text-lg max-w-3xl">
          <li>“Energy-Efficient Microservice Placement in VEC,” IEEE Transactions on Cloud Computing, 2025.</li>
          <li>“Reinforcement Learning for Microservice Orchestration,” ACM Symposium on Edge Computing, 2024.</li>
          <li>“Containerization Techniques in Vehicular Networks,” Journal of Network and Systems Management, 2023.</li>
        </ul>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Projects</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-4 text-lg max-w-3xl">
          <li><strong>Federated Microservice Deployment:</strong> RL-based orchestration in vehicular edge computing.</li>
          <li><strong>Energy Optimization in VEC:</strong> Algorithms for energy-efficient edge server placement.</li>
        </ul>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="text-center max-w-xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold border-b border-gray-700 pb-3 mb-8">Contact Us</h2>
        <p className="text-gray-400 mb-4 text-xl"><strong>Email:</strong> funlab@example.com</p>
        <p className="text-gray-400 text-xl"><strong>Phone:</strong> +1 (555) 123-4567</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6 text-center text-gray-500 text-base select-none">
        © {new Date().getFullYear()} Fun Lab. All rights reserved.
      </footer>
    </div>
  );
}
