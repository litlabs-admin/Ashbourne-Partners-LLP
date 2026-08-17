"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return !window.matchMedia(QUERY).matches;
}

// The server has no pointer information, so it renders the desktop branch.
// Touch devices correct themselves on mount, before any effect-driven work
// (Lenis init, scroll transforms) has a chance to run.
function getServerSnapshot() {
  return false;
}

/**
 * True on devices without a fine hover-capable pointer — phones and tablets.
 *
 * Used to keep main-thread scroll work off touch devices, where the browser
 * can otherwise only scroll after running our JS.
 */
export function useIsTouch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
