import { motion } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaLaptopCode,
  FaCarCrash,
  FaShoppingBag,
  FaFileAlt,
  FaBalanceScale,
  FaArrowRight,
} from "react-icons/fa";


const problems = [
  {
    icon: <FaHome />,
    title: "Property Disputes",
    desc: "Resolve land ownership, rental, and property conflicts with AI-powered legal assistance.",
  },
  {
    icon: <FaUsers />,
    title: "Family Law",
    desc: "Guidance for divorce, maintenance, domestic violence, child custody, and family matters.",
  },
  {
    icon: <FaBriefcase />,
    title: "Employment Issues",
    desc: "Wrongful termination, salary disputes, workplace harassment and labor law support.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Cyber Crime",
    desc: "Online fraud, identity theft, cyber bullying and digital evidence assistance.",
  },
  {
    icon: <FaCarCrash />,
    title: "Traffic Violations",
    desc: "Road accidents, challans, insurance claims and legal procedures.",
  },
  {
    icon: <FaShoppingBag />,
    title: "Consumer Rights",
    desc: "Protect yourself against fraud, defective products and unfair trade practices.",
  },
  {
    icon: <FaFileAlt />,
    title: "Legal Documents",
    desc: "Analyze notices, agreements, contracts and other legal paperwork instantly.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Civil Cases",
    desc: "Receive AI guidance for civil disputes before consulting a legal expert.",
  },
];

export default function LegalProblems() {
  return (
  <section className="relative z-10 overflow-visible py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

            AI Legal Solutions

          </span>

          <h2 className="mt-6 text-5xl font-black text-white">

            Legal Problems

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              {" "}We Solve

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Whether you're facing property disputes, cybercrime,
            employment issues, or consumer complaints, NyaySetu
            provides intelligent legal guidance before your first consultation.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">

          {problems.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .08,
                duration: .6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition"
            >

              {/* Hover Glow */}

              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

                <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"></div>

              </div>

              {/* Icon */}

              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl text-white transition group-hover:rotate-6">

                {item.icon}

              </div>

              <h3 className="relative text-2xl font-bold text-white">

                {item.title}

              </h3>

              <p className="relative mt-4 leading-7 text-slate-400">

                {item.desc}

              </p>

            

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}