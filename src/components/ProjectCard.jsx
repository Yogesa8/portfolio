import { Folder, Terminal, ExternalLink } from "lucide-react";
import TerminalButton from "./TerminalButton";

export default function ProjectCard({ project }) {
  const {
    title,
    role,
    period,
    status,
    description,
    tech = [],
    highlights = [],
    links = {},
    featured,
    category,
  } = project;

  const getStatusColor = () => {
    switch (status) {
      case "FREELANCE":
        return "text-terminal-amber border-terminal-amber";

      case "LIVE":
      case "COMPLETED":
        return "text-terminal-green border-terminal-green";

      case "WORKING":
        return "text-cyan-400 border-cyan-400";

      case "INTERNAL":
        return "text-purple-400 border-purple-400";

      default:
        return "text-white border-white";
    }
  };

  const validLinks = Object.entries(links).filter(
    ([, url]) => url && url !== "#",
  );

  const getLinkLabel = (key) => {
    switch (key) {
      case "link":
        return "LINK";
      case "live":
        return "LAUNCH";
      case "hotel":
        return "HOTEL";
      case "car":
        return "CAR";
      case "cruise":
        return "CRUISE";
      default:
        return key.toUpperCase();
    }
  };

  return (
    <div
      className={`border p-4 bg-neutral-950/40 relative flex flex-col justify-between ${
        featured
          ? "border-terminal-green border-double border-4 shadow-[0_0_18px_rgba(34,197,94,0.35)]"
          : "border-terminal-muted hover:border-terminal-green transition-colors duration-200"
      }`}
    >
      {/* Package Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {featured ? (
              <Terminal className="w-5 h-5 text-terminal-amber animate-pulse" />
            ) : (
              <Folder className="w-5 h-5 text-terminal-green" />
            )}

            <h3
              className={`font-mono text-sm md:text-base font-bold uppercase tracking-wide ${
                featured ? "text-terminal-amber text-glow-amber" : "text-white"
              }`}
            >
              {title}
            </h3>
          </div>

          <span
            className={`text-[10px] px-1.5 py-0.5 border font-mono ${getStatusColor()}`}
          >
            [{status}]
          </span>
        </div>

        {/* Details log */}
        <div className="text-[11px] text-terminal-muted font-mono mb-3 leading-none">
          ROLE: {role} | PERIOD: {period}
          {category && <> | TYPE: {category}</>}
        </div>

        <p className="text-xs md:text-sm text-neutral-300 font-mono mb-4">
          {description}
        </p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] text-terminal-muted font-mono mb-1 uppercase tracking-wider">
              // SYSTEM DIAGNOSTICS:
            </div>

            <ul className="space-y-1">
              {highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-xs text-neutral-400 font-mono flex items-start"
                >
                  <span
                    className={`mr-2 select-none ${
                      featured ? "text-terminal-amber" : "text-terminal-green"
                    }`}
                  >
                    *
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Details: Tech stack & Links */}
      <div>
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.map((t, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-1 border border-dashed select-none font-mono ${
                  featured
                    ? "border-terminal-amber/50 text-terminal-amber"
                    : "border-terminal-muted text-terminal-green"
                }`}
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {validLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dashed border-neutral-900">
            {validLinks.map(([key, url]) => (
              <TerminalButton
                key={key}
                variant={featured ? "amber-solid" : "solid"}
                onClick={() =>
                  window.open(url, "_blank", "noopener,noreferrer")
                }
                ariaLabel={`Open ${getLinkLabel(key)} for ${title}`}
                className="py-1 px-2.5 text-[10px]"
              >
                <span className="flex items-center space-x-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{getLinkLabel(key)}</span>
                </span>
              </TerminalButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
