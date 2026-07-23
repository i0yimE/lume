"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Message {
  role: "user" | "model";
  content: string;
}

const WELCOME: Message = {
  role: "model",
  content: "Hola, soy el asistente de LUME. ¿Tenés alguna duda sobre materiales, talles, envíos o pedidos?",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "No pudimos responder.");

      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo falló. Probá de nuevo en un rato.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        role="dialog"
        aria-label="Asistente LUME"
        className={cn(
          "flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col border border-line bg-bone shadow-xl transition-all duration-300 ease-out",
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-4 scale-95 opacity-0 delay-300"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="font-serif text-base text-ink">Asistente LUME</p>
          <button
            onClick={() => setIsOpen(false)}
            className="focus-ring text-ink/50 hover:text-ink"
            aria-label="Cerrar chat"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-ink text-bone"
                  : "mr-auto bg-bone-soft text-ink"
              )}
            >
              {m.content}
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto flex gap-1 bg-bone-soft px-3 py-2.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 border-t border-line p-3">
          <label htmlFor="chat-input" className="sr-only">
            Escribí tu mensaje
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu consulta..."
            className="focus-ring w-full min-w-0 border border-line bg-transparent px-3 py-2 text-sm placeholder:text-ink/40"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="focus-ring shrink-0 bg-ink p-2.5 text-bone transition-colors hover:bg-ink-soft disabled:opacity-40"
            aria-label="Enviar mensaje"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bone shadow-lg transition-transform duration-200 ease-out hover:scale-105 active:scale-95 motion-safe:animate-[pop-in_0.5s_cubic-bezier(0.22,1,0.36,1)]"
        style={{ animationDelay: "900ms" }}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat con el asistente de LUME"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
