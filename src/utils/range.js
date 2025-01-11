"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const range = (size) => Array(size)
    .fill(0)
    .map((_, i) => i);
exports.range = range;
