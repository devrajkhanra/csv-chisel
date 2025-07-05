// import { parse } from 'date-fns';

// const parseIndianDate = (dateStr: string) =>
//   parse(dateStr, 'dd-MMM-yyyy', new Date());

// export const getCommonSymbolList = (datasets: Record<string, string>[][]): string[] => {
//   const symbolSets = datasets.map((data) =>
//     new Set(data.map((row) => row['SYMBOL']?.trim()))
//   );
//   const common = symbolSets.reduce((a, b) => new Set([...a].filter((s) => b.has(s))));
//   return Array.from(common).sort();
// };

// export const prepareBhavOutputBySymbol = (
//   datasets: Record<string, string>[][],
//   selectedSymbol: string
// ) => {
//   const allEQ = datasets
//     .map((rows) => rows.filter((row) => row[' SERIES']?.trim() === ' EQ'))
//     .flat()
//     .filter((row) => row['SYMBOL']?.trim() === selectedSymbol);

//   return allEQ.sort(
//     (a, b) =>
//       parseIndianDate(a[' DATE1']).getTime() - parseIndianDate(b[' DATE1']).getTime()
//   );
// };


import { isValid, parse } from 'date-fns';

const parseIndianDate = (dateStr: string) => {
  const parsed = parse(dateStr.trim(), 'dd-MMM-yyyy', new Date());
  return isValid(parsed) ? parsed : new Date(0); // fallback to epoch if parsing fails
};

/**
 * Gathers all symbols with EQ series from all datasets (union, not intersection)
 */
export const getAllEQSymbols = (datasets: Record<string, string>[][]): string[] => {
  const allSymbols = new Set<string>();

  datasets.forEach((rows) => {
    rows.forEach((row) => {
      if (row['SERIES']?.trim().toUpperCase() === 'EQ') {
        allSymbols.add(row['SYMBOL']?.trim());
      }
    });
  });

  return Array.from(allSymbols).sort();
};

/**
 * Filters EQ rows for the selected symbol and sorts by DATE1
 */
export const prepareBhavOutputBySymbol = (
  datasets: Record<string, string>[][],
  selectedSymbol: string
) => {
  const filteredRows = datasets
    .map((rows) =>
      rows.filter(
        (row) =>
          row['SERIES']?.trim().toUpperCase() === 'EQ' &&
          row['SYMBOL']?.trim() === selectedSymbol
      )
    )
    .flat();

  return filteredRows.sort(
    (a, b) =>
      parseIndianDate(a['DATE1']).getTime() - parseIndianDate(b['DATE1']).getTime()
  );
};
