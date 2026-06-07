import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import OrionLogo from '../../imports/Orion_logo.svg';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[1000]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={OrionLogo} alt="Orion" className="h-20 w-auto" />
        </motion.div>

        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
          <span className="text-white/80 text-sm">Loading your workspace...</span>
        </div>
      </div>
    </div>
  );
}
