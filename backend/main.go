package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/anthropics/anthropic-sdk-go"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type RequestBody struct {
	Messages []Message `json:"messages"`
}

type ResponseBody struct {
	Reply string `json:"reply"`
}

func chatHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
		return
	}

	var body RequestBody
	json.NewDecoder(r.Body).Decode(&body)

	client := anthropic.NewClient()

	var messages []anthropic.MessageParam
	for _, msg := range body.Messages {
		if msg.Role == "user" {
			messages = append(messages, anthropic.NewUserMessage(
				anthropic.NewTextBlock(msg.Content),
			))
		}
	}

	response, _ := client.Messages.New(r.Context(), anthropic.MessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 1024,
		Messages:  messages,
	})

	reply := response.Content[0].AsText().Text

	json.NewEncoder(w).Encode(ResponseBody{Reply: reply})
}

func startServer() {
	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	http.HandleFunc("/chat", chatHandler)
	startServer()
}
