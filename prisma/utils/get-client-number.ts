import { getContentLineFiltered } from './get-content-line-filtered';

export const getClientNumber = (lines: string[]): number => {
  let lineData = 0;

  const line = lines.find((line, index) => {
    const hasFound = line.includes('Nº DO CLIENTE');

    if (hasFound) {
      lineData = index + 1;
    }

    return hasFound;
  });

  if (!line) {
    throw new Error('Register not found');
  }

  const contentLine = getContentLineFiltered(lines[lineData]);

  const clientNumber = Number(contentLine[0]);

  if (!clientNumber) {
    throw new Error('Register not found');
  }

  return clientNumber;
};
