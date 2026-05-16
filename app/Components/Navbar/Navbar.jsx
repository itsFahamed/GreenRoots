"use client";
import Link from "next/link";
import UserAvatar from "@/app/Components/UserAvatar/UserAvatar";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import { MdMenu, MdClose, MdLogout, MdLogin, MdPerson, MdYard } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/Products", label: "Products" },
    { href: "/Profile", label: "My Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center group-hover:opacity-90 transition-opacity shadow-sm">
              <MdYard className="text-white text-lg" />
            </div>
            <span className="font-extrabold text-xl text-slate-900">
              Green<span className="text-emerald-600">Roots</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <Link
                  href="/Profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                >
                  <UserAvatar
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-7 w-7 rounded-full object-cover"
                    fallback={
                      <div className="w-7 h-7 rounded-full bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                        {session.user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    }
                  />
                  <span className="font-medium">{session.user.name?.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all"
                >
                  <MdLogout />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/Login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-700 border border-slate-300 hover:border-emerald-400 hover:text-emerald-700 transition-all"
                >
                  <MdLogin />
                  Login
                </Link>
                <Link
                  href="/Registration"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-600 hover:text-emerald-600 p-2"
          >
            {menuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-slate-100 pt-3 mt-3 space-y-1">
            {session?.user ? (
              <>
                <Link
                  href="/Profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700"
                >
                  <MdPerson className="text-emerald-600" />
                  {session.user.name}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-sm text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/Login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-slate-700">Login</Link>
                <Link href="/Registration" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-emerald-700 font-semibold">Start Growing Free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
