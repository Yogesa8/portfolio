import { useState } from "react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import TerminalButton from "../components/TerminalButton";

const statusPriority = [
  "LIVE",
  "IN PROGRESS",
  "PRODUCTION",
  "INTERNAL",
  "COMPLETED",
  "FREELANCE",
  "WORKING",
];
const projectStatuses = Array.from(
  new Set(profileData.projects.map((project) => project.status).filter(Boolean)),
).sort((firstStatus, secondStatus) => {
  const firstIndex = statusPriority.indexOf(firstStatus);
  const secondIndex = statusPriority.indexOf(secondStatus);

  if (firstIndex === -1 && secondIndex === -1) {
    return firstStatus.localeCompare(secondStatus);
  }

  if (firstIndex === -1) return 1;
  if (secondIndex === -1) return -1;

  return firstIndex - secondIndex;
});

const projectFilters = [
  {
    id: "ALL",
    label: "ALL_PACKAGES",
    ariaLabel: "Show all projects",
    matches: () => true,
  },
  ...projectStatuses.map((status) => ({
    id: status,
    label: status,
    ariaLabel: `Show ${status.toLowerCase()} projects`,
    matches: (project) => project.status === status,
  })),
];

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const activeFilter =
    projectFilters.find((projectFilter) => projectFilter.id === filter) ??
    projectFilters[0];

  const filteredProjects = profileData.projects.filter(activeFilter.matches);

  const getFilterVariant = (projectFilter) => {
    const isActive = projectFilter.id === activeFilter.id;

    return isActive ? "solid" : "outline";
  };

  return (
    <section id="projects" className="py-8 font-mono">
      <SectionHeader filename="packages.db" command="query" />

      {/* Package Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-neutral-950/40 p-3 border border-terminal-muted border-dashed select-none">
        <span className="text-xs text-terminal-muted font-mono">
          // SELECT REPOSITORY:
        </span>
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((projectFilter) => {
            const isActive = projectFilter.id === activeFilter.id;

            return (
              <TerminalButton
                key={projectFilter.id}
                variant={getFilterVariant(projectFilter)}
                onClick={() => setFilter(projectFilter.id)}
                className="py-1 px-2.5 text-[10px]"
                ariaLabel={projectFilter.ariaLabel}
                ariaPressed={isActive}
                ariaCurrent={isActive ? "true" : undefined}
              >
                {projectFilter.label}
              </TerminalButton>
            );
          })}
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
