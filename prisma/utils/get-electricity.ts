import { convertToCents } from './convert-to-cents';
import { getContentLineFiltered } from './get-content-line-filtered';

interface ElectricityData {
  quantity: number;
  amount: number;
}

export const getElectricity = (lines: string[]): ElectricityData => {
  const line = lines.find((line) => line.includes('Energia ElétricakWh'));

  if (!line) {
    throw new Error('Register not found');
  }

  const contentLine = getContentLineFiltered(line);

  const electricityQtd = Number(contentLine[2]);
  const electricityAmount = contentLine[4];
  const electricityAmountInCents = convertToCents(electricityAmount);

  if (!electricityAmountInCents || !electricityQtd) {
    throw new Error('Register date not found');
  }

  return {
    quantity: electricityQtd,
    amount: electricityAmountInCents,
  };
};
