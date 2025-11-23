# AI Agent Rules for Monynha Softwares Corporate Website

This document outlines the technical guidelines and best practices for AI agents contributing to the Monynha Softwares corporate website. Adherence to these rules ensures consistency, maintainability, performance, and accessibility.

## Tech Stack Overview

1.  **Frontend Framework**: React with TypeScript, bundled by Vite.
2.  **Routing**: React Router for all client-side navigation.
3.  **Styling**: Tailwind CSS for utility-first styling, complemented by custom token scales.
4.  **UI Components**: `shadcn/ui` primitives for foundational UI elements.
5.  **Animations**: Framer Motion and GSAP for advanced UI animations and transitions.
6.  **3D Graphics**: `@react-three/fiber` and `@react-three/drei` for immersive 3D backgrounds and effects.
7.  **Backend Integration**: Supabase for database, authentication, and storage services.
8.  **Data Fetching & Caching**: React Query (`@tanstack/react-query`) for managing server state.
9.  **Form Management & Validation**: React Hook Form with Zod for robust form handling.
10. **Icons**: `lucide-react` for vector icons.
11. **Notifications**: `sonner` and `useToast` for user feedback.

## Library Usage Guidelines

To maintain consistency and leverage existing patterns, use the following libraries for their designated purposes:

*   **React**: For all UI development, component creation, and state management (local component state).
*   **React Router**: For defining and managing all application routes. Keep routes centralized in `src/App.tsx`.
*   **Tailwind CSS**: **Mandatory** for all styling. Utilize Tailwind classes for layout, spacing, colors, typography, and responsive design. Avoid inline styles or custom CSS files unless absolutely necessary for complex animations not achievable with Tailwind.
*   **shadcn/ui**: For standard UI components (e.g., Button, Input, Card, Dialog). **Do not modify files within `src/components/ui/`**. If a component needs customization beyond its props, create a new component in `src/components/` that wraps or extends the `shadcn/ui` primitive.
*   **Framer Motion / GSAP**: For declarative and performant animations. Prioritize Framer Motion for component-level animations and GSAP for more complex, timeline-based sequences.
*   **@react-three/fiber / @react-three/drei**: For any 3D rendering. These are typically used within dedicated background components (e.g., `LiquidEtherBackground`).
*   **Supabase**: For all interactions with the database, authentication, and storage. Use the client initialized in `src/integrations/supabase/client.ts`.
*   **React Query (`@tanstack/react-query`)**: For fetching, caching, and synchronizing server-side data. Use `useQuery` for reads and `useMutation` for writes.
*   **Zod**: For defining and validating data schemas, especially for forms and API payloads.
*   **Lucide React**: For all icons used across the application.
*   **Sonner / useToast**: For displaying toast notifications to the user.
*   **React Bits Components (`src/components/reactbits/`)**: These are custom-animated components. When using them, adhere to the following:
    *   **Performance**: Limit heavy animated components to 2-3 per page.
    *   **Accessibility**: Always implement `prefers-reduced-motion` fallbacks for animated backgrounds and effects.
    *   **Reusability**: Leverage existing React Bits components where appropriate before creating new custom animations.
*   **New Components**: Always create new files for new components or hooks. Place them in `src/components/` (for reusable UI elements) or `src/pages/` (for route-specific components). Aim for small, focused components (ideally under 100 lines of code).
*   **Error Handling**: Do not use `try/catch` blocks for API calls unless specifically requested. Allow errors to bubble up for centralized handling (e.g., by React Query's `onError` or global error boundaries).
*   **Responsiveness**: All designs must be responsive and adapt gracefully to different screen sizes.