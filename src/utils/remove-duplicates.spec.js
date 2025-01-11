"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_duplicates_1 = require("../utils/remove-duplicates");
describe("removeDuplicates", () => {
    it("should remove duplicate objects based on a custom comparison function", () => {
        const items = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 1, name: "Alice" },
        ];
        const uniqueItems = (0, remove_duplicates_1.removeDuplicates)(items, (a, b) => a.id === b.id);
        expect(uniqueItems).toEqual([
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ]);
    });
    it("should return an empty array if input is empty", () => {
        const items = [];
        const uniqueItems = (0, remove_duplicates_1.removeDuplicates)(items, (a, b) => a === b);
        expect(uniqueItems).toEqual([]);
    });
    it("should handle primitive values correctly", () => {
        const items = [1, 2, 2, 3, 1];
        const uniqueItems = (0, remove_duplicates_1.removeDuplicates)(items, (a, b) => a === b);
        expect(uniqueItems).toEqual([1, 2, 3]);
    });
    it("should return the same array if there are no duplicates", () => {
        const items = [1, 2, 3];
        const uniqueItems = (0, remove_duplicates_1.removeDuplicates)(items, (a, b) => a === b);
        expect(uniqueItems).toEqual([1, 2, 3]);
    });
    it("should handle complex nested objects", () => {
        const items = [
            { id: 1, details: { name: "Alice" } },
            { id: 2, details: { name: "Bob" } },
            { id: 1, details: { name: "Alice" } },
        ];
        const uniqueItems = (0, remove_duplicates_1.removeDuplicates)(items, (a, b) => a.id === b.id);
        expect(uniqueItems).toEqual([
            { id: 1, details: { name: "Alice" } },
            { id: 2, details: { name: "Bob" } },
        ]);
    });
});
