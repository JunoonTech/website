import Image from "next/image";
import mockupImage from "./desktopMockup.png";
import RenderImage from "../RenderImage";

const DesktopMockup = ({ image }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-[10%] top-[2%] h-[88%] w-[80%]">
        <RenderImage
          image={image}
          fill
          style={{ objectFit: "cover" }}
          sizes="80vw"
          quality={100}
        />
      </div>
      <Image src={mockupImage} className="relative z-10 w-full" alt="desktop" />
    </div>
  );
};

export default DesktopMockup;
