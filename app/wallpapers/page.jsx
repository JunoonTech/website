import WallpapersUi from "@/components/Wallpapers/WallpapersUi";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";

export default async function Wallpapers() {
  const wallpapers = await fetchData("wallpaper");
  const logoOnlyWhite = await fetchLogo("logo-only-white");

  return (
    <main className="relative min-h-screen overflow-hidden bg-darker pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/10 blur-[120px]" />
      <div className="mx-auto w-11/12 max-w-6xl">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Wallpapers
          </h1>
          <p className="mt-4 text-gray-400">
            Grab a piece of Junoon for your device
          </p>
        </div>

        <WallpapersUi wallpapers={wallpapers} logoOnlyWhite={logoOnlyWhite} />
      </div>
    </main>
  );
}
