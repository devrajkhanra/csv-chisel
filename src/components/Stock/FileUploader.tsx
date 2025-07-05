'use client';
import { useState, useCallback } from 'react';
import { parseCsv } from '@/lib/parseCsv';
import { getAllEQSymbols } from '@/lib/bhavFilter';
import { FileUp, Upload, CheckCircle2, TrendingUp } from 'lucide-react';
import { useStockStore } from '@/store/useStockStore';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/Toaster';

export default function FileUploader() {
  const { setFiles, setData, setSymbols } = useStockStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = useCallback(async (files: FileList) => {
    if (!files.length) return;
    
    const fileList = Array.from(files);
    setIsUploading(true);
    setUploadedCount(0);

    try {
      const parsedDataSets = [];
      
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        try {
          const parsed = await parseCsv(file);
          parsedDataSets.push(parsed);
          setUploadedCount(i + 1);
        } catch (error) {
          console.error(`Failed to parse ${file.name}:`, error);
          toast.error(`Failed to parse ${file.name}`, 'Please check the file format and try again.');
        }
      }

      if (parsedDataSets.length > 0) {
        const symbolList = getAllEQSymbols(parsedDataSets);
        
        setFiles(fileList);
        setData(parsedDataSets);
        setSymbols(symbolList);
        
        toast.success(
          `Successfully processed ${fileList.length} file(s)`, 
          `Found ${symbolList.length} unique EQ symbols`
        );
      }
    } catch (err) {
      console.error('Stock CSV upload failed:', err);
      toast.error('Upload failed', 'An unexpected error occurred while processing your files.');
    } finally {
      setIsUploading(false);
    }
  }, [setFiles, setData, setSymbols]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleUpload(e.dataTransfer.files);
    }
  }, [handleUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          isDragOver
            ? 'border-purple-400 bg-purple-50/80 dark:bg-purple-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500'
        } ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}`}
      >
        <label className="flex flex-col items-center gap-4 cursor-pointer">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragOver 
              ? 'bg-purple-100 dark:bg-purple-900/30' 
              : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20'
          }`}>
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </motion.div>
            ) : uploadedCount > 0 && !isUploading ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingUp className="h-8 w-8 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            )}
          </div>
          
          <input 
            type="file" 
            multiple 
            accept=".csv" 
            onChange={handleFileChange} 
            className="hidden" 
            disabled={isUploading}
          />
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {isUploading ? 'Processing Bhavcopy files...' : 'Upload Bhavcopy CSV Files'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {isUploading 
                ? `Processing ${uploadedCount} files...`
                : isDragOver
                ? 'Drop your Bhavcopy files here'
                : 'Drag & drop your Bhavcopy files here, or click to browse'
              }
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              NSE/BSE Bhavcopy format • Multiple files supported • Max 10MB per file
            </p>
          </div>
        </label>

        {isUploading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="animate-pulse text-purple-600 dark:text-purple-400">
                Processing Bhavcopy files...
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {uploadedCount} files processed
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}