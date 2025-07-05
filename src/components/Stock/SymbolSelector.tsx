'use client';
import { useState } from 'react';
import { useStockStore } from '@/store/useStockStore';
import { prepareBhavOutputBySymbol } from '@/lib/bhavFilter';
import { generateCsv } from '@/lib/generateCsv';
import { Filter, FileCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SymbolSelector() {
  const { data, symbols } = useStockStore();
  const [selected, setSelected] = useState('');

  const handleDownload = () => {
    const filtered = prepareBhavOutputBySymbol(data, selected);
    generateCsv(filtered, `${selected}-EQ-chisel`);
  };

  if (!data.length || !symbols.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 space-y-5 bg-steel p-6 rounded-xl border border-slate-700 shadow-luxe"
    >
      <div className="flex items-center gap-4">
        <Filter className="text-accent h-5 w-5" />
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="bg-slate-800 text-white p-3 rounded-lg border border-gold focus:outline-none"
        >
          <option value="" disabled>Select EQ Symbol</option>
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>{symbol}</option>
          ))}
        </select>
        <button
          onClick={handleDownload}
          disabled={!selected}
          className="px-4 py-2 bg-gold text-steel rounded-md hover:bg-accent hover:text-white transition-all flex items-center gap-2"
        >
          <FileCheck2 className="h-4 w-4" />
          Generate CSV
        </button>
      </div>
    </motion.div>
  );
}
