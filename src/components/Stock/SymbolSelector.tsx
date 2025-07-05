'use client';
import { useState, useMemo } from 'react';
import { useStockStore } from '@/store/useStockStore';
import { prepareBhavOutputBySymbol } from '@/lib/bhavFilter';
import { generateCsv } from '@/lib/generateCsv';
import { Filter, Download, Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/Toaster';

export default function SymbolSelector() {
  const { data, symbols } = useStockStore();
  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredSymbols = useMemo(() => {
    return searchTerm 
      ? symbols.filter(symbol => symbol.toLowerCase().includes(searchTerm.toLowerCase()))
      : symbols;
  }, [symbols, searchTerm]);

  const selectedSymbolData = useMemo(() => {
    if (!selected) return [];
    return prepareBhavOutputBySymbol(data, selected);
  }, [data, selected]);

  const handleDownload = async () => {
    if (!selected) return;
    
    setIsGenerating(true);
    try {
      const filtered = prepareBhavOutputBySymbol(data, selected);
      if (filtered.length === 0) {
        toast.warning('No data found', `No EQ records found for symbol "${selected}"`);
        return;
      }
      
      generateCsv(filtered, `${selected}-EQ-chisel`);
      toast.success('CSV Generated', `Downloaded ${filtered.length} records for ${selected}`);
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Generation failed', 'An error occurred while generating the CSV file.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data.length || !symbols.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full w-fit mx-auto">
            <TrendingUp className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No Stock Data Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Upload Bhavcopy CSV files to start filtering by stock symbol
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Filter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Filter by Stock Symbol
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Select an EQ symbol to filter and download historical data
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {symbols.length > 10 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-slate-100"
          >
            <option value="" disabled>
              Select EQ Symbol ({filteredSymbols.length} available)
            </option>
            {filteredSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>

          <motion.button
            onClick={handleDownload}
            disabled={!selected || isGenerating}
            whileHover={{ scale: selected ? 1.02 : 1 }}
            whileTap={{ scale: selected ? 0.98 : 1 }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              selected && !isGenerating
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <Download className={`h-4 w-4 ${isGenerating ? 'animate-bounce' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate CSV'}
          </motion.button>
        </div>

        {selected && selectedSymbolData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-800 dark:text-purple-200 font-medium">
                Preview: {selected} (EQ)
              </span>
              <span className="text-purple-600 dark:text-purple-400">
                {selectedSymbolData.length} records
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}