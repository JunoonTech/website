import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(
  ref,
  visibleByDefault = false,
  percentVisible = 0,
) {
  const [isIntersecting, setIntersecting] = useState(visibleByDefault);

  const observer = useMemo(() => {
    if (typeof window === "undefined") {
      return;
    }
    return new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: percentVisible },
    );
  }, [percentVisible]);

  useEffect(() => {
    if (!observer) return;
    if (!ref.current) {
      observer.disconnect();
      return;
    }
    observer.observe(ref.current);
    return () => {
      observer && observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
