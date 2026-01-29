import React from "react";

const professorPublications = {
    "Dr. Muzakkir Hussain": {
        Journals: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Optimal Deployment of multiple IoT applications on the fog computing</li>
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
        Patents: (
            <ul className="list-disc pl-5 space-y-2">
                <li>System and method for air quality monitoring and alert generation using AI</li>
                <li>Automated attendance registration system</li>
                <li>Medical image analysis using federated edge learning</li>
                <li>Underwater data transmission and object detection</li>
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

export default professorPublications;
