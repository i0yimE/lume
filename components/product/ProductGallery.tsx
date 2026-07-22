"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-bone-soft">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((image, i) => (
            <button
              key={image}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-bone-soft sm:w-20",
                "focus-ring",
                active === i && "ring-2 ring-ink ring-offset-2 ring-offset-bone"
              )}
              aria-label={`Ver imagen ${i + 1} de ${alt}`}
              aria-current={active === i}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
