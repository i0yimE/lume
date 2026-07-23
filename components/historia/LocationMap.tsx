"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import "leaflet/dist/leaflet.css";

const LOCATION = { lat: -34.4586, lng: -58.9142 };
const ADDRESS = "Pilar, Provincia de Buenos Aires";
const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}`;

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [LOCATION.lat, LOCATION.lng],
        zoom: 12,
        scrollWheelZoom: false,
        // Las transiciones animadas de zoom/fade de Leaflet dependen de
        // requestAnimationFrame, que el navegador puede pausar del todo si
        // la pestaña no está compositando (ver el mismo problema que tuvimos
        // con Framer Motion). Sin animación, el cambio de zoom es instantáneo
        // y no depende de eso.
        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#b08d57;border:3px solid #1c1b19;box-shadow:0 0 0 3px rgba(245,241,234,0.8)"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([LOCATION.lat, LOCATION.lng], { icon, title: "LUME — Taller" })
        .addTo(map)
        .bindPopup(
          `<strong>LUME</strong><br/>${ADDRESS}<br/><a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" style="color:#b08d57;font-weight:600">Ver en Google Maps →</a>`
        )
        .openPopup();

      // El scroll de la rueda solo hace zoom del mapa una vez que el
      // usuario interactuó con él, para no "atrapar" el scroll de la página.
      map.on("click", () => map.scrollWheelZoom.enable());
      containerRef.current.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => mapRef.current?.invalidateSize(), 320);
    return () => clearTimeout(id);
  }, [expanded]);

  return (
    <div>
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-ink/60"
          onClick={() => setExpanded(false)}
          role="button"
          tabIndex={-1}
          aria-label="Cerrar mapa ampliado"
        />
      )}
      <div
        className={
          expanded
            ? "fixed inset-4 z-50 overflow-hidden border border-line bg-bone-soft sm:inset-10"
            : "relative h-96 overflow-hidden border border-line bg-bone-soft"
        }
      >
        <div ref={containerRef} className="h-full w-full" />

        <button
          onClick={() => setExpanded((v) => !v)}
          className="focus-ring absolute right-3 top-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-full bg-bone text-ink shadow-md hover:bg-bone-soft"
          aria-label={expanded ? "Achicar mapa" : "Agrandar mapa"}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring absolute bottom-3 left-3 z-[1000] flex items-center gap-1.5 bg-ink px-3 py-2 text-xs uppercase tracking-wide text-bone shadow-md hover:bg-ink-soft"
        >
          Abrir en Google Maps
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
