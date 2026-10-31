import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const frame = requestAnimationFrame(() => setMatches(media.matches));
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
