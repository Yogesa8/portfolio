import { useState, useRef, useEffect, useCallback } from "react";
import { Globe, Mail, Phone, RefreshCw, Check, XCircle } from "lucide-react";
import { profileData } from "../data/profile";
import SectionHeader from "../components/SectionHeader";
import TerminalWindow from "../components/TerminalWindow";
import TerminalButton from "../components/TerminalButton";
import Cursor from "../components/Cursor";

const KEY_SOUNDS_DOWN = {
  A: [31542, 85],
  B: [40621, 107],
  C: [39632, 95],
  D: [32492, 85],
  E: [23317, 83],
  F: [32973, 87],
  G: [33453, 94],
  H: [33986, 93],
  I: [25795, 91],
  J: [34425, 88],
  K: [34932, 90],
  L: [35410, 95],
  M: [41610, 93],
  N: [41103, 90],
  O: [26309, 84],
  P: [26804, 83],
  Q: [22245, 95],
  R: [23817, 92],
  S: [32031, 88],
  T: [24297, 92],
  U: [25313, 95],
  V: [40136, 94],
  W: [22790, 89],
  X: [39148, 76],
  Y: [24811, 93],
  Z: [38694, 80],
  " ": [51541, 144],
  "-": [42594, 90],
  "_": [42594, 90],
  "@": [23317, 83],
  "/": [42594, 90],
  ".": [42594, 90],
  ",": [42594, 90],
  ":": [42594, 90],
  ";": [42594, 90],
  "?": [42594, 90],
  "!": [42594, 90],
  "0": [26309, 84],
  "1": [25313, 95],
  "2": [23317, 83],
  "3": [23817, 92],
  "4": [24297, 92],
  "5": [24811, 93],
  "6": [25313, 95],
  "7": [25795, 91],
  "8": [26309, 84],
  "9": [26804, 83],
  Backspace: [42594, 90],
  Delete: [42594, 90],
  Tab: [42594, 90],
  Enter: [19065, 110],
};

const KEY_SOUNDS_UP = {
  A: [31632, 80],
  B: [40736, 95],
  C: [39732, 85],
  D: [32577, 80],
  E: [23402, 80],
  F: [33063, 80],
  G: [33553, 85],
  H: [34081, 85],
  I: [25890, 85],
  J: [34515, 85],
  K: [35027, 85],
  L: [35510, 85],
  M: [41710, 85],
  N: [41198, 85],
  O: [26394, 80],
  P: [26889, 80],
  Q: [22345, 85],
  R: [23912, 85],
  S: [32121, 80],
  T: [24392, 85],
  U: [25413, 85],
  V: [40236, 85],
  W: [22880, 85],
  X: [39228, 70],
  Y: [24911, 85],
  Z: [38779, 75],
  " ": [51691, 130],
  "-": [42689, 85],
  "_": [42689, 85],
  "@": [23402, 80],
  "/": [42689, 85],
  ".": [42689, 85],
  ",": [42689, 85],
  ":": [42689, 85],
  ";": [42689, 85],
  "?": [42689, 85],
  "!": [42689, 85],
  "0": [26394, 80],
  "1": [25413, 85],
  "2": [23402, 80],
  "3": [23912, 85],
  "4": [24392, 85],
  "5": [24911, 85],
  "6": [25413, 85],
  "7": [25890, 85],
  "8": [26394, 80],
  "9": [26889, 80],
  Backspace: [42689, 85],
  Delete: [42689, 85],
  Tab: [42689, 85],
  Enter: [19180, 100],
};

const getWebsiteHost = (website) => {
  if (!website) return "unassigned-host";

  try {
    return new URL(website).hostname;
  } catch {
    return website;
  }
};

function useTerminalSound() {
  const audioContextRef = useRef(null);
  const bufferRef = useRef(null);
  const loadingRef = useRef(false);
  const failedRef = useRef(false);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }, []);

  const loadSoundSprite = useCallback(async () => {
    const context = getAudioContext();

    if (
      !context ||
      loadingRef.current ||
      bufferRef.current ||
      failedRef.current
    ) {
      return;
    }

    loadingRef.current = true;

    try {
      const response = await fetch("/sound.ogg");

      if (!response.ok) {
        throw new Error("sound.ogg not found");
      }

      const arrayBuffer = await response.arrayBuffer();
      bufferRef.current = await context.decodeAudioData(arrayBuffer);
    } catch {
      failedRef.current = true;
    } finally {
      loadingRef.current = false;
    }
  }, [getAudioContext]);

  const playFallbackClick = useCallback(
    (type = "down") => {
      const context = getAudioContext();

      if (!context) return;

      if (context.state === "suspended") {
        context.resume();
      }

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(type === "up" ? 780 : 620, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.025, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.04);
    },
    [getAudioContext],
  );

  const getSound = useCallback((soundMap, key) => {
    if (!key) return null;

    if (key === "Spacebar") return soundMap[" "];
    if (key === " ") return soundMap[" "];

    if (soundMap[key]) return soundMap[key];

    if (key.length === 1) {
      const upperKey = key.toUpperCase();

      if (soundMap[upperKey]) return soundMap[upperKey];
    }

    return null;
  }, []);

  const playSound = useCallback(
    (sound, type = "down") => {
      const context = getAudioContext();

      if (!context) return;

      if (context.state === "suspended") {
        context.resume();
      }

      if (!bufferRef.current) {
        loadSoundSprite();
        playFallbackClick(type);
        return;
      }

      if (!sound) {
        playFallbackClick(type);
        return;
      }

      try {
        const source = context.createBufferSource();
        source.buffer = bufferRef.current;
        source.connect(context.destination);
        source.start(0, sound[0] / 1000, sound[1] / 1000);
      } catch {
        playFallbackClick(type);
      }
    },
    [getAudioContext, loadSoundSprite, playFallbackClick],
  );

  const playKeyDown = useCallback(
    (key) => {
      playSound(getSound(KEY_SOUNDS_DOWN, key), "down");
    },
    [getSound, playSound],
  );

  const playKeyUp = useCallback(
    (key) => {
      playSound(getSound(KEY_SOUNDS_UP, key), "up");
    },
    [getSound, playSound],
  );

  const playClick = useCallback(() => {
    playKeyDown("Enter");

    window.setTimeout(() => {
      playKeyUp("Enter");
    }, 70);
  }, [playKeyDown, playKeyUp]);

  useEffect(() => {
    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playKeyDown,
    playKeyUp,
    playClick,
  };
}

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0); // 0: init prompt, 1: name, 2: email, 3: message, 4: sending, 5: completed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [logs, setLogs] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const { playKeyDown, playKeyUp, playClick } = useTerminalSound();
  const profileHost = getWebsiteHost(profileData.personal.website);

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

  const handleSoundKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    playKeyDown(e.key);
  };

  const handleSoundKeyUp = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    playKeyUp(e.key);
  };

  const startWizard = () => {
    playClick();
    setCurrentStep(1);
    setLogs([]);
    setSendError(false);
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
    setSendError(false);

    const stages = [
      "ESTABLISHING CONTEXT BINDINGS...",
      "INITIATING PORT 25 SMTP PROTOCOL...",
      "RESOLVING SMTP HOST MX.GOOGLE.COM...",
      "AUTHENTICATING PORTAL CERTIFICATE HANDSHAKE...",
      "UPLOADING EMAIL PAYLOAD PACKETS...",
    ];

    stages.forEach((stage, idx) => {
      setTimeout(
        () => {
          setLogs((prev) => [...prev, `[SMTP] ${stage}`]);

          if (idx === stages.length - 1) {
            fetch("https://api.staticforms.dev/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accessKey: "sf_27ee2566344efd11e2ad0540",
                name,
                email,
                message,
                subject: `Portfolio Inquiry from ${name}`,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  setLogs((prev) => [
                    ...prev,
                    "[SMTP] TRANSMISSION COMPLETED SUCCESSFULLY.",
                  ]);
                  setIsSending(false);
                  setCurrentStep(5);
                } else {
                  throw new Error(data.message || "Submission failed");
                }
              })
              .catch(() => {
                setLogs((prev) => [
                  ...prev,
                  "[SMTP] ERROR: TRANSMISSION FAILED. RETRY OR USE DIRECT PORT.",
                ]);
                setIsSending(false);
                setSendError(true);
                setCurrentStep(3);
              });
          }
        },
        (idx + 1) * 450,
      );
    });
  };

  const resetTerminal = () => {
    playClick();
    setName("");
    setEmail("");
    setMessage("");
    setLogs([]);
    setSendError(false);
    setCurrentStep(0);
  };

  return (
    <section id="contact" className="py-8 font-mono">
      <SectionHeader filename="mail_client.sh" command="./" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive CLI Console */}
        <TerminalWindow
          title="sh - interactive_mail.sh"
          status={
            currentStep === 5
              ? "SUCCESS"
              : currentStep === 4
                ? "RUNNING"
                : "AWAITING_INPUT"
          }
          statusColor={
            currentStep === 5 ? "text-terminal-green" : "text-terminal-amber"
          }
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
                    &gt;&gt; Ready to execute secure message transmission
                    script.
                  </div>
                  <TerminalButton variant="solid" onClick={startWizard}>
                    INITIALIZE WIZARD
                  </TerminalButton>
                </div>
              )}

              {/* Step 1+: Displaying Name Prompts */}
              {currentStep >= 1 && (
                <div className="mb-3">
                  <div className="text-terminal-muted uppercase select-none">
                    &gt;&gt; ENTER_SENDER_NAME:
                  </div>
                  <form
                    onSubmit={handleNameSubmit}
                    className="flex items-center"
                  >
                    <span className="text-terminal-amber mr-2">$</span>
                    {currentStep > 1 ? (
                      <span className="text-white uppercase">{name}</span>
                    ) : (
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleSoundKeyDown}
                        onKeyUp={handleSoundKeyUp}
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
                  <div className="text-terminal-muted uppercase select-none">
                    &gt;&gt; ENTER_SENDER_EMAIL:
                  </div>
                  <form
                    onSubmit={handleEmailSubmit}
                    className="flex items-center"
                  >
                    <span className="text-terminal-amber mr-2">$</span>
                    {currentStep > 2 ? (
                      <span className="text-white">{email}</span>
                    ) : (
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleSoundKeyDown}
                        onKeyUp={handleSoundKeyUp}
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
                  <div className="text-terminal-muted uppercase select-none">
                    &gt;&gt; ENTER_MESSAGE_PAYLOAD:
                  </div>
                  <form
                    onSubmit={handleMessageSubmit}
                    className="flex items-start"
                  >
                    <span className="text-terminal-amber mr-2 mt-0.5">$</span>
                    {currentStep > 3 ? (
                      <span className="text-white break-words">{message}</span>
                    ) : (
                      <div className="flex-1 flex flex-col items-stretch gap-2">
                        <textarea
                          ref={messageInputRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            handleSoundKeyDown(e);

                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleMessageSubmit(e);
                            }
                          }}
                          onKeyUp={handleSoundKeyUp}
                          placeholder="Type message and press Enter/Submit..."
                          rows={2}
                          className="bg-transparent text-terminal-green outline-none w-full resize-none"
                          required
                        />
                        <TerminalButton
                          type="submit"
                          variant="solid"
                          className="self-start py-1 px-3 text-[10px]"
                          onClick={playClick}
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

              {/* Error State */}
              {sendError && (
                <div className="mt-4 border border-red-500 p-3 bg-red-950/20 space-y-2">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-red-400 font-bold text-[11px]">
                      [ TRANSMISSION_FAILED ] EXIT CODE: 1
                    </span>
                  </div>
                  <div className="text-[11px] text-terminal-muted leading-relaxed">
                    SMTP RELAY REJECTED PAYLOAD. SERVER RETURNED NON-200
                    RESPONSE.
                  </div>
                  <div className="text-[11px] text-terminal-amber">
                    &gt; RE-ENTER MESSAGE ABOVE AND RETRY, OR USE DIRECT PORT
                    BELOW.
                  </div>
                </div>
              )}

              {/* Step 5: Completed */}
              {currentStep === 5 && (
                <div className="mt-4 border border-terminal-green p-3 bg-green-950/20 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-terminal-green shrink-0" />
                    <span className="text-white font-bold text-[11px]">
                      [ TRANSMITTED_SUCCESS ] EXIT CODE: 0
                    </span>
                  </div>
                  <div className="text-[11px] text-terminal-muted leading-relaxed">
                    PAYLOAD FROM{" "}
                    <span className="text-terminal-green uppercase">
                      {name}
                    </span>{" "}
                    DELIVERED SECURELY TO HOST GATEWAY.
                  </div>
                  <div className="text-[11px] text-terminal-amber">
                    &gt; RESPONSE EXPECTED WITHIN 24–48 HRS. PRESS [RESET_SHELL]
                    TO SEND ANOTHER.
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
          <TerminalWindow
            title="system - diagnostic details"
            showControls={false}
            className="flex-1"
          >
            <div className="space-y-4 text-xs md:text-sm">
              <div className="text-xs text-terminal-muted select-none">
                // SYSTEM PROFILE ENVIRONMENT:
              </div>

              <div className="space-y-1">
                <div className="text-white uppercase">Host: {profileHost}</div>
                <div className="text-neutral-400">DNS State: [RESOLVED]</div>
                <div className="text-neutral-400">
                  SSL Integrity: [VERIFIED]
                </div>
                <div className="text-neutral-400">Gateway: SMTP MAIL AGENT</div>
              </div>

              <div className="border border-dashed border-terminal-muted p-3 bg-neutral-950/40 select-none">
                <div className="text-[10px] text-terminal-muted uppercase mb-1">
                  // SHELL QUICK KEYS:
                </div>
                <ul className="space-y-1 text-[11px] text-neutral-400">
                  <li>- Click terminal body to focus current prompt</li>
                  <li>- Type response and press [Enter] to submit step</li>
                  <li>- Press [RESET_SHELL] to clear form logs</li>
                </ul>
              </div>
            </div>
          </TerminalWindow>

          {/* Quick Direct Connections */}
          <TerminalWindow
            title="contact - ports"
            status="ONLINE"
            statusColor="text-cyan-400"
            showControls={false}
          >
            <div className="space-y-4 text-xs md:text-sm">
              <div className="text-xs text-terminal-muted select-none">
                // CONNECT DIRECTLY VIA PORT PROTOCOLS:
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Mail className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-muted">SMTP:</span>
                <a
                  href={`mailto:${profileData.personal.email}`}
                  className="text-terminal-green hover:underline select-text"
                >
                  {profileData.personal.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Phone className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-muted">TEL:</span>
                <a
                  href={`tel:${profileData.personal.phone.replace(/\s+/g, "")}`}
                  className="text-terminal-green hover:underline select-text"
                >
                  {profileData.personal.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Globe className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-muted">WEB:</span>
                <a
                  href={profileData.personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:underline select-text break-all"
                >
                  {profileData.personal.website}
                </a>
              </div>
              <div className="text-[10px] text-terminal-muted border-t border-dashed border-neutral-900 pt-3">
                SECURE KEY: PGP_KEY_EXPIRED // TRANSMISSIONS ARE ENCRYPTED VIA
                END-TO-END TLS CHANNELS.
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
