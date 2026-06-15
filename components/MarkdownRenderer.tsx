"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChartBlock from "./ChartBlock";
import type { ChartData } from "@/lib/types";

interface Props {
  content: string;
}

const isNumeric = (val: unknown): boolean =>
  typeof val === "string" && /^[\$\d,\.\%x\-]+$/.test(val.trim()) && val.trim().length > 0;

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#1e1e1e]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-[#2a2a2a] whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className={`px-3 py-2 text-gray-200 border-b border-[#1e1e1e] whitespace-nowrap ${
              isNumeric(children) ? "text-right font-mono" : ""
            }`}
          >
            {children}
          </td>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-[#1a1a1a] transition-colors">{children}</tr>
        ),
        // Headings
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-white mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold text-white mt-3 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-gray-200 mt-2 mb-1">{children}</h3>
        ),
        // Text
        p: ({ children }) => (
          <p className="text-gray-200 leading-relaxed mb-2">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-300">{children}</em>
        ),
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 mb-2 text-gray-200">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 mb-2 text-gray-200">{children}</ol>
        ),
        li: ({ children }) => <li className="text-gray-200">{children}</li>,
        // Code blocks — intercept `chart` language
        code: ({ className, children, ...props }) => {
          const isChart = className === "language-chart";
          if (isChart) {
            try {
              const json: ChartData = JSON.parse(String(children).trim());
              return <ChartBlock chart={json} />;
            } catch {
              // Fall through to normal code block
            }
          }
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <pre className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 overflow-x-auto my-2">
                <code className="text-sm text-gray-300 font-mono">{children}</code>
              </pre>
            );
          }
          return (
            <code
              className="bg-[#1a1a1a] text-indigo-300 rounded px-1 py-0.5 text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        // Horizontal rule
        hr: () => <hr className="border-[#2a2a2a] my-3" />,
        // Blockquote
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-indigo-500 pl-3 italic text-gray-400 my-2">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
