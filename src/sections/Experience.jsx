import React from "react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";

export default function Experience() {
  return (
    <section id="experience" className="py-8 font-mono">
      <SectionHeader filename="system_history.log" command="tail -n 2" />

      <TerminalWindow title="system journal - experience" status="SUCCESS">
        <div className="relative border-l border-terminal-muted pl-4 ml-2 my-4 space-y-8">
          {profileData.experience.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline marker */}
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-neutral-950 border border-terminal-green cursor-default hover:bg-terminal-green transition-colors duration-150" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-wide">
                    {exp.role} @ <span className="text-terminal-green text-glow">{exp.company}</span>
                  </h3>
                  <span className={`text-[9px] px-1 border border-current font-mono leading-none ${
                    exp.status === "ACTIVE" ? "text-terminal-amber animate-pulse" : "text-terminal-green"
                  }`}>
                    [{exp.status}]
                  </span>
                </div>
                <span className="text-xs text-terminal-amber">{exp.period}</span>
              </div>

              <div className="text-[11px] text-terminal-muted mb-3 uppercase">
                LOCATION: {exp.location}
              </div>

              {/* Achievements log */}
              <ul className="space-y-1.5 pl-2 border-l border-neutral-900">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start leading-relaxed">
                    <span className="text-terminal-muted mr-2 select-none">&gt;&gt;</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
