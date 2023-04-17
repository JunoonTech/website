import { useCallback, useEffect, useState } from "react";
import RenderImage from "./renderImage";
import Image from "next/image";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

let startTime;

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
    [totalImages]
  );
  const nextImage = useCallback(
    () => setToShow((toShow) => getMod(toShow + 1)),
    [getMod]
  );
  const prevImage = useCallback(
    () => setToShow((toShow) => getMod(toShow - 1)),
    [getMod]
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
    <div className="slider w-full h-full relative fl">
      <div
        className="imgs absolute top-0 left-0 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, idx) => {
          const display = idx === toShow;
          return (
            <div key={image.id} className="absolute top-0 left-0 w-full h-full">
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
                priority
              />
            </div>
          );
        })}
      </div>
      <div className="arrows z-30 absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-5">
        <button className="leftArrow" onClick={prevImage}>
          <BsArrowLeftCircleFill className="arrow" />
        </button>
        <button className="rightArrow" onClick={nextImage}>
          <BsArrowRightCircleFill className="arrow" />
        </button>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>

      <div
        className="w-full h-1/2 max-h-[200px] absolute bottom-0 left-0 bg-repeat-x"
        style={{ backgroundImage: "url(/gradient.png)" }}
      >
        <div className="thumbs absolute bottom-[2vh] left-1/2 transform -translate-x-1/2 grid grid-flow-col gap-2">
          {images.map((image, idx) => {
            const display = idx === toShow;
            return (
              <button
                key={image.id}
                className="w-12 h-12 relative"
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
                  priority
                />

                <div
                  className={`absolute top-0 left-0 w-full h-full rounded-full border-2 border-white border-opacity-40 ${
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
