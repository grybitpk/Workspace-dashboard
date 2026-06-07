import { motion } from 'motion/react';
import { X, Command, Search, Home, Star, Plus, Settings, User } from 'lucide-react';

interface KeyboardShortcutsPanelProps {
  onClose: () => void;
}

export default function KeyboardShortcutsPanel({ onClose }: KeyboardShortcutsPanelProps) {
  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['⌘', 'K'], description: 'Open search', icon: Search },
        { keys: ['⌘', 'H'], description: 'Go to home', icon: Home },
        { keys: ['⌘', 'F'], description: 'View favorites', icon: Star },
      ]
    },
    {
      category: 'Actions',
      items: [
        { keys: ['⌘', 'N'], description: 'Add new tool', icon: Plus },
        { keys: ['⌘', ','], description: 'Open settings', icon: Settings },
        { keys: ['⌘', 'U'], description: 'Open user profile', icon: User },
      ]
    },
    {
      category: 'General',
      items: [
        { keys: ['ESC'], description: 'Close modals/panels', icon: X },
        { keys: ['⌘', '/'], description: 'Show shortcuts', icon: Command },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <Command className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
              <p className="text-white/60 text-xs">Work faster with shortcuts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-6">
          {shortcuts.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white/80 text-sm font-semibold mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((shortcut, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <shortcut.icon className="w-4 h-4 text-white/60" />
                      <span className="text-white text-sm">{shortcut.description}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIdx) => (
                        <div
                          key={keyIdx}
                          className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white text-xs font-mono min-w-[28px] text-center"
                        >
                          {key}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-orange-400 text-xs">
            💡 Tip: Press <span className="font-mono">⌘ /</span> anytime to view shortcuts
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
