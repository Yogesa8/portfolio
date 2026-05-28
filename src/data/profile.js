export const profileData = {
  personal: {
    name: "Yogesh",
    role: "Software Development Engineer",
    location: "Delhi, India",
    email: "Jangiry035@gmail.com",
    phone: "+91 8198907329",
    github: "https://github.com/yogesa8",
    linkedin: "https://www.linkedin.com/in/yog-esh-081b03250/", // Placeholder/Inferred
    website: "https://yogesa8.vercel.app/",
    summary: "I’m a Software Development Engineer focused on building modern, high-performance web applications using React.js, JavaScript, SQL, and MongoDB. I have hands-on experience integrating third-party APIs, managing application state, optimizing database-driven workflows, and deploying production-ready applications. My work includes flight data management systems, job portal platforms, and school management solutions, with a strong focus on usability, scalability, and clean engineering practices.",
  },
  skills: [
    {
      category: "FRONTEND DEPLOYMENT",
      items: [
        { name: "React.js / Redux / Zustand", level: 90 },
        { name: "JavaScript ES6+ / HTML5 / CSS3", level: 95 },
        { name: "Tailwind CSS / shadcn/ui", level: 88 },
        { name: "Aceternity UI / Styled Components", level: 80 },
        { name: "Bootstrap 5 / Material UI", level: 85 },
        { name: "JQuery / Axios", level: 90 },
      ]
    },
    {
      category: "BACKEND & DATABASES",
      items: [
        { name: "PHP", level: 75 },
        { name: "MySQL / MariaDB", level: 82 },
        { name: "MongoDB", level: 80 },
        { name: "Node.js (Basic)", level: 60 },
        { name: "Linux (Basic)", level: 60 },
      ]
    },
    {
      category: "API INTEGRATION & AUTHENTICATION",
      items: [
        { name: "RESTful API Integration", level: 88 },
        { name: "Third-Party API Integration", level: 85 },
        { name: "Google & GitHub Authentication", level: 80 }
      ]
    },
    {
      category: "DEV TOOLS & UTILITIES",
      items: [
        { name: "Git & GitHub", level: 90 },
        { name: "Postman", level: 85 },
        { name: "FileZilla / PuTTY / FTP", level: 80 },
      ]
    },
    {
      category: "AI & COGNITIVE UTILITIES",
      items: [
        { name: "ChatGPT / Claude / Gemini Prompting", level: 90 },
      ]
    }
  ],
  experience: [
    {
      company: "Aero Flight Technology Group",
      location: "Delhi, India",
      role: "Web Developer",
      period: "May 2024 - Present",
      status: "ACTIVE",
      achievements: [
        "Built dynamic, high-performance flight web applications using HTML, CSS, JavaScript, React.js, and MongoDB.",
        "Successfully integrated complex third-party GDS and travel search APIs (Kayak and Revelex).",
        "Collaborated on full-stack codebases, handling backend logic transitions and frontend components.",
        "Employed Git/GitHub for robust version control and multi-developer deployment pipelines."
      ]
    },
    {
      company: "KMSG Tech Pvt Ltd",
      location: "Delhi, India",
      role: "Web Developer",
      period: "Jan 2023 - Jun 2023",
      status: "COMPLETED",
      achievements: [
        "Integrated third-party APIs into web applications to extend functionality and enable seamless data exchange.",
        "Managed application deployment and server updates using FileZilla and PuTTY.",
        "Used Git for version control, codebase management, and collaborative development workflows."
      ]
    }
  ],
  projects: [
    {
      id: "arcanum-space",
      title: "Arcanum Space Drone Website",
      role: "Freelance Frontend Developer",
      period: "2026",
      status: "FREELANCE",
      featured: true,
      description: "A modern, responsive website built for Arcanum Space, a drone technology and UAV solutions brand focused on advanced aerospace, surveillance, mapping, and autonomous systems. The website delivers a smooth, premium visual experience with a futuristic interface, clean section flow, interactive animations, and a dedicated drone page featuring a 3D model presentation.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide Icons", "3D Model Integration"],
      highlights: [
        "Designed and developed a smooth, responsive landing experience for a drone technology and UAV solutions brand.",
        "Integrated a 3D drone model on the drone page to create an interactive and premium product showcase.",
        "Built futuristic UI sections with clean layouts, motion effects, icon-based feature blocks, and modern visual hierarchy.",
        "Optimized the interface for desktop and mobile devices with a polished, user-friendly browsing experience."
      ],
      links: {
        live: "#",
        link: "https://arcanumspace.com/"
      }
    },
    {
      id: "job-portal",
      title: "FirstJobIndia - Job Portal Website",
      role: "Full Stack / React.js Developer",
      period: "2026",
      status: "WORKING",
      featured: true,
      description: "A modern job portal platform built for freshers and early-career candidates, focused on job discovery, resume-building support, career guidance, and smooth application workflows. The platform includes responsive UI screens, OAuth-based authentication, dynamic job listing flows, and backend integration using Node.js, MariaDB, and Supabase.",
      tech: ["React.js", "Zustand", "Node.js", "MariaDB", "Supabase", "OAuth", "Framer Motion", "Bootstrap"],
      highlights: [
        "Developed a responsive job portal experience for freshers with job discovery, career guidance, and resume-building focused sections.",
        "Implemented OAuth-based authentication flow for secure and user-friendly login access.",
        "Built dynamic job listing and application workflow screens with clean state management using Zustand.",
        "Integrated backend services using Node.js, MariaDB, and Supabase for managing platform data and user-related workflows.",
        "Enhanced the user interface with smooth motion effects, clean layouts, and mobile-friendly responsive design."
      ],
      links: {
        live: "#",
        link: "https://www.firstjobindia.in/"
      }
    },
    {
      "id": "flight-data",
      "title": "Flight Data Management System",
      "role": "Full Stack Developer",
      "period": "2025",
      "status": "COMPLETED",
      "featured": false,
      "category": "Internal Operations Platform",
      "description": "An internal flight operations platform built to manage passive flight segments, flight details, confirmation numbers, ticket numbers, and operational booking data for company workflows.",
      "tech": ["React.js", "MongoDB", "PHP", "JavaScript", "Twig", "RESTful APIs"],
      "highlights": [
        "Worked on passive flight segment management for handling flight-related booking data.",
        "Implemented features to add, update, and delete flight segments based on operational requirements.",
        "Developed confirmation number and e-ticket number update workflows for booking verification.",
        "Created dynamic ticket and confirmation templates using Twig for real-time flight data rendering.",
        "Improved internal team efficiency by simplifying flight data updates and booking confirmation management."
      ],
      "links": {
        "live": ""
      }
    },
    {
      "id": "phone-booking",
      "title": "Phone Booking System",
      "role": "Web Developer",
      "period": "2025",
      "status": "INTERNAL",
      "featured": true,
      "category": "Internal Booking Tool",
      "description": "An internal phone-based flight booking system designed for company colleagues to manage customer flight bookings through call-based assistance.",
      "tech": ["PHP", "MongoDB", "HTML", "CSS", "JavaScript", "RESTful APIs"],
      "highlights": [
        "Worked on an internal booking workflow used by company team members, not public users.",
        "Supported phone-based flight booking operations where colleagues book flights for customers over calls.",
        "Developed and maintained booking-related UI screens and backend data handling workflows.",
        "Implemented add, update, and management functionality for customer and flight booking information.",
        "Helped improve internal booking operations by making data entry and booking management smoother."
      ],
      "links": {
        "live": ""
      }
    },
    {
      "id": "travel-services",
      "title": "Travel Services Website",
      "role": "Web Developer",
      "period": "2025",
      "status": "LIVE",
      "featured": false,
      "category": "Travel Booking Platform",
      "description": "A travel services platform for hotel, car, and cruise booking pages, built with third-party API integrations to fetch and manage real-time travel service data.",
      "tech": ["PHP", "MongoDB", "HTML", "CSS", "JavaScript", "Kayak API", "Revelex API"],
      "highlights": [
        "Integrated Revelex API for cruise search and booking-related data connectivity.",
        "Integrated Kayak APIs for hotel and car service data handling.",
        "Worked on frontend and backend improvements for hotel, car, and cruise booking pages.",
        "Implemented API-based data rendering to improve travel service availability and user experience.",
        "Maintained responsive UI components using HTML, CSS, and JavaScript."
      ],
      "links": {
        "hotel": "https://www.airtkt.com/hotels.php",
        "car": "https://www.airtkt.com/car.php",
        "cruise": "https://www.airtkt.com/cruise.php"
      }
    },
    {
      "id": "operations-monitoring-portals",
      "title": "Operations Monitoring Portals",
      "role": "Full Stack Developer",
      "period": "2026",
      "status": "INTERNAL",
      "featured": false,
      "category": "Monitoring & Management System",
      "description": "A set of internal monitoring portals created to track and manage operational data related to web airline, PNR, ANC airline, and insurance workflows.",
      "tech": ["React.js", "MongoDB", "JavaScript", "RESTful APIs", "HTML", "CSS"],
      "highlights": [
        "Built internal portals to monitor web airline, PNR, ANC airline, and insurance-related data.",
        "Implemented CRUD functionality including add, edit, update, delete, and data monitoring workflows.",
        "Created React.js-based dashboards for internal teams to view and manage operational records.",
        "Connected frontend screens with MongoDB and APIs for real-time data access and management.",
        "Improved internal visibility by centralizing multiple operational monitoring workflows in one system."
      ],
      "links": {
        "live": ""
      }
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Indira Gandhi University, Rewari, India",
      period: "Jul 2021 - Jul 2023",
      status: "[GRADUATED]"
    },
    {
      degree: "Bachelor of Science (PCM)",
      institution: "Ahir College, Rewari, India",
      period: "Jul 2017 - Jul 2020",
      status: "[GRADUATED]"
    }
  ],
  certifications: [
    {
      name: "Web Technologies Professional Certification",
      authority: "Qspider Gurugram / Partner",
      details: "Comprehensive training in HTML5, CSS3, JavaScript (ES6+), React.js, and MySQL database administration."
    }
  ],
  bootLogs: [
    "LOADING KERNEL 5.15.0-76-GENERIC...",
    "DETECTING MONOSPACE MONITOR... [OK]",
    "MOUNTING REUSABLE COMPONENT FRAMEWORK... [OK]",
    "INDEXING DEVELOPER PROFILE DATA... [OK]",
    "FETCHING CLIENT CREDENTIALS: YOGESH... [OK]",
    "ESTABLISHING PHOSPHOR GREEN TERMINAL... [OK]",
    "PORTFOLIO CLI CONFIGURED AND DEPLOYED... [OK]"
  ]
};
