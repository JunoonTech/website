import RenderImage from "./RenderImage";

const DevCard = ({ developer }) => {
  return (
    <div className="m-10 flex flex-col overflow-hidden rounded-3xl bg-white">
      <div className="rounded-bl-3xl bg-darker py-6">
        <div className="relative mx-auto size-36 overflow-hidden rounded-full border-2 border-white">
          <RenderImage
            image={developer.attributes.image.data}
            fill={true}
            style={{ objectFit: "cover" }}
            className="rounded-full p-1"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>
      <div className="relative z-10 rounded-tr-3xl  bg-white  p-3 text-center">
        <h3 className="mb-3">{developer.attributes.firstName}</h3>
        <p className="mb-5">{developer.attributes.title}</p>
      </div>
    </div>
  );
};

export default DevCard;
