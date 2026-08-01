import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FiSend,
    FiPaperclip,
    FiTrash2,
    FiShield,
} from "react-icons/fi";
import { FaRobot, FaUserCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import Background from "../components/Background/Background";
import {
    chatWithAI,
    getChatHistory,
    clearHistory,
    analyzeDocument,
} from "../services/aiService";
import ChatMessages from "../components/AI/ChatMessages";
import ChatInput from "../components/AI/ChatInput";

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: `# 👋 Welcome to NyaySetu AI

I can help you with:

- Property disputes
- Consumer complaints
- Family matters
- Cyber crimes
- Employment issues
- Rental disputes
- Contract review

📄 Upload your agreement or legal document for analysis.

⚠ This AI provides general legal information only.`,
        },
    ]);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);


   const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedFile(file);

  if (file.type.startsWith("image/")) {
    setFilePreview(URL.createObjectURL(file));
  } else {
    setFilePreview(null);
  }
};

   const removeFile = () => {
  setSelectedFile(null);
  setFilePreview(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
   const loadHistory = async () => {
  try {
    const res = await getChatHistory();

    if (res.success) {
      setMessages(res.messages || []);
    }
  } catch (err) {
    console.log(err);
  }
};

    useEffect(() => {
        loadHistory();
    }, []);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

const sendMessage = async () => {
  if (!message.trim() && !selectedFile) return;

  
  // Current values save kar lo
  const currentMessage = message;
  const currentFile = selectedFile;

  // 👇 SEND click hote hi UI clear
  setMessage("");
  setSelectedFile(null);
  setFilePreview(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  setLoading(true);

  try {
    // ===== FILE + MESSAGE =====
    if (currentFile) {

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: `📄 **${currentFile.name}**\n\n${currentMessage}`,
        },
      ]);

      const res = await analyzeDocument(currentFile, currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.analysis,
        },
      ]);

    } else {

      // ===== NORMAL CHAT =====

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: currentMessage,
        },
      ]);

      const res = await chatWithAI(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply,
        },
      ]);
    }

  } catch (err) {
    console.log(err);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "❌ Something went wrong.",
      },
    ]);
  }

  setLoading(false);
};
 return (
  <>
    <Background />

    <div className="relative z-20 h-screen p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          mx-auto
          h-full
          max-w-7xl
          rounded-3xl
          border border-white/10
          bg-slate-900/40
          backdrop-blur-xl
          overflow-hidden
          flex
          flex-col
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="h-20 shrink-0 border-b border-white/10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-white text-xl font-bold">
                NyaySetu AI Assistant
              </h1>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-sm">
                  AI Online
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={async () => {
              try {
                await clearHistory();
              } catch (err) {}

              setMessages([
                {
                  role: "assistant",
                  content:
                    "# 👋 Welcome to NyaySetu AI\n\nHow may I assist you today?",
                },
              ]);
            }}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-red-500/20
              hover:bg-red-500/30
              text-red-300
              transition
            "
          >
            <FiTrash2 />
            Clear
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages
            messages={messages}
            loading={loading}
          />
        </div>

        {/* INPUT */}
        <div className="shrink-0">
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={sendMessage}
            handleFileChange={handleFileChange}
            filePreview={filePreview}
            selectedFile={selectedFile}
            removeFile={removeFile}
            fileInputRef={fileInputRef}
            loading={loading}
          />
        </div>
      </motion.div>
    </div>
  </>
);
}