import { Camera } from "lucide-react";

// Placeholder para una futura función de probador virtual (estilo Warby
// Parker). Sin lógica real todavía: solo deja el espacio y el componente
// listo para conectar una cámara/AR más adelante.
export function VirtualTryOnPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-line p-6 text-center">
      <Camera size={22} className="text-ink/40" strokeWidth={1.25} aria-hidden="true" />
      <p className="text-sm text-ink/60">
        Probador virtual — próximamente vas a poder ver cómo te queda cada
        pieza desde tu cámara.
      </p>
      <button
        disabled
        className="focus-ring cursor-not-allowed border border-line px-4 py-2 text-xs uppercase tracking-wide text-ink/40"
      >
        Próximamente
      </button>
    </div>
  );
}
