'use client';
import { motion } from 'framer-motion';
import { Database, Zap, Shield, TrendingUp } from 'lucide-react';

export function Hero() {
  const features = [
    { icon: Database, label: 'Smart Processing' },
    { icon: Zap, label: 'Lightning Fast' },
    { icon: Shield, label: 'Secure & Private' },
    { icon: TrendingUp, label: 'Analytics Ready' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8 mb-12"
    >
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          CSV Chisel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Transform your data with precision. Upload, filter, and export CSV files with enterprise-grade performance.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 sm:gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <feature.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {feature.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}