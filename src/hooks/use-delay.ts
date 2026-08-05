import { useState, useEffect } from "react";

export function useCountdown(delayMs: number) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return finished;
}
