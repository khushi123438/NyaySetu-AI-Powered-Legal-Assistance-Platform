import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Amit Kumar",
    text: "NyaySetu ne mera property dispute solve karne me bahut help ki. Simple aur fast.",
  },
  {
    name: "Priya Sharma",
    text: "AI chat is surprisingly accurate. Mujhe lawyer se pehle clarity mil gayi.",
  },
  {
    name: "Rohit Verma",
    text: "Advocate connect system is smooth. No confusion, direct help.",
  },
];

export default function Testimonials() {
  return (
  <section className="relative z-10 overflow-visible py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          What <span className="text-cyan-400">Users Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <FaQuoteLeft className="text-cyan-400 text-2xl mb-4" />

              <p className="text-slate-300 leading-7">{r.text}</p>

              <div className="mt-5 text-white font-semibold">
                {r.name}
              </div>

              <div className="flex gap-1 text-yellow-400 mt-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}