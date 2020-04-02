import sum from "../src/sum";

it("should be one", () => {
    expect(sum(1, 2)).toBe(1);
});

it("should be 5", () => {
    expect(sum(3, 2)).toBe(5);
});
