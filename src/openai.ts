/**
 * Author:Jesmora
 * Date:2023-08-31
 * Contact:hideip#hideip.network
*/
import { v4 as uuidv4 } from "uuid"
import OpenAI from "openai"

export default async (c: any) => {
    const OPENAI_KEY = c?.env?.OPENAI_KEY;
    // Use the latest OpenAI GPT-3.5 model, if the next 4 is released, modify this parameter
    // OpenAI models parameter list https://platform.openai.com/docs/models
    const OPENAI_MODEL = c?.env?.OPENAI_MODEL || 'gpt-3.5-turbo';
    const MAX_MESSAGES_PER_CHAT = 40;

    // get query
    const { question, cid } = c.req.query();

    // Create a chat ID if not provided
    const chatId = cid ? cid : uuidv4();

    const ChatTable = c?.env?.DB as any
    const time = new Date()
    await ChatTable?.prepare(
        `INSERT INTO Chat (chatId, Roles, Content,CreateTime) VALUES (${chatId}), ('user'), (${question}),(${time});`
    );

    const { results } = await ChatTable?.prepare(
        `SELECT * FROM Chat WHERE chatId = ? order by CreateTime Desc limit ${MAX_MESSAGES_PER_CHAT}`
    ).bind(question).all()

    // Construct message array for ChatGPT
    const messages = [
        { role: 'system', content: question },
        ...results.reverse().map((one: any) => ({ role: one.role, content: one.content })),
    ];

    const openai = new OpenAI({ apiKey: OPENAI_KEY as string });

    try {
        // Request completion from ChatGPT
        const completion = await openai.chat.completions.create({
            model: OPENAI_MODEL as string,
            messages,
            temperature: 1,
            n: 1,
            stream: true,
        });
        let responseText: any;
        for await (const part of completion) {
            responseText += part.choices[0].delta.content
        }

        /**
         * If you don't want to use stream then use this
        */
        // const responseMessage = completion.choices[0].message;
        
        // // Save generated response to ChatTable
        await ChatTable?.prepare(
            `INSERT INTO Chat (chatId, Roles, Content) VALUES (${chatId}), ('user'), (${responseText});`
        );

        // Return response message and chat ID
        return c.json({ reply: responseText.replace(new RegExp(/(undefined)/g), ''), cid: chatId })
    } catch (error) {
        return c.json(error)
    }
}