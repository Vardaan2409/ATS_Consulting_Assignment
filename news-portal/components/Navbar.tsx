import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-red-600 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">News Portal</Link>

                <div className="hidden md:flex gap-6 text-lg">
                    <Link href="/">Home</Link>
                    <Link href="/category/india">India</Link>
                    <Link href="/category/world">World</Link>
                    <Link href="/category/sports">Sports</Link>
                </div>
            </div>
        </nav>
    );
}
