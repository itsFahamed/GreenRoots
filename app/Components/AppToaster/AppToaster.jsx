"use client";
import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#112040",
          border: "1px solid rgba(34,211,238,0.2)",
          color: "#e2e8f0",
        },
      }}
    />
  );
}
