import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import User from "./pages/User";
import Advocate from "./pages/Advocate";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import AI from "./pages/AIAssistant";
import LegalDocumentAI from "./pages/LegalDocumentAI";
import LegalNews from "./pages/LegalNews";
import Background from "./components/Background/Background";

function App() {
  const location = useLocation();

  const hideBackground = location.pathname === "/chat";

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        hideBackground ? "bg-white" : "bg-[#020617]"
      }`}
    >
      {!hideBackground && <Background />}

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<User />} />
          <Route path="/advocate" element={<Advocate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/legal-doc-ai" element={<LegalDocumentAI />} />
          <Route path="/legal-news" element={<LegalNews />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;