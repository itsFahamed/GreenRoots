"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

const slides = [
  {
    badge: "🌱 Spring Collection",
    heading: "Rare Tropical",
    highlight: "Plants 40% OFF",
    sub: "on Monstera, Philodendron & more",
    desc: "Bring the jungle indoors. Shop our spring drop of hand-picked tropical specimens before they sell out.",
    cta: "Shop Tropicals",
    ctaHref: "/Products?category=Tropicals",
    bg: "from-emerald-700 via-emerald-600 to-teal-500",
    emoji: "🌿",
  },
  {
    badge: "🪴 New Arrivals",
    heading: "Succulent",
    highlight: "Drop Is Here",
    sub: "freshly curated desert beauties",
    desc: "Discover low-maintenance succulents and cacti — perfect for every shelf, desk, and windowsill.",
    cta: "Browse Succulents",
    ctaHref: "/Products?category=Succulents",
    bg: "from-teal-700 via-cyan-600 to-emerald-500",
    emoji: "🌵",
  },
  {
    badge: "🛠️ Garden Gear",
    heading: "Equip Your",
    highlight: "Green Space",
    sub: "grow lights, pots, tools & more",
    desc: "Everything you need to grow confidently — from precision pruning shears to full-spectrum LED lights.",
    cta: "Shop Tools",
    ctaHref: "/Products?category=Tools",
    bg: "from-green-800 via-green-700 to-teal-600",
    emoji: "🪴",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className={`relative bg-linear-to-br ${slide.bg} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6 animate__animated animate__fadeInDown">
            {slide.badge}
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 animate__animated animate__fadeInLeft">
            {slide.heading}{" "}
            <span className="block text-white/90 underline decoration-white/50 decoration-4">
              {slide.highlight}
            </span>
          </h1>

          <p className="text-white/80 text-lg font-medium mb-2">{slide.sub}</p>
          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">{slide.desc}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-emerald-700 bg-white hover:bg-emerald-50 transition-all text-sm shadow-lg"
            >
              {slide.cta} <MdArrowForward />
            </Link>
            <Link
              href="/Registration"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border-2 border-white/40 hover:bg-white/10 transition-all text-sm"
            >
              Join Free
            </Link>
          </div>
        </div>

        {/* Big emoji decoration */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[140px] opacity-20 hidden lg:block select-none pointer-events-none">
          {slide.emoji}
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <MdArrowBack size={18} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <MdArrowForward size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
