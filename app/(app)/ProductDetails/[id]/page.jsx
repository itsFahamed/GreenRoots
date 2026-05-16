import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdStar, MdArrowBack, MdCheck, MdInventory } from "react-icons/md";
import { BsTruck, BsShieldCheck, BsArrowReturnLeft, BsBasket } from "react-icons/bs";
import data from "@/public/data.json";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = data.find((p) => p.id === id);
  if (!product) return { title: "Not Found — GreenRoots" };
  return {
    title: `${product.name} — GreenRoots`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return data.map((p) => ({ id: p.id }));
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <MdStar
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
          size={20}
        />
      ))}
      <span className="text-sm text-slate-500 ml-1 font-medium">{rating} / 5.0</span>
    </div>
  );
}

const perks = [
  { icon: BsTruck, label: "Free Delivery", sub: "On orders over $45" },
  { icon: BsShieldCheck, label: "Healthy Arrival", sub: "Plant arrival guarantee" },
  { icon: BsArrowReturnLeft, label: "30-Day Returns", sub: "Hassle-free returns" },
];

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = data.find((p) => p.id === id);
  if (!product) notFound();

  const related = data.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const stockStatus =
    product.stock > 10
      ? { label: "In Stock", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
      : product.stock > 0
      ? { label: `Only ${product.stock} left!`, color: "text-amber-700 bg-amber-50 border-amber-200" }
      : { label: "Out of Stock", color: "text-red-600 bg-red-50 border-red-200" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/Products"
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 text-sm mb-8 transition-colors"
      >
        <MdArrowBack /> Back to Plants
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="relative h-80 sm:h-[440px] rounded-2xl overflow-hidden bg-emerald-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
            {product.category}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2">{product.brand}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            {product.name}
          </h1>

          <StarRating rating={product.rating} />

          <div className="mt-4 mb-5">
            <span className="text-4xl font-extrabold text-slate-900">${product.price}</span>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold w-fit mb-5 ${stockStatus.color}`}>
            <MdInventory size={14} />
            {stockStatus.label}
          </span>

          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-slate-700 text-sm">
                  <MdCheck className="text-emerald-600 shrink-0" size={16} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-md animate__animated animate__pulse">
            <BsBasket size={20} />
            Add to Cart
          </button>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {perks.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <Icon className="text-emerald-600 text-xl mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/ProductDetails/${p.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-emerald-100 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all group">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-600 font-semibold mb-1">{p.brand}</p>
                    <h3 className="text-slate-900 font-bold text-sm group-hover:text-emerald-600 transition-colors line-clamp-2">{p.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-extrabold text-slate-900">${p.price}</span>
                      <span className="text-emerald-600 text-xs font-semibold">View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
