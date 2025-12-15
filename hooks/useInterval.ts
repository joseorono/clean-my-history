import { useEffect, useRef } from "react";

/**
 * Custom hook for managing intervals with automatic cleanup
 * @param callback - Function to execute on each interval
 * @param delay - Delay in milliseconds (null to pause the interval)
 * @param immediate - Whether to execute callback immediately on mount (default: false)
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  immediate: boolean = false
) {
  const savedCallback = useRef<() => void>();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    // Don't schedule if no delay is specified or delay is null
    if (delay === null) {
      // Clear any existing interval
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      return;
    }

    // Execute immediately if requested
    if (immediate && savedCallback.current) {
      savedCallback.current();
    }

    // Set up the interval
    intervalId.current = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);

    // Cleanup function
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [delay, immediate]);
}
