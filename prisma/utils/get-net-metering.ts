import { convertToCents } from './convert-to-cents';
import { getContentLineFiltered } from './get-content-line-filtered';

interface NetMeteringData {
  quantity: number;
  amount: number;
}

export const getNetMetering = (lines: string[]): NetMeteringData => {
  const line = lines.find((line) => line.includes('Energia SCEE s/ ICMSkWh'));

  if (!line) {
    throw new Error('Register not found');
  }

  const contentLine = getContentLineFiltered(line);

  const netMeteringQtd = Number(
    contentLine[4].replace('.', '').replace(',', '.').replace('kWh', ''),
  );
  const netMeteringAmount = contentLine[6];

  const netMeteringAmountInCents = convertToCents(netMeteringAmount);

  if (!netMeteringAmountInCents || !netMeteringQtd) {
    throw new Error('Register date not found');
  }

  return {
    quantity: netMeteringQtd,
    amount: netMeteringAmountInCents,
  };
};
