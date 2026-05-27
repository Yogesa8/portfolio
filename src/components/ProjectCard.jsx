import { Folder, Terminal, ExternalLink } from "lucide-react";
import TerminalButton from "./TerminalButton";

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project }) {
  const { title, role, period, status, description, tech, highlights, links, featured } = project;
  
  const getStatusColor = () => {
    switch (status) {
      case "FREELANCE": return "text-terminal-amber border-terminal-amber";
      case "DEPLOYED": return "text-terminal-green border-terminal-green";
      case "RUNNING": return "text-cyan-400 border-cyan-400";
      default: return "text-white border-white";
    }
  };

  return (
    <div className={`border p-4 bg-neutral-950/40 relative flex flex-col justify-between ${
      featured 
        ? "border-terminal-amber border-double border-4" 
        : "border-terminal-muted hover:border-terminal-green transition-colors duration-200"
    }`}>
      {/* Package Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {featured ? (
              <Terminal className="w-5 h-5 text-terminal-amber animate-pulse" />
            ) : (
              <Folder className="w-5 h-5 text-terminal-green" />
            )}
            <h3 className={`font-mono text-sm md:text-base font-bold uppercase tracking-wide ${
              featured ? "text-terminal-amber text-glow-amber" : "text-white"
            }`}>
              {title}
            </h3>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 border font-mono ${getStatusColor()}`}>
            [{status}]
          </span>
        </div>

        {/* Details log */}
        <div className="text-[11px] text-terminal-muted font-mono mb-3 leading-none">
          ROLE: {role} | PERIOD: {period}
        </div>

        <p className="text-xs md:text-sm text-neutral-300 font-mono mb-4">
          {description}
        </p>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] text-terminal-muted font-mono mb-1 uppercase tracking-wider">// SYSTEM DIAGNOSTICS:</div>
            <ul className="space-y-1">
              {highlights.map((highlight, idx) => (
                <li key={idx} className="text-xs text-neutral-400 font-mono flex items-start">
                  <span className={`mr-2 select-none ${featured ? "text-terminal-amber" : "text-terminal-green"}`}>*</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Details: Tech stack & Links */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.map((t, idx) => (
            <span 
              key={idx} 
              className={`text-[10px] px-1 border border-dashed select-none font-mono ${
                featured ? "border-terminal-amber/50 text-terminal-amber" : "border-terminal-muted text-terminal-green"
              }`}
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t border-dashed border-neutral-900">
          {links.code && (
            <TerminalButton 
              variant={featured ? "amber-outline" : "outline"}
              onClick={() => window.open(links.code, "_blank", "noopener,noreferrer")}
              ariaLabel={`View source code for ${title}`}
              className="py-1 px-2.5 text-[10px]"
            >
              <span className="flex items-center space-x-1.5">
                <Github className="w-5 h-3.5" />
                <span>Link</span>
              </span>
            </TerminalButton>
          )}
          {links.live && links.live !== "#" && (
            <TerminalButton 
              variant={featured ? "amber-solid" : "solid"}
              onClick={() => window.open(links.live, "_blank", "noopener,noreferrer")}
              ariaLabel={`Launch live demo of ${title}`}
              className="py-1 px-2.5 text-[10px]"
            >
              <span className="flex items-center space-x-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LAUNCH</span>
              </span>
            </TerminalButton>
          )}
        </div>
      </div>
    </div>
  );
}
