export default function Cursor({ colorClass = "text-terminal-green" }) {
  return (
    <span 
      className={`cursor-block ${colorClass} ml-1`} 
      aria-hidden="true"
    />
  );
}
