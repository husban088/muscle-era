import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import ClientLayout from "@/components/ClientLayout";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Muscle Era",
  description: "A professional gym and fitness website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-zen-dots">
        <ClientLayout>
          <TopNavbar />
          {children}
          <Footer /> {/* ← yahan add karo */}
        </ClientLayout>
      </body>
    </html>
  );
}
