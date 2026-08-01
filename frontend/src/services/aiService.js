import axios from "axios";

const API = "http://localhost:5000";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const chatWithAI = async (message) => {
  const res = await axios.post(
    `${API}/api/ai/chat`,
    { message },
    authHeader()
  );

  return res.data;
};

export const getChatHistory = async () => {
  const res = await axios.get(
    `${API}/api/ai/history`,
    authHeader()
  );

  return res.data;
};

export const clearHistory = async () => {
  const res = await axios.delete(
    `${API}/api/ai/history`,
    authHeader()
  );

  return res.data;
};
export const analyzeDocument = async (file, message) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("message", message);

  const res = await axios.post(
    `${API}/api/document/analyze`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};