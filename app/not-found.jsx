import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-darker text-center text-white">
      <h1 className="text-[10rem] font-bold leading-none text-white/5 md:text-[20rem]">
        404
      </h1>
      <div className="absolute top-1/2 -translate-y-1/2">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">Out of Focus</h2>
        <p className="mb-8 px-8 text-gray-400">
          The page you are looking for has been moved or deleted.
        </p>
        <Link
          href="/"
          className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-neon-green"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
