import React from "react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";

export default function About() {
  const jsonProfile = JSON.stringify({
    name: profileData.personal.name,
    role: profileData.personal.role,
    location: profileData.personal.location,
    experience: "1+ Years",
    focus: [
      "Responsive Frontend Interfaces",
      "API Aggregations & Integrations",
      "Database Optimization & Modeling",
      "Interactive Motion UX Design"
    ],
    stack: [
      "React.js", "Redux", "Zustand", "Tailwind CSS", "MySQL", "MongoDB"
    ]
  }, null, 2);

  return (
    <section id="about" className="py-8 font-mono">
      <SectionHeader filename="profile.json" command="cat" />

      {/* Vim Splits representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Vim Left Pane: profile.json viewer */}
        <TerminalWindow title="vim - profile.json" status="READONLY" statusColor="text-terminal-amber">
          <pre className="text-xs md:text-sm text-terminal-green whitespace-pre-wrap select-text leading-relaxed font-mono">
            {jsonProfile}
          </pre>
        </TerminalWindow>

        {/* Vim Right Pane: Text details */}
        <TerminalWindow title="vim - summary.txt" status="MODIFIED">
          <div className="space-y-4 text-xs md:text-sm leading-relaxed">
            <div className="text-white font-bold">// PROFESSIONAL LOG SUMMARY</div>
            <p className="text-neutral-300">
              &gt; Yogesh is an engineer with hands-on experience translating complex functional requirements into responsive, production-ready web application features. 
            </p>
            <p className="text-neutral-300">
              &gt; Specialized in structural frontend ecosystems like <span className="text-terminal-green text-glow font-bold">React.js</span>, state frameworks like <span className="text-terminal-amber font-semibold">Redux</span> and <span className="text-terminal-amber font-semibold">Zustand</span>, and backend nodes using MySQL and MongoDB.
            </p>

            <div className="border border-dashed border-terminal-muted p-3 mt-4 bg-neutral-950/40">
              <div className="text-terminal-amber font-semibold uppercase text-xs mb-2">// SPECIALIZED DOMAINS:</div>
              <ul className="space-y-1.5 text-neutral-400">
                <li>
                  <span className="text-terminal-green mr-2">[+]</span>
                  <strong className="text-white font-medium">Travel Engine API Integration:</strong> GDS and travel search API integrations (Kayak, Revelex).
                </li>
                <li>
                  <span className="text-terminal-green mr-2">[+]</span>
                  <strong className="text-white font-medium">State Synchronization:</strong> Redux/Zustand workflows for multi-step booking forms.
                </li>
                <li>
                  <span className="text-terminal-green mr-2">[+]</span>
                  <strong className="text-white font-medium">Database Structuring:</strong> Writing optimized queries for relational and document databases.
                </li>
              </ul>
            </div>
          </div>
        </TerminalWindow>

      </div>
    </section>
  );
}
