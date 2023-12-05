import { Hono } from 'hono'
import openai from '../services/openai'
import text2img from '../services/text2img'
import text from '../services/text'

const app = new Hono()

// Router Group
app.on(['GET', 'POST'], '/ai', async (c) => await openai(c))
app.post('/text2img', async (c) => await text2img(c))
app.post('/text', async (c) => await text(c))

export default app