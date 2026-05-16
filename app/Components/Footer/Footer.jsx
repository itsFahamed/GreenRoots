import Link from "next/link";
import { BsInstagram, BsFacebook, BsTwitterX, BsEnvelope } from "react-icons/bs";
import { MdPhone, MdLocationOn, MdYard } from "react-icons/md";

const categories = ["Tropicals", "Succulents", "Pots & Planters", "Tools", "Soil & Fertilizers"];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-sm">
                <MdYard className="text-white text-lg" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Green<span className="text-emerald-400">Roots</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Your urban plant sanctuary. Shop rare tropicals, designer pots, organic fertilizers, and precision garden tools.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: BsInstagram, href: "#", label: "Instagram" },
                { icon: BsFacebook, href: "#", label: "Facebook" },
                { icon: BsTwitterX, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/Products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Plants", href: "/Products" },
                { label: "My Profile", href: "/Profile" },
                { label: "Login", href: "/Login" },
                { label: "Register", href: "/Registration" },
                { label: "Privacy Policy", href: "#privacy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MdLocationOn className="text-emerald-400 text-base shrink-0 mt-0.5" />
                45 Garden Way,<br />Portland, OR 97201
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <MdPhone className="text-emerald-400 text-base shrink-0" />
                +1 (503) 467-2389
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <BsEnvelope className="text-emerald-400 text-base shrink-0" />
                hello@greenroots.shop
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} GreenRoots. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
