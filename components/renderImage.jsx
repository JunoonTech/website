const Image = require("next/image");

const RenderImage = ({ image, ...props }) => {
  const { url, width, height, alternativeText } = image.attributes;
  const toPass = { ...props };
  if (!props.fill) {
    toPass.width = width;
    toPass.height = height;
  }
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
      alt={alternativeText || ""}
      {...toPass}
    />
  );
};

export default RenderImage;
