'use client';
import { useState, useCallback } from 'react';
import { parseCsv } from '@/lib/parseCsv';
import { useCsvStore } from '@/store/useCsvStore';
import { FileUp, Upload, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/Toaster';

export default function FileUploader() {
  const { setData } = useCsvStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = useCallback(async (files: FileList) => {
    if (!files.length) return;
    
    setIsUploading(true);
    setUploadedCount(0);
    
    try {
      const allData: Record<string, string>[] = [];
      const fileArray = Array.from(files);
      
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        try {
          const parsed = await parseCsv(file);
          allData.push(...parsed);
          setUploadedCount(i + 1);
        } catch (error) {
          console.error(`Failed to parse ${file.name}:`, error);
          toast.error(`Failed to parse ${file.name}`, 'Please check the file format and try again.');
        }
      }
      
      if (allData.length > 0) {
        setData(allData);
        toast.success(`Successfully processed ${fileArray.length} file(s)`, `Loaded ${allData.length} records`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed', 'An unexpected error occurred while processing your files.');
    } finally {
      setIsUploading(false);
    }
  }, [setData]);

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
            ? 'border-blue-400 bg-blue-50/80 dark:bg-blue-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
        } ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}`}
      >
        <label className="flex flex-col items-center gap-4 cursor-pointer">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragOver 
              ? 'bg-blue-100 dark:bg-blue-900/30' 
              : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
          }`}>
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
            ) : uploadedCount > 0 && !isUploading ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <FileUp className="h-8 w-8 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
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
              {isUploading ? 'Processing files...' : 'Upload Index CSV Files'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {isUploading 
                ? `Processing ${uploadedCount} files...`
                : isDragOver
                ? 'Drop your CSV files here'
                : 'Drag & drop your files here, or click to browse'
              }
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Supports multiple CSV files • Max 10MB per file
            </p>
          </div>
        </label>

        {isUploading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="animate-pulse text-blue-600 dark:text-blue-400">
                Processing files...
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