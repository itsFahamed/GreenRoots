import ResourcesCatalog from "@/app/Components/ResourcesCatalog/ResourcesCatalog";
import data from "@/public/data.json";

export const metadata = {
  title: "Plants & Garden Essentials — GreenRoots",
  description: "Browse our full collection — rare tropicals, succulents, pots, tools, and organic fertilizers.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialCategory = params?.category || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-5 h-0.5 bg-emerald-600 rounded-full" />
          Full Catalogue
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          All Plants & Gear 🪴
        </h1>
        <p className="text-slate-500">
          Browse <span className="text-emerald-600 font-semibold">{data.length} plant essentials</span> across{" "}
          5 categories
        </p>
      </div>

      <ResourcesCatalog products={data} initialCategory={initialCategory} />
    </div>
  );
}
