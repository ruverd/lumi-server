import { convertToCents } from './convert-to-cents';

export const getBillTotalAmount = (lines: string[]): number => {
  const line = lines.find((line) => line.includes('TOTAL'));

  if (!line) {
    return 0;
  }

  const billTotalAmount = line.split(' ').pop();

  const billTotalAmountInCents = convertToCents(billTotalAmount);

  return billTotalAmountInCents || 0;
};
