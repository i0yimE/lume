import { create } from "zustand";

interface UIState {
  isNavOpen: boolean;
  isSearchOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavOpen: false,
  isSearchOpen: false,
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
}));
