import { motion } from 'motion/react';
import { Home, Search, Plus, Star } from 'lucide-react';
import { useState } from 'react';

interface DockProps {
  onHomeClick: () => void;
  onSearchClick: () => void;
  onAddClick: () => void;
  onFavoritesClick: () => void;
}

const dockItems = [
  { icon: Home, label: 'Home', color: 'white' },
  { icon: Search, label: 'Search', color: 'white' },
  { icon: Star, label: 'Favorites', color: 'white' },
  { icon: Plus, label: 'Add', color: 'white' },
];

const colorMap: Record<string, string> = {
  white: 'group-hover:text-white',
};

export default function Dock({ onHomeClick, onSearchClick, onAddClick, onFavoritesClick }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (label: string) => {
    if (label === 'Home') onHomeClick();
    if (label === 'Search') onSearchClick();
    if (label === 'Add') onAddClick();
    if (label === 'Favorites') onFavoritesClick();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-2 sm:px-0"
    >
      <div className="flex items-end gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-2xl sm:rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl">
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const scale = hoveredIndex === index ? 1.4 : hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1 ? 1.2 : 1;

          return (
            <motion.button
              key={item.label}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(item.label)}
              className="group relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-white transition-colors" />

              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/80 backdrop-blur-xl border border-white/20 whitespace-nowrap hidden sm:block"
                >
                  <span className="text-white text-xs">{item.label}</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
