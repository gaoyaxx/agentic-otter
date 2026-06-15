import MarkdownRenderer from "./MarkdownRenderer";
import type { ChatMessage } from "@/lib/types";

interface Props {
  message: ChatMessage;
  isStreaming?: boolean;
}

function StreamingCursor() {
  return (
    <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 animate-pulse rounded-sm" />
  );
}

export default function MessageBubble({ message, isStreaming }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] bg-indigo-700/80 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-6">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <MarkdownRenderer content={message.content} />
        {isStreaming && !message.content && (
          <div className="flex items-center gap-1 py-1">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        )}
        {isStreaming && message.content && <StreamingCursor />}
      </div>
    </div>
  );
}
