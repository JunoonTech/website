import Image from "next/image";
import mockupImage from "./mobileMockup.png";
import RenderImage from "../RenderImage";

const MobileMockup = ({ image }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-[5%] top-[1.5%] h-[97%] w-[90%] overflow-hidden rounded-[4%]">
        <RenderImage
          image={image}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 66vw, 33vw"
        />
      </div>
      <Image
        src={mockupImage}
        className="relative z-10 w-full drop-shadow-3xl"
        alt="mobile"
        priority
      />
    </div>
  );
};

export default MobileMockup;
