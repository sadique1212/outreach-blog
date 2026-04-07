import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/timeline", label: "Timeline" },
    { to: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#252535]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff6b2b] to-[#ff9f1c] flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div>
            <span className="font-heading font-800 text-white text-lg tracking-tight leading-none block">
              Outreach
            </span>
            <span className="font-mono text-[10px] text-[#ff6b2b] tracking-widest uppercase">
              IIT Roorkee
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-heading text-sm font-600 tracking-wide transition-all duration-300 relative group ${
                location.pathname === to
                  ? "text-[#ff6b2b]"
                  : "text-[#7070a0] hover:text-white"
              }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff6b2b] transition-all duration-300 ${
                location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          <Link
            to="/blog/write"
            className="px-4 py-2 rounded-lg bg-[#ff6b2b] hover:bg-[#ff9f1c] text-white font-heading font-600 text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
          >
            Write Post
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#7070a0] hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#111118]/95 backdrop-blur-xl border-b border-[#252535] px-6 py-6 flex flex-col gap-5">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-heading font-600 text-base tracking-wide transition-colors ${
                location.pathname === to ? "text-[#ff6b2b]" : "text-[#7070a0]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/blog/write"
            className="w-fit px-5 py-2 rounded-lg bg-[#ff6b2b] text-white font-heading font-600 text-sm"
          >
            Write Post
          </Link>
        </div>
      )}
    </header>
  );
}