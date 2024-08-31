import { twMerge } from "tailwind-merge";

const Radio = ({ options, selectedValue, onChange }) => {
  return (
    <ol className="flex w-fit overflow-hidden rounded-lg">
      {options.map((option) => {
        const selected = selectedValue === option;
        return (
          <li
            key={`option-${option}`}
            className={twMerge(
              "cursor-pointer px-4 py-2 bg-white text-dark capitalize",
              selected && "bg-blue-400 text-white",
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
