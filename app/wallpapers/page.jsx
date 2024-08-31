import WallpapersUi from "@/components/Wallpapers/WallpapersUi";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";

export default async function Wallpapers() {
  const wallpapers = await fetchData("wallpaper");
  const logoOnlyWhite = await fetchLogo("logo-only-white");

  return (
    <main className="min-h-screen max-w-full">
      <div className="mx-auto max-w-5xl pb-24">
        <h1 className="mb-10 text-center">WALLPAPERS</h1>
        <WallpapersUi wallpapers={wallpapers} logoOnlyWhite={logoOnlyWhite} />
      </div>
    </main>
  );
}
