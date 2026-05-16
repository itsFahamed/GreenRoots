export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm tracking-wide">Loading GreenRoots...</p>
      </div>
    </div>
  );
}
