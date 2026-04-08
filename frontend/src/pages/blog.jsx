import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "../components/blog/postcard";
import SearchBar from "../components/blog/SearchBar";
import TagFilter from "../components/blog/TagFilter";
import { posts }  from "../data/posts";

const ALL_TAGS = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

export default function Blog() {
  const [query,    setQuery]    = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sort,     setSort]     = useState("latest"); // "latest" | "oldest"

  const filtered = useMemo(() => {
    let result = posts
      .filter((p) =>
        activeTag === "All" ? true : p.tags.includes(activeTag)
      )
      .filter((p) =>
        query
          ? p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(query.toLowerCase())
          : true
      );
    return sort === "latest"
      ? result.sort((a, b) => new Date(b.date) - new Date(a.date))
      : result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [query, activeTag, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          Blog & <span className="gradient-text">Announcements</span>
        </h1>
        <p className="text-slate-400">
          Updates, stories and achievements from Outreach Cell, IIT Roorkee.
        </p>
      </div>

      {/* Controls row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
        <SearchBar value={query} onChange={setQuery} />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ml-auto bg-brand-muted border border-indigo-900/50 text-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="latest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <TagFilter tags={ALL_TAGS} active={activeTag} onSelect={setActiveTag} />

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-center py-20"
          >
            No posts match your search.
          </motion.p>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}