import { FaShieldAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#020617] border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Nyay<span className="text-cyan-400">Setu</span>
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              AI-powered legal guidance platform that helps citizens understand
              their rights, resolve disputes, and connect with verified advocates.
            </p>

            <div className="flex items-center gap-2 mt-5 text-cyan-400">
              <FaShieldAlt />
              <span className="text-sm">Secure • Private • Trusted</span>
            </div>
          </div>

          {/* Links (CLICKABLE) */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3 text-slate-400">

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("home")}
              >
                Home
              </li>

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("legal")}
              >
                Legal Problems
              </li>

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("features")}
              >
                AI Features
              </li>

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("how")}
              >
                How It Works
              </li>

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("faq")}
              >
                FAQ
              </li>

              <li
                className="hover:text-cyan-400 cursor-pointer transition"
                onClick={() => scrollToSection("trust")}
              >
                Trust
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                <span>support@nyaysetu.in</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                <span>+91 9918458742</span>
              </div>

            </div>

            <p className="text-xs text-slate-500 mt-6 leading-6">
              This platform provides legal guidance only and does not replace
              professional legal advice.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} NyaySetu. All rights reserved.
        </div>

      </div>
    </footer>
  );
}