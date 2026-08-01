import { motion } from "framer-motion";
import { FaShieldAlt, FaUserCheck, FaLock, FaClock } from "react-icons/fa";

const items = [
  {
    icon: <FaShieldAlt />,
    title: "Verified Legal Experts",
    desc: "Only certified advocates and legal professionals on platform.",
  },
  {
    icon: <FaLock />,
    title: "Secure & Private",
    desc: "Your legal data is encrypted and never shared without consent.",
  },
  {
    icon: <FaUserCheck />,
    title: "Trusted AI System",
    desc: "AI trained on legal frameworks for accurate guidance.",
  },
  {
    icon: <FaClock />,
    title: "24/7 Assistance",
    desc: "Legal help available anytime, anywhere.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative z-10 overflow-visible py-24">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white">
            Why People Trust <span className="text-cyan-400">NyaySetu</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center"
            >
              <div className="text-cyan-400 text-3xl mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-white font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm mt-3">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}