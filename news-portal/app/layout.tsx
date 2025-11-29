import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        {/* Main content fills remaining vertical space */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 pt-6">
          {children}
        </main>


        <Footer />
      </body>
    </html>
  );
}
