import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Background() {

  const particles = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 8,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-[#020617] pointer-events-none">

      {/* GRID */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* LEFT AURORA */}

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-72 -top-72 h-[850px] w-[850px] rounded-full bg-blue-600/20 blur-[170px]"
      />

      {/* RIGHT AURORA */}

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-72 bottom-[-300px] h-[850px] w-[850px] rounded-full bg-cyan-500/20 blur-[180px]"
      />

      {/* CENTER LIGHT */}

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[170px]"
      />

      {/* FLOATING PARTICLES */}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{
            opacity: 0.2,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, 25, -25, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* TWINKLING STARS */}

      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: s.delay,
            repeat: Infinity,
          }}
        />
      ))}

    </div>
  );
}