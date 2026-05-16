import Link from "next/link";

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Tropicals", emoji: "🌿" },
  { name: "Succulents", emoji: "🌵" },
  { name: "Pots & Planters", emoji: "🪴" },
  { name: "Tools", emoji: "🔧" },
  { name: "Soil & Fertilizers", emoji: "🌱" },
];

export default function SubjectChips() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-7">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Browse by Category</h2>
        <p className="text-slate-500 text-sm">Tap a category to explore our plant collection</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.name === "All" ? "/Products" : `/Products?category=${encodeURIComponent(cat.name)}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-emerald-100 text-slate-700 font-medium text-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all card-shadow"
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
