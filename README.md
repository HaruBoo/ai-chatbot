[日本語版はこちら](README.ja.md)

# ai-chatbot

> AI chatbot with real-time streaming, GitHub OAuth, and persistent conversation history

**Live Demo**: https://ai-chatbot-topaz-two.vercel.app

## What makes this different

Unlike template-based chatbots, this project is built from scratch with a custom Go backend serving Server-Sent Events (SSE) for real-time streaming. The frontend and backend are fully decoupled in a monorepo structure.

## Features

- Real-time streaming responses via SSE (Server-Sent Events)
- GitHub OAuth authentication (NextAuth.js v5)
- Persistent conversation history per user (Supabase)
- Monorepo architecture (Next.js + Go)

## Tech Stack

**Frontend** — Next.js 16 / TypeScript / Tailwind CSS / NextAuth.js v5

**Backend** — Go 1.26 / Anthropic Claude API (claude-opus-4-6)

**Infrastructure** — Vercel (frontend) / Render (backend) / Supabase (PostgreSQL)

## Architecture
```
Browser
  → Next.js on Vercel
    → Go API on Render (SSE streaming)
      → Claude API
  → Supabase (conversation history)
```

## Why Go for the backend?

Go's goroutines and lightweight HTTP server make it ideal for streaming responses. The `http.Flusher` interface allows real-time SSE without third-party dependencies.

## Getting Started

### Prerequisites
- Go 1.26+
- Node.js 18+
- Anthropic API key
- Supabase project
- GitHub OAuth App

### Backend
```bash
cd backend
ANTHROPIC_API_KEY=your_api_key go run main.go
```

### Frontend
```bash
cd frontend
cp .env.local.example .env.local  # fill in your keys
npm install
npm run dev
```

## Author

[HaruBoo](https://github.com/HaruBoo) — Aspiring AI engineer based in Tokyo