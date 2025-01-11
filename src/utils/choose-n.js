"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseN = void 0;
const rand_int_1 = require("./rand-int");
const range_1 = require("./range");
/**
 * Given a sample size (positive integer), choose `chooseSize` many integers randomly from it.
 * For example if sampleSize = 8 and chooseSize = 3, then 3 of the 0, 1, 2, ... 7 will be returned from this function. (e.g. [6, 1, 4])
 * @param sampleSize
 * @param chooseSize
 */
const chooseN = (sampleSize, chooseSize, excludedSamples = []) => {
    if (chooseSize > sampleSize) {
        throw new Error("Cannot choose more than the number of samples");
    }
    if (!Number.isInteger(chooseSize) || !Number.isInteger(sampleSize)) {
        throw new Error("Please give integers for the parameters");
    }
    if (chooseSize < 0 || sampleSize < 0) {
        throw new Error("Please give positive integers for the parameters");
    }
    let samples = (0, range_1.range)(sampleSize).filter((sample) => !excludedSamples.includes(sample));
    const chosenNumbers = [];
    for (let i = 0; i < chooseSize; i++) {
        const randomIndex = (0, rand_int_1.randInt)(samples.length);
        chosenNumbers.push(samples[randomIndex]);
        samples.splice(randomIndex, 1);
    }
    return chosenNumbers;
};
exports.chooseN = chooseN;
