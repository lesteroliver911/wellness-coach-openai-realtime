"use-client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TranscriptItem } from "@/app/types";
import Image from "next/image";
import { useTranscript } from "@/app/contexts/TranscriptContext";

export interface TranscriptProps {
  userText: string;
  setUserText: (val: string) => void;
  onSendMessage: () => void;
  canSend: boolean;
}

function Transcript({
  userText,
  setUserText,
  onSendMessage,
  canSend,
}: TranscriptProps) {
  const { transcriptItems, toggleTranscriptItemExpand } = useTranscript();
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function scrollToBottom() {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const hasNewMessage = transcriptItems.length > prevLogs.length;
    const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
      const oldItem = prevLogs[index];
      return (
        oldItem &&
        (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
      );
    });

    if (hasNewMessage || hasUpdatedMessage) {
      scrollToBottom();
    }

    setPrevLogs(transcriptItems);
  }, [transcriptItems]);

  useEffect(() => {
    if (canSend && inputRef.current) {
      inputRef.current.focus();
    }
  }, [canSend]);

  // Filter out or modify system messages
  const filteredTranscriptItems = transcriptItems.filter(item => {
    // Skip session ID messages
    if (item.title?.includes('session.id:')) return false;
    // Skip "Started at" messages
    if (item.title?.includes('Started at:')) return false;
    // Skip initial agent announcement
    if (item.title?.startsWith('Agent:')) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      <div 
        ref={transcriptRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="w-full space-y-6 p-4">
          {filteredTranscriptItems.map((item, index) => {
            const { itemId, type, role, timestamp, title = "", isHidden } = item;
            const prevItem = index > 0 ? filteredTranscriptItems[index - 1] : null;
            const isSameRole = prevItem?.role === role;

            if (isHidden) return null;

            if (type === "MESSAGE") {
              const isUser = role === "user";
              const containerClasses = `flex flex-col ${isUser ? "items-end" : "items-start"}`;
              const bubbleClasses = `max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                isUser 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-900 border border-gray-100"
              }`;
              const timestampClasses = `text-[10px] ${
                isUser ? "text-blue-200" : "text-gray-400"
              } font-mono`;

              const marginTopClass = isSameRole ? "mt-2" : "mt-6";

              return (
                <div key={itemId} className={`${containerClasses} ${index !== 0 ? marginTopClass : ''}`}>
                  <div className={bubbleClasses}>
                    <div className="flex items-center gap-2">
                      <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                        <ReactMarkdown>{title}</ReactMarkdown>
                      </div>
                      <div className={`${timestampClasses} self-end ml-2`}>
                        {timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="flex-none pt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1.5">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
              placeholder={canSend ? "Type your message..." : "Connecting..."}
              disabled={!canSend}
              className="flex-1 px-4 py-2 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-[15px]"
            />
            <button
              onClick={onSendMessage}
              disabled={!canSend || !userText.trim()}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transcript;
