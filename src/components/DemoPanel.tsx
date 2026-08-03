"use client";

import { useEffect, useState } from "react";
import type { DemoConfig } from "@/shared/demo-config";
import { DEFAULT_DEMO_CONFIG } from "@/shared/demo-config";
import { getNavigationDebugInfo, runViewTransition } from "@/shared/view-transition";

interface DemoPanelProps {
  initialConfig: DemoConfig;
}

const TOGGLE_LABELS: Record<keyof DemoConfig, string> = {
  slowData: "Slow server data (2s delay on detail)",
  slowImageDecode: "Slow image decode on detail hero",
  staleSharedName: "Stale shared names on detail page only",
  disableCrossDocumentVT: "Disable cross-document VT",
  forceReducedMotion: "Force reduced motion",
  showVtDebug: "Show VT debug overlay",
};

export function DemoPanel({ initialConfig }: DemoPanelProps) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DemoConfig>(initialConfig);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    if (!config.showVtDebug) return;
    const info = getNavigationDebugInfo();
    setDebugInfo(JSON.stringify(info, null, 2));
  }, [config.showVtDebug]);

  const updateConfig = async (patch: Partial<DemoConfig>) => {
    const next = { ...config, ...patch };
    setConfig(next);

    await fetch("/api/demo/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });

    document.documentElement.classList.toggle(
      "force-reduced-motion",
      next.forceReducedMotion,
    );
    document.documentElement.classList.toggle(
      "disable-cross-document-vt",
      next.disableCrossDocumentVT,
    );
  };

  const toggleOpen = () => {
    runViewTransition(() => setOpen((value) => !value));
  };

  const crossDocumentSupported =
    typeof CSS !== "undefined" &&
    CSS.supports("view-transition-name", "none") &&
    typeof window.navigation !== "undefined";

  return (
    <aside className="demo-panel" aria-label="Demo controls">
      <button type="button" className="demo-panel__toggle" onClick={toggleOpen}>
        {open ? "Hide demo controls" : "Show demo controls"}
      </button>
      {open ? (
        <div className="demo-panel__body">
          <h2>Talk failure modes</h2>
          <div className="demo-panel__toggles">
            {(Object.keys(DEFAULT_DEMO_CONFIG) as Array<keyof DemoConfig>).map(
              (key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={config[key]}
                    onChange={(event) =>
                      updateConfig({ [key]: event.target.checked })
                    }
                  />
                  {TOGGLE_LABELS[key]}
                </label>
              ),
            )}
          </div>
          <p className="demo-panel__note">
            Rapid double-clicks and back/forward direction emerge naturally from
            hard MPA navigation.
          </p>
          {!crossDocumentSupported ? (
            <p className="browser-banner">
              Cross-document view transitions require Chrome 126+, Safari 18.2+, or
              Edge 126+.
            </p>
          ) : null}
          {config.showVtDebug ? (
            <pre className="demo-panel__debug">{debugInfo || "Collecting…"}</pre>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
