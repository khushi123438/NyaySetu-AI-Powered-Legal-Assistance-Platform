import { motion } from "framer-motion";
import {
  FaUser,
  FaCommentDots,
  FaPaperPlane,
  FaUserCheck,
  FaGavel,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUser />,
    title: "Create Your Profile",
    desc: "User signs up and builds a simple legal profile with basic details.",
  },
  {
    icon: <FaCommentDots />,
    title: "Consult AI Chat",
    desc: "Ask legal questions instantly and get AI-powered guidance in simple language.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Send Request",
    desc: "If needed, user can send a consultation request to verified advocates.",
  },
  {
    icon: <FaUserCheck />,
    title: "Advocate Accepts",
    desc: "Nearby or relevant lawyers review and accept the request for consultation.",
  },
  {
    icon: <FaGavel />,
    title: "Resolution Begins",
    desc: "User and advocate connect, discuss case, and move toward legal solution.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 overflow-visible py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            How <span className="text-cyan-400">NyaySetu Works</span>
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            From AI consultation to real advocate support — a simple, transparent legal journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-cyan-500/30 ml-4 md:ml-10">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="mb-14 ml-10 relative"
            >

              {/* Dot */}
              <div className="absolute -left-[42px] top-1 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                {step.icon}
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400 transition">
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-slate-400 mt-2 leading-7">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}