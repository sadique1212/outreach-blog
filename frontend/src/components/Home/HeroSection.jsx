import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Mascot from "../mascot/mascot";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* BG gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b2b]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2bffe4]/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff6b2b]/30 bg-[#ff6b2b]/10 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-[#ff6b2b]" />
            <span className="text-xs font-heading font-600 tracking-widest uppercase text-[#ff6b2b]">
              IIT Roorkee · Est. 1847
            </span>
          </div>

          <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-tight mb-2">
            OUT
          </h1>
          <h1 className="font-display text-7xl md:text-9xl leading-none tracking-tight mb-8">
            <span className="gradient-text">REACH</span>
          </h1>

          <p className="text-[#7070a0] text-lg leading-relaxed mb-10 font-body max-w-md">
            The official voice of IIT Roorkee. We craft stories, run campaigns, and connect the institute with the world — one post at a time.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="group flex items-center gap-3 px-7 py-4 rounded-xl bg-[#ff6b2b] hover:bg-[#ff9f1c] text-white font-heading font-600 tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
            >
              Explore Posts
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/timeline"
              className="flex items-center gap-3 px-7 py-4 rounded-xl border border-[#252535] text-[#7070a0] hover:text-white hover:border-[#ff6b2b]/40 font-heading font-600 tracking-wide transition-all duration-300"
            >
              Our Journey
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[#252535]">
            {[
              { num: "500K+", label: "Followers" },
              { num: "10+", label: "Years" },
              { num: "200+", label: "Events" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display text-3xl text-[#ff6b2b]">{num}</div>
                <div className="text-xs text-[#7070a0] font-heading tracking-wider uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mascot */}
        <div className="flex justify-center items-center">
          <div className="relative animate-float">
            {/* Glow ring */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-r from-[#ff6b2b]/20 to-[#2bffe4]/10 rounded-full blur-2xl" />
            <Mascot className="w-64 h-auto md:w-80 relative z-10" />

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-[#16161f] border border-[#252535] text-xs font-mono text-[#2bffe4] animate-pulse-glow">
              Online ●
            </div>
            <div className="absolute -bottom-2 -left-6 px-3 py-1.5 rounded-lg bg-[#16161f] border border-[#252535] text-xs font-mono text-[#ff9f1c]">
              v3.0 🚀
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7070a0] animate-bounce">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#7070a0] to-transparent" />
      </div>
    </section>
  );
}