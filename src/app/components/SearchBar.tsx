import { Search, Command } from 'lucide-react';
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

interface SearchBarProps {
  onSearch: (query: string) => void;
  tools: Tool[];
  value?: string;
}

export default function SearchBar({ onSearch, tools, value }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [matchedTool, setMatchedTool] = useState<Tool | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
      if (value === '') {
        setMatchedTool(null);
      }
    }
  }, [value]);

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
    const tool = tools.find(
      (t) => t.name.toLowerCase() === toolName.toLowerCase()
    );

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
      const tool = tools.find(
        (t) => t.name.toLowerCase() === toolName.toLowerCase()
      );

      if (tool) {
        setMatchedTool(tool);
        return true;
      }
    }

    setMatchedTool(null);
    return false;
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-2xl mx-auto px-2 sm:px-0"
    >
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: focused
              ? '0 0 40px rgba(255, 107, 0, 0.15), 0 0 80px rgba(255, 107, 0, 0.15)'
              : '0 0 20px rgba(0, 0, 0, 0.3)',
          }}
          className="relative rounded-2xl sm:rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/10 overflow-hidden"
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
            <Search className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 transition-colors duration-300 ${focused ? 'text-orange-400' : 'text-white/60'}`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                const newQuery = e.target.value;
                setQuery(newQuery);
                checkForOpenCommand(newQuery);
                onSearch(newQuery);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  const openMatch = query.match(/^open\s+(.+)$/i);
                  if (openMatch) {
                    handleOpenCommand(openMatch[1].trim());
                  }
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setTimeout(() => setFocused(false), 200);
              }}
              placeholder="Ask anything, find anything… (try 'open chatgpt')"
              className="flex-1 bg-transparent text-white text-sm sm:text-base placeholder:text-white/40 outline-none"
            />
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Command className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs text-white/60">K</span>
            </div>
          </div>

          {focused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-black/30 p-4"
            >
              <div className="space-y-2">
                {matchedTool ? (
                  <>
                    <div className="text-xs text-green-400 px-2 mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Ready to launch
                    </div>
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      onClick={() => {
                        if (matchedTool) {
                          window.open(matchedTool.url, '_blank');
                          setQuery('');
                          setMatchedTool(null);
                          setFocused(false);
                        }
                      }}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30 transition-all"
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
                        <div className="text-white/40 text-xs">Click or press Enter to open</div>
                      </div>
                      <div className="text-green-400 text-xs px-2 py-1 rounded-lg bg-green-500/10">
                        ⏎
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-white/40 px-2 mb-2">Quick commands</div>
                    {tools.slice(0, 3).map((tool, i) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => {
                          window.open(tool.url, '_blank');
                          setQuery('');
                          setFocused(false);
                        }}
                        className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80 text-sm cursor-pointer transition-colors flex items-center gap-2"
                      >
                        <span className="text-orange-400 text-xs">open</span>
                        <span>{tool.name.toLowerCase()}</span>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
