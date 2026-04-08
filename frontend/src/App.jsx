import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Home        from "./pages/Home";
import Blog        from "./pages/blog";
import PostDetail  from "./pages/PostDetail";

export default function App() {
  return (
    <BrowserRouter>
      {/* sticky nav */}
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/blog/:id"  element={<PostDetail />} />
          <Route path="/admin"     element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}