import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

interface StatsWidgetProps {
  label: string;
  value: string;
  subtext: string;
  index: number;
  icon?: React.ReactNode;
}

export default function StatsWidget({ label, value, subtext, index, icon }: StatsWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 p-2.5 sm:p-3 hover:border-white/20 transition-all duration-300 group min-w-[90px] sm:min-w-[110px] relative"
    >
      <div className="flex items-start justify-between mb-1.5 sm:mb-2">
        <div className="text-white/60 text-[6px] sm:text-[7px] leading-tight">{label}</div>
        {icon || <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />}
      </div>

      <div className="mb-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-sm sm:text-base text-white font-bold"
        >
          {value}
        </motion.div>
      </div>

      <div className="text-white/40 text-[5px] sm:text-[6px]">{subtext}</div>

      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{
          background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
