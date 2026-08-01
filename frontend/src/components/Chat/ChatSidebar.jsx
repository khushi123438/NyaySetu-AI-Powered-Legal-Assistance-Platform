import { useState, useEffect } from "react";
import {
  FiMoreVertical,
  FiTrash2,
  FiMessageCircle,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function ChatSidebar({
  clients = [],
  loading = false,
  currentBookingId,
  openChat,
  handleDeleteChat,
}) {
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    setMenuOpen(null);
  }, [currentBookingId]);

  return (
    <div className="w-full md:w-[360px] h-full flex flex-col bg-[#f0f2f5] border-r border-gray-300">

      {/* HEADER */}
      <div className="bg-[#008069] text-white px-5 py-4 shadow-md">
        <h2 className="text-xl font-semibold">Chats</h2>
        <p className="text-sm text-white/80">
          {clients.length} Conversation{clients.length !== 1 && "s"}
        </p>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">

        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            Loading...
          </div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-500 gap-3">
            <FiMessageCircle size={55} />
            <h3 className="font-semibold">No Conversations</h3>
            <p className="text-sm text-center px-4">
              Approved clients will appear here.
            </p>
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client.bookingId}
              onClick={() => openChat(client)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-200 transition-all
              ${
                currentBookingId === client.bookingId
                  ? "bg-[#d9fdd3]"
                  : "hover:bg-[#f5f6f6]"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white text-xl font-bold">
                  {client?.name ? (
                    client.name.charAt(0).toUpperCase()
                  ) : (
                    <FaUserCircle />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-[#111b21]">
                    {client?.name || "Unknown"}
                  </h3>

                  <p className="text-sm text-[#667781]">
                    Tap to open chat
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="relative">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(
                      menuOpen === client.bookingId
                        ? null
                        : client.bookingId
                    );
                  }}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <FiMoreVertical
                    size={18}
                    className="text-gray-600"
                  />
                </button>

                {menuOpen === client.bookingId && (
                  <div className="absolute right-0 top-10 bg-white rounded-lg shadow-xl border border-gray-200 w-44 z-50 overflow-hidden">

                    <button
                      onClick={(e) => {
  e.stopPropagation();

  console.log("Delete Clicked");

  handleDeleteChat(client.bookingId);

  setMenuOpen(null);
}}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      <FiTrash2 />
                      Delete Chat
                    </button>

                  </div>
                )}

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}