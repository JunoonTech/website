import Image from "next/image";
export default function RenderImage({ image, ...props }) {
  const { url, metadata } = image.asset;
  const { width, height } = metadata.dimensions;
  const toPass = { ...props };
  if (!props.fill) {
    toPass.width = width;
    toPass.height = height;
  }

  return (
    <Image
      key={url}
      src={url}
      alt=""
      {...toPass}
      placeholder="blur"
      blurDataURL={metadata.lqip}
      style={{
        objectFit: props.fill ? "cover" : "contain",
      }}
    />
  );
}
