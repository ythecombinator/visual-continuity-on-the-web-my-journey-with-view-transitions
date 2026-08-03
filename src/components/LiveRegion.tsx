"use client";

import { useEffect, useRef } from "react";

interface LiveRegionProps {
  message: string;
  focusTargetId?: string;
}

export function LiveRegion({ message, focusTargetId }: LiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
      if (focusTargetId) {
        const target = document.getElementById(focusTargetId);
        target?.focus({ preventScroll: true });
      }
    }, 100);

    return () => window.clearTimeout(timer);
  }, [message, focusTargetId]);

  return (
    <div
      ref={regionRef}
      className="sr-only"
      aria-live="assertive"
      aria-atomic="true"
    />
  );
}
