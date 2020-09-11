export const getLineCount = (input: string) => {
  return input.split(/\r\n|\r|\n/).length;
};

export const isLargeFile = (input: string) => {
  const lineCount = getLineCount(input);

  return lineCount > 1000;
};
