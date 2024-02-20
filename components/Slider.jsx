import { useCallback, useEffect, useState } from "react";
import RenderImage from "./RenderImage";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Slider = ({ images, children }) => {
  const totalImages = images.length;
  const [toShow, setToShow] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getMod = useCallback(
    (num) => {
      if (num < 0) {
        num += totalImages;
      }
      return num % totalImages;
    },
    [totalImages],
  );
  const nextImage = useCallback(
    () => setToShow((toShow) => getMod(toShow + 1)),
    [getMod],
  );
  const prevImage = useCallback(
    () => setToShow((toShow) => getMod(toShow - 1)),
    [getMod],
  );

  useEffect(() => {
    const handler = setTimeout(nextImage, 10000);
    return () => clearTimeout(handler);
  }, [toShow, nextImage]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextImage();
    }
    if (touchStart - touchEnd < -150) {
      prevImage();
    }
  };
  return (
    <div className="slider relative size-full">
      <div
        className="imgs absolute left-0 top-0 size-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, idx) => {
          const display = idx === toShow;
          return (
            <div key={image.id} className="absolute left-0 top-0 size-full">
              <RenderImage
                image={image}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: display ? "100" : "0",
                }}
                className="delay-300 duration-[2000ms] ease-in-out"
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>
      <div className="arrows absolute top-1/2 z-30 flex w-full -translate-y-1/2 justify-between px-5">
        <button className="leftArrow" onClick={prevImage}>
          <BsArrowLeftCircleFill className="arrow" />
        </button>
        <button className="rightArrow" onClick={nextImage}>
          <BsArrowRightCircleFill className="arrow" />
        </button>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>

      <div
        className="absolute bottom-0 left-0 h-1/2 max-h-[200px] w-full bg-repeat-x"
        style={{ backgroundImage: "url(/gradient.png)" }}
      >
        <div className="thumbs absolute bottom-[2vh] left-1/2 grid -translate-x-1/2 grid-flow-col gap-2">
          {images.map((image, idx) => {
            const display = idx === toShow;
            return (
              <button
                key={image.id}
                className="relative size-12"
                onClick={() => setToShow(idx)}
              >
                <RenderImage
                  image={image}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="rounded-full"
                  sizes="10rem"
                  priority
                />

                <div
                  className={`absolute left-0 top-0 size-full rounded-full border-2 border-white/40 ${
                    display ? "" : "opacity-0"
                  } `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
