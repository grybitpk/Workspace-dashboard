import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Lightbulb, Zap, Layout } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Productivity Tip',
    description: 'Group similar tools together for faster access',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Quick Action',
    description: 'Try keyboard shortcuts: Cmd+K to search',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Layout className="w-5 h-5" />,
    title: 'Layout Suggestion',
    description: 'Pin your most-used tools to the top row',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-black/60 backdrop-blur-2xl border-l border-white/10 z-40 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl text-white">AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="space-y-4">
            {suggestions.map((suggestion, i) => (
              <motion.div
                key={suggestion.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${suggestion.color} shrink-0`}>
                    {suggestion.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{suggestion.title}</h3>
                    <p className="text-white/60 text-sm">{suggestion.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80 text-sm font-medium">AI Insight</span>
            </div>
            <p className="text-white/60 text-sm">
              You've saved 2.5 hours this week by using Orbit. Keep up the great work!
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-white/60 text-sm mb-3">Recommended Tools</h3>
            <div className="space-y-2">
              {['Notion', 'Linear', 'Miro'].map((tool) => (
                <div
                  key={tool}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-white/80 text-sm">{tool}</span>
                  <button className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30 transition-colors">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
