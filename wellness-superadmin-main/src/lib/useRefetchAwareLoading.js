import { useCallback, useRef, useState } from "react";

export function useRefetchAwareLoading() {
  const hasLoadedOnceRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const beginLoading = useCallback(() => {
    const isInitialLoad = !hasLoadedOnceRef.current;
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    return isInitialLoad;
  }, []);

  const finishLoading = useCallback((didSucceed = true) => {
    if (didSucceed) {
      hasLoadedOnceRef.current = true;
    }
    setLoading(false);
    setIsRefreshing(false);
  }, []);

  return {
    loading,
    isRefreshing,
    beginLoading,
    finishLoading,
  };
}
