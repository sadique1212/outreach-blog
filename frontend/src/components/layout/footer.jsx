import { Link } from "react-router-dom";
import { Zap, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#252535] bg-[#0a0a0f] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff6b2b] to-[#ff9f1c] flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <span className="font-heading font-800 text-white text-lg block leading-none">Outreach Cell</span>
                <span className="font-mono text-[10px] text-[#ff6b2b] tracking-widest uppercase">IIT Roorkee</span>
              </div>
            </div>
            <p className="text-[#7070a0] text-sm leading-relaxed max-w-xs font-body">
              The official public relations and communications wing of IIT Roorkee — telling stories that matter since 2015.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#16161f] border border-[#252535] flex items-center justify-center text-[#7070a0] hover:text-[#ff6b2b] hover:border-[#ff6b2b]/40 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-700 text-white text-sm tracking-wider uppercase mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/blog", label: "Blog" },
                { to: "/timeline", label: "Timeline" },
                { to: "/about", label: "About" },
                { to: "/blog/write", label: "Write a Post" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[#7070a0] hover:text-[#ff6b2b] text-sm transition-colors font-body">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-700 text-white text-sm tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#7070a0] font-body">
              <li>outreach@iitr.ac.in</li>
              <li>Student Activity Center</li>
              <li>IIT Roorkee, 247667</li>
              <li>Uttarakhand, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#252535] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#7070a0] text-xs font-body">
            © 2025 Outreach Cell, IIT Roorkee. Built with ❤️ by the team.
          </p>
          <p className="text-[#7070a0] text-xs font-mono">
            Est. 2015 · Version 3.0
          </p>
        </div>
      </div>
    </footer>
  );
}