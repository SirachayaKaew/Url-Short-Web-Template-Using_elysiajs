import path from 'path'
import { fileURLToPath } from 'url'
import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors' 


type DB = Map<string, string>
const db: DB = new Map()


const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function genCode(len = 6): string {
  let code = ''
  for (let i = 0; i < len; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  
  return db.has(code) ? genCode(len) : code
}


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicPath = path.join(__dirname, 'public')

const app = new Elysia()
 
  .use(cors())

  
  .get('/app.js', () => Bun.file(path.join(publicPath, 'app.js')))
  .get('/index.html', () => Bun.file(path.join(publicPath, 'index.html')))

  
  .post('/api/shorten', 
    (ctx: any) => {
      const long = ctx.body.url as string
      const code = genCode()
      db.set(code, long)
      // Determine protocol from headers or default to 'http'
      const protocol =
        ctx.request.headers.get('x-forwarded-proto') ||
        (ctx.request.headers.get('origin')?.startsWith('https') ? 'https' : 'http')
      const host = ctx.request.headers.get('host')
      const short = `${protocol}://${host}/${code}`
      return { short }
    },
    {
      body: t.Object({
        url: t.String({ format: 'uri' })
      })
    }
  )

 
  .get('/:code',
    (ctx: any) => {
      const target = db.get(ctx.params.code)
      if (!target) return new Response('Not found', { status: 404 })
      return new Response(null, { status: 302, headers: { Location: target } })
    }
  )

  
  .get('/', () => Bun.file(path.join(publicPath, 'index.html')))

  .listen(3000)

console.log(`🚀 Elysia running at http://localhost:${app.server?.port}`)
