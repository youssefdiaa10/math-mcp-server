import { describe, expect, test } from "vitest";
import { add, divide, multiply, subtract } from "./math.js";

describe("Math function", () => {
  test("handles floating-point calculations", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test("adds 2 numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles zero", () => {
    expect(add(0, 7)).toBe(7);
  });

  test("handles decimal numbers", () => {
    expect(add(0.5, 0.25)).toBe(0.75);
  });

  test("handles adding different signs", () => {
    expect(add(1, -0.5)).toBe(0.5);
    expect(add(-4, 1.5)).toBe(-2.5);
  });

  test("subtracts 2 numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("handles negative numbers", () => {
    expect(subtract(-5, 3)).toBe(-8);
  });

  test("multiplies two numbers", () => {
    expect(multiply(5, 4)).toBe(20);
  });

  test("divides two numbers", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("throws an error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});
