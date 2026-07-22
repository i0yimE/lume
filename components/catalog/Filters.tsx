"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils/format";
import type { StyleTag } from "@/lib/types";

const styleTags: { value: StyleTag; label: string }[] = [
  { value: "minimalista", label: "Minimalista" },
  { value: "statement", label: "Statement" },
  { value: "clasico", label: "Clásico" },
  { value: "contemporaneo", label: "Contemporáneo" },
];

const MAX_PRICE = 100000;

export function Filters({ allMetales }: { allMetales: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeMetales = searchParams.getAll("metal");
  const activeTags = searchParams.getAll("tag");
  const soloDisponibles = searchParams.get("disponibles") === "1";
  const precioMax = Number(searchParams.get("precioMax") ?? MAX_PRICE);

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleListParam(key: string, value: string, active: string[]) {
    updateParams((params) => {
      params.delete(key);
      const next = active.includes(value)
        ? active.filter((v) => v !== value)
        : [...active, value];
      next.forEach((v) => params.append(key, v));
    });
  }

  function hasActiveFilters() {
    return (
      activeMetales.length > 0 ||
      activeTags.length > 0 ||
      soloDisponibles ||
      precioMax < MAX_PRICE
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-ink/50">Filtros</h3>
          {hasActiveFilters() && (
            <button
              onClick={() => router.push(pathname, { scroll: false })}
              className="focus-ring text-xs text-bronze hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {allMetales.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-sm text-ink">Metal</legend>
          <div className="space-y-2">
            {allMetales.map((metal) => (
              <label key={metal} className="flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={activeMetales.includes(metal)}
                  onChange={() => toggleListParam("metal", metal, activeMetales)}
                  className="focus-ring h-4 w-4 accent-ink"
                />
                {metal}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-sm text-ink">Estilo</legend>
        <div className="space-y-2">
          {styleTags.map((tag) => (
            <label key={tag.value} className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={activeTags.includes(tag.value)}
                onChange={() => toggleListParam("tag", tag.value, activeTags)}
                className="focus-ring h-4 w-4 accent-ink"
              />
              {tag.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm text-ink">Precio máximo</legend>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={1000}
          value={precioMax}
          onChange={(e) =>
            updateParams((params) => {
              const v = Number(e.target.value);
              if (v >= MAX_PRICE) {
                params.delete("precioMax");
              } else {
                params.set("precioMax", String(v));
              }
            })
          }
          className="focus-ring w-full accent-ink"
          aria-label="Precio máximo"
        />
        <p className="mt-1 text-xs text-ink/60">Hasta {formatPrice(precioMax)}</p>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={soloDisponibles}
          onChange={() =>
            updateParams((params) => {
              if (soloDisponibles) params.delete("disponibles");
              else params.set("disponibles", "1");
            })
          }
          className="focus-ring h-4 w-4 accent-ink"
        />
        Solo disponibles
      </label>
    </div>
  );
}
