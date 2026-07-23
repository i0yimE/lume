"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";

export function SearchOverlay() {
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tienda?q=${encodeURIComponent(query.trim())}`);
      close();
      setQuery("");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/40"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="mx-auto mt-24 w-full max-w-xl px-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 border border-line bg-bone px-5 py-4"
            >
              <Search size={18} className="shrink-0 text-ink/50" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar aros, anillos, collares..."
                className="focus-ring w-full bg-transparent text-sm placeholder:text-ink/40"
                aria-label="Buscar productos"
              />
              <button
                type="button"
                onClick={close}
                className="focus-ring shrink-0 text-ink/50 hover:text-ink"
                aria-label="Cerrar búsqueda"
              >
                <X size={18} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
