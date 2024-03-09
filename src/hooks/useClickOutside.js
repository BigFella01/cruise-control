import { useEffect } from "react";

function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, handler]);

  return handler;
}

export default useClickOutside;
