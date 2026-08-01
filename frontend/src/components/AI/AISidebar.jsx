import { motion } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiMessageSquare,
} from "react-icons/fi";

export default function AISidebar({
  chats,
  currentChat,
  setCurrentChat,
  onNewChat,
  onDeleteChat,
}) {
  return (
    <div
      className="
      w-[320px]
      border-r
      border-white/10
      bg-black/20
      backdrop-blur-xl
      flex
      flex-col"
    >

      {/* HEADER */}

      <div className="p-5 border-b border-white/10">

        <button
          onClick={onNewChat}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-500
          py-3
          text-white
          hover:bg-cyan-600
          transition"
        >

          <FiPlus />

          New Chat

        </button>

      </div>

      {/* CHAT LIST */}

      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {chats.length === 0 && (

          <div className="text-center text-gray-400 text-sm mt-10">

            No conversations yet.

          </div>

        )}

        {chats.map((chat) => (

          <motion.div
            whileHover={{ scale: 1.02 }}
            key={chat._id}
            onClick={() => setCurrentChat(chat)}
            className={`
            rounded-xl
            p-4
            cursor-pointer
            transition
            ${
              currentChat?._id === chat._id
                ? "bg-cyan-500/30 border border-cyan-500"
                : "bg-white/5 hover:bg-white/10"
            }
            `}
          >

            <div className="flex justify-between">

              <div className="flex gap-2">

                <FiMessageSquare
                  className="text-cyan-400 mt-1"
                />

                <div>

                  <p className="text-white font-medium">

                    {chat.title}

                  </p>

                  <p className="text-xs text-gray-400">

                    {new Date(
                      chat.updatedAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat._id);
                }}
                className="
                text-red-400
                hover:text-red-300"
              >

                <FiTrash2 />

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}