import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useChat from "../hooks/useChat";
import { FiMenu } from "react-icons/fi";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import EmptyChat from "../components/chat/EmptyChat";

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
  clients,
  messages,
  loadingClients,
  loadingMessages,
  currentBookingId,
  currentClient,
  message,
  setMessage,
  selectedFile,
  filePreview,
  typing,
  handleTyping,
  chatRef,
  fileInputRef,
  openChat,
  handleSendMessage,
  handleDeleteMessage,
  handleDeleteChat,
  handleFileChange,
  removeFile,
  loadClients,
} = useChat();

  const [mobileOpen, setMobileOpen] = useState(false);

  // -----------------------------
  // HANDLE NAVIGATE FROM MYREQUESTS
  // -----------------------------
  useEffect(() => {
    if (location.state?.booking) {
      const booking = location.state.booking;

      openChat({
        bookingId: booking._id,
        name: booking.user?.name || booking.advocate?.name,
        userId: booking.user?._id,
        advocateId: booking.advocate?._id,
      });

      setMobileOpen(false);
    }
  }, [location.state]);

  // -----------------------------
  // LOAD CLIENTS
  // -----------------------------
  console.log("Chat.jsx Clients:", clients);
  console.log("Loading:", loadingClients);
  return (

    <div className="h-screen flex bg-slate-100">
      {mobileOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setMobileOpen(false)}
  />
)}

      {/* ================= SIDEBAR ================= */}
     <div
  className={`
    fixed md:static
    top-0 left-0
    z-50
    h-full
    w-[85%] max-w-[340px]
    bg-white border-r
    transform transition-transform duration-300
    ${
      mobileOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>
        <ChatSidebar
          clients={clients}
          loading={loadingClients}
          currentBookingId={currentBookingId}
          openChat={(client) => {
            openChat(client);
            setMobileOpen(false);
          }}
          handleDeleteChat={handleDeleteChat}
        />
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 flex flex-col">

        {!currentBookingId ? (
  <>
    <div className="md:hidden h-16 bg-teal-700 flex items-center px-4 text-white shadow">
      <button
        onClick={() => setMobileOpen(true)}
      >
        <FiMenu size={26} />
      </button>

      <h2 className="ml-4 font-semibold text-lg">
        Chats
      </h2>
    </div>

    <EmptyChat onOpenSidebar={() => setMobileOpen(true)} />
  </>
) : (
          <>
            <ChatHeader
              currentClient={currentClient}
              typing={typing}
              onBack={() => setMobileOpen(true)}
            />

            <ChatMessages
              messages={messages}
              loading={loadingMessages}
              chatRef={chatRef}
              onDelete={handleDeleteMessage}
            />

            <ChatInput
              message={message}
              setMessage={setMessage}
              handleTyping={handleTyping}
              handleSendMessage={handleSendMessage}
              handleFileChange={handleFileChange}
              filePreview={filePreview}
              selectedFile={selectedFile}
              removeFile={removeFile}
              fileInputRef={fileInputRef}
            />
          </>
        )}

      </div>

    </div>


  );
}