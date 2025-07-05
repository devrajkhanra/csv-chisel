// import FileUploader from '@/components/FileUploader';
// import IndexSelector from '@/components/IndexSelector';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-steel to-slate-950 text-luxe font-geist px-6 py-10">
//       <div className="max-w-4xl mx-auto space-y-10">
//         <div className="space-y-2">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
//             NiftyChisel
//           </h1>
//           <p className="text-slate-400">Upload CSVs → Select index → Download clean filtered dataset</p>
//         </div>
//         <FileUploader />
//         <IndexSelector />
//       </div>
//     </main>
//   );
// }


import HeaderNav from '@/components/HeaderNav';

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-950 text-luxe font-geist px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
          CSV Chisel
        </h1>
        <HeaderNav />
      </div>
    </main>
  );
}
