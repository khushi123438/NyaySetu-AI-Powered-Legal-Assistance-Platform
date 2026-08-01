import axios from "axios";
import API from "../api";

const token = () => localStorage.getItem("token");

const authHeader = () => {
  const t = token();

  return {
    headers: {
      Authorization: t ? `Bearer ${t}` : ""
    }
  };
};
// -------------------- BOOKINGS --------------------

export const getApprovedClients = async (senderId, senderType) => {
  try {
    const url =
      senderType === "Advocate"
        ? `${API}/api/hire/approved/${senderId}`
        : `${API}/api/hire/user/${senderId}`;

    const res = await axios.get(url, authHeader());

    return res.data;
  } catch (err) {
    console.error("Client Load Error:", err);
    throw err;
  }
};

// -------------------- CHAT --------------------

export const getMessages = async (bookingId) => {
  try {
    const res = await axios.get(
      `${API}/chat/${bookingId}`,
      authHeader()
    );

    return res.data;
  } catch (err) {
    console.error("Message Load Error:", err);
    throw err;
  }
};

// -------------------- SEND --------------------

export const sendMessage = async (payload) => {
  try {
    const formData = new FormData();

    formData.append("bookingId", payload.bookingId);
    formData.append("sender", payload.sender);
    formData.append("senderType", payload.senderType);
    formData.append("receiver", payload.receiver);
    formData.append("message", payload.message);

    if (payload.file) {
      formData.append("attachments", payload.file);
    }

    const res = await axios.post(
      `${API}/chat/send`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Send Error:", err);
    throw err;
  }
};

// -------------------- DELETE MESSAGE --------------------

export const deleteMessage = async (messageId) => {
  try {
    const res = await axios.delete(
      `${API}/chat/delete/${messageId}`,
      authHeader()
    );

    return res.data;
  } catch (err) {
    console.error("Delete Message Error:", err);
    throw err;
  }
};

// -------------------- DELETE FULL CHAT --------------------
export const deleteChat = async (bookingId, userId) => {
  const res = await axios.delete(
    `${API}/chat/delete-all/${bookingId}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`
      },
      data: {
        userId,
      },
    }
  );

  return res.data;
};
// -------------------- FILE URL --------------------

export const getFileUrl = (filePath) => {
  if (!filePath) return "";

  return `${API}${filePath}`;
};