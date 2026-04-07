import { ArrowUpDown } from "lucide-react";

export default function SortControl({ value, onChange }) {
  return (
    <div className="relative flex items-center">
      <ArrowUpDown size={14} className="absolute left-3 text-[#7070a0] pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#16161f] border border-[#252535] rounded-xl pl-9 pr-4 py-3 text-sm text-[#e8e8f0] font-body appearance-none cursor-pointer hover:border-[#ff6b2b]/30 transition-colors focus:outline-none focus:border-[#ff6b2b]/50"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}