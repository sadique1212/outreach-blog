import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { TAGS } from "../../data/posts";
import { useInView } from "../../hooks";

export default function PostCard({ post, index = 0, featured = false }) {
  const [ref, inView] = useInView(0.1);
  const delay = (index % 6) * 100;

  const tagKeys = post.tags || [];

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Link
        to={`/blog/${post.id}`}
        className={`block bg-[#16161f] border border-[#252535] rounded-2xl overflow-hidden card-hover ${
          featured ? "md:flex" : ""
        }`}
      >
        {/* Cover Image */}
        <div className={`relative overflow-hidden bg-[#1a1a28] ${featured ? "md:w-2/5 h-56 md:h-auto" : "h-48"}`}>
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#ff6b2b]/20 to-[#2bffe4]/10 flex items-center justify-center">
              <span className="font-display text-6xl text-[#ff6b2b]/20">O</span>
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16161f] via-transparent to-transparent opacity-60" />

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#ff6b2b] text-white text-xs font-heading font-600 tracking-wider">
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col gap-3 ${featured ? "md:w-3/5 md:p-8" : ""}`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tagKeys.map((tagKey) => {
              const tag = TAGS[tagKey];
              if (!tag) return null;
              return (
                <span key={tagKey} className={`tag-pill ${tag.color}`}>
                  {tag.label}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <h2 className={`font-heading font-700 text-white group-hover:text-[#ff6b2b] transition-colors leading-tight ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-[#7070a0] text-sm leading-relaxed line-clamp-3 font-body flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-3 border-t border-[#252535]">
            <div className="flex items-center gap-4 text-xs text-[#7070a0]">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#ff6b2b]" />
                {format(new Date(post.date), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-[#ff6b2b]" />
                {post.readTime}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#252535] flex items-center justify-center group-hover:border-[#ff6b2b] group-hover:text-[#ff6b2b] text-[#7070a0] transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}