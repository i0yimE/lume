"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Sin backend todavía: simulamos la suscripción en el cliente.
    setStatus("success");
    setEmail("");
  }

  return (
    <div>
      <p className="font-serif text-lg text-ink">Sumate a la lista</p>
      <p className="mt-1 text-sm text-ink/60">
        Novedades, lanzamientos limitados y una sorpresa en tu primera compra.
      </p>
      {status === "success" ? (
        <p className="mt-4 text-sm text-bronze">¡Listo! Ya estás en la lista.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="focus-ring w-full min-w-0 border border-line bg-transparent px-4 py-2.5 text-sm placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="focus-ring shrink-0 bg-ink px-5 py-2.5 text-xs uppercase tracking-wide text-bone hover:bg-ink-soft"
          >
            Sumarme
          </button>
        </form>
      )}
    </div>
  );
}
