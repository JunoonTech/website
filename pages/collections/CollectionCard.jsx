import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import React from "react";
const CollectionCard = ({ collection, logo }) => {
  const { name, image, link } = collection.attributes;
  return (
    <div className="m-7 bg-white p-7">
      <div class="card  relative">
        <RenderImage
          image={image.data}
          className="w-80 max-w-full md:h-96 md:w-96"
        />
        <div className="overlay absolute left-0 top-0 flex h-full w-full flex-col p-3">
          <RenderImage image={logo.data} className="hidden w-12 md:block" />
          <div class="content mt-auto text-center text-white">
            <h2 class="title mb-3 text-xl font-bold">{name}</h2>
            {link && (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
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
