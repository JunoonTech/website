import RenderImage from "./RenderImage";
import SpotlightCard from "./SpotlightCard";

const DevCard = ({ developer }) => {
  return (
    <SpotlightCard className="group relative flex h-[340px] w-[260px] flex-col overflow-hidden border border-white/10 bg-darkest p-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-full w-full">
        <RenderImage
          image={developer.image}
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col items-center text-center">
        <h3 className="mb-1 text-xl font-bold text-white transition-colors group-hover:text-white">
          {developer.firstName}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-neon-green transition-colors">
          {developer.title}
        </p>
        <div className="mt-3 h-0.5 w-0 bg-neon-green transition-all duration-500 ease-out group-hover:w-8" />
      </div>
    </SpotlightCard>
  );
};

export default DevCard;
