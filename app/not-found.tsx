import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] px-6">
            <div className="text-center max-w-md">
                <div className="text-7xl md:text-8xl font-bold text-[#3B3B6D] mb-4">404</div>
                <h1 className="text-2xl font-semibold text-[#1F2933] mb-3">Page Not Found</h1>
                <p className="text-[#4B5563] mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or may have moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn-primary">Go Home</Link>
                    <Link href="/service" className="btn-secondary">Browse Services</Link>
                </div>
            </div>
        </div>
    );
}
