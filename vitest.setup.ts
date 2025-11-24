import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import React from "react";
import { configure } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

expect.extend(matchers);

// Polyfill matchMedia for components that rely on it
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

// Provide a global QueryClientProvider wrapper for tests so hooks using
// `useQuery`/`useMutation` work without needing to wrap each render.
const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

configure({
  wrapper: ({ children }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  ),
});
