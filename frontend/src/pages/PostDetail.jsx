import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from "../data/posts";

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

      {/* Back link */}
      <Link
        to="/blog"
        className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Hero image */}
      {post.image && (
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-900/40 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-800/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-black text-white mb-3 leading-tight">
          {post.title}
        </h1>

        <p className="text-slate-500 text-sm mb-10">
          {new Date(post.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.author}
        </p>
      </motion.div>

      {/* Body — rendered from HTML string stored in data */}
      <motion.article
        className="post-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}