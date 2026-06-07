import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AIOrbProps {
  onClick: () => void;
  isMinimized: boolean;
}

export default function AIOrb({ onClick, isMinimized }: AIOrbProps) {
  if (!isMinimized) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-24 right-6 z-40 group"
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(255, 107, 0, 0.4), 0 0 40px rgba(255, 107, 0, 0.2)',
            '0 0 30px rgba(255, 107, 0, 0.6), 0 0 60px rgba(255, 107, 0, 0.3)',
            '0 0 20px rgba(255, 107, 0, 0.4), 0 0 40px rgba(255, 107, 0, 0.2)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center"
      >
        {/* Breathing animation ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-orange-400"
        />

        {/* Inner icon */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>

        {/* Notification badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full border-2 border-black flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-xl border border-white/20 whitespace-nowrap pointer-events-none"
      >
        <span className="text-white text-sm">Ask AI Assistant</span>
      </motion.div>
    </motion.button>
  );
}
