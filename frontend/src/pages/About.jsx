import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Data ───────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    icon: "◈",
    title: "Community First",
    desc: "Every initiative starts with listening — understanding what communities genuinely need before we act.",
    color: "from-indigo-900/40 to-indigo-800/10 border-indigo-700/30",
    accent: "text-indigo-400",
  },
  {
    icon: "◉",
    title: "Student-Led",
    desc: "Run entirely by IIT Roorkee students who balance academics with real-world social impact.",
    color: "from-violet-900/40 to-violet-800/10 border-violet-700/30",
    accent: "text-violet-400",
  },
  {
    icon: "◐",
    title: "Sustainable Impact",
    desc: "We design programs that outlive a single semester — building systems, not moments.",
    color: "from-fuchsia-900/40 to-fuchsia-800/10 border-fuchsia-700/30",
    accent: "text-fuchsia-400",
  },
  {
    icon: "◑",
    title: "Radical Inclusion",
    desc: "Outreach means everyone. We make sure no student or community member is left behind.",
    color: "from-purple-900/40 to-purple-800/10 border-purple-700/30",
    accent: "text-purple-400",
  },
];

const TEAM = [
  { name: "Aarav Mehta",     role: "Coordinator",        initials: "AM", bg: "bg-indigo-700" },
  { name: "Priya Sharma",    role: "Events Head",         initials: "PS", bg: "bg-violet-700" },
  { name: "Rohan Gupta",     role: "Design Lead",         initials: "RG", bg: "bg-fuchsia-700" },
  { name: "Sneha Patel",     role: "Content & Blog",      initials: "SP", bg: "bg-purple-700" },
  { name: "Akash Joshi",     role: "Tech Lead",           initials: "AJ", bg: "bg-pink-700" },
  { name: "Diya Krishnan",   role: "Outreach Relations",  initials: "DK", bg: "bg-sky-700" },
];

const INITIATIVES = [
  { name: "Gambhir",    tag: "Flagship",   desc: "Annual socio-cultural fest connecting 5,000+ students with NGO partners across Uttarakhand." },
  { name: "Prayas",     tag: "Education",  desc: "Free weekend tutoring for govt-school children in Roorkee, led by 80+ student volunteers." },
  { name: "Sankalp",    tag: "Health",     desc: "Health camps and awareness drives in rural areas around the IIT campus." },
  { name: "Umang",      tag: "Sports",     desc: "Sports day organized for underprivileged children — breaking barriers through play." },
  { name: "Sambandh",   tag: "Mentorship", desc: "Long-term mentorship pairing IITR students with first-generation college aspirants." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const TAG_COLORS = {
  Flagship:   "bg-indigo-900/60 text-indigo-300 border-indigo-700/40",
  Education:  "bg-violet-900/60 text-violet-300 border-violet-700/40",
  Health:     "bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/40",
  Sports:     "bg-purple-900/60 text-purple-300 border-purple-700/40",
  Mentorship: "bg-pink-900/60 text-pink-300 border-pink-700/40",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function About() {
  // Parallax stars ref
  const starsRef = useRef(null);

  useEffect(() => {
    const el = starsRef.current;
    if (!el) return;
    const handleScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden">

      {/* ── Decorative star field ── */}
      <div
        ref={starsRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-20 px-4 text-center">
        <motion.p
          {...fadeUp(0)}
          className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3"
        >
          Who we are
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          <span className="gradient-text">Outreach Cell</span>
          <br />
          <span className="text-white text-3xl md:text-4xl font-bold">IIT Roorkee</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed"
        >
          We are the student-run social responsibility arm of IIT Roorkee —
          turning campus energy into community change through education, health,
          culture and technology.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link
            to="/blog"
            className="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-indigo-900/40"
          >
            Read our blog
          </Link>
          <a
            href="#initiatives"
            className="px-7 py-3 glass text-indigo-300 rounded-full font-semibold hover:bg-white/5 transition-all duration-200"
          >
            Our initiatives ↓
          </a>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          MISSION STRIP
      ════════════════════════════════════ */}
      <motion.section
        {...fadeUp()}
        className="relative z-10 max-w-4xl mx-auto px-4 py-14"
      >
        <div className="glass rounded-3xl p-8 md:p-12 border border-indigo-900/40 text-center">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Our Mission
          </p>
          <blockquote className="text-2xl md:text-3xl font-semibold text-white leading-snug">
            "To harness the intellectual and creative potential of{" "}
            <span className="gradient-text">IIT Roorkee students</span> in
            service of the communities that surround us."
          </blockquote>
        </div>
      </motion.section>

      {/* ════════════════════════════════════
          CORE VALUES
      ════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          {...fadeUp()}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          What drives <span className="gradient-text">us</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp(i * 0.08)}
              className={`bg-gradient-to-br ${v.color} border rounded-2xl p-6 flex flex-col gap-3 hover:scale-[1.03] transition-transform duration-200`}
            >
              <span className={`text-3xl ${v.accent} font-black`}>{v.icon}</span>
              <h3 className="text-white font-bold text-lg">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          INITIATIVES
      ════════════════════════════════════ */}
      <section id="initiatives" className="relative z-10 max-w-5xl mx-auto px-4 py-14">
        <motion.h2
          {...fadeUp()}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          Our <span className="gradient-text">Initiatives</span>
        </motion.h2>

        <div className="space-y-4">
          {INITIATIVES.map((init, i) => (
            <motion.div
              key={init.name}
              {...fadeUp(i * 0.07)}
              className="glass border border-indigo-900/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-indigo-600/40 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-white font-bold text-xl">{init.name}</h3>
                  <span
                    className={`text-xs px-3 py-0.5 rounded-full border font-semibold ${
                      TAG_COLORS[init.tag] ?? "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {init.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{init.desc}</p>
              </div>
              {/* Decorative arrow */}
              <span className="text-indigo-600 text-2xl hidden sm:block">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          TEAM
      ════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-14">
        <motion.h2
          {...fadeUp()}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          Meet the <span className="gradient-text">Team</span>
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp(i * 0.06)}
              className="flex flex-col items-center gap-3 group"
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-full ${member.bg} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-200 animate-glow-ring`}
              >
                {member.initials}
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">{member.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA STRIP
      ════════════════════════════════════ */}
      <motion.section
        {...fadeUp()}
        className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center"
      >
        <div className="glass rounded-3xl p-10 md:p-16 border border-indigo-900/40">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Want to be part of the{" "}
            <span className="gradient-text">change?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Outreach Cell recruits students every semester. Follow our blog for
            recruitment announcements and upcoming events.
          </p>
          <Link
            to="/blog"
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all duration-200 shadow-lg shadow-indigo-900/40 inline-block"
          >
            Stay updated
          </Link>
        </div>
      </motion.section>

    </div>
  );
}