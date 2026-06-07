import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showFavorites?: boolean;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange, showFavorites = false }: CategoryFilterProps) {
  const handleCategoryClick = (category: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onCategoryChange(category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center justify-start sm:justify-center gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide px-2 sm:px-0 -mx-2 sm:mx-0"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0 }}
        onClick={(e) => handleCategoryClick('All', e)}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
          activeCategory === 'All'
            ? 'bg-[#de4c08] text-white border border-white/25'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
        }`}
      >
        All Tools
      </motion.button>
      {showFavorites && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={(e) => handleCategoryClick('Favorites', e)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-xs sm:text-sm flex-shrink-0 flex items-center gap-1.5 ${
            activeCategory === 'Favorites'
              ? 'bg-orange-500 text-white border border-orange-400/50'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          <Star className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeCategory === 'Favorites' ? 'fill-white' : ''}`} />
          Favorites
        </motion.button>
      )}
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: (showFavorites ? 0.2 : 0.1) + (index * 0.05) }}
          onClick={(e) => handleCategoryClick(category, e)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
            activeCategory === category
              ? 'bg-[#de4c08] text-white border border-white/25'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
