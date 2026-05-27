import { useEffect, useState } from "react";
import { Briefcase, Cpu, Home, Mail, Moon, Sun, UserRound } from "lucide-react";
import CRTOverlay from "./components/CRTOverlay";
import { InteractiveMenu } from "./components/ui/modern-mobile-menu";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { profileData } from "./data/profile";

function BootSplash({ bootIndex, isLightTheme }) {
  return (
    <div className={`theme-shell ${isLightTheme ? "theme-light" : "theme-dark"} h-screen w-full overflow-hidden bg-terminal-bg text-terminal-green font-mono selection:bg-terminal-green selection:text-black`}>
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-full max-w-2xl border border-terminal-muted bg-terminal-bg p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-terminal-muted pb-2 text-[10px] sm:text-xs">
            <span className="text-terminal-muted">// BOOT_SEQUENCE</span>
            <span className="text-terminal-amber">LOCKED_VIEWPORT</span>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm">
            {profileData.bootLogs.slice(0, bootIndex).map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-terminal-muted">&gt;&gt;</span>
                <span className={log.includes("[OK]") ? "text-terminal-green" : "text-terminal-amber"}>
                  {log}
                </span>
              </div>
            ))}

            {bootIndex < profileData.bootLogs.length && (
              <div className="flex items-center gap-2 text-terminal-green">
                <span className="animate-pulse">&gt; INITIALIZING PORTFOLIO...</span>
                <span className="cursor-block" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("portfolio-theme") || "dark";
  });
  const [siteReady, setSiteReady] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);

  // Phosphor spotlight cursor tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  useEffect(() => {
    if (siteReady) return;

    if (bootIndex < profileData.bootLogs.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setSiteReady(true);
      window.scrollTo({ top: 0 });
    }, 500);
    return () => clearTimeout(timer);
  }, [bootIndex, siteReady]);

  useEffect(() => {
    if (siteReady) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [siteReady]);

  const navigateToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mobileMenuItems = [
    { label: "home", icon: Home, id: "home" },
    { label: "about", icon: UserRound, id: "about" },
    { label: "skills", icon: Cpu, id: "skills" },
    { label: "work", icon: Briefcase, id: "projects" },
    { label: "contact", icon: Mail, id: "contact" },
  ];

  const isLightTheme = theme === "light";

  if (!siteReady) {
    return <BootSplash bootIndex={bootIndex} isLightTheme={isLightTheme} />;
  }

  return (
    <div className={`theme-shell ${isLightTheme ? "theme-light" : "theme-dark"} min-h-screen w-full overflow-x-hidden bg-terminal-bg text-terminal-green p-3 pb-28 sm:p-4 sm:pb-28 md:p-8 font-mono select-none relative selection:bg-terminal-green selection:text-black`}>
      {/* Vintage cathode tube filter */}
      <CRTOverlay />

      <div className="max-w-6xl min-w-0 mx-auto space-y-10 md:space-y-12">
        {/* System Bar */}
        <header className="border border-terminal-muted bg-neutral-950/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <div className="flex items-center space-x-2">
              <span className="animate-ping w-2 h-2 rounded-full bg-terminal-green" />
            <span className="text-white text-xs md:text-sm font-bold tracking-wider">
              YOGESH
            </span>
            </div>
            <button
              type="button"
              onClick={() => setTheme(isLightTheme ? "dark" : "light")}
              className="inline-flex items-center justify-center border border-terminal-muted p-2 text-terminal-green hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer transition-colors md:hidden"
              aria-label={`Switch to ${isLightTheme ? "dark" : "white"} theme`}
            >
              {isLightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          <nav aria-label="Main system navigation" className="hidden md:flex flex-wrap items-center gap-2 text-xs">
            <button 
              onClick={() => navigateToSection("about")} 
              className="px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
            >
              [ 01_ABOUT ]
            </button>
            <button 
              onClick={() => navigateToSection("skills")} 
              className="px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
            >
              [ 02_SKILLS ]
            </button>
            <button 
              onClick={() => navigateToSection("experience")} 
              className="px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
            >
              [ 03_EXPERIENCE ]
            </button>
            <button 
              onClick={() => navigateToSection("projects")} 
              className="px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
            >
              [ 04_PROJECTS ]
            </button>
            <button 
              onClick={() => navigateToSection("contact")} 
              className="px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
            >
              [ 05_CONTACT ]
            </button>
            <button
              type="button"
              onClick={() => setTheme(isLightTheme ? "dark" : "light")}
              className="inline-flex items-center gap-1 px-2 py-1 border border-terminal-muted hover:border-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer uppercase transition-colors"
              aria-label={`Switch to ${isLightTheme ? "dark" : "white"} theme`}
            >
              {isLightTheme ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>[ {isLightTheme ? "DARK" : "WHITE"} ]</span>
            </button>
          </nav>
        </header>

        {/* Content Modules */}
        <main className="space-y-12">
          {/* Hero / Boot Sequence */}
          <Hero onNavigate={navigateToSection} skipBoot />

          {/* About */}
          <div id="about">
            <About />
          </div>

          {/* Skills */}
          <div id="skills">
            <Skills />
          </div>

          {/* Experience */}
          <div id="experience">
            <Experience />
          </div>

          {/* Projects */}
          <div id="projects">
            <Projects />
          </div>

          {/* Education & Certs split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="education">
              <Education />
            </div>
            <div id="certifications">
              <Certifications />
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <Contact />
          </div>
        </main>

        {/* Console status footer */}
        <Footer />
      </div>

      <div className="fixed inset-x-0 bottom-3 z-[80] flex justify-center px-2 md:hidden">
        <InteractiveMenu
          items={mobileMenuItems}
          accentColor="var(--color-terminal-amber)"
          onItemSelect={(item) => navigateToSection(item.id || item.label)}
        />
      </div>
    </div>
  );
}
