import { twMerge } from "tailwind-merge";

const Radio = ({ options, selectedValue, onChange }) => {
  return (
    <ol className="flex w-fit overflow-hidden rounded-full border border-white/10 bg-darkest p-1 shadow-inner">
      {options.map((option) => {
        const selected = selectedValue === option;
        return (
          <li
            key={`option-${option}`}
            className={twMerge(
              "cursor-pointer rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300",
              selected
                ? "bg-neon-green text-dark shadow-md"
                : "bg-transparent text-gray-400 hover:text-white",
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </li>
        );
      })}
    </ol>
  );
};

export default Radio;
