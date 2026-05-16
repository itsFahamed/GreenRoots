"use client";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail, MdLock, MdPerson, MdImage, MdYard } from "react-icons/md";
import { useState } from "react";

export default function RegistrationPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data) {
    setLoading(true);
    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.photoUrl || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Welcome to GreenRoots! Your account is ready.");
        router.push("/Login");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const password = watch("password");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MdYard className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Join GreenRoots 🌱</h1>
          <p className="text-slate-500 text-sm">Create your free plant lover account</p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Full Name</label>
              <div className="relative">
                <MdPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Alex Green"
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Photo URL <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MdImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...register("photoUrl")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Confirm Password</label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Repeat your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === password || "Passwords do not match",
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-colors"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Creating account..." : "Create Free Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/Login" className="text-emerald-600 hover:underline font-semibold">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
