"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CheckoutForm({ onSubmit }: { onSubmit: () => void }) {
  const [createAccount, setCreateAccount] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center gap-2 text-xs text-ink/60">
        <ShieldCheck size={14} className="text-bronze" />
        Comprás como invitado, no hace falta crear una cuenta.
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm uppercase tracking-wide text-ink/50">Contacto</legend>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm uppercase tracking-wide text-ink/50">Envío</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1.5 block text-sm text-ink">
              Nombre y apellido
            </label>
            <input
              id="nombre"
              type="text"
              required
              className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="mb-1.5 block text-sm text-ink">
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              required
              className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="direccion" className="mb-1.5 block text-sm text-ink">
            Dirección
          </label>
          <input
            id="direccion"
            type="text"
            required
            className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ciudad" className="mb-1.5 block text-sm text-ink">
              Ciudad
            </label>
            <input
              id="ciudad"
              type="text"
              required
              className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="cp" className="mb-1.5 block text-sm text-ink">
              Código postal
            </label>
            <input
              id="cp"
              type="text"
              required
              className="focus-ring w-full border border-line bg-transparent px-4 py-2.5 text-sm"
            />
          </div>
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={createAccount}
          onChange={(e) => setCreateAccount(e.target.checked)}
          className="focus-ring h-4 w-4 accent-ink"
        />
        Crear una cuenta para la próxima compra (opcional)
      </label>

      <p className="text-xs text-ink/50">
        El pago se simula en esta etapa — todavía no hay una pasarela conectada.
      </p>

      <Button type="submit" size="lg" className="w-full">
        Confirmar pedido
      </Button>
    </form>
  );
}
