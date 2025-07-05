'use client';
import { useState } from 'react';
import { parseCsv } from '@/lib/parseCsv';
import { getAllEQSymbols } from '@/lib/bhavFilter';
import { FileUp, CheckCircle } from 'lucide-react';
import { useStockStore } from '@/store/useStockStore';
import { motion } from 'framer-motion';

export default function FileUploader() {
  const { setFiles, setData, setSymbols } = useStockStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const parsedDataSets = await Promise.all(fileList.map(parseCsv));
      const symbolList = getAllEQSymbols(parsedDataSets);

      setFiles(fileList);
      setData(parsedDataSets);
      setSymbols(symbolList);
    } catch (err) {
      console.error('Stock CSV upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-steel p-6 rounded-xl shadow-md space-y-4 border border-slate-700"
    >
      <label className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
        <FileUp className="h-6 w-6 text-gold" />
        <input type="file" multiple accept=".csv" onChange={handleUpload} className="hidden" />
        <span className="font-geist text-lg">Upload Bhavcopy CSV files</span>
      </label>

      {isUploading && <div className="text-slate-300 animate-pulse">Parsing files...</div>}

      <CheckCircle className="h-4 w-4 text-green-400" />
    </motion.div>
  );
}
