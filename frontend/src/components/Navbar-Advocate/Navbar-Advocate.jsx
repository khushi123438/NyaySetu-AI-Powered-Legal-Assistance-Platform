import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FaBalanceScale,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaComments,
} from "react-icons/fa";

export default function AdvocateNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

 const links = [
  { name: "My Requests", id: "requests", path: "/advocate" },
  { name: "Legal News", id: "legal-news", path: "/legal-news" },
 { name: "LegalDoc AI", id: "legal-doc-ai", path: "/legal-doc-ai"},
   { name: "AI Assistant", id: "ai-assistant", path: "/ai" },
  { name: "Chat", id: "chat", path: "/chat"},
];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

 

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl"
          : "bg-black/20 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/advocate")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
              <FaBalanceScale size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Nyay
                <span className="text-cyan-400">Setu</span>
              </h1>

              <p className="text-xs text-slate-400">
                Advocate Dashboard
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}

          <ul className="hidden lg:flex items-center gap-8">

            {links.map((item) => (
              <li key={item.name}>
           <button
  onClick={() => {
    if (item.path) {
      navigate(item.path);
    }
  }}
  className={`relative flex items-center gap-2 transition font-medium ${
    location.pathname === item.path
      ? "text-cyan-400"
      : "text-white/80 hover:text-cyan-400"
  }`}
>
  {item.icon}
  {item.name}

  
</button>
              </li>
            ))}

          </ul>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            <button
              onClick={() => navigate("/profile")}
              className="text-cyan-400 hover:text-white transition"
            >
              <FaUserCircle size={34} />
            </button>

         
          </div>

          {/* Mobile Toggle */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >
            {menuOpen ? (
              <HiX size={30} />
            ) : (
              <HiOutlineMenuAlt3 size={30} />
            )}
          </button>

        </div>
      </div>


            {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col gap-5 px-6 py-6">

              {links.map((item) => (
               <button
  key={item.name}
  onClick={() => {
    if (item.path) {
      navigate(item.path);
    }
    setMenuOpen(false);
  }}
  
>
  {item.icon}
  <span>{item.name}</span>
</button>
              ))}

              <div className="border-t border-white/10 pt-5 flex flex-col gap-4">

                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-white hover:text-cyan-400 transition"
                >
                  <FaUserCircle />
                  Profile
                </button>

              

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}