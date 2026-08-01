import { useEffect, useRef, useState } from "react";

import {
  getApprovedClients,
  getMessages,
  sendMessage,
  deleteMessage,
  deleteChat,
} from "../services/chatService";

export default function useChat() {
  // -----------------------------
  // USER INFO
  // -----------------------------

 const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user") || "{}");
const sender = user?._id || user?.id;

const senderType =
  user?.role === "Advocate" ? "Advocate" : "User";


  // -----------------------------
  // STATES
  // -----------------------------

  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);

  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);

  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");


  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  // -----------------------------
  // LOAD CLIENTS
  // -----------------------------

  const loadClients = async () => {
    try {
      setLoadingClients(true);

      const data = await getApprovedClients(
        sender,
        senderType
      );

      if (!data.success) {
        setClients([]);
        return;
      }
console.log("Bookings:", data.bookings);

let list = data.bookings
  .filter(item => item.user && item.advocate)
  .map(item => ({
    bookingId: item._id,
    name:
      senderType === "Advocate"
        ? item.user.name
        : item.advocate.name,

    userId: item.user._id,
    advocateId:
      typeof item.advocate === "object"
        ? item.advocate._id
        : item.advocate,
  }));

const uniqueClients = Array.from(
  new Map(
    list.map(client => [
      senderType === "Advocate"
        ? client.userId
        : client.advocateId,
      client,
    ])
  ).values()
);

console.log("Clients List:", uniqueClients);

setClients(uniqueClients);

         if (!sender || !senderType) {
  console.error("Missing sender info");
  return;
}

    } catch (err) {
      console.error(err);
      setClients([]);
    } finally {
      setLoadingClients(false);
    }
  };

  // -----------------------------
  // LOAD MESSAGES
  // -----------------------------

  const loadMessages = async (bookingId = currentBookingId) => {
    if (!bookingId) return;

    try {
      setLoadingMessages(true);

      const data = await getMessages(bookingId);

      if (!data.success) {
        setMessages([]);
        return;
      }

      const formatted = data.chats.map((msg) => ({
        ...msg,

       isMine: String(msg.sender?._id) === String(sender),
        senderName:
          msg.sender?.name || "Unknown",

      attachments: msg.attachments || null,
      }));

      setMessages(formatted);

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop =
            chatRef.current.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // -----------------------------
  // OPEN CHAT
  // -----------------------------

  const openChat = (client) => {
    setCurrentClient(client);
    setCurrentBookingId(client.bookingId);

    loadMessages(client.bookingId);
  };

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------

  const handleSendMessage = async () => {
    if (!currentBookingId) return;

    if (!message.trim() && !selectedFile) return;

    try {
      await sendMessage({
        bookingId: currentBookingId,

        sender,

        senderType,

        receiver:
          senderType === "Advocate"
            ? currentClient.userId
            : currentClient.advocateId,

        message,

        file: selectedFile,
      });

      setMessage("");
      setSelectedFile(null);
      setFilePreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      loadMessages();
    } catch (err) {
      console.error(err);
      alert("Unable to send message.");
    }
  };

  // -----------------------------
  // DELETE MESSAGE
  // -----------------------------

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);

      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // DELETE CHAT
  // -----------------------------


const handleDeleteChat = async (bookingId) => {
  try {
    await deleteChat(bookingId, sender);

    setClients((prev) =>
      prev.filter((c) => c.bookingId !== bookingId)
    );

    if (currentBookingId === bookingId) {
      setCurrentBookingId(null);
      setCurrentClient(null);
      setMessages([]);
    }

  } catch (err) {
    console.log(err);
  }
};

  // -----------------------------
  // FILE
  // -----------------------------

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setFilePreview("");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);

    setFilePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------
  // POLLING
  // -----------------------------

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (!currentBookingId) return;

    const interval = setInterval(() => {
      loadMessages(currentBookingId);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBookingId]);

  // -----------------------------
  // RETURN
  // -----------------------------

  return {
    token,
    sender,
    senderType,

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

    chatRef,
    fileInputRef,

    openChat,

    loadClients,
    loadMessages,

    handleSendMessage,

    handleDeleteMessage,

    handleDeleteChat,

    handleFileChange,

    removeFile,
  };
}