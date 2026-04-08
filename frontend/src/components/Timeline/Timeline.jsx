import { useInView } from "../../hooks";
import posts from "../../data/posts";

function TimelineItem({ item, index, side }) {
  const [ref, inView] = useInView(0.15);
  const isLeft = side === "left";

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
    >
      {/* Content box — desktop */}
      <div className={`hidden md:block md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0 md:pl-8" : "md:pl-0 md:pr-8"}`}>
        <div
          className={`transition-all duration-700 ${
            inView
              ? "opacity-100 translate-x-0"
              : isLeft
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <div className="bg-[#16161f] border border-[#252535] rounded-2xl p-6 card-hover">
            <div className="font-mono text-xs text-[#ff6b2b] tracking-widest mb-2">{item.year}</div>
            <h3 className="font-heading font-700 text-white text-base mb-2">{item.title}</h3>
            <p className="text-[#7070a0] text-sm leading-relaxed font-body">{item.desc}</p>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="relative flex items-center justify-center flex-shrink-0 z-10">
        <div
          className={`w-4 h-4 rounded-full border-2 border-[#ff6b2b] bg-[#0a0a0f] transition-all duration-500 ${
            inView ? "scale-100 shadow-[0_0_12px_rgba(255,107,43,0.6)]" : "scale-50"
          }`}
          style={{ transitionDelay: `${index * 80}ms` }}
        />
      </div>

      {/* Mobile content */}
      <div
        className={`md:hidden flex-1 transition-all duration-700 ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div className="bg-[#16161f] border border-[#252535] rounded-2xl p-5">
          <div className="font-mono text-xs text-[#ff6b2b] tracking-widest mb-1">{item.year}</div>
          <h3 className="font-heading font-700 text-white text-sm mb-1">{item.title}</h3>
          <p className="text-[#7070a0] text-xs leading-relaxed font-body">{item.desc}</p>
        </div>
      </div>

      {/* Spacer for desktop alternate side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-[#2bffe4] tracking-widest uppercase block mb-3">
          Since 2015
        </span>
        <h2 className="font-heading font-700 text-4xl text-white">
          Our <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-[#7070a0] text-base mt-4 font-body max-w-md mx-auto">
          A decade of stories, campaigns, milestones and the relentless pursuit of excellence.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-0.5 timeline-line" />

        <div className="flex flex-col gap-10 pl-8 md:pl-0">
          {posts.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={i}
              side={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}