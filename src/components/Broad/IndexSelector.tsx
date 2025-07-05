'use client';
import { useState, useMemo } from 'react';
import { useCsvStore } from '@/store/useCsvStore';
import { filterIndex } from '@/lib/filterIndex';
import { generateCsv } from '@/lib/generateCsv';
import { Filter, Download, Search, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/Toaster';

export default function IndexSelector() {
  const { data } = useCsvStore();
  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const indexOptions = useMemo(() => {
    const options = Array.from(new Set(data.map(d => d['Index Name']))).filter(Boolean);
    return searchTerm 
      ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;
  }, [data, searchTerm]);

  const selectedIndexData = useMemo(() => {
    if (!selected) return [];
    return filterIndex(data, selected);
  }, [data, selected]);

  const handleGenerate = async () => {
    if (!selected) return;
    
    setIsGenerating(true);
    try {
      const filtered = filterIndex(data, selected);
      if (filtered.length === 0) {
        toast.warning('No data found', `No records found for index "${selected}"`);
        return;
      }
      
      generateCsv(filtered, `${selected}-filtered`);
      toast.success('CSV Generated', `Downloaded ${filtered.length} records for ${selected}`);
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Generation failed', 'An error occurred while generating the CSV file.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full w-fit mx-auto">
            <BarChart3 className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No Data Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Upload CSV files to start filtering by index
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
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Filter by Index
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Select an index to filter and download data
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {indexOptions.length > 5 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search indices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
          >
            <option value="" disabled>
              Select Index ({indexOptions.length} available)
            </option>
            {indexOptions.map((idx) => (
              <option key={idx} value={idx}>
                {idx}
              </option>
            ))}
          </select>

          <motion.button
            onClick={handleGenerate}
            disabled={!selected || isGenerating}
            whileHover={{ scale: selected ? 1.02 : 1 }}
            whileTap={{ scale: selected ? 0.98 : 1 }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              selected && !isGenerating
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <Download className={`h-4 w-4 ${isGenerating ? 'animate-bounce' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate CSV'}
          </motion.button>
        </div>

        {selected && selectedIndexData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                Preview: {selected}
              </span>
              <span className="text-blue-600 dark:text-blue-400">
                {selectedIndexData.length} records
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}