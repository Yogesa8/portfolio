import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";

export default function About() {
  const { personal } = profileData;
  const jsonProfile = JSON.stringify({
    name: personal.name,
    role: personal.role,
    location: personal.location,
    email: personal.email,
    phone: personal.phone,
    website: personal.website,
    github: personal.github,
    linkedin: personal.linkedin,
    experience: personal.experience,
    availability: personal.availability,
    specialization: personal.specialization
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
              &gt; {personal.summary}
            </p>

            <div className="border border-dashed border-terminal-muted p-3 mt-4 bg-neutral-950/40">
              <div className="text-terminal-amber font-semibold uppercase text-xs mb-2">// PROFILE SIGNALS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-400 mb-3">
                <div><span className="text-terminal-muted">EXPERIENCE:</span> {personal.experience}</div>
                <div><span className="text-terminal-muted">AVAILABILITY:</span> {personal.availability}</div>
                <div><span className="text-terminal-muted">LOCATION:</span> {personal.location}</div>
                <div><span className="text-terminal-muted">ROLE:</span> {personal.role}</div>
              </div>

              <div className="text-terminal-amber font-semibold uppercase text-xs mb-2">// SPECIALIZATION:</div>
              <ul className="space-y-1.5 text-neutral-400">
                {personal.specialization.map((item) => (
                  <li key={item}>
                    <span className="text-terminal-green mr-2">[+]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TerminalWindow>

      </div>
    </section>
  );
}
