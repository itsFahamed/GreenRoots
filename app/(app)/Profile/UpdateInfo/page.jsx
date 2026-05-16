"use client";
import { useForm } from "react-hook-form";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdPerson, MdImage, MdArrowBack, MdSave, MdYard } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

export default function UpdateInfoPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/Login?callbackURL=/Profile/UpdateInfo");
    }
    if (session?.user) {
      reset({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session, isPending, router, reset]);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const result = await authClient.updateUser({
        name: data.name,
        image: data.image || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Update failed");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/Profile");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }
  if (!session?.user) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MdYard className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Edit Your Profile</h1>
          <p className="text-slate-500 text-sm">Update your display name and profile photo</p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Display Name</label>
              <div className="relative">
                <MdPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Your display name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Profile Photo URL
              </label>
              <div className="relative">
                <MdImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...register("image")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/Profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 transition-all text-sm"
              >
                <MdArrowBack size={16} />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm text-sm"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <MdSave size={16} />}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
