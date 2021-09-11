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

export function getFormatImages(coverImageUrl: string) {
  let url = '';
  let small = '';
  let medium = '';
  let large = '';
  let thumbnail = '';
  if (coverImageUrl) {
    const paths = coverImageUrl.split('/');
    const lastPath = paths.pop();
    const smallPaths = [...paths, `small_${lastPath}`];
    const mediumPaths = [...paths, `medium_${lastPath}`];
    const largePaths = [...paths, `large_${lastPath}`];
    const thumbnailPaths = [...paths, `thumbnail_${lastPath}`];
    url = `${process.env.NEXT_PUBLIC_CMS_URL}${coverImageUrl}`;
    small = `${process.env.NEXT_PUBLIC_CMS_URL}${smallPaths.join('/')}`;
    medium = `${process.env.NEXT_PUBLIC_CMS_URL}${mediumPaths.join('/')}`;
    large = `${process.env.NEXT_PUBLIC_CMS_URL}${largePaths.join('/')}`;
    thumbnail = `${process.env.NEXT_PUBLIC_CMS_URL}${thumbnailPaths.join('/')}`;
  }
  return {
    url,
    small,
    medium,
    large,
    thumbnail,
  };
}
