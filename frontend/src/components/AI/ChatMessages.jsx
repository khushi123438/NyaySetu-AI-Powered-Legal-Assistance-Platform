import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaUserCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { FiFileText } from "react-icons/fi";

export default function ChatMessages({
  messages,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-full overflow-y-auto px-6 py-6 space-y-6">

      {/* Empty State */}

      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">

          <FaRobot className="text-6xl text-cyan-400 mb-4" />

          <h2 className="text-white text-2xl font-bold">
            NyaySetu AI Assistant
          </h2>

          <p className="text-gray-400 mt-3 max-w-md">
            Ask any legal question or upload a legal document
            for AI-powered analysis.
          </p>

        </div>
      )}

      {/* Messages */}

      {messages.map((msg, index) => (

        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`flex ${
            msg.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`
            max-w-[80%]
            rounded-2xl
            p-4
            shadow-xl
            ${
              msg.role === "assistant"
                ? "bg-white/10 text-white"
                : "bg-cyan-500 text-white"
            }
            `}
          >

            {/* Header */}

            <div className="flex items-center gap-2 mb-3">

              {msg.role === "assistant" ? (
                <FaRobot className="text-cyan-300" />
              ) : (
                <FaUserCircle />
              )}

              <span className="font-semibold">

                {msg.role === "assistant"
                  ? "NyaySetu AI"
                  : "You"}

              </span>

            </div>

            {/* File */}

            {msg.file && (

              <div className="flex items-center gap-2 bg-black/20 rounded-lg p-3 mb-3">

                <FiFileText />

                <span>{msg.file}</span>

              </div>

            )}

            {/* Message */}

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>

            </div>

          </div>

        </motion.div>

      ))}

      {/* Typing */}

      {loading && (

        <div className="flex">

          <div className="bg-white/10 rounded-2xl px-5 py-4 flex gap-2">

            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>

            <span
              className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
              style={{
                animationDelay: ".2s",
              }}
            ></span>

            <span
              className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
              style={{
                animationDelay: ".4s",
              }}
            ></span>

          </div>

        </div>

      )}

      <div ref={bottomRef} />

    </div>
  );
}