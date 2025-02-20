import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! This page doesn't exist.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-primary text-white rounded-md">
        Return Home
      </Link>
    </div>
  );
}