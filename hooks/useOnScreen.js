import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      typeof window === "undefined" ||
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    observer && observer.observe(ref.current);
    return () => observer && observer.disconnect();
  }, []);

  return isIntersecting;
}
