import { motion } from "framer-motion";

export default function SectionHeader({ 
  command = "cat", 
  filename, 
  promptUser = "system@yogesh", 
  promptDir = "~", 
  className = "" 
}) {
  return (
    <div className={`font-mono mb-6 select-none ${className}`}>
      <div className="flex items-center space-x-1.5 text-xs md:text-sm">
        <span className="text-[#38bdf8]">{promptUser}</span>
        <span className="text-terminal-muted">:</span>
        <span className="text-[#fb7185]">{promptDir}</span>
        <span className="text-white">$</span>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-terminal-green text-glow"
        >
          {command} <span className="text-terminal-amber">{filename}</span>
        </motion.span>
      </div>
      <div className="text-terminal-muted text-xs leading-none mt-1">
        ================================================================================
      </div>
    </div>
  );
}
