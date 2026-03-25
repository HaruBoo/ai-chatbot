[日本語版はこちら](README.ja.md)

# ai-chatbot

Full-stack AI Chatbot powered by Claude API

## Overview

A full-stack AI chatbot built with Next.js and Go.
The frontend communicates with a Go backend, which calls the Claude API to generate responses.

## Tech Stack

**Frontend**
- Next.js 16
- TypeScript
- Tailwind CSS

**Backend**
- Go 1.26
- Anthropic Claude API

## Architecture
```
Browser → Next.js (port 3000) → Go API (port 8080) → Claude API
```

## Getting Started

### Backend
```bash
cd backend
ANTHROPIC_API_KEY=your_api_key go run main.go
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Author

[HaruBoo](https://github.com/HaruBoo)
