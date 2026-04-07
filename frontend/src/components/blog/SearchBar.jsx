import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search posts..." }) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7070a0] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input w-full bg-[#16161f] border border-[#252535] rounded-xl pl-11 pr-10 py-3 text-sm text-[#e8e8f0] placeholder-[#7070a0] font-body transition-all duration-300 hover:border-[#ff6b2b]/30"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7070a0] hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}