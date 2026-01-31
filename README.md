# URL Shortener Web Template By Using ElysiaJs

A lightweight template for building URL shortening services with [ElysiaJS](https://elysiajs.com) and [Bun](https://bun.com). Perfect for starting your own URL shortener project quickly.

## What's Included

- ✨ Basic ElysiaJS setup with Bun
- 🔗 URL shortening logic template
- 📝 RESTful API structure
- 📦 TypeScript support
- 🎨 Frontend placeholder (HTML/JS)
- 📋 Example endpoints and request/response formats

## Prerequisites

- [Bun](https://bun.com) v1.0 or higher
- Basic knowledge of TypeScript/JavaScript
- A code editor (VS Code recommended)

## Quick Start

### 1. Use This Template

Clone or fork this repository:

```bash
git clone https://github.com/SirachayaKaew/Url-Short-Web-Template-Using_elysiajs.git
cd Url-Short-Web-Template-Using_elysiajs
```

Or use it as a template on GitHub.

### 2. Install Dependencies

```bash
bun install
```

### 3. Run the Server

```bash
bun run main.ts
```

The server will start on `http://localhost:3000`.

## Project Structure

```
app/
├── main.ts              # Entry point - Add your routes here
├── public/
│   ├── index.html       # Frontend template
│   └── app.js           # Frontend logic
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── README.md            
```

## Suggested API Endpoints

This template is designed to be flexible. Here's a suggested structure:

### Create Short URL
```
POST /api/shorten
Body: { "longUrl": "https://example.com/..." }
Response: { "shortCode": "abc123", "shortUrl": "http://localhost:3000/abc123" }
```

### Redirect
```
GET /:shortCode
→ Redirects to original URL
```

### Get URL Info
```
GET /api/info/:shortCode
Response: { "shortCode": "abc123", "longUrl": "...", "createdAt": "...", "clicks": 0 }
```

## Customization Guide

### Add Storage
Update `main.ts` to add:
- In-memory Map (simple, no persistence)
- SQLite with Bun's SQLite support
- PostgreSQL/MongoDB connections
- External APIs

### Modify API Endpoints
Edit routes in `main.ts` to match your needs:
- Custom URL validation
- Different short code generation logic
- Additional metadata fields
- Authentication/authorization

### Update Frontend
Edit `public/index.html` and `public/app.js` to create a UI for your shortener.

### Configure
Add environment variables in `.env`:
```
PORT=3000
BASE_URL=http://localhost:3000
DATABASE_URL=...
```

## Example Implementation

Basic in-memory implementation in `main.ts`:

```typescript
import Elysia from "elysia";

const app = new Elysia()
  .post("/api/shorten", ({ body }) => {
    // Generate short code
    // Store mapping
    // Return response
  })
  .get("/:shortCode", ({ params }) => {
    // Look up original URL
    // Redirect
  })
  .listen(3000);

console.log("Server running on http://localhost:3000");
```

## Technologies

- **[ElysiaJS](https://elysiajs.com)** - Bun web framework
- **[Bun](https://bun.com)** - JavaScript runtime
- **TypeScript** - Type safety
- **HTML/CSS/JS** - Frontend (optional)

## Development Tips

- Run with auto-reload: `bun run main.ts --watch`
- Check ElysiaJS docs: https://elysiajs.com
- Test with curl or Postman
- Use TypeScript for better development experience

## Next Steps

1. ✅ Run the template locally
2. 📝 Implement your short code generation logic
3. 💾 Choose and integrate a storage solution
4. 🎨 Build a frontend interface
5. 🧪 Add tests for your routes
6. 🚀 Deploy to your preferred hosting

## License

MIT - Use freely for your projects

## Resources

- [ElysiaJS Documentation](https://elysiajs.com)
- [Bun Documentation](https://bun.sh)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
