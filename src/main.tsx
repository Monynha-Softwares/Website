import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n.ts'; // Import our i18n configuration

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}> {/* Wrap App with I18nextProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </I18nextProvider>
);