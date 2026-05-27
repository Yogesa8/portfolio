import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, Terminal, RefreshCw, Send, Check } from "lucide-react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";
import TerminalButton from "../components/TerminalButton";
import Cursor from "../components/Cursor";

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0); // 0: init prompt, 1: name, 2: email, 3: message, 4: sending, 5: completed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [logs, setLogs] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  // Auto-focus current input based on wizard step
  useEffect(() => {
    if (currentStep === 1) nameInputRef.current?.focus();
    else if (currentStep === 2) emailInputRef.current?.focus();
    else if (currentStep === 3) messageInputRef.current?.focus();
  }, [currentStep]);

  const handleTerminalClick = () => {
    if (currentStep === 1) nameInputRef.current?.focus();
    else if (currentStep === 2) emailInputRef.current?.focus();
    else if (currentStep === 3) messageInputRef.current?.focus();
  };

  const startWizard = () => {
    setCurrentStep(1);
    setLogs([]);
    setIsSent(false);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setCurrentStep(2);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setCurrentStep(3);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setCurrentStep(4);
      triggerSmtpSim();
    }
  };

  const triggerSmtpSim = () => {
    setIsSending(true);
    setLogs([]);
    setIsSent(false);

    const stages = [
      "ESTABLISHING CONTEXT BINDINGS...",
      "INITIATING PORT 25 SMTP PROTOCOL...",
      "RESOLVING SMTP HOST MX.GOOGLE.COM...",
      "AUTHENTICATING PORTAL CERTIFICATE HANDSHAKE...",
      "UPLOADING EMAIL PAYLOAD PACKETS...",
      "TRANSMISSION COMPLETED SUCCESSFULLY."
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[SMTP] ${stage}`]);
        if (idx === stages.length - 1) {
          setIsSending(false);
          setIsSent(true);
          setCurrentStep(5);
          
          // Open default client mail app as fallback
          const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
          const body = encodeURIComponent(message);
          window.location.href = `mailto:${profileData.personal.email}?subject=${subject}&body=${body}`;
        }
      }, (idx + 1) * 450);
    });
  };

  const resetTerminal = () => {
    setName("");
    setEmail("");
    setMessage("");
    setLogs([]);
    setIsSent(false);
    setCurrentStep(0);
  };

  return (
    <section id="contact" className="py-8 font-mono">
      <SectionHeader filename="mail_client.sh" command="./" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive CLI Console */}
        <TerminalWindow 
          title="sh - interactive_mail.sh" 
          status={currentStep === 5 ? "SUCCESS" : currentStep === 4 ? "RUNNING" : "AWAITING_INPUT"}
          statusColor={currentStep === 5 ? "text-terminal-green" : "text-terminal-amber"}
        >
          <div 
            onClick={handleTerminalClick}
            className="cursor-text min-h-[280px] flex flex-col justify-between text-xs md:text-sm font-mono leading-relaxed"
          >
            <div>
              {/* Step 0: Shell Prompt Init */}
              <div className="text-terminal-muted select-none mb-2">
                system@yogesh:~$ ./interactive_mail.sh
              </div>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="text-white">
                    &gt;&gt; Ready to execute secure message transmission script.
                  </div>
                  <TerminalButton variant="solid" onClick={startWizard}>
                    INITIALIZE WIZARD
                  </TerminalButton>
                </div>
              )}

              {/* Step 1+: Displaying Name Prompts */}
              {currentStep >= 1 && (
                <div className="mb-3">
                  <div className="text-terminal-muted uppercase select-none">&gt;&gt; ENTER_SENDER_NAME:</div>
                  <form onSubmit={handleNameSubmit} className="flex items-center">
                    <span className="text-terminal-amber mr-2">$</span>
                    {currentStep > 1 ? (
                      <span className="text-white uppercase">{name}</span>
                    ) : (
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type name and press Enter..."
                        className="bg-transparent text-terminal-green outline-none w-full uppercase"
                        required
                      />
                    )}
                    {currentStep === 1 && <Cursor />}
                  </form>
                </div>
              )}

              {/* Step 2+: Displaying Email Prompts */}
              {currentStep >= 2 && (
                <div className="mb-3">
                  <div className="text-terminal-muted uppercase select-none">&gt;&gt; ENTER_SENDER_EMAIL:</div>
                  <form onSubmit={handleEmailSubmit} className="flex items-center">
                    <span className="text-terminal-amber mr-2">$</span>
                    {currentStep > 2 ? (
                      <span className="text-white">{email}</span>
                    ) : (
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type email and press Enter..."
                        className="bg-transparent text-terminal-green outline-none w-full"
                        required
                      />
                    )}
                    {currentStep === 2 && <Cursor />}
                  </form>
                </div>
              )}

              {/* Step 3+: Displaying Message Payload Prompts */}
              {currentStep >= 3 && (
                <div className="mb-3">
                  <div className="text-terminal-muted uppercase select-none">&gt;&gt; ENTER_MESSAGE_PAYLOAD:</div>
                  <form onSubmit={handleMessageSubmit} className="flex items-start">
                    <span className="text-terminal-amber mr-2 mt-0.5">$</span>
                    {currentStep > 3 ? (
                      <span className="text-white break-words">{message}</span>
                    ) : (
                      <div className="flex-1 flex flex-col items-stretch gap-2">
                        <textarea
                          ref={messageInputRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type message and press Enter/Submit..."
                          rows={2}
                          className="bg-transparent text-terminal-green outline-none w-full resize-none"
                          required
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleMessageSubmit(e);
                            }
                          }}
                        />
                        <TerminalButton 
                          type="submit"
                          variant="solid" 
                          className="self-start py-1 px-3 text-[10px]"
                        >
                          SUBMIT_PAYLOAD
                        </TerminalButton>
                      </div>
                    )}
                    {currentStep === 3 && <Cursor />}
                  </form>
                </div>
              )}

              {/* Step 4+: Live CLI logs */}
              {currentStep >= 4 && (
                <div className="border-t border-dashed border-terminal-muted pt-3 mt-3 space-y-1 text-[11px] md:text-xs">
                  {logs.map((log, index) => (
                    <div key={index} className="text-terminal-amber">
                      {log}
                    </div>
                  ))}
                  {isSending && (
                    <div className="text-white flex items-center select-none animate-pulse">
                      &gt; STREAMING TRANSMISSION LOGS... <Cursor />
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Completed */}
              {currentStep === 5 && (
                <div className="mt-4 border border-terminal-green p-3 bg-neutral-900/40">
                  <div className="text-white font-bold mb-1 flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-terminal-green animate-pulse" />
                    <span>[ TRANSMITTED_SUCCESS ]</span>
                  </div>
                  <div className="text-[11px] text-terminal-muted leading-tight">
                    YOUR PAYLOAD DELIVERED SECURELY TO THE HOST GATEWAY. MAIL CLIENT INITIATED.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            {currentStep > 0 && (
              <div className="pt-4 border-t border-dashed border-neutral-900 flex justify-between select-none">
                <span className="text-[10px] text-terminal-muted">
                  STEP {Math.min(currentStep, 4)}/4
                </span>
                <button
                  type="button"
                  onClick={resetTerminal}
                  className="text-[10px] text-terminal-amber hover:text-white focus:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>RESET_SHELL</span>
                </button>
              </div>
            )}

          </div>
        </TerminalWindow>

        {/* Static Connection details */}
        <div className="flex flex-col justify-between space-y-6">
          <TerminalWindow title="system - diagnostic details" showControls={false} className="flex-1">
            <div className="space-y-4 text-xs md:text-sm">
              <div className="text-xs text-terminal-muted select-none">
                // SYSTEM PROFILE ENVIRONMENT:
              </div>
              
              <div className="space-y-1">
                <div className="text-white uppercase">Host: yogesh.dev</div>
                <div className="text-neutral-400">DNS State: [RESOLVED]</div>
                <div className="text-neutral-400">SSL Integrity: [VERIFIED]</div>
                <div className="text-neutral-400">Gateway: SMTP MAIL AGENT</div>
              </div>

              <div className="border border-dashed border-terminal-muted p-3 bg-neutral-950/40 select-none">
                <div className="text-[10px] text-terminal-muted uppercase mb-1">// SHELL QUICK KEYS:</div>
                <ul className="space-y-1 text-[11px] text-neutral-400">
                  <li>- Click terminal body to focus current prompt</li>
                  <li>- Type response and press [Enter] to submit step</li>
                  <li>- Press [RESET_SHELL] to clear form logs</li>
                </ul>
              </div>
            </div>
          </TerminalWindow>

          {/* Quick Direct Connections */}
          <TerminalWindow title="contact - ports" status="ONLINE" statusColor="text-cyan-400" showControls={false}>
            <div className="space-y-4 text-xs md:text-sm">
              <div className="text-xs text-terminal-muted select-none">
                // CONNECT DIRECTLY VIA PORT PROTOCOLS:
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Mail className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-muted">SMTP:</span>
                <a href={`mailto:${profileData.personal.email}`} className="text-terminal-green hover:underline select-text">
                  {profileData.personal.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Phone className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-muted">TEL:</span>
                <a href={`tel:${profileData.personal.phone.replace(/\s+/g, '')}`} className="text-terminal-green hover:underline select-text">
                  {profileData.personal.phone}
                </a>
              </div>
              <div className="text-[10px] text-terminal-muted border-t border-dashed border-neutral-900 pt-3">
                SECURE KEY: PGP_KEY_EXPIRED // TRANSMISSIONS ARE ENCRYPTED VIA END-TO-END TLS CHANNELS.
              </div>
            </div>
          </TerminalWindow>
        </div>

      </div>
    </section>
  );
}
