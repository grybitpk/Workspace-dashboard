import { Search, Command, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  category?: string;
}

interface AISearchBarProps {
  onSearch: (query: string) => void;
  tools: Tool[];
  onAIClick: () => void;
}

const quickCommands = [
  { icon: '🎨', label: 'Open Figma', command: 'open figma' },
  { icon: '✨', label: 'Generate UI ideas', command: 'generate ui ideas' },
  { icon: '📄', label: 'Summarize article', command: 'summarize article' },
  { icon: '🤖', label: 'Find AI tools', command: 'find ai tools' },
  { icon: '📝', label: 'Create captions', command: 'create captions' },
  { icon: '💻', label: 'Explain code', command: 'explain code' },
];

export default function AISearchBar({ onSearch, tools, onAIClick }: AISearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [matchedTool, setMatchedTool] = useState<Tool | null>(null);
  const [showCommands, setShowCommands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCommand = (toolName: string) => {
    const tool = tools.find((t) => t.name.toLowerCase() === toolName.toLowerCase());

    if (tool) {
      window.open(tool.url, '_blank');
      setQuery('');
      setMatchedTool(null);
      inputRef.current?.blur();
    }
  };

  const checkForOpenCommand = (text: string) => {
    const openMatch = text.match(/^open\s+(.+)$/i);

    if (openMatch) {
      const toolName = openMatch[1].trim();
      const tool = tools.find((t) => t.name.toLowerCase() === toolName.toLowerCase());

      if (tool) {
        setMatchedTool(tool);
        return true;
      }
    }

    setMatchedTool(null);
    return false;
  };

  const handleCommandClick = (command: string) => {
    setQuery(command);
    inputRef.current?.focus();
    setShowCommands(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: focused
                ? '0 0 40px rgba(255, 107, 0, 0.3), 0 0 80px rgba(255, 107, 0, 0.1)'
                : '0 0 20px rgba(0, 0, 0, 0.3)',
            }}
            className="relative rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/10 overflow-hidden"
          >
            <div className="flex items-center gap-4 px-6 py-5">
              <Search
                className={`w-6 h-6 transition-colors duration-300 ${
                  focused ? 'text-orange-400' : 'text-white/60'
                }`}
              />

              {/* AI Pulse Indicator */}
              <motion.div
                animate={{
                  scale: focused ? [1, 1.2, 1] : 1,
                  opacity: focused ? [0.5, 1, 0.5] : 0.7,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <Sparkles className="w-5 h-5 text-orange-400" />
              </motion.div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  const newQuery = e.target.value;
                  setQuery(newQuery);
                  checkForOpenCommand(newQuery);
                  onSearch(newQuery);
                  setShowCommands(newQuery.length === 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    const openMatch = query.match(/^open\s+(.+)$/i);
                    if (openMatch) {
                      handleOpenCommand(openMatch[1].trim());
                    } else {
                      // Open AI assistant for other queries
                      onAIClick();
                    }
                  }
                }}
                onFocus={() => {
                  setFocused(true);
                  setShowCommands(true);
                }}
                onBlur={() => {
                  setFocused(false);
                  setTimeout(() => setShowCommands(false), 200);
                }}
                placeholder="Ask anything, find anything…"
                className="flex-1 bg-transparent text-white text-lg placeholder:text-white/40 outline-none"
              />

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Command className="w-3.5 h-3.5 text-white/60" />
                <span className="text-xs text-white/60">K</span>
              </div>
            </div>

            {/* Dropdown */}
            {focused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 bg-black/30"
              >
                {matchedTool ? (
                  <div className="p-4">
                    <div className="text-xs text-green-400 px-2 mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Ready to launch
                    </div>
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center gap-3"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: `${matchedTool.color}20`,
                          border: `1px solid ${matchedTool.color}30`,
                        }}
                      >
                        {matchedTool.icon?.startsWith('http') ? (
                          <img
                            src={matchedTool.icon}
                            alt={matchedTool.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xl">{matchedTool.icon}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{matchedTool.name}</div>
                        <div className="text-white/40 text-xs">Press Enter to open</div>
                      </div>
                      <div className="text-green-400 text-xs px-2 py-1 rounded-lg bg-green-500/10">
                        ⏎
                      </div>
                    </motion.div>
                  </div>
                ) : showCommands ? (
                  <div className="p-4">
                    <div className="text-xs text-white/40 px-2 mb-3">Quick Commands</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {quickCommands.map((cmd, i) => (
                        <motion.button
                          key={cmd.command}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleCommandClick(cmd.command)}
                          className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 transition-all text-left"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{cmd.icon}</span>
                            <span className="text-white/70 text-xs">{cmd.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
