import { motion, AnimatePresence } from 'motion/react';
import { X, Link, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EditToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tool: { name: string; url: string; icon: string; color: string; category?: string }) => void;
  tool: {
    name: string;
    url: string;
    icon: string;
    color: string;
    category?: string;
  };
}

export default function EditToolModal({ isOpen, onClose, onSave, tool }: EditToolModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [showIconPreview, setShowIconPreview] = useState(false);

  useEffect(() => {
    if (isOpen && tool) {
      setName(tool.name);
      setUrl(tool.url);
      setCategory(tool.category || '');
      setFaviconUrl(tool.icon);
      setShowIconPreview(false);
    }
  }, [isOpen, tool]);

  useEffect(() => {
    if (faviconUrl && url !== tool?.url) {
      setShowIconPreview(true);
      const timer = setTimeout(() => {
        setShowIconPreview(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [faviconUrl, url, tool?.url]);

  const getFaviconUrl = (websiteUrl: string) => {
    try {
      const urlObj = new URL(websiteUrl);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
    } catch {
      return '';
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (newUrl) {
      const favicon = getFaviconUrl(newUrl);
      setFaviconUrl(favicon);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url) {
      onSave({
        name,
        url,
        icon: faviconUrl,
        color: tool.color,
        category: category || undefined,
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl text-white">Edit Tool</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-2">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                    Tool Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Figma"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder:text-white/30 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-2">
                    <Link className="w-3 h-3 sm:w-4 sm:h-4" />
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://figma.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder:text-white/30 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                    required
                  />
                  {showIconPreview && faviconUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <img
                        src={faviconUrl}
                        alt="Site icon"
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-white/60 text-xs sm:text-sm">Icon detected automatically</span>
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-2">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Design, Productivity"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder:text-white/30 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-3.5 rounded-xl bg-white/5 backdrop-blur-xl text-white text-sm sm:text-base font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Save Changes
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
