// Modelos a intentar en orden: si uno está deprecado (404) o sin cuota
// (429), probamos el siguiente. "gemini-flash-latest" es el que mejor
// respondió en las pruebas, pero dejamos alternativas por si cambia.
const MODEL_FALLBACKS = [
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-2.0-flash-001",
  "gemini-flash-lite-latest",
  "gemini-pro-latest",
];

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

const SYSTEM_PROMPT = `Sos el asistente virtual de LUME, una marca argentina de joyería
(anillos, collares, aros y pulseras) hecha en lotes chicos con plata y oro
reciclados. Respondé en español rioplatense, corto y cordial, con la voz
cálida y directa de la marca (nada de jerga corporativa).

Datos útiles:
- Categorías: anillos, collares, aros, pulseras. Precios entre $32.000 y $95.000 ARS.
- Envío gratis a partir de $80.000 ARS, envío estándar $4.500 ARS.
- El checkout es como invitado, no hace falta crear cuenta.
- Hay un quiz en /quiz para encontrar el estilo de cada persona (minimalista, statement, clásico, contemporáneo).
- Materiales: plata 925 y oro reciclados, algunas piezas con acero quirúrgico o bronce chapado. Se explican en cada producto.
- Cuidados generales: evitar perfumes, agua de mar y cloro; guardar en la bolsa de tela.
- No hay pasarela de pago real todavía (proyecto en etapa de desarrollo): si preguntan cómo pagar, avisá que por ahora el pago se simula en el checkout.
- Si no sabés algo puntual (stock exacto, tiempos de envío exactos), decilo con honestidad y sugerí escribir a la marca.

Mantené las respuestas breves (2-4 oraciones), sin inventar datos que no tengas.`;

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  return messages.map((m) => ({ role: m.role, parts: [{ text: m.content }] }));
}

export async function generateChatReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está configurada.");
  }

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: toGeminiContents(messages),
    generationConfig: { temperature: 0.6, maxOutputTokens: 300 },
  };

  let lastError: string = "No se pudo contactar a Gemini.";

  for (const model of MODEL_FALLBACKS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(15000),
        }
      );

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        lastError = errBody?.error?.message ?? `${model} respondió ${res.status}`;
        // 404 (modelo deprecado) o 429 (sin cuota): probamos el siguiente modelo.
        if (res.status === 404 || res.status === 429) continue;
        throw new Error(lastError);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((p: GeminiPart) => p.text).join("") ?? "";
      if (text.trim()) return text.trim();
      lastError = `${model} no devolvió texto.`;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(lastError);
}
