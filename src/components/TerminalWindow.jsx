import React, { useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

export default function TerminalWindow({ 
  title, 
  children, 
  status = "OK", 
  statusColor = "text-terminal-green", 
  className = "",
  showControls = true
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <div 
      className={`border border-terminal-muted bg-terminal-bg text-terminal-green flex flex-col transition-all duration-300 ${
        isMaximized ? "fixed inset-4 z-50 bg-terminal-bg" : ""
      } ${className}`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-terminal-muted bg-neutral-950 px-3 py-1.5 select-none text-xs">
        <div className="flex items-center space-x-2 font-semibold">
          <span className="text-terminal-muted">//</span>
          <span className="uppercase tracking-wider text-glow">{title}</span>
          <span className={`text-[10px] px-1 border border-current ${statusColor} ml-2 font-mono`}>
            [{status}]
          </span>
        </div>
        
        {showControls && (
          <div className="flex items-center space-x-3 text-terminal-muted font-mono">
            <button 
              onClick={() => setIsMinimized(!isMinimized)} 
              className="hover:text-terminal-green focus:text-terminal-green cursor-pointer p-0.5"
              aria-label="Minimize terminal window"
            >
              [-]
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)} 
              className="hover:text-terminal-green focus:text-terminal-green cursor-pointer p-0.5"
              aria-label="Maximize terminal window"
            >
              {isMaximized ? "[_]" : "[+]"}
            </button>
            <button 
              onClick={() => setIsClosed(true)} 
              className="hover:text-terminal-error focus:text-terminal-error cursor-pointer p-0.5"
              aria-label="Close terminal window"
            >
              [X]
            </button>
          </div>
        )}
      </div>

      {/* Terminal Content Area */}
      {!isMinimized && (
        <div className="p-4 flex-1 overflow-auto font-mono text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
