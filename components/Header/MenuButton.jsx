"use client";
import { useUi } from "@/providers/UiProvider";

export default function MenuButton({ white }) {
  const { menuOpen, setMenuOpen } = useUi();
  return (
    <button onClick={() => setMenuOpen((menuOpen) => !menuOpen)}>
      <div className={`relative h-5 w-7`}>
        <div
          className={`absolute h-1 w-full ${
            white ? "bg-white" : "bg-black"
          } origin-center ${
            menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          }`}
        />
        <div
          className={`absolute left-1/2 top-1/2 h-1 -translate-x-1/2 -translate-y-1/2 ${
            white ? "bg-white" : "bg-black"
          } ${menuOpen ? "w-0" : "w-full"}`}
        />
        <div
          className={`absolute h-1 w-full ${
            white ? "bg-white" : "bg-black"
          } origin-center ${
            menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
          }`}
        />
      </div>
    </button>
  );
}
