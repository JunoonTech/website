import { BsDownload } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const DownloadButton = ({ href, className }) => {
  return (
    <a href={href} target="_blank">
      <BsDownload
        className={twMerge(
          "text-xl text-white hover:text-neon-green",
          className,
        )}
      />
    </a>
  );
};
export default DownloadButton;
