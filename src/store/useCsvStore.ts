import { create } from 'zustand';

interface CsvState {
  files: File[];
  data: Record<string, string>[];
  setFiles: (files: File[]) => void;
  setData: (data: Record<string, string>[]) => void;
}

export const useCsvStore = create<CsvState>((set) => ({
  files: [],
  data: [],
  setFiles: (files) => set({ files }),
  setData: (data) => set({ data }),
}));
