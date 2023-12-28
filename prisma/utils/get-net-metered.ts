import { convertToCents } from './convert-to-cents';
import { getContentLineFiltered } from './get-content-line-filtered';

interface NetMeteredData {
  quantity: number;
  amount: number;
}

export const getNetMetered = (lines: string[]): NetMeteredData => {
  const line = lines.find((line) =>
    line.includes('Energia compensada GD IkWh'),
  );

  if (!line) {
    throw new Error('Register not found');
  }

  const contentLine = getContentLineFiltered(line);

  const netMeteredQtd = Number(
    contentLine[4].replace('.', '').replace(',', '.').replace('kWh', ''),
  );
  const netMeteredAmount = contentLine[6];
  const netMeteredAmountInCents = convertToCents(netMeteredAmount);

  if (!netMeteredAmountInCents || !netMeteredQtd) {
    throw new Error('Register date not found');
  }

  return {
    quantity: netMeteredQtd,
    amount: netMeteredAmountInCents,
  };
};
