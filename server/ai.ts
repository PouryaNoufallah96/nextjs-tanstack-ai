"use server";

import { chat, toStreamResponse } from "@tanstack/ai";
import { openai } from "@tanstack/ai-openai";

const adapter = openai();

export async function generateResponse(prompt: string) {
    const stream = chat({
        adapter,
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
    });

    return toStreamResponse(stream);
}