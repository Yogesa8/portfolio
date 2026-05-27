import  { useState, useEffect } from "react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [simulatedLatency, setSimulatedLatency] = useState(12);

  // Live system clock simulation
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toISOString().replace("T", " ").substring(0, 19);
      setTime(formatted);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live jitter/latency simulation
  useEffect(() => {
    const jitter = setInterval(() => {
      setSimulatedLatency(Math.floor(Math.random() * 15) + 8);
    }, 4000);
    return () => clearInterval(jitter);
  }, []);

  // Calculate simulated system uptime
  const getUptimeString = () => {
    // Return relative uptime from 2026-05-26T16:46:53
    const startTime = new Date("2026-05-26T16:46:53").getTime();
    const nowTime = new Date().getTime();
    const diff = Math.max(0, nowTime - startTime);
    const secs = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const hrs = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    return `${days}d ${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <footer className="mt-12 font-mono text-[10px] md:text-xs select-none">
      
      {/* Tmux styled status bar */}
      <div className="flex flex-col sm:flex-row items-stretch justify-between bg-neutral-900 border border-terminal-muted divide-y sm:divide-y-0 sm:divide-x divide-terminal-muted leading-none">
        
        {/* Left indicators */}
        <div className="flex flex-wrap items-center">
          <span className="bg-terminal-green text-black font-bold px-3 py-2 uppercase">
            [SESSION]
          </span>
          <span className="text-white px-3 py-2">
            system@yogesh.dev:~$ uptime --portfolio
          </span>
          <span className="text-terminal-amber font-mono px-3 py-2 border-l border-terminal-muted">
            UPTIME: {getUptimeString()}
          </span>
        </div>

        {/* Right indicators */}
        <div className="flex items-center justify-between sm:justify-end flex-1 sm:flex-none">
          <span className="text-neutral-400 px-3 py-2">
            PING: {simulatedLatency}ms
          </span>
          <span className="text-cyan-400 px-3 py-2 border-l border-terminal-muted">
            PROTO: TCP/IP
          </span>
          <span className="bg-terminal-muted text-terminal-green px-3 py-2 font-bold font-mono">
            {time || "2026-05-26 16:46:53"}
          </span>
        </div>

      </div>

      {/* Copy info */}
      <div className="text-center text-terminal-muted py-4 text-[10px]">
        // NO RIGHTS RESERVED. SECURE DEPLOYMENT BY YOGESH. VER: 1.0.0-PROD
      </div>
    </footer>
  );
}
