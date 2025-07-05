// import Papa from 'papaparse';

// export const parseCsv = (file: File): Promise<Record<string, string>[]> => {
//   return new Promise((resolve) => {
//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (results) => resolve(results.data as Record<string, string>[]),
//     });
//   });
// };


import Papa from 'papaparse';

/**
 * Parses a CSV file and trims header names for consistent access
 */
export const parseCsv = async (file: File): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,

      transformHeader: (header) => header.trim(), // ✅ THIS FIXES THE HEADER ISSUE

      complete: (result) => {
        const parsed = result.data as Record<string, string>[];

        // 🔍 Debug logs
        console.log('File parsed:', file.name);
        console.log('Row count:', parsed.length);
        console.log('First few rows:', parsed.slice(0, 3));
        console.log('Sanitized headers:', Object.keys(parsed[0] ?? {}));

        if (result.errors?.length) {
          console.error('CSV parse errors:', result.errors);
          reject(new Error('Failed to parse CSV'));
        } else {
          resolve(parsed);
        }
      },

      error: (err) => {
        console.error('PapaParse error:', err);
        reject(err);
      },
    });
  });
};
