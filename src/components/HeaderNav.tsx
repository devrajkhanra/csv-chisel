'use client';
import { useState } from 'react';
import BroadPanel from '@/components/Broad/BroadPanel';
import StockPanel from '@/components/Stock/StockPanel';

export default function HeaderNav() {
  const [tab, setTab] = useState<'broad' | 'stock'>('broad');

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-center gap-6 pt-4">
        {['broad', 'stock'].map((label) => (
          <button
            key={label}
            onClick={() => setTab(label as any)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              tab === label ? 'bg-slate-800 text-white cursor-pointer' : 'bg-gold text-gray-500 shadow-md cursor-pointer'
            }`}
          >
            {label === 'broad' ? 'Broad' : 'Stock'}
          </button>
        ))}
      </div>
      {tab === 'broad' ? <BroadPanel /> : <StockPanel />}
    </div>
  );
}
