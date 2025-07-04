// import { parse } from 'date-fns';

// const parseIndianDate = (dateStr: string) =>
//   parse(dateStr, 'dd-MM-yyyy', new Date());

// export const filterIndex = (csvData: Record<string, string>[], indexName: string) => {
//   const filtered = csvData.filter(row => row['Index Name']?.trim() === indexName);
//   return filtered.sort((a, b) =>
//     parseIndianDate(a['Index Date']).getTime() - parseIndianDate(b['Index Date']).getTime()
//   );
// };


import { parse } from 'date-fns';

const parseIndianDate = (dateStr: string) =>
  parse(dateStr, 'dd-MM-yyyy', new Date());

export const filterIndex = (csvData: Record<string, string>[], indexName: string) => {
  const filtered = csvData.filter(row => row['Index Name']?.trim() === indexName);
  return filtered.sort(
    (a, b) =>
      parseIndianDate(a['Index Date']).getTime() - parseIndianDate(b['Index Date']).getTime()
  );
};
