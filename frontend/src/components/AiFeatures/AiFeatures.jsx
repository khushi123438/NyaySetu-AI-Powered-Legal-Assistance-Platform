import { motion } from "framer-motion";
import {
  FaRobot,
  FaFileAlt,
  FaGavel,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Legal Assistant",
    description:
      "Get instant legal guidance powered by AI in simple and easy language.",
  },
  {
    icon: <FaFileAlt />,
    title: "Document Analyzer",
    description:
      "Upload legal documents and receive AI-generated summaries with key insights.",
  },

  {
    icon: <FaGavel />,
    title: "Complaint Generator",
    description:
      "Generate professional complaints and legal applications within seconds.",
  },
];

export default function AIFeatures() {
  return (
    <section className="relative z-10 overflow-visible py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm tracking-widest uppercase">
            AI Powered Features
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
            Smart AI Tools For
            <span className="text-cyan-400"> Every Citizen</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-slate-400 text-lg">
            NyaySetu combines Artificial Intelligence with legal expertise to
            make justice simple, accessible, and available for everyone.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent"></div>

              {/* Icon */}
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-3xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {feature.icon}
              </div>

              <h3 className="relative text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>

              <p className="relative text-slate-400 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}