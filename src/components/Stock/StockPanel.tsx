'use client';
import FileUploader from '@/components/Stock/FileUploader';
import SymbolSelector from '@/components/Stock/SymbolSelector';

export default function StockPanel() {
  return (
    <div className="space-y-6">
      <FileUploader />
      <SymbolSelector />
    </div>
  );
}
