import { convertToCents } from './convert-to-cents';

export const getMunicipalLightingTax = (lines: string[]): number => {
  const line = lines.find((line) =>
    line.includes('Contrib Ilum Publica Municipal'),
  );

  if (!line) {
    return 0;
  }

  const municipalLightingAmount = line.split(' ').pop();

  const municipalLightingAmountInCents = convertToCents(
    municipalLightingAmount,
  );

  return municipalLightingAmountInCents || 0;
};
