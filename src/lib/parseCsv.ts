import Papa from 'papaparse';

export const parseCsv = (file: File): Promise<Record<string, string>[]> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data as Record<string, string>[]),
    });
  });
};
