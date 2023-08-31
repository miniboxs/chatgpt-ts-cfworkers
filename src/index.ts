/**
 * Author:Jesmora
 * Date:2023-08-31
 * Contact:hideip#hideip.network
*/

import { Hono } from 'hono'
import openai from './openai'

const app = new Hono()

app.get('/', async (c) => c.text('hello chatgpt'))
app.get('/ai', async (c) => await openai(c))

export default app
