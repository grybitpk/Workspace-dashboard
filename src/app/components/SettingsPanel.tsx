import { motion, AnimatePresence } from 'motion/react';
import { X, Palette, Info, TrendingUp } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeToggle: () => void;
  onShowAnalytics?: () => void;
  currentTheme: string;
}

export default function SettingsPanel({ isOpen, onClose, onThemeToggle, onShowAnalytics, currentTheme }: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />

          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-black/90 backdrop-blur-2xl border-l border-white/20 z-[151] overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Settings Sections */}
              <div className="space-y-6">
                {/* Analytics Button */}
                {onShowAnalytics && (
                  <button
                    onClick={() => {
                      onShowAnalytics();
                      onClose();
                    }}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium text-sm group-hover:text-orange-400 transition-colors">View Analytics</div>
                      <div className="text-white/60 text-xs">See your productivity insights</div>
                    </div>
                  </button>
                )}

                {/* Theme Section */}
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Appearance
                  </h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">Background Theme</span>
                    </div>
                    <p className="text-white/40 text-xs mb-3">Current: {currentTheme}</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onThemeToggle}
                      className="w-full py-2.5 rounded-lg bg-white/5 backdrop-blur-xl text-white text-sm font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      Change Theme
                    </motion.button>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    About
                  </h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-white/60 text-xs space-y-2">
                      <p><span className="text-white font-medium">Orion</span> - Your workspace</p>
                      <p className="text-white/40">Version 1.0.0</p>
                      <p className="text-white/40 mt-3">
                        Copyright © 2026{' '}
                        <a
                          href="https://wa.me/+923130209232"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-orange-300 transition-colors underline"
                        >
                          grybit studio
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3">Tips</h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="text-xs text-white/60">
                      <p className="text-white font-medium mb-1">• Add Tools</p>
                      <p className="text-white/40">Click the + button in the dock</p>
                    </div>
                    <div className="text-xs text-white/60">
                      <p className="text-white font-medium mb-1">• Delete Tools</p>
                      <p className="text-white/40">Right-click or long press on any tool</p>
                    </div>
                    <div className="text-xs text-white/60">
                      <p className="text-white font-medium mb-1">• Search</p>
                      <p className="text-white/40">Press Cmd/Ctrl + K to focus search</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
