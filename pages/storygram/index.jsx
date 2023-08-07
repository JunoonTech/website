"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Storygram = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/storygram/1");
  }, [push]);
};

export default Storygram;
