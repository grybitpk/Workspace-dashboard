import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Star, Edit } from 'lucide-react';
import { useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onFavorite: () => void;
  onEdit: () => void;
  toolName: string;
  isFavorite: boolean;
}

export default function ContextMenu({ x, y, onClose, onDelete, onFavorite, onEdit, toolName, isFavorite }: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[100] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden min-w-[180px]"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-1">
          <div className="px-3 py-2 text-white/40 text-xs border-b border-white/10">
            {toolName}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              onClose();
            }}
            className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-blue-500/20 transition-colors text-left group"
          >
            <Edit className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white group-hover:text-blue-400 transition-colors">Edit Tool</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
              onClose();
            }}
            className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-orange-500/20 transition-colors text-left group"
          >
            <Star className={`w-4 h-4 transition-colors ${isFavorite ? 'text-orange-400 fill-orange-400' : 'text-orange-400'}`} />
            <span className="text-sm text-white group-hover:text-orange-400 transition-colors">
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              onClose();
            }}
            className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-red-500/20 transition-colors text-left group"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span className="text-sm text-white group-hover:text-red-400 transition-colors">Delete Tool</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
