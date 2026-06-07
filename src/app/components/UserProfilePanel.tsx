import { motion } from 'motion/react';
import { X, User, LogOut, Download, Upload, Trash2, Check, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { authService, type AuthUser } from '../../../services/auth';

interface UserProfilePanelProps {
  user: AuthUser | null;
  onClose: () => void;
  onSignOut: () => void;
  onExportData: () => void;
  onImportData: (data: any) => void;
  onClearData: () => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
}

export default function UserProfilePanel({
  user,
  onClose,
  onSignOut,
  onExportData,
  onImportData,
  onClearData,
  onShowSignIn,
  onShowSignUp
}: UserProfilePanelProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  const handleSignOut = async () => {
    await authService.signOut();
    localStorage.removeItem('orbit-user-logged-in');
    onSignOut();
    onClose();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          onImportData(data);
        } catch (error) {
          alert('Failed to import data. Please check the file format.');
        }
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (showConfirmClear) {
      onClearData();
      setShowConfirmClear(false);
      onClose();
    } else {
      setShowConfirmClear(true);
    }
  };

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
        className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* User Info */}
        {user ? (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">{user.name || 'User'}</h3>
                <p className="text-white/60 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Synced to cloud
            </div>
          </div>
        ) : (
          <div className="mb-6 space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <User className="w-12 h-12 mx-auto mb-2 text-white/40" />
              <p className="text-white/60 text-sm mb-1">Not signed in</p>
              <p className="text-white/40 text-xs">Sign in to sync your workspace</p>
            </div>

            <button
              onClick={() => {
                onShowSignIn?.();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 hover:from-orange-500/20 hover:to-pink-500/20 border border-orange-500/20 hover:border-orange-500/30 transition-all"
            >
              <LogIn className="w-4 h-4 text-orange-400" />
              <span className="text-white font-medium text-sm">Sign In</span>
            </button>

            <button
              onClick={() => {
                onShowSignUp?.();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
            >
              <UserPlus className="w-4 h-4 text-white/60" />
              <span className="text-white font-medium text-sm">Create Account</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 mb-6">
          <button
            onClick={onExportData}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <Download className="w-5 h-5 text-white/60" />
            <div>
              <div className="text-white text-sm font-medium">Export Workspace</div>
              <div className="text-white/40 text-xs">Download your data as JSON</div>
            </div>
          </button>

          <button
            onClick={handleImport}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <Upload className="w-5 h-5 text-white/60" />
            <div>
              <div className="text-white text-sm font-medium">Import Workspace</div>
              <div className="text-white/40 text-xs">Restore from a backup file</div>
            </div>
          </button>

          <button
            onClick={handleClearData}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
              showConfirmClear
                ? 'bg-red-500/20 border border-red-500/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {showConfirmClear ? (
              <Check className="w-5 h-5 text-red-400" />
            ) : (
              <Trash2 className="w-5 h-5 text-white/60" />
            )}
            <div>
              <div className={`text-sm font-medium ${showConfirmClear ? 'text-red-400' : 'text-white'}`}>
                {showConfirmClear ? 'Click again to confirm' : 'Clear All Data'}
              </div>
              <div className={showConfirmClear ? 'text-red-400/60 text-xs' : 'text-white/40 text-xs'}>
                {showConfirmClear ? 'This will delete everything' : 'Remove all tools and settings'}
              </div>
            </div>
          </button>
        </div>

        {/* Sign Out */}
        {user && (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
