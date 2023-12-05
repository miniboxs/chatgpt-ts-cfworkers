import { Ai } from '@cloudflare/ai';
import { Context } from 'hono';

export default async function (c: Context) {

    const ai = new Ai(c!.env!.AI)

    const { prompt } = await c.req.json()

    if (!prompt) return c.text("Missing required parameter $prompt", 400, {
        "'X-Message": "prompt",
        "Content-Type": "text/plain",
    })

    try {
        const messages = [
            { role: 'system', content: 'You are a friendly assistant' },
            { role: 'user', content: prompt }
        ];

        const stream = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
            messages,
            stream: true
        });

        return new Response(
            stream,
            { headers: { "content-type": "text/event-stream" } }
        );
    } catch (error) {
        return c.json(error)
    }
}