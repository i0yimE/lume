import { NextResponse } from "next/server";
import { generateChatReply, type ChatMessage } from "@/lib/gemini";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const messages: ChatMessage[] | undefined = body?.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  try {
    const reply = await generateChatReply(messages);
    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
