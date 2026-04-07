import { Users, Calendar, Zap, Star } from "lucide-react";
import { useInView } from "../../hooks";

const ICONS = { users: Users, calendar: Calendar, team: Zap, star: Star };

const statsList = [
  { label: "Social Followers", value: "500K+", icon: "users", color: "text-[#ff6b2b]", bg: "bg-[#ff6b2b]/10" },
  { label: "Events Covered", value: "200+", icon: "calendar", color: "text-[#2bffe4]", bg: "bg-[#2bffe4]/10" },
  { label: "Team Members", value: "60+", icon: "team", color: "text-[#ff9f1c]", bg: "bg-[#ff9f1c]/10" },
  { label: "Years of Legacy", value: "10+", icon: "star", color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
];

export default function StatsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="animated-border rounded-2xl bg-[#16161f] p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsList.map(({ label, value, icon, color, bg }, i) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={label}
                className={`flex flex-col items-center text-center gap-3 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
                <div className={`font-display text-4xl ${color}`}>{value}</div>
                <div className="text-[#7070a0] text-xs font-heading tracking-wider uppercase">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}