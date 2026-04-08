import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BotMascot from "../components/mascot/BotMascot";
import Timeline from "../components/Timeline/Timeline";
import PostCard from "../components/blog/postcard";
import { posts }  from "../data/posts";

// Staggered animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">

        {/* Radial background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Bot mascot — eye-tracking handled inside component */}
        <BotMascot className="mb-8 animate-float" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl"
        >
          <motion.p variants={item} className="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-3">
            IIT Roorkee
          </motion.p>

          <motion.h1 variants={item} className="text-5xl md:text-7xl font-black mb-5 leading-tight">
            <span className="gradient-text">Outreach Cell</span>
          </motion.h1>

          <motion.p variants={item} className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
            Bridging campus and community — discover events, stories and
            achievements that define the spirit of IIT Roorkee's outreach.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/blog"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-indigo-900/40"
            >
              Read Blog
            </Link>
            <a
              href="#timeline"
              className="px-8 py-3 glass text-indigo-300 rounded-full font-semibold hover:bg-white/5 transition-all duration-200"
            >
              Our Journey ↓
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-10 border-y border-indigo-900/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { n: "10+", label: "Years of Outreach" },
            { n: "50K+", label: "Students Impacted" },
            { n: "200+", label: "Events Conducted" },
            { n: "30+", label: "Partner NGOs" },
          ].map(({ n, label }) => (
            <div key={label}>
              <p className="text-4xl font-black gradient-text">{n}</p>
              <p className="text-slate-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          Latest <span className="gradient-text">Stories</span>
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.slice(0, 3).map((post) => (
            <motion.div key={post.id} variants={item}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
            View all posts →
          </Link>
        </div>
      </section>

      {/* ── Interactive Timeline ── */}
      <section id="timeline" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Journey of <span className="gradient-text">Outreach</span>
          </h2>
          <Timeline />
        </div>
      </section>

    </div>
  );
}