import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { posts } from "../../data/posts";
import PostCard from "../blog/postcard";

export default function FeaturedPosts() {
  const featured = posts.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="font-mono text-xs text-[#ff6b2b] tracking-widest uppercase block mb-3">
            Latest Updates
          </span>
          <h2 className="font-heading font-700 text-4xl text-white">
            Featured <span className="gradient-text">Posts</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="group hidden md:flex items-center gap-2 text-[#7070a0] hover:text-[#ff6b2b] font-heading font-600 text-sm transition-colors"
        >
          View All
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} featured />
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-[#ff6b2b] font-heading font-600 text-sm"
        >
          View All Posts <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}