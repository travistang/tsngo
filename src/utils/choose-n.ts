import { randInt } from "./rand-int";
import { range } from "./range";

/**
 * Given a sample size (positive integer), choose `chooseSize` many integers randomly from it.
 * For example if sampleSize = 8 and chooseSize = 3, then 3 of the 0, 1, 2, ... 7 will be returned from this function. (e.g. [6, 1, 4])
 * @param sampleSize
 * @param chooseSize
 */
export const chooseN = (
  sampleSize: number,
  chooseSize: number,
  excludedSamples: number[] = []
): number[] => {
  if (chooseSize > sampleSize) {
    throw new Error("Cannot choose more than the number of samples");
  }
  if (!Number.isInteger(chooseSize) || !Number.isInteger(sampleSize)) {
    throw new Error("Please give integers for the parameters");
  }
  if (chooseSize < 0 || sampleSize < 0) {
    throw new Error("Please give positive integers for the parameters");
  }

  let samples = range(sampleSize).filter(
    (sample) => !excludedSamples.includes(sample)
  );
  const chosenNumbers: number[] = [];
  for (let i = 0; i < chooseSize; i++) {
    const randomIndex = randInt(samples.length);
    chosenNumbers.push(samples[randomIndex]);
    samples.splice(randomIndex, 1);
  }
  return chosenNumbers;
};
