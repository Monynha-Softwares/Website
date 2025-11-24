import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useContactForm } from "../useContactForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Mock the Supabase client
const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({
  insert: mockInsert,
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: mockFrom,
  },
}));

describe("useContactForm", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    mockInsert.mockClear();
    mockFrom.mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should successfully submit contact form data to Supabase", async () => {
    mockInsert.mockResolvedValueOnce({ data: null, error: null });

    const { result } = renderHook(() => useContactForm(), { wrapper });

    const formData = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a test message.",
    };

    result.current.mutate(formData);

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFrom).toHaveBeenCalledWith("contact_messages");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        message: "This is a test message.",
        status: "unread",
      },
    ]);
  });

  it("should handle submission error", async () => {
    const errorMessage = "Network error";
    mockInsert.mockResolvedValueOnce({ data: null, error: new Error(errorMessage) });

    const { result } = renderHook(() => useContactForm(), { wrapper });

    const formData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      message: "This is another test message.",
    };

    result.current.mutate(formData);

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe(errorMessage);
    expect(mockFrom).toHaveBeenCalledWith("contact_messages");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        message: "This is another test message.",
        status: "unread",
      },
    ]);
  });

  it("should validate form data before submission", async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    const invalidFormData = {
      name: "Jo", // Too short
      email: "invalid-email", // Invalid format
      message: "Short", // Too short
    };

    result.current.mutate(invalidFormData as any); // Cast to any to bypass TS for testing validation

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain("Name must be at least 2 characters");
    expect(result.current.error?.message).toContain("Invalid email address");
    expect(result.current.error?.message).toContain("Message must be at least 10 characters");
    expect(mockInsert).not.toHaveBeenCalled(); // Should not attempt to insert invalid data
  });
});