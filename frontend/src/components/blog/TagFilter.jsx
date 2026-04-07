import { TAGS } from "../../data/posts";

export default function TagFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onToggle(null)}
        className={`tag-pill transition-all ${
          selected === null
            ? "bg-[#ff6b2b] text-white border border-[#ff6b2b]"
            : "bg-[#16161f] text-[#7070a0] border border-[#252535] hover:border-[#ff6b2b]/40 hover:text-white"
        }`}
      >
        All
      </button>
      {Object.entries(TAGS).map(([key, { label, color }]) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={`tag-pill transition-all ${
            selected === key ? color + " scale-105" : "bg-[#16161f] text-[#7070a0] border border-[#252535] hover:border-[#ff6b2b]/40 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}