import Link from "next/link";
import Image from "next/image";
import { MdStar, MdArrowForward } from "react-icons/md";
import { BsBasket } from "react-icons/bs";
import data from "@/public/data.json";

const popularProducts = data.slice(0, 3);

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <MdStar
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
          size={16}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1 font-medium">{rating}</span>
    </div>
  );
}

export default function HomeHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="w-5 h-0.5 bg-emerald-600 rounded-full" />
            Trending This Week
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Best Sellers 🌿</h2>
          <p className="text-slate-500 text-sm mt-1">Top picks loved by fellow plant enthusiasts</p>
        </div>
        <Link
          href="/Products"
          className="hidden sm:flex items-center gap-1.5 text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors"
        >
          View All <MdArrowForward />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {popularProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden border border-emerald-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200 group flex flex-col"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow">
                {product.category}
              </span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-bold shadow">
                ${product.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
              <h3 className="text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              <StarRating rating={product.rating} />
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-2 flex-1">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
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

      <div className="text-center mt-8 sm:hidden">
        <Link href="/Products" className="text-emerald-600 text-sm font-semibold">View All Plants →</Link>
      </div>
    </section>
  );
}
