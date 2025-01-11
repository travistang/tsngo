export const removeDuplicates = <T>(
  items: T[],
  compareFn: (a: T, b: T) => boolean
) => {
  const uniques: T[] = [];
  for (const item of items) {
    if (!uniques.some((unique) => compareFn(unique, item))) {
      uniques.push(item);
    }
  }

  return uniques;
};
