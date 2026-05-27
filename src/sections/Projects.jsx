import React, { useState } from "react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import TerminalButton from "../components/TerminalButton";

export default function Projects() {
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = profileData.projects.filter(project => {
    if (filter === "ALL") return true;
    if (filter === "FEATURED") return project.featured;
    if (filter === "STABLE") return project.status === "DEPLOYED" || project.status === "RUNNING";
    return true;
  });

  return (
    <section id="projects" className="py-8 font-mono">
      <SectionHeader filename="packages.db" command="query" />

      {/* Package Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-neutral-950/40 p-3 border border-terminal-muted border-dashed select-none">
        <span className="text-xs text-terminal-muted font-mono">// SELECT REPOSITORY:</span>
        <div className="flex flex-wrap gap-2">
          <TerminalButton 
            variant={filter === "ALL" ? "solid" : "outline"} 
            onClick={() => setFilter("ALL")}
            className="py-1 px-2.5 text-[10px]"
            ariaLabel="Show all projects"
          >
            ALL_PACKAGES
          </TerminalButton>
          <TerminalButton 
            variant={filter === "FEATURED" ? "amber-solid" : "amber-outline"} 
            onClick={() => setFilter("FEATURED")}
            className="py-1 px-2.5 text-[10px]"
            ariaLabel="Show featured projects"
          >
            FEATURED
          </TerminalButton>
          <TerminalButton 
            variant={filter === "STABLE" ? "solid" : "outline"} 
            onClick={() => setFilter("STABLE")}
            className="py-1 px-2.5 text-[10px]"
            ariaLabel="Show stable deployed packages"
          >
            STABLE_RELEASES
          </TerminalButton>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
