export default function TerminalButton({ 
  children, 
  onClick, 
  variant = "outline", // 'outline' | 'solid' | 'amber-outline' | 'amber-solid'
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
  ariaPressed,
  ariaCurrent,
}) {
  const getStyles = () => {
    switch (variant) {
      case "solid":
        return "bg-terminal-green text-black font-bold border border-terminal-green hover:bg-black hover:text-terminal-green hover:shadow-none focus:bg-black focus:text-terminal-green cursor-pointer";
      case "amber-outline":
        return "border border-terminal-amber text-terminal-amber hover:bg-terminal-amber hover:text-black focus:bg-terminal-amber focus:text-black cursor-pointer text-glow-amber";
      case "amber-solid":
        return "bg-terminal-amber text-black font-bold border border-terminal-amber hover:bg-black hover:text-terminal-amber focus:bg-black focus:text-terminal-amber cursor-pointer";
      case "outline":
      default:
        return "border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black focus:bg-terminal-green focus:text-black cursor-pointer text-glow";
    }
  };

  const getBrackets = () => {
    if (variant.includes("outline")) {
      return { start: "[ ", end: " ]" };
    }
    return { start: "", end: "" };
  };

  const { start, end } = getBrackets();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-current={ariaCurrent}
      className={`inline-flex items-center justify-center gap-1 whitespace-nowrap font-mono text-xs uppercase px-4 py-2 leading-none transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed glitch-hover ${getStyles()} ${className}`}
    >
      {start && <span aria-hidden="true" className="shrink-0">{start}</span>}
      <span className="inline-flex min-w-0 items-center justify-center">{children}</span>
      {end && <span aria-hidden="true" className="shrink-0">{end}</span>}
    </button>
  );
}
