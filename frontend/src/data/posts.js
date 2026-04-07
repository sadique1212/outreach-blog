import { useState, useEffect, useRef } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useSearch(items, fields = ["title", "excerpt"]) {
  const [query, setQuery] = useState("");
  const filtered = query.trim() === ""
    ? items
    : items.filter(item =>
        fields.some(f =>
          item[f]?.toLowerCase().includes(query.toLowerCase())
        )
      );
  return { query, setQuery, filtered };
}