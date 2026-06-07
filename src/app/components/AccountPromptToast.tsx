import { motion } from 'motion/react';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface AccountPromptToastProps {
  onClose: () => void;
  onSignUp: () => void;
}

export default function AccountPromptToast({ onClose, onSignUp }: AccountPromptToastProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-md"
    >
      <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-2xl border border-orange-500/30 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm mb-1">Save Your Workspace</h3>
            <p className="text-white/70 text-xs mb-3">
              Create an account to sync your tools across all devices and never lose your setup!
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={onSignUp}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Create Account
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
