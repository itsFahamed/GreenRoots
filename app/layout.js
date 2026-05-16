import "./globals.css";
import AppToaster from "@/app/Components/AppToaster/AppToaster";

export const metadata = {
  title: "GreenRoots — Urban Plant & Garden Shop",
  description: "Discover rare tropicals, handcrafted pots, organic fertilizers, and precision gardening tools for every plant lover.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="antialiased min-h-screen" style={{ backgroundColor: "#f0fdf4" }}>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
