"use client";

import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { ChatMessage } from "@/lib/types";

const SUGGESTED_QUERIES = [
  "Summarize promo spend on DoorDash for Friday April 10",
  "Compare the last 4 Fridays — promo spend and net payout",
  "Which brands have promo % below 45% on April 10?",
  "Show me top brands by net payout on April 10",
];

export default function ChatInterface({
  embedded = false,
}: {
  embedded?: boolean;
} = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setStreamingContent("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("[DONE]")) {
          const cleanChunk = chunk.replace("\n[DONE]", "");
          accumulated += cleanChunk;
          break;
        }
        if (chunk.includes("[ERROR]")) {
          accumulated += "\n\n_Something went wrong. Please try again._";
          break;
        }
        accumulated += chunk;
        setStreamingContent(accumulated);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: accumulated },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "_Failed to connect. Check your API key and try again._" },
      ]);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  };

  const isEmpty = messages.length === 0 && !isStreaming;

  return (
    <div className={`flex flex-col ${embedded ? "h-full" : "h-screen"} bg-[#0a0a0a]`}>
      {/* Header */}
      <header className={`flex-shrink-0 border-b border-[#1e1e1e] px-4 py-3 ${embedded ? "hidden" : ""}`}>
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">Future Foods Analytics</h1>
            <p className="text-xs text-gray-500">DoorDash · Promo Intelligence</p>
          </div>
        </div>
      </header>

      {/* Messages or empty state */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <div className="max-w-xl w-full text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">Ask about your data</h2>
            <p className="text-gray-500 text-sm">
              Chat with your DoorDash promo data across all Future Foods brands.
            </p>
          </div>
          <div className="max-w-xl w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left px-4 py-3 bg-[#141414] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-indigo-500/30 rounded-xl text-sm text-gray-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <MessageList
          messages={messages}
          streamingContent={streamingContent}
          isStreaming={isStreaming}
        />
      )}

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={() => sendMessage(input)}
        disabled={isStreaming}
      />
    </div>
  );
}
