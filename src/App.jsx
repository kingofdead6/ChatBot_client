import React from "react";
import { motion } from "framer-motion";
import Chatbot from "./components/ChatBot";

const App = () => {
  const buttonVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 5, -5, 0],
      boxShadow: "0 0 40px rgba(147, 51, 234, 1)",
      transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" },
    },
    tap: { scale: 0.9, rotate: 720 },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative flex flex-col">
      <BackgroundEffects />
      <Header />

      <motion.main
        className="flex-1 flex items-center justify-center py-24 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-7xl md:text-8xl font-extrabold text-[#D8B4FE] mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            FRACTURE THE COSMOS
          </motion.h2>
          <motion.p
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            COLLIDE WITH THE AI SINGULARITY. NAVIGATE THE NEON ABYSS.
          </motion.p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-10 py-5 bg-[#9333EA] text-2xl font-bold rounded-xl shadow-lg"
          >
            UNLEASH THE GRID
          </motion.button>
        </div>
      </motion.main>
      <Chatbot />
    </div>

  );
};

const Header = () => {
  return (
    <motion.header
      className="p-8 bg-[rgba(10,10,10,0.9)] backdrop-blur-lg border-b-2 border-[#9333EA] shadow-lg relative z-20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-5xl font-extrabold text-[#D8B4FE] tracking-widest">
          NETHERVOID
        </h1>
        <nav className="space-x-8">
          {["GATEWAY", "SYNAPSE", "ABYSS"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-[#D8B4FE] text-xl font-semibold hover:text-[#9333EA] transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

const BackgroundEffects = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15)_0%,transparent_70%),linear-gradient(45deg,#9333EA_1px,transparent_1px),linear-gradient(-45deg,#9333EA_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#9333EA] rounded-full shadow-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [Math.random() * -800, Math.random() * 800],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

export default App;
