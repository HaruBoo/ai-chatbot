[English](README.md)

# ai-chatbot

> リアルタイムストリーミング・GitHub認証・会話履歴保存を備えたAIチャットボット

**デモ**: https://ai-chatbot-topaz-two.vercel.app

## このプロジェクトの特徴

テンプレートベースのチャットボットと違い、GoバックエンドでSSE（Server-Sent Events）を自前実装したフルスタック構成。フロントとバックエンドはモノレポで完全に分離されている。

## 機能

- SSEによるリアルタイムストリーミング応答
- GitHub OAuth認証（NextAuth.js v5）
- ユーザーごとの会話履歴保存（Supabase）
- モノレポ構成（Next.js + Go）

## 技術スタック

**フロントエンド** — Next.js 16 / TypeScript / Tailwind CSS / NextAuth.js v5

**バックエンド** — Go 1.26 / Anthropic Claude API (claude-opus-4-6)

**インフラ** — Vercel（フロント）/ Render（バックエンド）/ Supabase（PostgreSQL）

## アーキテクチャ
```
ブラウザ
  → Next.js（Vercel）
    → Go API（Render）※SSEストリーミング
      → Claude API
  → Supabase（会話履歴）
```

## なぜGoをバックエンドに選んだか

GoのgoroutineとHTTPサーバーはストリーミング応答に最適。`http.Flusher`インターフェースを使うことで、サードパーティなしにリアルタイムSSEを実現できる。

## セットアップ

### 必要なもの
- Go 1.26以上
- Node.js 18以上
- Anthropic APIキー
- Supabaseプロジェクト
- GitHub OAuth App

### バックエンド
```bash
cd backend
ANTHROPIC_API_KEY=your_api_key go run main.go
```

### フロントエンド
```bash
cd frontend
cp .env.local.example .env.local  # キーを設定
npm install
npm run dev
```

## 作者

[HaruBoo](https://github.com/HaruBoo) — 東京在住、AIエンジニア志望