'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BroadPanel from '@/components/Broad/BroadPanel';
import StockPanel from '@/components/Stock/StockPanel';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function HeaderNav() {
  const [tab, setTab] = useState<'broad' | 'stock'>('broad');

  const tabs = [
    { id: 'broad', label: 'Index Data', icon: BarChart3, description: 'Process index and market data' },
    { id: 'stock', label: 'Stock Data', icon: TrendingUp, description: 'Analyze individual stock performance' },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-center">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex gap-1">
            {tabs.map((tabItem) => {
              const isActive = tab === tabItem.id;
              return (
                <motion.button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id as any)}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2">
                    <tabItem.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tabItem.label}</span>
                    <span className="sm:hidden">{tabItem.id === 'broad' ? 'Index' : 'Stock'}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <div className="text-center mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            {tabs.find(t => t.id === tab)?.description}
          </p>
        </div>
        {tab === 'broad' ? <BroadPanel /> : <StockPanel />}
      </motion.div>
    </div>
  );
}