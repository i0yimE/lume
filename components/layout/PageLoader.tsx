"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORD = "LUME";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden">
            {WORD.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-serif text-4xl text-bone sm:text-5xl"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
