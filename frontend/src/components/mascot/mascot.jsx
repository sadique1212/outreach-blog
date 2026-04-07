import { useRef, useEffect, useState } from "react";
import { useMousePosition } from "../../hooks";

function Eye({ cx, cy, r, mouseX, mouseY, containerRef }) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const eyeX = rect.left + cx;
    const eyeY = rect.top + cy;
    const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
    const dist = Math.min(r * 0.4, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 10);
    setPupilOffset({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
  }, [mouseX, mouseY, cx, cy, r, containerRef]);

  const pupilR = r * 0.45;

  return (
    <g>
      {/* Eye white */}
      <ellipse cx={cx} cy={cy} rx={r} ry={blink ? r * 0.05 : r * 0.75}
        fill="white" style={{ transition: "ry 0.08s ease" }} />
      {/* Pupil */}
      {!blink && (
        <>
          <ellipse
            cx={cx + pupilOffset.x}
            cy={cy + pupilOffset.y}
            rx={pupilR}
            ry={pupilR}
            fill="#1a1a2e"
          />
          {/* Shine */}
          <circle
            cx={cx + pupilOffset.x + pupilR * 0.25}
            cy={cy + pupilOffset.y - pupilR * 0.3}
            r={pupilR * 0.25}
            fill="white"
            opacity={0.7}
          />
        </>
      )}
    </g>
  );
}

export default function Mascot({ className = "" }) {
  const mouse = useMousePosition();
  const ref = useRef(null);

  return (
    <div ref={ref} className={`select-none ${className}`}>
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* Gradient defs */}
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b2b" />
            <stop offset="100%" stopColor="#ff9f1c" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7a3d" />
            <stop offset="100%" stopColor="#ffb347" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="60" cy="155" rx="28" ry="5" fill="rgba(0,0,0,0.3)" />

        {/* Body */}
        <rect x="30" y="90" width="60" height="55" rx="12" fill="url(#bodyGrad)" />

        {/* Arms */}
        <rect x="10" y="95" width="22" height="12" rx="6" fill="#ff6b2b" transform="rotate(-15 21 101)" />
        <rect x="88" y="95" width="22" height="12" rx="6" fill="#ff6b2b" transform="rotate(15 99 101)" />

        {/* Hands */}
        <circle cx="12" cy="107" r="7" fill="#ffb347" />
        <circle cx="108" cy="107" r="7" fill="#ffb347" />

        {/* Legs */}
        <rect x="38" y="138" width="16" height="20" rx="8" fill="#cc4a1a" />
        <rect x="66" y="138" width="16" height="20" rx="8" fill="#cc4a1a" />

        {/* Feet */}
        <ellipse cx="46" cy="157" rx="11" ry="6" fill="#aa3a10" />
        <ellipse cx="74" cy="157" rx="11" ry="6" fill="#aa3a10" />

        {/* Neck */}
        <rect x="47" y="76" width="26" height="18" rx="6" fill="url(#headGrad)" />

        {/* Head */}
        <ellipse cx="60" cy="62" rx="32" ry="30" fill="url(#headGrad)" />

        {/* Ears */}
        <ellipse cx="28" cy="52" rx="8" ry="10" fill="#ff6b2b" />
        <ellipse cx="28" cy="52" rx="5" ry="7" fill="#ffb347" />
        <ellipse cx="92" cy="52" rx="8" ry="10" fill="#ff6b2b" />
        <ellipse cx="92" cy="52" rx="5" ry="7" fill="#ffb347" />

        {/* Antenna */}
        <line x1="60" y1="32" x2="60" y2="16" stroke="#ff6b2b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="12" r="5" fill="#2bffe4" filter="url(#glow)" />

        {/* Eyes */}
        <Eye cx={44} cy={62} r={11} mouseX={mouse.x} mouseY={mouse.y} containerRef={ref} />
        <Eye cx={76} cy={62} r={11} mouseX={mouse.x} mouseY={mouse.y} containerRef={ref} />

        {/* Eyebrows */}
        <path d="M34 48 Q44 44 54 48" stroke="#cc4a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M66 48 Q76 44 86 48" stroke="#cc4a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <ellipse cx="60" cy="70" rx="4" ry="3" fill="#cc4a1a" />

        {/* Smile */}
        <path d="M48 78 Q60 88 72 78" stroke="#cc4a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Chest emblem */}
        <circle cx="60" cy="108" r="10" fill="rgba(0,0,0,0.2)" />
        <text x="60" y="112" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">O</text>

        {/* Glint on head */}
        <ellipse cx="48" cy="48" rx="6" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(-30 48 48)" />
      </svg>
    </div>
  );
}