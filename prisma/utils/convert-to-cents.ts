export const convertToCents = (value: string): number => {
  const valueInCents = Number(value.replace('.', '').replace(',', ''));

  return valueInCents;
};
