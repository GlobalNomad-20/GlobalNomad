"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => {
      return setMatches(mql.matches);
    };

    onChange();
    mql.addEventListener("change", onChange);
    return () => {
      return mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
};
