import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useHash = () => {
  const location = useLocation();

  const hash = useMemo(() => {
    return location.hash.substring(1);
  }, [location]);

  return hash;
};

export default useHash;
