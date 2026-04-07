import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Available tags ───────────────────────────────────────────────────────────

const AVAILABLE_TAGS = [
  "Announcement", "Event", "Achievement", "Recruitment",
  "Education", "Health", "Culture", "Sports", "Technology",
  "Gambhir", "Prayas", "Sankalp", "Umang", "Sambandh",
];

// ─── Simple toolbar button ────────────────────────────────────────────────────

function ToolbarBtn({ label, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2.5 py-1 glass border border-indigo-900/30 text-slate-300 hover:text-white hover:border-indigo-500/50 rounded-lg text-sm font-mono transition-all duration-150 select-none"
    >
      {label}
    </button>
  );
}

// ─── Preview renderer — naive HTML from markdown-ish content ─────────────────
// NOTE: In production replace with `marked` or `react-markdown`.
function renderPreview(text) {
  return text
    .replace(/^# (.+)$/gm,   "<h2 class='text-2xl font-bold text-indigo-400 mt-6 mb-3'>$1</h2>")
    .replace(/^## (.+)$/gm,  "<h3 class='text-xl font-semibold text-violet-400 mt-5 mb-2'>$1</h3>")
    .replace(/^### (.+)$/gm, "<h4 class='text-lg font-semibold text-purple-400 mt-4 mb-1'>$1</h4>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
    .replace(/_(.+?)_/g,       "<em class='italic text-slate-300'>$1</em>")
    .replace(/^- (.+)$/gm,    "<li class='ml-4 list-disc text-slate-300'>$1</li>")
    .replace(/\n\n/g,          "</p><p class='mb-3 text-slate-300 leading-relaxed'>")
    .replace(/\n/g,            "<br/>");
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WritePost() {
  const navigate = useNavigate();

  // ── Form state ──
  const [title,       setTitle]       = useState("");
  const [excerpt,     setExcerpt]     = useState("");
  const [content,     setContent]     = useState("");
  const [tags,        setTags]        = useState([]);
  const [imageUrl,    setImageUrl]    = useState("");
  const [author,      setAuthor]      = useState("");
  const [date,        setDate]        = useState(
    new Date().toISOString().split("T")[0]
  );

  // ── UI state ──
  const [tab,         setTab]         = useState("write"); // "write" | "preview"
  const [saved,       setSaved]       = useState(false);
  const [errors,      setErrors]      = useState({});

  // ─── Tag toggle ──────────────────────────────────────────────────────────

  const toggleTag = (tag) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  // ─── Toolbar helpers ─────────────────────────────────────────────────────

  const insertMarkdown = useCallback(
    (before, after = "") => {
      const ta = document.getElementById("content-area");
      if (!ta) return;
      const { selectionStart: s, selectionEnd: e, value } = ta;
      const selected = value.slice(s, e) || "text";
      const next =
        value.slice(0, s) + before + selected + after + value.slice(e);
      setContent(next);
      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(s + before.length, s + before.length + selected.length);
      });
    },
    []
  );

  // ─── Validation ──────────────────────────────────────────────────────────

  const validate = () => {
    const e = {};
    if (!title.trim())   e.title   = "Title is required.";
    if (!excerpt.trim()) e.excerpt = "Short description is required.";
    if (!content.trim()) e.content = "Post body cannot be empty.";
    if (!author.trim())  e.author  = "Author name is required.";
    if (tags.length === 0) e.tags  = "Select at least one tag.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── Submit — saves to localStorage as demo CMS ──────────────────────────

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newPost = {
      id:      `post-${Date.now()}`,
      title:   title.trim(),
      excerpt: excerpt.trim(),
      content: `<p>${renderPreview(content)}</p>`,
      tags,
      author:  author.trim(),
      date,
      image:   imageUrl.trim() || null,
    };

    // Persist alongside existing posts in localStorage (hydrate in usePosts hook)
    const existing = JSON.parse(localStorage.getItem("outreach_posts") ?? "[]");
    localStorage.setItem(
      "outreach_posts",
      JSON.stringify([newPost, ...existing])
    );

    setSaved(true);
    setTimeout(() => navigate(`/blog/${newPost.id}`), 1400);
  };

  // ─── Shared input class ───────────────────────────────────────────────────

  const inputCls = (field) =>
    `w-full bg-brand-muted border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600
     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm
     ${errors[field] ? "border-red-700/60" : "border-indigo-900/40 hover:border-indigo-700/50"}`;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2">
          Admin · Content Management
        </p>
        <h1 className="text-4xl font-black text-white">
          Write a <span className="gradient-text">Post</span>
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Fill in the details below. Use the preview tab to check formatting
          before publishing.
        </p>
      </motion.div>

      {/* Success banner */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center gap-3 bg-green-900/30 border border-green-700/40 text-green-300 rounded-xl px-5 py-4 text-sm font-medium"
          >
            <span className="text-green-400 text-lg">✓</span>
            Post saved! Redirecting to your new post…
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">

          {/* ── Title ── */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Gambhir 2025 — A Night to Remember"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
              className={inputCls("title")}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* ── Excerpt ── */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Short Description / Excerpt *
            </label>
            <textarea
              rows={2}
              placeholder="One or two sentences shown on the blog listing…"
              value={excerpt}
              onChange={(e) => { setExcerpt(e.target.value); setErrors((p) => ({ ...p, excerpt: "" })); }}
              className={`${inputCls("excerpt")} resize-none`}
            />
            {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt}</p>}
          </div>

          {/* ── Author + Date row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Author *
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => { setAuthor(e.target.value); setErrors((p) => ({ ...p, author: "" })); }}
                className={inputCls("author")}
              />
              {errors.author && <p className="text-red-400 text-xs mt-1">{errors.author}</p>}
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls("date")}
              />
            </div>
          </div>

          {/* ── Cover Image URL ── */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Cover Image URL{" "}
              <span className="text-slate-600 normal-case font-normal">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputCls("image")}
            />
            {/* Live preview thumbnail */}
            {imageUrl && (
              <motion.img
                key={imageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={imageUrl}
                alt="Cover preview"
                onError={(e) => { e.target.style.display = "none"; }}
                className="mt-3 w-full h-40 object-cover rounded-xl border border-indigo-900/30"
              />
            )}
          </div>

          {/* ── Tags ── */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Tags * — select at least one
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => { toggleTag(tag); setErrors((p) => ({ ...p, tags: "" })); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                    tags.includes(tag)
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/40"
                      : "glass text-slate-400 border-indigo-900/30 hover:border-indigo-600/50 hover:text-indigo-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {errors.tags && <p className="text-red-400 text-xs mt-2">{errors.tags}</p>}
          </div>

          {/* ── Content editor with write / preview tabs ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Body *
              </label>

              {/* Tab switcher */}
              <div className="flex bg-brand-muted border border-indigo-900/40 rounded-lg p-0.5 gap-0.5">
                {["write", "preview"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${
                      tab === t
                        ? "bg-indigo-600 text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Markdown toolbar — only visible in write mode */}
            <AnimatePresence>
              {tab === "write" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-2"
                >
                  <ToolbarBtn label="H1"  title="Heading 1"   onClick={() => insertMarkdown("# ")} />
                  <ToolbarBtn label="H2"  title="Heading 2"   onClick={() => insertMarkdown("## ")} />
                  <ToolbarBtn label="H3"  title="Heading 3"   onClick={() => insertMarkdown("### ")} />
                  <ToolbarBtn label="B"   title="Bold"        onClick={() => insertMarkdown("**", "**")} />
                  <ToolbarBtn label="I"   title="Italic"      onClick={() => insertMarkdown("_", "_")} />
                  <ToolbarBtn label="—"   title="List item"   onClick={() => insertMarkdown("- ")} />
                  <ToolbarBtn label='""'  title="Blockquote"  onClick={() => insertMarkdown("> ")} />
                  <ToolbarBtn label="⏎⏎" title="Paragraph break" onClick={() => insertMarkdown("\n\n")} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Editor / Preview panel */}
            <AnimatePresence mode="wait">
              {tab === "write" ? (
                <motion.div
                  key="write"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <textarea
                    id="content-area"
                    rows={18}
                    placeholder={`# Introduction\n\nWrite your post here using Markdown-ish formatting.\n\n## Section heading\n\nParagraph text goes here. Use **bold** or _italic_.\n\n- Bullet point one\n- Bullet point two`}
                    value={content}
                    onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: "" })); }}
                    className={`${inputCls("content")} resize-y font-mono leading-relaxed`}
                    style={{ minHeight: "320px" }}
                  />
                  {errors.content && (
                    <p className="text-red-400 text-xs mt-1">{errors.content}</p>
                  )}
                  <p className="text-slate-600 text-xs mt-2 text-right">
                    {content.length} chars · ~{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="min-h-[320px] glass border border-indigo-900/40 rounded-xl px-6 py-5 post-body"
                >
                  {content.trim() ? (
                    <>
                      <h1 className="text-3xl font-black text-white mb-1">
                        {title || <span className="text-slate-600">Untitled</span>}
                      </h1>
                      <p className="text-slate-500 text-sm mb-6">
                        {author || "Unknown"} ·{" "}
                        {new Date(date).toLocaleDateString("en-IN", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: `<p class="mb-3 text-slate-300 leading-relaxed">${renderPreview(content)}</p>` }}
                      />
                    </>
                  ) : (
                    <p className="text-slate-600 italic text-sm">
                      Nothing to preview yet. Start writing in the Write tab.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Submit row ── */}
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <button
              type="submit"
              disabled={saved}
              className="w-full sm:w-auto px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-900/40"
            >
              {saved ? "Publishing…" : "Publish Post"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="w-full sm:w-auto px-8 py-3.5 glass border border-indigo-900/30 text-slate-400 hover:text-white rounded-full font-semibold transition-all duration-200"
            >
              Cancel
            </button>

            {Object.keys(errors).length > 0 && (
              <p className="text-red-400 text-sm sm:ml-auto">
                Please fix the errors above.
              </p>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}