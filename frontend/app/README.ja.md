[English](README.md)

# ai-chatbot

Claude APIを使ったフルスタックAIチャットボット

## 概要

Next.jsとGoで作ったフルスタックAIチャットボット。
フロントエンドがGoバックエンドと通信し、GoがClaude APIを叩いてレスポンスを生成する。

## 技術スタック

**フロントエンド**
- Next.js 16
- TypeScript
- Tailwind CSS

**バックエンド**
- Go 1.26
- Anthropic Claude API

## アーキテクチャ
```
ブラウザ → Next.js (port 3000) → Go API (port 8080) → Claude API
```

## セットアップ

### バックエンド
```bash
cd backend
ANTHROPIC_API_KEY=your_api_key go run main.go
```

### フロントエンド
```bash
cd frontend
npm install
npm run dev
```

## 作者

[HaruBoo](https://github.com/HaruBoo)