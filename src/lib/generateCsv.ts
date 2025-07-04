// import { unparse } from 'papaparse';

// export const generateCsv = (rows: Record<string, string>[], filename: string) => {
//   const csv = unparse(rows);
//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = `${filename}.csv`;
//   link.click();
// };


import { unparse } from 'papaparse';

export const generateCsv = (rows: Record<string, string>[], filename: string) => {
  const csv = unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
