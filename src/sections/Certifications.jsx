import { ShieldCheck } from "lucide-react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";

export default function Certifications() {
  return (
    <section id="certifications" className="py-8 font-mono">
      <SectionHeader filename="credentials.crt" command="openssl x509 -in" />

      <TerminalWindow title="terminal - ssl verification" status="SECURE" statusColor="text-terminal-green">
        <div className="space-y-4">
          <div className="text-xs text-terminal-muted select-none">
            // RUNNING SHA-256 INTEGRITY CHECKS ON PROFESSIONAL ACCREDITATIONS...
          </div>
          
          {profileData.certifications.map((cert, index) => (
            <div 
              key={index}
              className="border border-terminal-muted p-4 bg-neutral-950/40 hover:border-terminal-green transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-terminal-green animate-pulse" />
                <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-wide">
                  {cert.name}
                </h3>
              </div>
              <div className="text-[11px] text-terminal-amber uppercase font-mono mb-2">
                ISSUED BY: {cert.provider} | YEAR: {cert.year} | CREDENTIAL: {cert.credential} | INTEGRITY: [VERIFIED]
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pl-8 border-l border-terminal-muted">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
