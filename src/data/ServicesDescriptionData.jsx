const ServiceDescription = {
  "Automatic Gates": {
    name: "Automatic Gates Installation",
    publicUrl: "automatic-gates",
    type: "perimeter",
    shortDescription:
      "Automatic gates enhance property security while offering convenience through controlled access.",
    image: { url: "", alt: "" },
    fullDescription:
      "Automatic gates provide secure and convenient entry management for residential, commercial, and community properties. They operate with remote controls, keypads, biometric access, or mobile apps, ensuring only authorized users gain entry. Built with strong materials and advanced mechanisms, they can be integrated with intercoms, cameras, and access control systems for a fully automated security solution. Automatic gates also improve property value, curb appeal, and overall safety.",
    systemFunctions: [
      "Provides controlled entry through remote or automated operation.",
      "Integrates with intercoms, cameras, and biometric systems.",
      "Enhances both property security and user convenience.",
    ],
    howItWorks: {
      description:
        "Automatic gates operate using motors and control units that open or close gates via remote signals, keypads, RFID tags, or mobile applications. Safety sensors prevent accidents by stopping or reversing the gate if an obstacle is detected. The system can integrate with CCTV, access control, or intercoms to verify and authorize entry.",
      keyPoints: [
        "Powered by motors controlled through remote signals or access systems.",
        "Supports multiple access methods: remote, keypad, card, biometric, or app.",
        "Safety sensors detect obstacles to prevent damage or injury.",
        "Integration with intercoms and cameras for verification before entry.",
        "Durable construction suitable for residential or commercial properties.",
      ],
    },
    useCases: [
      "Residential homes — secure driveways with remote-controlled gates.",
      "Gated communities — centralize and control resident and visitor access.",
      "Commercial properties — regulate vehicle entry into business premises.",
      "Industrial facilities — secure entry points for trucks and staff.",
      "High-value estates — enhance privacy and property value with automated access.",
    ],
  },

  "Electric Fence": {
    name: "Electric Fence Installation",
    publicUrl: "electric-fence",
    type: "perimeter",
    shortDescription:
      "Electric fences provide an extra layer of defense to secure your property from intruders.",
    image: { url: "electricFence", alt: "Electric Fence" },
    fullDescription:
      "Electric fences are one of the most effective solutions for perimeter security, creating both a physical and psychological barrier against intruders. They deliver a non-lethal electric shock to deter unauthorized entry attempts. Designed for residential, commercial, and industrial sites, electric fences can be integrated with alarm systems and monitoring platforms to provide immediate alerts. Durable and weather-resistant, they are suitable for securing large or high-risk perimeters.",
    systemFunctions: [
      "Delivers a non-lethal electric shock to deter intruders.",
      "Integrates with alarm systems for real-time intrusion alerts.",
      "Suitable for residential, commercial, and industrial perimeter security.",
    ],
    howItWorks: {
      description:
        "An electric fence system consists of energizers that convert power into high-voltage pulses, which are sent through fence wires. When an intruder touches the fence, they receive a non-lethal shock that discourages entry. The system can trigger alarms and notifications if the fence is cut, tampered with, or breached. Designed with insulators and grounding systems, electric fences are safe, effective, and weather-resistant.",
      keyPoints: [
        "Energizers send safe, high-voltage pulses through fence wires.",
        "Delivers a non-lethal shock to deter intruders instantly.",
        "Integrates with alarm panels for immediate alerts on breaches.",
        "Durable construction withstands outdoor and harsh conditions.",
        "Scalable design suitable for residential, commercial, or industrial perimeters.",
      ],
    },
    useCases: [
      "Residential estates — protect homes and gated communities from intrusion.",
      "Farms & ranches — safeguard crops, livestock, and land perimeters.",
      "Factories & warehouses — secure large industrial zones.",
      "Commercial complexes — deter unauthorized access to business properties.",
      "High-security facilities — integrate with surveillance for multi-layer protection.",
      "Remote sites — provide perimeter security in areas without constant patrols.",
    ],
  },

  "CCTV Cameras": {
    name: "CCTV cameras Installation",
    type: "cameras",
    publicUrl: "cctv-cameras",
    shortDescription:
      "HARRISTECH installs CCTV cameras that deliver high-resolution surveillance with secure remote access from any internet-connected device.",
    front_image: "",
    top_image: "",
    intermediate_image: "",
    fullDescription:
      "Internet Protocol (IP) cameras are advanced security systems designed for real-time video surveillance over a network. These cameras provide crystal-clear footage, often in HD or higher resolutions, and allow users to access live or recorded video remotely through mobile apps or web platforms. They are equipped with motion detection, night vision, and sometimes even AI-driven analytics like facial recognition. Perfect for both residential and commercial use, IP cameras ensure constant monitoring, giving you peace of mind even when you're away.",
    systemFunctions: [
      "HD video streaming with remote access.",
      "Supports features like motion detection, cloud storage, and two-way audio.",
      "Ideal for monitoring homes, offices, or large commercial spaces.",
    ],
    howItWorks: {
      description:
        "IP cameras connect to your local network via Ethernet or Wi-Fi and transmit video footage to a Network Video Recorder (NVR), cloud storage, or directly to mobile/web apps. Each camera has its own IP address, enabling independent configuration, monitoring, and management. The system can be scaled from a single camera to a multi-site deployment with centralized control.",
      keyPoints: [
        "Each camera has a unique IP address for direct access and configuration.",
        "Video streams are transmitted securely over the network or internet.",
        "Supports storage options: local NVRs, SD cards, or cloud platforms.",
        "Remote access through mobile apps or secure web portals.",
        "Scales easily from one camera to enterprise-wide systems.",
      ],
    },
    useCases: [
      "Residential security — monitor entrances, driveways, and indoor spaces.",
      "Retail & small business surveillance — prevent theft and oversee operations.",
      "Office & corporate environments — ensure workplace safety and access monitoring.",
      "Industrial sites — oversee production lines, warehouses, and restricted zones.",
      "Parking lots & outdoor areas — monitor vehicles and large open spaces.",
      "Educational institutions — enhance campus security and student safety.",
    ],
  },

  "Access Control": {
    name: "Biometric Systems",
    type: "biometric",
    publicUrl: "biometric-systems",
    shortDescription:
      "Biometric access control systems provide secure, personalized entry to buildings and sensitive areas.",
    image: { url: "", alt: "" },
    fullDescription:
      "Biometric access control systems use unique identifiers such as fingerprints, facial recognition, or iris scans to grant entry only to authorized individuals. Unlike traditional keys or cards, biometric data cannot be lost, stolen, or easily duplicated, significantly reducing security risks. These systems are widely used in homes, offices, and high-security environments like banks, research labs, and data centers, offering both convenience and uncompromising security.",
    systemFunctions: [
      "Uses biometric data (fingerprint, face, iris) for secure entry.",
      "Eliminates the risk of lost/stolen keys or cards.",
      "Supports audit trails and access logs for monitoring.",
      "Ideal for offices, homes, and high-security facilities.",
    ],
    howItWorks: {
      description:
        "Biometric access control systems capture and store encrypted biometric templates during enrollment. When a person attempts entry, their biometric data is scanned and compared against the stored database. If the match is successful, the access point (door, gate, or turnstile) unlocks. Systems can be integrated with alarm systems, CCTV, or attendance software for enhanced functionality.",
      keyPoints: [
        "Enrollment process captures and stores biometric templates securely.",
        "Scans fingerprints, facial features, or iris patterns at access points.",
        "Compares live data with stored templates for authentication.",
        "Integration with doors, gates, and alarm systems for automated control.",
        "Maintains access logs and reports for auditing and compliance.",
      ],
    },
    useCases: [
      "Corporate offices — secure entry for employees and visitors.",
      "Residential complexes — restrict unauthorized access to apartments or gated communities.",
      "Financial institutions — protect sensitive areas like vaults and server rooms.",
      "Healthcare facilities — secure labs, pharmacies, and patient data centers.",
      "Educational institutions — control access to classrooms, hostels, and exam halls.",
      "Government and defense — safeguard high-security or restricted zones.",
    ],
  },

  "Attendance Systems": {
    name: "Attendance Systems Installation",
    type: "biometric",
    publicUrl: "attendance-systems",
    shortDescription:
      "Biometric attendance systems track employee presence with unmatched accuracy and accountability.",
    image: { url: "", alt: "" },
    fullDescription:
      "Biometric attendance systems streamline workforce management by using fingerprints, facial recognition, or other biometric markers to record attendance. This prevents time fraud such as 'buddy punching' and eliminates manual data entry errors. The systems generate real-time reports, integrate with payroll software, and can be scaled for small businesses or large enterprises. They ensure transparency, accuracy, and improved productivity in employee management.",
    systemFunctions: [
      "Records attendance using biometric scans.",
      "Eliminates manual entry errors and time fraud.",
      "Generates real-time attendance and payroll reports.",
      "Scalable for small to enterprise-level organizations.",
    ],
    howItWorks: {
      description:
        "Employees register their biometric data during enrollment. Each time they check in or out, the system verifies their biometric input against the stored database. Data is logged instantly and can be integrated with HR and payroll systems to automate reporting and salary processing. Cloud-enabled systems also allow centralized monitoring across multiple branches.",
      keyPoints: [
        "Enrollment captures biometric templates for each employee.",
        "Employees scan fingerprint or face to mark attendance.",
        "System validates the input against stored records.",
        "Attendance logs are updated in real time and stored securely.",
        "Integration with HR/payroll software for automated processing.",
      ],
    },
    useCases: [
      "Small businesses — automate time-tracking and reduce paperwork.",
      "Corporate offices — prevent time fraud and improve accountability.",
      "Factories & warehouses — manage large workforce shifts effectively.",
      "Educational institutions — track student and staff attendance.",
      "Retail chains — synchronize attendance across multiple branches.",
      "Remote teams — cloud-enabled attendance for distributed workforce.",
    ],
  },

  "Software And Solutions": {
    name: "Software and Solutions",
    type: "biometric",
    publicUrl: "software-and-solutions",

    shortDescription:
      "Customized biometric software solutions that integrate seamlessly with your security infrastructure.",
    image: { url: "", alt: "" },
    fullDescription:
      "Our software solutions for biometric and security systems are designed to integrate hardware devices into a centralized platform. From access control to attendance tracking, the software provides real-time monitoring, analytics, reporting, and automation. These solutions are adaptable to industries such as corporate offices, schools, factories, and government institutions. They are secure, scalable, and tailored to simplify system management while improving operational efficiency.",
    systemFunctions: [
      "Customized software for seamless integration with biometric devices.",
      "Real-time monitoring, analytics, and automated reporting.",
      "Scalable and secure for businesses of any size or industry.",
    ],
    howItWorks: {
      description:
        "The software connects biometric and security hardware devices into a unified management platform. Data from devices (e.g., attendance logs, access events) is collected and stored securely in local servers or cloud platforms. Administrators access dashboards to configure permissions, monitor activity in real time, and generate automated reports. Integration APIs allow seamless connectivity with HR, payroll, or third-party applications.",
      keyPoints: [
        "Integrates with biometric devices for centralized management.",
        "Collects and stores data securely in local or cloud databases.",
        "Provides real-time dashboards for monitoring and decision-making.",
        "Generates detailed reports and analytics for administrators.",
        "Offers API integrations with HR, payroll, or ERP systems.",
      ],
    },
    useCases: [
      "Corporate offices — streamline employee access and attendance management.",
      "Educational institutions — monitor student/staff attendance and access control.",
      "Factories & warehouses — manage workforce shifts and restricted zones.",
      "Government facilities — unify multiple biometric devices under one system.",
      "Retail chains — centralize attendance and access data across branches.",
      "Healthcare — integrate secure access and time-tracking for medical staff.",
    ],
  },

  "Intruder Alarm Systems": {
    name: "Intruder Alarm Systems Installation",
    type: "alarm",
    publicUrl: "intruder-alarm-systems",

    shortDescription:
      "Advanced intruder alarms detect and alert against unauthorized access, keeping your property secure.",
    image: { url: "", alt: "" },
    fullDescription:
      "Intruder alarm systems safeguard properties by detecting unauthorized access and triggering alerts. Using door/window sensors, motion detectors, and sometimes glass-break detectors, these systems provide real-time security coverage. Modern alarms connect to smartphones or monitoring services, ensuring immediate response in case of intrusion. Suitable for residential, commercial, and industrial environments, they act as both a deterrent and an early warning system.",
    systemFunctions: [
      "Detects intrusion with door/window contacts, motion, and glass-break sensors.",
      "Instant alerts via mobile apps, SMS, or professional monitoring services.",
      "Can integrate with CCTV and access control systems for layered security.",
    ],
    howItWorks: {
      description:
        "Intruder alarm systems use sensors to detect unauthorized entry points. When triggered, they activate sirens and send alerts to connected devices or monitoring centers. Systems can be armed or disarmed manually, through access codes, or via mobile applications. Integration with CCTV and smart systems allows visual verification and faster response.",
      keyPoints: [
        "Door, window, and motion sensors detect intrusion attempts.",
        "When triggered, alarms activate sirens and send instant notifications.",
        "Systems can be armed/disarmed with codes, key fobs, or mobile apps.",
        "Optional integration with CCTV for real-time verification.",
        "Connects to monitoring services for emergency response.",
      ],
    },
    useCases: [
      "Residential homes — protect against burglary or unauthorized entry.",
      "Small businesses — secure shops, offices, and storage rooms.",
      "Warehouses — detect after-hours intrusions and unauthorized access.",
      "Banks & financial institutions — safeguard sensitive zones.",
      "Schools & campuses — monitor and protect classrooms and facilities after hours.",
    ],
  },

  "Fire Alarm Systems": {
    name: "Fire Alarm System Installation",
    type: "alarm",
    publicUrl: "fire-alarm-systems",

    shortDescription:
      "Protect your property from fire hazards with fast-response fire alarm systems.",
    image: { url: "", alt: "" },
    fullDescription:
      "Fire alarm systems are essential safety solutions designed to detect smoke, heat, or gas leaks at the earliest stage of a fire. They provide rapid alerts to occupants and can trigger automatic fire suppression systems like sprinklers. By ensuring timely evacuation and notifying emergency responders, fire alarms help minimize risk to human life and property damage. Suitable for residential, commercial, and industrial environments, they are a critical part of any security and safety infrastructure.",
    systemFunctions: [
      "Detects smoke, heat, and gas leaks in real-time.",
      "Provides audio-visual alerts to occupants for immediate evacuation.",
      "Integrates with sprinklers and emergency response systems.",
      "Monitors multiple zones within a building for comprehensive protection.",
    ],
    howItWorks: {
      description:
        "Fire alarm systems consist of detectors (smoke, heat, or gas), control panels, and alerting devices such as sirens and strobes. When a detector senses danger, it sends a signal to the control panel, which activates alarms and optionally triggers suppression systems. Systems can also notify fire departments or security companies for rapid response.",
      keyPoints: [
        "Smoke, heat, or gas detectors monitor building conditions continuously.",
        "Control panels process signals and activate alarms instantly.",
        "Audio-visual alarms alert occupants for fast evacuation.",
        "Can trigger sprinklers or suppression systems automatically.",
        "Optional remote monitoring alerts emergency services in real time.",
      ],
    },
    useCases: [
      "Residential buildings — early fire detection for families and tenants.",
      "Office spaces — ensure safe evacuation of staff and visitors.",
      "Factories & warehouses — protect valuable equipment and goods.",
      "Hospitals & healthcare facilities — safeguard patients and staff.",
      "Schools & universities — protect students and ensure safe evacuation.",
      "Hotels & public venues — ensure compliance and guest safety.",
    ],
  },

  "Fire Doors": {
    name: "Fire Doors Installation",
    type: "alarm",
    publicUrl: "fire-doors",

    shortDescription:
      "Certified fire doors contain fire spread and ensure safe evacuation during emergencies.",
    image: { url: "", alt: "" },
    fullDescription:
      "Fire doors are engineered with fire-resistant materials to contain flames and smoke, slowing the spread of fire within a building. By compartmentalizing spaces, they provide occupants with valuable time to evacuate safely while reducing damage to other parts of the property. Fire doors are a legal requirement in many facilities and play a vital role in compliance with fire safety standards for residential, commercial, and industrial buildings.",
    systemFunctions: [
      "Slows or prevents the spread of fire and smoke between building sections.",
      "Constructed from certified fire-resistant materials.",
      "Helps meet fire safety regulations and compliance standards.",
      "Critical for evacuation planning in fire emergencies.",
    ],
    howItWorks: {
      description:
        "Fire doors are installed in key access points within a building, such as stairwells, corridors, and exits. They remain closed under normal conditions and automatically seal when exposed to high heat, preventing the spread of flames and smoke. Combined with fire alarm systems, they create a comprehensive fire safety strategy.",
      keyPoints: [
        "Constructed from materials tested for fire resistance.",
        "Remain closed to act as barriers against fire and smoke.",
        "Automatically seal when exposed to heat or triggered by alarms.",
        "Installed strategically in escape routes and compartmentalized zones.",
        "Work in conjunction with fire alarms and suppression systems.",
      ],
    },
    useCases: [
      "Residential apartments — protect stairwells and exits during fire emergencies.",
      "Office buildings — ensure safe evacuation for employees and visitors.",
      "Factories & industrial plants — compartmentalize high-risk zones.",
      "Hospitals & care facilities — protect vulnerable patients during evacuation.",
      "Schools & universities — contain fire spread across classrooms and halls.",
      "Hotels & commercial complexes — improve fire safety compliance and guest protection.",
    ],
  },

  "Cctv Installation Guide": {
    name: "CCTV Installation Guide",
    type: "cameras",
    publicUrl: "cctv-installation-guide",
    shortDescription:
      "Comprehensive guidance on installing CCTV systems for optimal coverage and security.",
    image: { url: "", alt: "" },
    fullDescription:
      "Our CCTV installation guide provides step-by-step instructions to help clients set up their security systems with confidence. It covers everything from choosing the right camera types and placements to wiring, power supply setup, and connecting to DVRs/NVRs. The guide ensures that your cameras deliver maximum coverage and efficiency, whether for home or business use. Suitable for both DIY users and professional installers, it simplifies the entire installation process while emphasizing best practices for reliable security.",
    systemFunctions: [
      "Step-by-step guidance on camera placement and wiring.",
      "Instructions for connecting cameras to DVRs or NVRs.",
      "Best practices for achieving maximum security coverage.",
    ],
    howItWorks: {
      description:
        "The guide walks users through planning, installation, and configuration. It begins with assessing the property and identifying coverage zones. Next, it covers mounting cameras, running cables or configuring wireless setups, and connecting devices to recorders or networks. Finally, it explains system configuration, remote access setup, and ongoing maintenance.",
      keyPoints: [
        "Evaluate property layout to identify coverage blind spots.",
        "Select suitable camera types (indoor, outdoor, PTZ, etc.).",
        "Mount cameras securely and connect via cables or Wi-Fi.",
        "Integrate with DVRs/NVRs for storage and playback.",
        "Configure remote access and test system performance.",
      ],
    },
    useCases: [
      "Homeowners — DIY installation of CCTV systems for added security.",
      "Small businesses — set up surveillance systems with minimal professional help.",
      "Installers — follow structured guidance for professional deployments.",
      "Educational institutions — implement campus-wide surveillance effectively.",
      "Industrial facilities — plan and execute large-scale CCTV coverage.",
    ],
  },

  "Home Security Systems Setup": {
    name: "Home Security Systems Setup",
    type: "guidance",
    publicUrl: "home-security-systems-setup",

    shortDescription:
      "Step-by-step advice on setting up an integrated home security system for ultimate protection.",
    image: { url: "", alt: "" },
    fullDescription:
      "Our home security setup guide goes beyond cameras, offering a complete approach to safeguarding your property. It covers installing alarms, motion detectors, smart locks, and integrating smart devices like lighting and voice assistants. The guide helps you design a personalized security plan to monitor, deter, and respond to threats effectively. Whether you’re upgrading an existing system or starting from scratch, it ensures a well-rounded home security strategy.",
    systemFunctions: [
      "Provides instructions for installing alarms, motion sensors, and smart locks.",
      "Helps integrate cameras with other smart home devices.",
      "Guides homeowners in designing a complete security system.",
    ],
    howItWorks: {
      description:
        "The setup guide leads homeowners through planning, installation, and integration of different devices. It explains how to position and connect cameras, sensors, and alarms, then integrate them into a centralized control system or mobile app. It also covers adding automation features like smart locks and lighting to enhance security and convenience.",
      keyPoints: [
        "Assess security needs and map key entry/exit points.",
        "Install cameras, sensors, and alarms for layered protection.",
        "Integrate devices into a single control hub or mobile app.",
        "Set up smart locks and lighting for automated responses.",
        "Test, maintain, and update the system for reliability.",
      ],
    },
    useCases: [
      "Homeowners — set up a DIY smart security system tailored to their needs.",
      "Families — integrate cameras, sensors, and alarms for peace of mind.",
      "Smart home enthusiasts — connect security with IoT devices for automation.",
      "Landlords — provide tenants with modern, easy-to-use security solutions.",
      "New homeowners — design a complete security setup from scratch.",
    ],
  },

  "Security Consultancy": {
    name: "Security Consultancy",
    type: "guidance",
    publicUrl: "security-consultancy",

    shortDescription:
      "Professional consultancy services to design and optimize your security system.",
    image: { url: "", alt: "" },
    fullDescription:
      "Our security consultancy services help individuals, businesses, and organizations design effective security solutions tailored to their specific needs. From assessing risks and identifying vulnerabilities to recommending the right systems and overseeing implementation, we ensure your property is fully protected. We also provide ongoing guidance for system upgrades, compliance, and maintenance, giving you peace of mind with expert-driven solutions.",
    systemFunctions: [
      "Professional consultancy for personalized security solutions.",
      "Expert advice on system selection, integration, and installation.",
      "Guidance for long-term security planning and compliance.",
    ],
    howItWorks: {
      description:
        "Our consultancy process begins with a thorough risk assessment of your premises and operations. Based on identified vulnerabilities, we design a tailored security plan that includes system recommendations, integration strategies, and implementation oversight. We also provide ongoing support to adapt systems as your needs evolve.",
      keyPoints: [
        "Conduct detailed risk and vulnerability assessments.",
        "Design customized security strategies for each client.",
        "Recommend and align the best technologies with your goals.",
        "Oversee implementation and ensure compliance with standards.",
        "Provide ongoing support and future system upgrades.",
      ],
    },
    useCases: [
      "Homeowners — get expert advice on protecting residential properties.",
      "Businesses — design security systems for offices, shops, and warehouses.",
      "Industrial facilities — safeguard factories, plants, and large-scale sites.",
      "Educational institutions — plan security for campuses and student safety.",
      "Government organizations — develop strategies for high-security zones.",
    ],
  },
};

export default ServiceDescription;
