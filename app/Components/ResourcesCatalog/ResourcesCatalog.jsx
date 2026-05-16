"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdSearch, MdStar, MdClose } from "react-icons/md";
import { BsBasket } from "react-icons/bs";

const categoryOptions = ["All Categories", "Tropicals", "Succulents", "Pots & Planters", "Tools", "Soil & Fertilizers"];
const sortOptions = ["default", "price-asc", "price-desc", "rating"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <MdStar
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
          size={14}
        />
      ))}
      <span className="text-xs text-slate-400 ml-1">{rating}</span>
    </div>
  );
}

export default function ResourcesCatalog({ products, initialCategory, initialQuery, initialSort }) {
  const normalizedCategory = initialCategory === "All" ? "All Categories" : initialCategory;
  const startingCategory = categoryOptions.includes(normalizedCategory)
    ? normalizedCategory
    : "All Categories";
  const startingSort = sortOptions.includes(initialSort) ? initialSort : "default";

  const [query, setQuery] = useState(typeof initialQuery === "string" ? initialQuery : "");
  const [category, setCategory] = useState(startingCategory);
  const [sortBy, setSortBy] = useState(startingSort);

  const filtered = useMemo(() => {
    let results = products.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "All Categories" || p.category === category;
      return matchQuery && matchCategory;
    });

    if (sortBy === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") results = [...results].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

    return results;
  }, [products, query, category, sortBy]);

  function clearFilters() {
    setQuery("");
    setCategory("All Categories");
    setSortBy("default");
  }

  const hasFilters = query || category !== "All Categories" || sortBy !== "default";

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 sm:p-5 mb-8 card-shadow">
        <div className="relative mb-4">
          <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search plants, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <MdClose />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-700 text-sm"
          >
            {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-700 text-sm"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <MdClose className="text-sm" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="text-slate-500 text-sm mb-6">
        Showing <span className="text-emerald-600 font-semibold">{filtered.length}</span> items
        {category !== "All Categories" && (
          <> in <span className="text-slate-900 font-medium">{category}</span></>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🪴</div>
          <p className="text-slate-700 text-lg font-bold mb-2">No plants found</p>
          <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="mt-4 text-emerald-600 text-sm hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-100 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200 group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {product.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
                <h3 className="text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-2 flex-1">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xl font-extrabold text-slate-900">${product.price}</span>
                  <Link
                    href={`/ProductDetails/${product.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-sm"
                  >
                    <BsBasket size={14} />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
