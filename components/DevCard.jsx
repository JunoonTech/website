import RenderImage from "./RenderImage";

const DevCard = ({ developer }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white">
      <div className="p-6">
        <div className="relative size-36 overflow-hidden rounded-full shadow-lg">
          <RenderImage
            image={developer.image}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>
      <div className="bg-darker p-3  text-center text-white">
        <h3 className="mb-3">{developer.firstName}</h3>
        <p className="mb-5">{developer.title}</p>
      </div>
    </div>
  );
};

export default DevCard;
