import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const links = [
  { name: "Home", id: "home" },
  { name: "Legal Problems", id: "legal" },
  { name: "AI Features", id: "features" },
  { name: "How It Works", id: "how" },
  { name: "Testimonials", id: "testimonials" },
  { name: "FAQ", id: "faq" },
  { name: "Trust", id: "trust" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
  const handleScroll = () => {
    let current = "home";

    links.forEach((link) => {
      const section = document.getElementById(link.id);

      if (section) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          current = link.id;
        }
      }
    });

    setActive(current);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  // Smooth scroll function
 const scrollToSection = (id) => {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  setMenuOpen(false);
};
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-xl text-white">
              <FaBalanceScale size={20} />
            </div>

            <div>
              <h1 className="font-bold text-2xl text-white">
                Nyay<span className="text-cyan-400">Setu</span>
              </h1>
              <p className="text-xs text-gray-400">
                AI Legal Intelligence Platform
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 text-md font-semibold">

            {links.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition relative ${
                  active === item.id
                    ? "text-cyan-400"
                    : "text-white/80 hover:text-cyan-400"
                }`}
              >
                {item.name}

                {/* underline active */}
                {active === item.id && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400 rounded-full"></span>
                )}
              </li>
            ))}

          </ul>

      
          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >
            {menuOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
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
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-6 gap-5">

              {links.map((item) => (
                <div
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/80 hover:text-cyan-400 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}

           
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}