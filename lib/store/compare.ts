import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_COMPARE = 4;

interface CompareState {
  productIds: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      productIds: [],

      toggle: (id) =>
        set((state) => {
          if (state.productIds.includes(id)) {
            return { productIds: state.productIds.filter((p) => p !== id) };
          }
          if (state.productIds.length >= MAX_COMPARE) {
            return state;
          }
          return { productIds: [...state.productIds, id] };
        }),

      remove: (id) =>
        set((state) => ({ productIds: state.productIds.filter((p) => p !== id) })),

      clear: () => set({ productIds: [] }),
    }),
    { name: "lume-compare" }
  )
);

export function useIsComparing(id: string) {
  return useCompareStore((s) => s.productIds.includes(id));
}

export function useCompareCount() {
  return useCompareStore((s) => s.productIds.length);
}

export function useCompareIsFull() {
  return useCompareStore((s) => s.productIds.length >= MAX_COMPARE);
}
