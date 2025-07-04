// import FileUploader from '@/components/FileUploader';
// import IndexSelector from '@/components/IndexSelector';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white font-geist px-8 py-10">
//       <div className="max-w-3xl mx-auto space-y-10">
//         <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-teal-300 to-indigo-400 bg-clip-text text-transparent">
//           Nifty Filterer
//         </h1>
//         <p className="text-slate-300">Upload multiple CSVs, select an index, download a clean file.</p>
//         <FileUploader />
//         <IndexSelector />
//       </div>
//     </main>
//   );
// }


import FileUploader from '@/components/FileUploader';
import IndexSelector from '@/components/IndexSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-steel to-slate-950 text-luxe font-geist px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
            NiftyChisel
          </h1>
          <p className="text-slate-400">Upload CSVs → Select index → Download clean filtered dataset</p>
        </div>
        <FileUploader />
        <IndexSelector />
      </div>
    </main>
  );
}
