import Banner from "@/app/Components/Banner/Banner";
import SubjectChips from "@/app/Components/SubjectChips/SubjectChips";
import HomeHighlights from "@/app/Components/HomeHighlights/HomeHighlights";
import Link from "next/link";

export const metadata = {
  title: "GreenRoots — Urban Plant & Garden Shop",
  description: "Discover rare tropicals, handcrafted pots, organic fertilizers, and precision gardening tools.",
};

const plantCareTips = [
  {
    emoji: "💧",
    title: "Water Wisely",
    tip: "Check soil moisture before watering — push your finger 2 inches deep. If it feels dry, water thoroughly until it drains from the bottom.",
  },
  {
    emoji: "☀️",
    title: "Light Matters",
    tip: "Most houseplants prefer bright, indirect light. Avoid harsh midday sun on tropical leaves to prevent scorching and leaf curl.",
  },
  {
    emoji: "🌡️",
    title: "Mind the Temperature",
    tip: "Keep indoor plants between 15–27°C. Avoid placing them near drafts, heating vents, or cold windowsills during winter months.",
  },
  {
    emoji: "🪲",
    title: "Prevent Pests",
    tip: "Inspect leaves weekly for spider mites or mealybugs. Wipe foliage with diluted neem oil solution as a natural preventive treatment.",
  },
];

const featuredGrowers = [
  { name: "TropicNest", tagline: "Rare Tropical Plants", emoji: "🌿", color: "bg-emerald-50 border-emerald-200" },
  { name: "ClayCraft", tagline: "Designer Pots & Planters", emoji: "🏺", color: "bg-teal-50 border-teal-200" },
  { name: "SoilSense", tagline: "Premium Substrates", emoji: "🌱", color: "bg-green-50 border-green-200" },
  { name: "GardenForge", tagline: "Precision Garden Tools", emoji: "🔧", color: "bg-cyan-50 border-cyan-200" },
];

export default function HomePage() {
  return (
    <div>
      <Banner />
      <SubjectChips />
      <HomeHighlights />

      {/* Plant Care Tips */}
      <section className="bg-linear-to-br from-emerald-50 to-teal-50 border-y border-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-5 h-0.5 bg-emerald-600 rounded-full" />
              Grow With Confidence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Plant Care Guide 🌿</h2>
            <p className="text-slate-500 text-sm mt-1">Essential tips to keep your plants thriving year-round</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plantCareTips.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-emerald-100 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Growers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="w-5 h-0.5 bg-emerald-600 rounded-full" />
            Trusted Suppliers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Growers 🏆</h2>
          <p className="text-slate-500 text-sm mt-1">Shop from specialist brands with proven quality and expertise</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredGrowers.map((brand) => (
            <Link
              key={brand.name}
              href={`/Products?brand=${encodeURIComponent(brand.name)}`}
              className={`${brand.color} border rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="text-5xl mb-3">{brand.emoji}</div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                {brand.name}
              </h3>
              <p className="text-slate-500 text-xs mt-1">{brand.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="hero-gradient rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-[200px] flex items-center justify-center pointer-events-none select-none">🌿</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative">
            Ready to Grow? 🌱
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto relative">
            Create a free account to track your plant collection and unlock member-exclusive discounts.
          </p>
          <Link
            href="/Registration"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-emerald-700 bg-white hover:bg-emerald-50 transition-colors text-base shadow-lg"
          >
            Start Growing Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
