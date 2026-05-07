import { useEffect, useState } from "react";
import homepageFallback from "../data/homepageFallback";
import { publicApi } from "../lib/contentApi";

export const useHomepageContent = () => {
  const [content, setContent] = useState(homepageFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await publicApi.getHomepage();
        if (!active) {
          return;
        }
        setContent(data);
      } catch (fetchError) {
        if (!active) {
          return;
        }
        setUsingFallback(true);
        setError(fetchError.message);
        setContent(homepageFallback);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { content, loading, error, usingFallback };
};
