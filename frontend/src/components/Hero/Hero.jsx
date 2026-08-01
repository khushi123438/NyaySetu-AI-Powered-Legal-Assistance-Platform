import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBalanceScale,
  FaPlay,
  FaRobot,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState(0);
  const [lawyers, setLawyers] = useState(0);

  useEffect(() => {
    let u = 0;
    let l = 0;

    const timer = setInterval(() => {
      u += 200;
      l += 10;

      if (u >= 10000) u = 10000;
      if (l >= 500) l = 500;

      setUsers(u);
      setLawyers(l);

      if (u === 10000 && l === 500) {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
   <section className="relative min-h-screen overflow-hidden">
      {/* ========================= */}
      {/* CONTAINER */}
      {/* ========================= */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 lg:px-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* ========================= */}
          {/* LEFT */}
          {/* ========================= */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            {/* Badge */}

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur-xl"
            >
              <FaBalanceScale />

              India's AI Powered Legal Platform

            </motion.div>

            {/* Heading */}

            <h1 className="mt-8 text-5xl font-black leading-[1.05] text-white lg:text-7xl">

              Legal Help,

              <br />

              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">

                Reimagined

              </span>

              <br />

              with AI.

            </h1>

            {/* Paragraph */}

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

              Get instant legal guidance, understand your rights,
              analyze legal documents, and connect with verified
              advocates—all through one intelligent AI powered platform.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

            <motion.button
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.96 }}
  onClick={() => navigate("/auth")}
  className="group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold shadow-lg"
>
  <span className="flex items-center gap-3">
    Get Started
    <FaArrowRight className="transition group-hover:translate-x-1" />
  </span>
</motion.button>

             <motion.button
  whileHover={{ scale: 1.04 }}
  onClick={() => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl transition hover:border-cyan-400"
>
  <span className="flex items-center gap-3">
    <FaPlay />
    Explore Services
  </span>
</motion.button>

            </div>

            {/* Stats */}

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <motion.div
                whileHover={{
                  y: -8,
                }}
               className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xl text-center"
              >

<h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  {users.toLocaleString()}+

                </h2>

 <p className="mt-2 text-sm sm:text-base text-slate-400">

                  Active Users

                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                }}
               className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xl text-center"
              >

                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">

                  {lawyers}+

                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-400">

                  Verified Advocates

                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xl text-center"
              >

                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">

                  24×7

                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-400">

                  AI Assistance

                </p>

              </motion.div>

            </div>

          </motion.div>

                    {/* ========================= */}
          {/* RIGHT SIDE */}
          {/* ========================= */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >

            {/* Floating Verified Lawyer Card */}

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -left-10 top-16 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:block"
            >

             


            </motion.div>

         
             


            

            {/* ========================= */}
            {/* MAIN AI CARD */}
            {/* ========================= */}

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative w-full max-w-lg overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(37,99,235,.18)] backdrop-blur-2xl"
            >

              {/* Glow */}

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-transparent blur-3xl"></div>

              {/* Header */}

              <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">

                    <FaRobot className="text-xl text-white" />

                  </div>

                  <div>

                    <h3 className="text-lg font-bold">

                      NyaySetu AI

                    </h3>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>

                      <span className="text-sm text-green-400">

                        Online

                      </span>

                    </div>

                  </div>

                </div>

                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">

                  AI Assistant

                </span>

              </div>

              {/* User Chat */}

              <div className="mt-8 flex justify-end">

                <div className="max-w-xs rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-cyan-500 p-4">

                  <p className="text-sm">

                    I received a legal notice from my landlord.
                    What should I do?

                  </p>

                </div>

              </div>

              {/* AI Chat */}

              <div className="mt-5">

                <div className="max-w-sm rounded-2xl rounded-bl-md bg-slate-900/80 p-5">

                  <div className="mb-4 flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>

                    <p className="text-sm text-cyan-300">

                      AI Analysis Complete

                    </p>

                  </div>

                  <ul className="space-y-3 text-sm leading-7 text-slate-300">

                    <li>✅ Notice summarized successfully</li>

                    <li>✅ Relevant Indian legal provisions found</li>

                    <li>✅ Your legal rights explained</li>

                    <li>✅ Recommended next legal action</li>

                    <li>✅ Advocate consultation available</li>

                  </ul>

                  {/* Typing */}

                  <div className="mt-6 flex items-center gap-2">

                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>

                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:.2s]"></div>

                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:.4s]"></div>

                    <span className="ml-3 text-xs text-slate-400">

                      Preparing legal summary...

                    </span>

                  </div>

                </div>

              </div>

                            {/* Bottom CTA */}

              <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="font-semibold text-white">

                      Ready to Get Legal Help?

                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">

                      Sign in to chat with AI, analyze legal
                      documents and connect with verified advocates.

                    </p>

                  </div>

                  <motion.button
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold shadow-lg"
                  >

                    Login

                  </motion.button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* ========================= */}
      {/* Scroll Indicator */}
      {/* ========================= */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >

        <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">

          <div className="mt-2 h-3 w-3 rounded-full bg-cyan-400"></div>

        </div>

      </motion.div>

    </section>

  );
}