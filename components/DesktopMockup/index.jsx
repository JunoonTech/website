import Image from "next/image";
import mockupImage from "./desktopMockup.png";
import RenderImage from "../RenderImage";

const DesktopMockup = ({ image }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-[10%] top-[2%] h-[88%] w-4/5">
        <RenderImage
          image={image}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 80vw, 40vw"
        />
      </div>
      <Image src={mockupImage} className="relative z-10 w-full" alt="desktop" />
    </div>
  );
};

export default DesktopMockup;
