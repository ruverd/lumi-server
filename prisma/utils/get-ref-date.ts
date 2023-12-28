interface RefDate {
  month: number;
  year: number;
}

const MONTHS_IN_YEAR = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

export const getRefDate = (lines: string[]): RefDate => {
  let lineRefDate = 0;

  const line = lines.find((line, index) => {
    const isRefDate = line.includes('Referente a');

    if (isRefDate) {
      lineRefDate = index + 1;
    }

    return isRefDate;
  });

  if (!line) {
    throw new Error('Ref not found');
  }

  const contentRefDate = lines[lineRefDate];

  const refDate = contentRefDate.trim().split(' ')[0];

  if (!refDate) {
    throw new Error('Ref date not found');
  }

  const refDateSplit = refDate.split('/');

  const month = refDateSplit[0];
  const year = Number(refDateSplit[1]);
  const monthNumber = MONTHS_IN_YEAR.indexOf(month) + 1;

  return {
    month: monthNumber,
    year,
  };
};
