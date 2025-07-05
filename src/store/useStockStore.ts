import { create } from 'zustand';
import type { CSVRow } from '@/types/csv';

interface StockStore {
  data: CSVRow[][];
  files: File[];
  symbols: string[];
  setData: (d: CSVRow[][]) => void;
  setFiles: (f: File[]) => void;
  setSymbols: (s: string[]) => void;
}

export const useStockStore = create<StockStore>((set) => ({
  data: [],
  files: [],
  symbols: [],
  setData: (d) => set({ data: d }),
  setFiles: (f) => set({ files: f }),
  setSymbols: (s) => set({ symbols: s }),
}));
