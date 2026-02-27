import { useState, useEffect } from "react";
import { client } from "../lib/sanityClient";

export function useSanity(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    setLoading(true);

    client
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[Sanity] fetch error:", err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}
