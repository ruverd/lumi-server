export const getContentLineFiltered = (content: string) => {
  const contentLine = content
    .trim()
    .split(' ')
    .filter((item) => item);

  return contentLine;
};
