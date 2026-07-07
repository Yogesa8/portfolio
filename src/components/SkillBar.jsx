import { motion } from "framer-motion";

export default function SkillBar({ name, level }) {
  const totalBlocks = 12;
  const filledBlocks = Math.round((level / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;

  const barString = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div className="font-mono text-xs md:text-sm my-3 select-none">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white hover:text-terminal-green transition-colors duration-150">
          &gt; {name}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-terminal-muted">[</span>
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-terminal-green text-glow tracking-widest overflow-hidden whitespace-nowrap block"
          >
            {barString}
          </motion.span>
          <span className="text-terminal-muted">]</span>
        </div>
        {/* <span className="text-terminal-amber">{level}%</span> */}
      </div>
      {/* <div className="flex items-center space-x-2">
        <span className="text-terminal-muted">[</span>
        <motion.span 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-terminal-green text-glow tracking-widest overflow-hidden whitespace-nowrap block"
        >
          {barString}
        </motion.span>
        <span className="text-terminal-muted">]</span>
      </div> */}
    </div>
  );
}
