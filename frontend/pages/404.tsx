import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <Link href="/" className="text-blue-600 underline">
        Return Home
      </Link>
    </div>
  );
}
