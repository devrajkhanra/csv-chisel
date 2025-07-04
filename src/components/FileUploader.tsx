// 'use client';
// import { parseCsv } from '@/lib/parseCsv';
// import { useCsvStore } from '@/store/useCsvStore';
// import { FileIcon } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function FileUploader() {
//   const { setData } = useCsvStore();

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const allData = [];
//     for (const file of Array.from(e.target.files)) {
//       const parsed = await parseCsv(file);
//       allData.push(...parsed);
//     }
//     setData(allData);
//   };

//   return (
//     <motion.div className="bg-slate-900 text-white p-6 rounded-lg border border-slate-700 shadow-xl">
//       <label className="flex items-center gap-4 cursor-pointer">
//         <FileIcon className="h-6 w-6 text-teal-400" />
//         <input type="file" multiple accept=".csv" onChange={handleUpload} className="hidden" />
//         <span className="font-medium text-lg">Upload CSV files</span>
//       </label>
//     </motion.div>
//   );
// }


'use client';
import { parseCsv } from '@/lib/parseCsv';
import { useCsvStore } from '@/store/useCsvStore';
import { FileUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FileUploader() {
  const { setData } = useCsvStore();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const allData: Record<string, string>[] = [];
    for (const file of Array.from(e.target.files)) {
      const parsed = await parseCsv(file);
      allData.push(...parsed);
    }
    setData(allData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-steel p-6 rounded-xl shadow-luxe text-white border border-slate-700 space-y-4"
    >
      <label className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
        <FileUp className="h-6 w-6 text-gold" />
        <input type="file" multiple accept=".csv" onChange={handleUpload} className="hidden" />
        <span className="font-geist text-lg">Upload your CSV files</span>
      </label>
    </motion.div>
  );
}
