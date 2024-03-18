import Image from "next/image";
const RenderImage = ({ image, ...props }) => {
  const { url, width, height, alternativeText } = image.attributes;
  const toPass = { ...props };
  if (!props.fill) {
    toPass.width = width;
    toPass.height = height;
  }

  return (
    <Image
      key={url}
      src={url}
      alt={alternativeText || ""}
      {...toPass}
      placeholder="blur"
      blurDataURL={image.attributes.base64}
      style={{
        objectFit: props.fill ? "cover" : "contain",
      }}
    />
  );
};

export default RenderImage;
