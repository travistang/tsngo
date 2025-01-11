/**
 *
 * Return random integer less than `maxValue`. For example if maxValue = 8 then the function returns random integers from 0 to 7 (inclusive)
 * @param maxValue: the `maxValue`
 * @returns the randomly selected number
 */
export const randInt = (maxValue: number) => {
  return Math.floor(Math.random() * maxValue);
};
