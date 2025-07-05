// 'use client';
// import { useCsvStore } from '@/store/useCsvStore';
// import { useState } from 'react';
// import { filterIndex } from '@/lib/filterIndex';
// import { generateCsv } from '@/lib/generateCsv';
// import { ChevronDown, Filter } from 'lucide-react';

// export default function IndexSelector() {
//   const { data } = useCsvStore();
//   const [selected, setSelected] = useState('');

//   const indexOptions = Array.from(new Set(data.map(d => d['Index Name']))).filter(Boolean);

//   const handleGenerate = () => {
//     const filtered = filterIndex(data, selected);
//     generateCsv(filtered, `${selected}-filtered`);
//   };

//   return (
//     <div className="mt-6 space-y-4">
//       <div className="flex items-center gap-2">
//         <Filter className="text-indigo-400" />
//         <select
//           value={selected}
//           onChange={(e) => setSelected(e.target.value)}
//           className="bg-slate-800 text-white p-2 rounded-lg border border-indigo-500"
//         >
//           <option value="" disabled>Select Index</option>
//           {indexOptions.map((idx) => (
//             <option key={idx} value={idx}>{idx}</option>
//           ))}
//         </select>
//         <button
//           onClick={handleGenerate}
//           disabled={!selected}
//           className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-all"
//         >
//           Generate CSV
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';
import { useCsvStore } from '@/store/useCsvStore';
import { useState } from 'react';
import { filterIndex } from '@/lib/filterIndex';
import { generateCsv } from '@/lib/generateCsv';
import { Filter, FileCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IndexSelector() {
  const { data } = useCsvStore();
  const [selected, setSelected] = useState('');

  const indexOptions = Array.from(new Set(data.map(d => d['Index Name']))).filter(Boolean);

  const handleGenerate = () => {
    const filtered = filterIndex(data, selected);
    generateCsv(filtered, `${selected}-filtered`);
  };

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
          <option value="" disabled>Select Index</option>
          {indexOptions.map((idx) => (
            <option key={idx} value={idx}>{idx}</option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
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
