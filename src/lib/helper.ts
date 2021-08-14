export function chunkArray(arrayNumber: number[], chunkSizes: number[]) {
  const chunkArray = [];
  let cc = 0,
    i = 0;
  while (i < arrayNumber.length) {
    const cSize = chunkSizes[cc];
    chunkArray.push(arrayNumber.slice(i, i + cSize));
    cc = (cc + 1) % chunkSizes.length;
    i += cSize;
  }
  return chunkArray;
}
