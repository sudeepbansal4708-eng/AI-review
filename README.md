# AI Review

AI-powered code review using Claude and Anthropic API.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your Anthropic API key to `.env.local`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter

## License

MIT
