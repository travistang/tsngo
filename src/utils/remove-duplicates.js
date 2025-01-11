"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = void 0;
const removeDuplicates = (items, compareFn) => {
    const uniques = [];
    for (const item of items) {
        if (!uniques.some((unique) => compareFn(unique, item))) {
            uniques.push(item);
        }
    }
    return uniques;
};
exports.removeDuplicates = removeDuplicates;
