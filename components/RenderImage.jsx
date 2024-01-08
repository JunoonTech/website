import Image from "next/image";
import placeholder from "@/public/loader.gif";

const RenderImage = ({ image, ...props }) => {
  const { url, width, height, alternativeText } = image.attributes;
  const toPass = { ...props };
  if (!props.fill) {
    toPass.width = width;
    toPass.height = height;
  }

  return (
    <>
      <Image
        key={url}
        src={url}
        alt={alternativeText || ""}
        {...toPass}
        placeholder="blur"
        blurDataURL={image.base64 || placeholder.src}
      />
    </>
  );
};

export default RenderImage;
