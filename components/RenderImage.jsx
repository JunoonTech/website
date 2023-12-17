import Image from "next/image";
import placeholder from "@/public/junoon-logo-only.png";

const RenderImage = ({ image, ...props }) => {
  const { url, width, height, alternativeText } = image.attributes;
  const toPass = { ...props };
  if (!props.fill) {
    toPass.width = width;
    toPass.height = height;
  }
  return (
    <Image
      src={`${url}`}
      alt={alternativeText || ""}
      {...toPass}
      placeholder="blur"
      blurDataURL={placeholder.src}
    />
  );
};

export default RenderImage;
