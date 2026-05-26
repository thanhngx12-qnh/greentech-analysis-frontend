// File: src/hooks/useUIStore.ts
import { create } from "zustand";

interface UIState {
  dynamicSlugs: Record<string, string> | null;
  currentRouteKey: string | null;
  setDynamicSlugs: (
    slugs: Record<string, string> | null,
    routeKey?: string | null,
  ) => void;
}

export const useUIStore = create<UIState>((set) => ({
  dynamicSlugs: null,
  currentRouteKey: null,
  setDynamicSlugs: (slugs, routeKey = null) =>
    set({ dynamicSlugs: slugs, currentRouteKey: routeKey }),
}));
