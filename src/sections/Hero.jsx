import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";
import { profileData } from "../data/profile";
import TerminalButton from "../components/TerminalButton";
import Cursor from "../components/Cursor";

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const titleText = "SOFTWARE DEVELOPMENT ENGINEER";

export default function Hero({ onNavigate, skipBoot = false }) {
  const [bootIndex, setBootIndex] = useState(() => skipBoot ? profileData.bootLogs.length : 0);
  const [bootComplete, setBootComplete] = useState(skipBoot);
  const [typedTitle, setTypedTitle] = useState(() => skipBoot ? titleText : "");

  // Simulate Boot Loader sequence
  useEffect(() => {
    if (skipBoot) return;

    if (bootIndex < profileData.bootLogs.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      const delay = setTimeout(() => {
        setBootComplete(true);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [bootIndex, skipBoot]);

  // Simulate Title Typing Animation after Boot
  useEffect(() => {
    if (!bootComplete || skipBoot) return;
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < titleText.length) {
        currentText += titleText.charAt(i);
        setTypedTitle(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [bootComplete, skipBoot]);

  // Custom ASCII branding
  const asciiArt = `
 __   __ ___   ____ _____ ____  _   _
 \\ \\ / // _ \\ / ___| ____/ ___|| | | |
  \\ V /| | | | |  _|  _| \\___ \\| |_| |
   | | | |_| | |_| | |___ ___) |  _  |
   |_|  \\___/ \\____|_____|____/|_| |_|
  `;

  return (
    <section className="min-h-[85vh] min-w-0 overflow-hidden flex flex-col justify-center border border-terminal-muted bg-neutral-950/20 p-4 sm:p-6 relative font-mono">
      <div className="absolute top-2 right-4 flex items-center space-x-2 text-[10px] text-terminal-muted select-none">
        <Cpu className="w-3.5 h-3.5 animate-pulse text-terminal-green" />
        <span>SYS: ACTIVE</span>
        <span>|</span>
        <span>PORT: 3000</span>
      </div>

      {/* Loading Sequence */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center py-8"
          >
            <div className="space-y-1.5 text-xs md:text-sm select-none">
              {profileData.bootLogs.slice(0, bootIndex).map((log, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-terminal-muted">&gt;&gt;</span>
                  <span className={log.includes("[OK]") ? "text-terminal-green" : "text-terminal-amber"}>
                    {log}
                  </span>
                </div>
              ))}
              {bootIndex < profileData.bootLogs.length && (
                <div className="flex items-center space-x-2">
                  <span className="text-terminal-green animate-pulse">&gt; INITIALIZING UTILITIES...</span>
                  <Cursor />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Terminal Shell Contents */}
      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="boot-glow flex-1 flex flex-col justify-between py-4"
        >
          <div>
            {/* Command Input Prompt */}
            <div className="text-xs md:text-sm text-terminal-muted mb-4 select-none">
              system@yogesh:~$ ./init_portfolio.sh --verbose
              <br />
              [BOOT SUCCESSFUL] DEV PORTFOLIO SHELL MOUNTED.
            </div>

            {/* ASCII Header Logo */}
            <div className="mb-6 min-w-0 overflow-hidden select-none">
              <pre className="text-[7px] sm:text-[8px] md:text-[9px] xl:text-[11px] leading-tight text-terminal-green text-glow font-bold whitespace-pre">
                {asciiArt}
              </pre>
            </div>

            {/* Sub-headline Info */}
            <div className="border border-dashed border-terminal-muted p-4 bg-neutral-950/60 mb-6">
              <div className="text-xs text-terminal-muted mb-1">// IDENTITY INFO:</div>
              <h1 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white mb-2">
                NAME: {profileData.personal.name}
              </h1>
              <div className="text-sm md:text-lg flex flex-wrap items-center gap-y-1">
                <span className="text-terminal-muted mr-2">ROLE:</span>
                <span className="text-terminal-amber font-semibold uppercase">
                  {typedTitle}
                </span>
                {typedTitle.length < titleText.length && <Cursor colorClass="bg-terminal-amber" />}
              </div>
              <div className="text-xs md:text-sm text-neutral-300 mt-2 break-words">
                LOCATION: {profileData.personal.location} | CONTACT: {profileData.personal.email}
              </div>
            </div>

            {/* Description Summary */}
            <p className="text-xs md:text-sm text-neutral-300 max-w-2xl leading-relaxed mb-8">
              &gt; {profileData.personal.summary}
            </p>
          </div>

          {/* Actions & Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-terminal-muted">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <TerminalButton 
                variant="solid" 
                onClick={() => onNavigate("projects")}
                ariaLabel="View projects section"
              >
                [ VIEW_PROJECTS ]
              </TerminalButton>
              <TerminalButton 
                variant="outline" 
                onClick={() => window.open("/yogesh_resume.pdf", "_blank")}
                ariaLabel="Download resume PDF"
              >
                [ DOWNLOAD_RESUME ]
              </TerminalButton>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs text-terminal-muted select-none">// SOCIALS:</span>
              <a 
                href={profileData.personal.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-white transition-colors duration-150 p-1 border border-transparent hover:border-terminal-green"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={profileData.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-white transition-colors duration-150 p-1 border border-transparent hover:border-terminal-green"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
