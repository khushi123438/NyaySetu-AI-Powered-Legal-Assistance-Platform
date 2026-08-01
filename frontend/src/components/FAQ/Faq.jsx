import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const data = [
  {
    q: "Is NyaySetu free to use?",
    a: "Yes, basic AI legal consultation is completely free for all users. Premium advocate services may have charges.",
  },
  {
    q: "Can I talk to real lawyers?",
    a: "Yes, you can send consultation requests to verified advocates and connect directly once they accept.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. All your data is encrypted and never shared without your consent.",
  },
  {
    q: "How does AI help in legal cases?",
    a: "AI analyzes your problem, explains laws in simple language, and suggests possible legal steps.",
  },
  {
    q: "Do I need a lawyer for every issue?",
    a: "Not always. Many small disputes can be resolved using AI guidance before involving a lawyer.",
  },
  {
    q: "Can I upload documents?",
    a: "Yes, you can upload legal documents like notices, agreements, and AI will analyze them instantly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative z-10 overflow-visible py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-14">
          Frequently Asked Questions
        </h2>

        {/* Accordion */}
        <div className="space-y-4">

          {data.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            >

              {/* Question */}
              <div
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-white/5 transition"
              >
                <h3 className="text-white font-semibold text-lg">
                  {item.q}
                </h3>

                <div className="text-cyan-400 text-sm">
                  {open === i ? <FaMinus /> : <FaPlus />}
                </div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-slate-400 leading-7"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}