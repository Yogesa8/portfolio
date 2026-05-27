import React from "react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import SkillBar from "../components/SkillBar";
import TerminalWindow from "../components/TerminalWindow";

export default function Skills() {
  return (
    <section id="skills" className="py-8 font-mono">
      <SectionHeader filename="check_system_deps.sh" command="./" />

      {/* Grid of skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {profileData.skills.map((category, index) => (
          <TerminalWindow 
            key={index} 
            title={`DEPS: ${category.category}`} 
            status="INSTALLED" 
            statusColor="text-terminal-green"
            showControls={false}
            className="hover:border-terminal-green transition-colors duration-200"
          >
            <div className="space-y-1">
              {category.items.map((skill, sIdx) => (
                <SkillBar 
                  key={sIdx} 
                  name={skill.name} 
                  level={skill.level} 
                />
              ))}
            </div>
          </TerminalWindow>
        ))}
      </div>
    </section>
  );
}
