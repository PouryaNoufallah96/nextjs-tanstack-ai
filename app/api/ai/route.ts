import { chat, toStreamResponse } from "@tanstack/ai";
import { openai } from "@tanstack/ai-openai";

export async function POST(request: Request) {
    const { messages, conversationId } = await request.json();

    try {
        const stream = chat({
            adapter: openai(),
            messages,
            model: "gpt-4o",
            conversationId
        });

        return toStreamResponse(stream);
    } catch {
        throw new Error("Failed to generate response");
    }
}