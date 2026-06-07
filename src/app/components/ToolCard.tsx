import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import ContextMenu from './ContextMenu';
import ConfirmDialog from './ConfirmDialog';

interface ToolCardProps {
  name: string;
  url: string;
  icon?: string;
  color?: string;
  index: number;
  isFavorite?: boolean;
  category?: string;
  onToolClick?: () => void;
  onDelete?: () => void;
  onFavorite?: () => void;
  onEdit?: () => void;
}

export default function ToolCard({ name, url, icon, color = '#3b82f6', index, isFavorite = false, category, onToolClick, onDelete, onFavorite, onEdit }: ToolCardProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const handleClick = () => {
    if (isLongPress) {
      setIsLongPress(false);
      return;
    }
    onToolClick?.();
    window.open(url, '_blank');
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsLongPressing(true);
    longPressTimer.current = setTimeout(() => {
      const touch = e.touches[0];
      setIsLongPress(true);
      setIsLongPressing(false);
      setContextMenu({ x: touch.clientX, y: touch.clientY });
    }, 500);
  };

  const handleTouchEnd = () => {
    setIsLongPressing(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setTimeout(() => setIsLongPress(false), 100);
  };

  const handleTouchMove = () => {
    setIsLongPressing(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: isLongPressing ? 0.95 : 1,
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 }
        }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className="group cursor-pointer w-full"
      >
      <motion.div
        className="relative rounded-2xl bg-black/30 backdrop-blur-xl border transition-all duration-300 p-3 sm:p-3.5 overflow-hidden w-full aspect-square flex flex-col items-center justify-center"
        animate={{
          borderColor: isLongPressing ? 'rgba(251, 146, 60, 0.5)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isLongPressing
            ? '0 0 20px rgba(251, 146, 60, 0.3), 0 0 40px rgba(251, 146, 60, 0.1)'
            : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 w-full">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-md overflow-hidden"
            style={{
              backgroundColor: `${color}18`,
              border: `1px solid ${color}25`,
            }}
          >
            {icon?.startsWith('http') ? (
              <img
                src={icon}
                alt={name}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '🌐';
                }}
              />
            ) : (
              <span className="text-2xl sm:text-3xl">{icon || '🌐'}</span>
            )}
          </motion.div>

          <div className="text-center w-full">
            <h3 className="text-white font-medium text-[11px] sm:text-xs truncate px-1">{name}</h3>
          </div>
        </div>

        {isFavorite && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-orange-500/90 backdrop-blur-sm rounded-full p-0.5"
          >
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2"
        >
          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/30" />
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 30px ${color}30`,
          }}
        />

        {/* Long Press Progress Indicator */}
        <AnimatePresence>
          {isLongPressing && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-xl bg-orange-500/10 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-12 h-12 rounded-full border-2 border-orange-500/50 border-t-orange-500 animate-spin"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>

    {contextMenu && (
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        onClose={() => setContextMenu(null)}
        onDelete={() => {
          setContextMenu(null);
          setShowDeleteConfirm(true);
        }}
        onFavorite={() => {
          setContextMenu(null);
          onFavorite?.();
        }}
        onEdit={() => {
          setContextMenu(null);
          onEdit?.();
        }}
        toolName={name}
        isFavorite={isFavorite}
      />
    )}

    <ConfirmDialog
      isOpen={showDeleteConfirm}
      title="Delete Tool"
      message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
      onConfirm={() => {
        onDelete?.();
        setShowDeleteConfirm(false);
      }}
      onCancel={() => setShowDeleteConfirm(false)}
    />
  </>
  );
}
