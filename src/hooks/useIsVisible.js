import { useEffect } from "react";

function useIsVisible(refs, handler) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handler(entry);
          }
        });
      },
      {
        threshold: 0.42,
      }
    );

    refs.forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [refs, handler]);
  return handler;
}

export default useIsVisible;
