/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Assertion<T = HTMLElement> extends TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<HTMLElement, void> {}
}
