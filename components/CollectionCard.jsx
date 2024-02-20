import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import React from "react";
const CollectionCard = ({ collection, logo }) => {
  const { name, image, link } = collection.attributes;
  return (
    <div className="m-7 bg-white p-7">
      <div className="card  relative">
        <RenderImage
          image={image.data}
          className="w-80 max-w-full md:size-96"
          sizes="24rem"
        />
        <div className="overlay absolute left-0 top-0 flex size-full flex-col p-3">
          <RenderImage
            image={logo.data}
            className="hidden w-12 md:block"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
          <div className="content mt-auto text-center text-white">
            <h2 className="title mb-3 text-xl font-bold">{name}</h2>
            {link && (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-white hover:bg-neon-green"
              >
                View More
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
