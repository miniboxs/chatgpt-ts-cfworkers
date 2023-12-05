/**
 * Author:Jesmora
 * Date:2023-08-31
 * Contact:hideip#hideip.network
*/
import { Context } from "hono";
import { Ai } from '@cloudflare/ai'

export default async function (c: Context) {
    // get data
    const { prompt } = await c.req.json();

    if (!prompt) return c.text("Missing required parameter $question", 400, {
        "'X-Message": "prompt",
        "Content-Type": "text/plain",
    })

    try {
        // Instantiate
        const ai = new Ai(c!.env!.AI)
        
        const response = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
            prompt
        });

        return new Response(response, {
            headers: {
                "content-type": "image/png",
            },
        });
    } catch (error) {
        return c.json(error)
    }
}