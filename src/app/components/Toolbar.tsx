import { Settings, User, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

interface ToolbarProps {
  onSettingsClick: () => void;
  onUserClick: () => void;
  buyMeCoffeeUrl?: string;
}

export default function Toolbar({ onSettingsClick, onUserClick, buyMeCoffeeUrl = 'https://buymeacoffee.com/grybitstudio' }: ToolbarProps) {
  const handleCoffeeClick = () => {
    window.open(buyMeCoffeeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 sm:gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        onClick={handleCoffeeClick}
        className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group shadow-lg hover:shadow-yellow-500/20"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.div>
          <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">Buy me a coffee</span>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onUserClick}
        className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
      >
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-white transition-colors" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSettingsClick}
        className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-white transition-colors" />
      </motion.button>
    </motion.div>
  );
}
