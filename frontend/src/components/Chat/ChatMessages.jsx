import { useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import MessageBubble from "./MessageBubble";
import EmptyChat from "./EmptyChat";

export default function ChatMessages({
  messages,
  loading,
  chatRef,
  onDelete,
}) {
  // Auto Scroll
  useEffect(() => {
    if (chatRef?.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages, chatRef]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-100">
        <div className="text-gray-500 animate-pulse text-lg">
          Loading messages...
        </div>
      </div>
    );
  }

  if (!messages.length) {
  return <EmptyChat />;
}

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto p-5 bg-slate-100"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      }}
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}