"use client";
import Radio from "@/components/Radio";
import { useEffect, useMemo, useRef, useState } from "react";
import DesktopMockup from "@/components/DesktopMockup";
import MobileMockup from "@/components/MobileMockup";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import RenderImage from "@/components/RenderImage";
import { twJoin } from "tailwind-merge";
import DownloadButton from "@/components/DownloadButton";

const deviceOptions = ["mobile", "desktop"];

export default function WallpapersUi({ wallpapers, logoOnlyWhite }) {
  const [selectedDevice, setSelectedDevice] = useState(deviceOptions[0]);
  const [userInteracted, setUserInteracted] = useState(false);
  const thumbsContainerRef = useRef(null);

  const wallPapersToDisplay = useMemo(
    () => wallpapers.filter((wallpaper) => wallpaper.size === selectedDevice),
    [wallpapers, selectedDevice],
  );

  const [selectedWallpaper, setSelectedWallpaper] = useState(
    wallPapersToDisplay[0],
  );

  const selectedWallPaperRef = useRef(null);

  useEffect(() => {
    if (
      userInteracted &&
      selectedWallPaperRef.current &&
      thumbsContainerRef.current
    ) {
      const container = thumbsContainerRef.current;
      const item = selectedWallPaperRef.current;
      const scrollLeft =
        item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selectedWallpaper, userInteracted]);

  useEffect(() => {
    if (wallPapersToDisplay.length > 0) {
      setSelectedWallpaper(wallPapersToDisplay[0]);
      setUserInteracted(false);
    }
  }, [wallPapersToDisplay]);

  const handleSelect = (wallpaper) => {
    setUserInteracted(true);
    setSelectedWallpaper(wallpaper);
  };

  const prevWallpaper = () => {
    const index = wallPapersToDisplay.indexOf(selectedWallpaper);
    const next =
      index === 0
        ? wallPapersToDisplay[wallPapersToDisplay.length - 1]
        : wallPapersToDisplay[index - 1];

    handleSelect(next);
  };

  const nextWallpaper = () => {
    const index = wallPapersToDisplay.indexOf(selectedWallpaper);
    const next =
      index === wallPapersToDisplay.length - 1
        ? wallPapersToDisplay[0]
        : wallPapersToDisplay[index + 1];

    handleSelect(next);
  };

  return (
    <>
      <div className="mb-16 flex justify-center">
        <Radio
          selectedValue={selectedDevice}
          onChange={setSelectedDevice}
          options={deviceOptions}
        />
      </div>

      <div className="mb-20 flex w-full items-center justify-between px-4 md:px-0">
        <button
          onClick={prevWallpaper}
          className="group transition-transform active:scale-95"
        >
          <BsArrowLeftCircleFill className="text-4xl text-gray-500 transition-colors duration-300 group-hover:text-neon-green md:text-6xl" />
        </button>

        {selectedWallpaper && selectedDevice === "mobile" && (
          <div className="relative mx-auto w-2/3 md:w-1/3">
            <div className="absolute inset-0 -z-10 rounded-full bg-neon-green/5 blur-3xl"></div>
            <MobileMockup image={selectedWallpaper.image} />
            <div className="absolute left-[12%] top-[5%] size-10 opacity-90">
              <RenderImage image={logoOnlyWhite.image} fill />
            </div>
            <div className="absolute bottom-[5%] left-[12%] z-10">
              <DownloadButton
                href={selectedWallpaper.image.asset.url}
                className="size-10 drop-shadow-lg transition-transform hover:scale-110"
              />
            </div>
          </div>
        )}

        {selectedWallpaper && selectedDevice === "desktop" && (
          <div className="relative mx-auto w-10/12">
            <div className="absolute inset-0 -z-10 rounded-full bg-neon-green/5 blur-3xl"></div>
            <DesktopMockup image={selectedWallpaper.image} />
            <div className="absolute left-[12%] top-[5%] size-10 opacity-90">
              <RenderImage image={logoOnlyWhite.image} fill />
            </div>
            <div className="absolute bottom-[11%] left-[12%] z-10">
              <DownloadButton
                href={selectedWallpaper.image.asset.url}
                className="size-10 drop-shadow-lg transition-transform hover:scale-110"
              />
            </div>
          </div>
        )}

        <button
          onClick={nextWallpaper}
          className="group transition-transform active:scale-95"
        >
          <BsArrowRightCircleFill className="text-4xl text-gray-500 transition-colors duration-300 group-hover:text-neon-green md:text-6xl" />
        </button>
      </div>

      <div className="w-full">
        <h3 className="mb-6 pl-2 text-sm font-bold uppercase tracking-widest text-gray-500">
          All Wallpapers
        </h3>

        <div
          ref={thumbsContainerRef}
          className="wallpaper-thumbs relative flex gap-4 overflow-x-auto border-t border-white/10 bg-transparent py-6 pb-4 px-4 scroll-smooth"
        >
          {wallPapersToDisplay.map((wallpaper) => {
            const selected = wallpaper._id === selectedWallpaper._id;
            return (
              <div
                className={twJoin(
                  "aspect-square w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 md:w-32",
                  selected
                    ? "border-neon-green scale-105 shadow-[0_0_15px_rgba(156,205,126,0.3)]"
                    : "border-white/10 opacity-60 hover:border-white/30 hover:opacity-100",
                )}
                key={wallpaper._id}
                ref={selected ? selectedWallPaperRef : null}
                onClick={() => handleSelect(wallpaper)}
              >
                <div className="relative size-full">
                  <RenderImage
                    image={wallpaper.image}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 18vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
