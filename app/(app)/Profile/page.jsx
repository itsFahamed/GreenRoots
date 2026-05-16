"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import UserAvatar from "@/app/Components/UserAvatar/UserAvatar";
import Link from "next/link";
import {
  MdEmail,
  MdCalendarToday,
  MdLogout,
  MdEdit,
  MdAccountCircle,
  MdFavorite,
  MdYard,
  MdSpa,
} from "react-icons/md";
import { BsBookmark } from "react-icons/bs";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) router.replace("/Login?callbackURL=/Profile");
  }, [session, isPending, router]);

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }
  if (!session?.user) return null;

  const user = session.user;
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { icon: MdFavorite, value: "0", label: "Favourites" },
    { icon: BsBookmark, value: "0", label: "Wishlisted" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero card — forest green */}
      <div
        className="rounded-3xl p-8 sm:p-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #065f46 0%, #047857 50%, #0f766e 100%)" }}
      >
        <div className="absolute right-6 top-4 text-[100px] opacity-10 select-none pointer-events-none">🌿</div>

        {/* Avatar */}
        <div className="shrink-0">
          <UserAvatar
            src={user.image}
            alt={user.name || "User"}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/30"
            fallback={
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-extrabold text-white ring-4 ring-white/20">
                {initials}
              </div>
            }
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{user.name}</h1>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <MdEmail size={14} /> {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <MdCalendarToday size={14} /> Member since {joinDate}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/15 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <Icon className="text-white" size={16} />
                <div>
                  <div className="text-white font-bold text-base leading-none">{value}</div>
                  <div className="text-white/70 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href="/Profile/UpdateInfo"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 bg-white hover:bg-emerald-50 transition-all shadow-sm"
          >
            <MdEdit size={16} /> Edit Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white bg-white/15 hover:bg-white/25 transition-all"
          >
            <MdLogout size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Account details */}
      <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6">
        <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
          <MdAccountCircle className="text-emerald-600" /> Account Details
        </h2>
        <dl className="divide-y divide-slate-50">
          {[
            { label: "Display Name", value: user.name },
            { label: "Email Address", value: user.email },
            { label: "Photo URL", value: user.image || "Not set" },
            { label: "Membership", value: "Free Grower" },
            { label: "Joined", value: joinDate },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-3 text-sm">
              <dt className="text-slate-400 font-medium w-36 shrink-0">{label}</dt>
              <dd className="text-slate-800 font-semibold truncate max-w-[60%] text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href="/Profile/UpdateInfo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm"
          >
            <MdEdit size={16} />
            Update Information
          </Link>
        </div>
      </div>

      {/* Browse CTA */}
      <div className="mt-6 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 text-center">
        <MdSpa className="text-emerald-500 text-4xl mx-auto mb-3" />
        <h3 className="font-extrabold text-slate-900 text-lg mb-1">Discover new arrivals 🌿</h3>
        <p className="text-slate-500 text-sm mb-4">Rare tropicals and seasonal finds are waiting for you.</p>
        <Link
          href="/Products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all"
        >
          Explore Plants →
        </Link>
      </div>
    </div>
  );
}
