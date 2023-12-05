/**
 * Author:Jesmora
 * Date:2023-08-31
 * Contact:hideip#hideip.network
*/

import { Hono } from 'hono'
import route from "./router/index"

const app = new Hono()

// router
app.get('/', async (c) => c.text('hello chatgpt'))
app.route('/api', route)

export default app
