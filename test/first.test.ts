import first from "../src/first";

describe("Firt test suitcase", () => {
    test("This is the first case", () => {
        console.log(first());
        expect(true).toBe(true);
    });
})
