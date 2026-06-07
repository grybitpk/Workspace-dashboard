import { motion } from 'motion/react';
import { X, TrendingUp, Clock, MousePointer, Zap, Calendar, Award } from 'lucide-react';

interface ActivityStats {
  totalClicks: number;
  clicksThisWeek: number;
  clicksLastWeek: number;
  lastResetDate: string;
}

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ActivityStats;
  toolsCount: number;
  favoritesCount: number;
}

export default function AnalyticsDashboard({
  isOpen,
  onClose,
  stats,
  toolsCount,
  favoritesCount
}: AnalyticsDashboardProps) {
  if (!isOpen) return null;

  const calculateTimeSaved = () => {
    const avgTimePerClick = 0.5;
    const hoursSaved = (stats.clicksThisWeek * avgTimePerClick) / 60;
    return hoursSaved >= 1 ? `${hoursSaved.toFixed(1)} hrs` : `${(hoursSaved * 60).toFixed(0)} min`;
  };

  const calculateProductivity = () => {
    if (stats.clicksLastWeek === 0) return '+0%';
    const change = ((stats.clicksThisWeek - stats.clicksLastWeek) / stats.clicksLastWeek) * 100;
    return change >= 0 ? `+${Math.round(change)}%` : `${Math.round(change)}%`;
  };

  const productivityChange = stats.clicksThisWeek - stats.clicksLastWeek;
  const isPositive = productivityChange >= 0;

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
        className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Analytics Dashboard</h2>
              <p className="text-white/60 text-xs">Your productivity insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80 text-sm">Time Saved</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{calculateTimeSaved()}</div>
            <div className="text-white/50 text-xs">This week</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-white/80 text-sm">Productivity</span>
            </div>
            <div className={`text-3xl font-bold mb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {calculateProductivity()}
            </div>
            <div className="text-white/50 text-xs">vs last week</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <div className="flex items-center gap-3 mb-3">
              <MousePointer className="w-5 h-5 text-orange-400" />
              <span className="text-white/80 text-sm">Total Clicks</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalClicks.toLocaleString()}</div>
            <div className="text-white/50 text-xs">All time</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-white/80 text-sm">This Week</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.clicksThisWeek.toLocaleString()}</div>
            <div className="text-white/50 text-xs">Clicks</div>
          </div>
        </div>

        {/* Workspace Stats */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Workspace Overview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{toolsCount}</div>
              <div className="text-white/50 text-xs">Total Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{favoritesCount}</div>
              <div className="text-white/50 text-xs">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stats.clicksLastWeek}</div>
              <div className="text-white/50 text-xs">Last Week</div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-sm mb-3">Insights</h3>

          {isPositive && productivityChange > 0 && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-green-400 text-sm font-medium">Great progress!</div>
                  <div className="text-white/60 text-xs mt-1">
                    You're {productivityChange} clicks more productive than last week. Keep it up!
                  </div>
                </div>
              </div>
            </div>
          )}

          {favoritesCount === 0 && (
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-orange-400 text-sm font-medium">Tip: Mark favorites</div>
                  <div className="text-white/60 text-xs mt-1">
                    Star your most-used tools for quick access and better organization.
                  </div>
                </div>
              </div>
            </div>
          )}

          {stats.totalClicks > 100 && (
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-purple-400 text-sm font-medium">Power user!</div>
                  <div className="text-white/60 text-xs mt-1">
                    You've made {stats.totalClicks} clicks. You're mastering your workflow!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
