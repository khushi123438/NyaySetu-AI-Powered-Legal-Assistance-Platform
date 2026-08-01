import {
  FaBalanceScale,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
   <footer className="relative z-20 mt-24 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3">
            <FaBalanceScale className="text-cyan-400 text-3xl" />
            <h1 className="text-3xl font-bold text-white">
              Nyay
              <span className="text-cyan-400">Setu</span>
            </h1>
          </div>

          <p className="mt-5 text-slate-400 leading-7">
            Connecting citizens with verified advocates across India.
            Find legal experts, consult instantly and manage your legal
            journey securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate("/user")}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Advocates
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/legal-news")}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Legal News
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/legal-doc-ai")}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                LegalDoc AI
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/ai")}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                AI Assistant
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/chat")}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Chat
              </button>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-5">
            Support
          </h2>

          <ul className="space-y-3">
            <li className="text-slate-400 hover:text-cyan-400 cursor-pointer transition">
              Privacy Policy
            </li>

            <li className="text-slate-400 hover:text-cyan-400 cursor-pointer transition">
              Terms & Conditions
            </li>

            <li className="text-slate-400 hover:text-cyan-400 cursor-pointer transition">
              Help Center
            </li>

            <li className="text-slate-400 hover:text-cyan-400 cursor-pointer transition">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-5">
            Contact
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3 text-slate-400">
              <FaEnvelope className="text-cyan-400" />
              support@nyayasetu.in
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <FaPhoneAlt className="text-cyan-400" />
              +91 9918458742
            </div>

          </div>

        
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-500 text-sm">
            © 2026 NyaySetu. All Rights Reserved.
          </p>

          <p className="text-slate-500 text-sm mt-3 md:mt-0">
            Made with ❤️ for Digital Justice in India
          </p>

        </div>
      </div>
    </footer>
  );
}