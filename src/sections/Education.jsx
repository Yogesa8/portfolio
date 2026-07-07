import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";

export default function Education() {
  return (
    <section id="education" className="py-8 font-mono">
      <SectionHeader filename="academic_history.db" command="query" />

      <TerminalWindow title="query - select * from education" status="SUCCESS">
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-x-auto select-text font-mono text-xs md:text-sm">
          <table className="min-w-full text-left border-collapse border border-terminal-muted">
            <thead className="bg-neutral-900 border-b border-terminal-muted">
              <tr>
                <th className="p-3 border-r border-terminal-muted font-bold text-white uppercase">Degree / Qualification</th>
                <th className="p-3 border-r border-terminal-muted font-bold text-white uppercase">Institution</th>
                <th className="p-3 border-r border-terminal-muted font-bold text-white uppercase">Duration</th>
                <th className="p-3 font-bold text-white uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {profileData.education.map((edu, index) => (
                <tr key={index} className="border-b border-terminal-muted last:border-0 hover:bg-neutral-950/40">
                  <td className="p-3 border-r border-terminal-muted font-semibold text-terminal-green">
                    <div>&gt; {edu.degree}</div>
                    <div className="mt-2 text-[11px] font-normal leading-relaxed text-neutral-400">
                      {edu.description}
                    </div>
                  </td>
                  <td className="p-3 border-r border-terminal-muted text-neutral-300">
                    {edu.institution}
                  </td>
                  <td className="p-3 border-r border-terminal-muted text-terminal-amber font-semibold">
                    {edu.period}
                  </td>
                  <td className="p-3 text-cyan-400 font-bold">
                    {edu.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View Blocks */}
        <div className="md:hidden space-y-4 font-mono text-xs">
          {profileData.education.map((edu, index) => (
            <div key={index} className="border border-terminal-muted p-3 bg-neutral-950/20">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-terminal-green font-bold uppercase">{edu.degree}</span>
                <span className="text-cyan-400 font-semibold">{edu.status}</span>
              </div>
              <div className="text-neutral-300 mb-1">{edu.institution}</div>
              <div className="text-terminal-amber text-[10px]">{edu.period}</div>
              <p className="mt-2 text-neutral-400 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
