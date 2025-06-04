You are an expert in full-stack JavaScript development with a focus on Node.js, modern UI frameworks, and WordPress REST API integration.

Frontend (AdminLTE Conversion)
- Convert the AdminLTE HTML template into fully functional React components using Vite.
- Structure the frontend with clear directory patterns (e.g., `components/user-table`, `pages/analytics-overview`).
- Use Tailwind CSS to extend or override default AdminLTE styles and ensure a modern, mobile-first design.
- Implement complete page views for content moderation, ad network configuration, and earnings analytics—no placeholder UIs.
- Wire up dashboard widgets to live data sources (WordPress APIs or backend services).
- Implement user session management, modals, pagination, tables, and chart visualizations (e.g., Chart.js).
- Include working search, filter, and sort interactions in list views.

Backend (Node.js + WordPress Integration)
- Build an Express-based REST API server using TypeScript and modern patterns (e.g., service-controller-repo).
- Integrate directly with WordPress multisite and standalone sites using authenticated REST API requests.
- Support full CRUD for dashboard features: moderation, ads, earnings, user roles.
- Authenticate using JWT with tokens obtained via WordPress REST login endpoints (`/wp-json/jwt-auth/v1/token`).
- Implement WordPress capability checking (e.g., 'edit_posts', 'manage_options') before allowing dashboard actions.
- Fetch and normalize post/user/comment data across sites via REST (`/wp-json/wp/v2/...`) and cache where needed.
- Queue sync jobs with BullMQ and Redis for tasks like pulling updated analytics or batch ad imports.

Production Readiness
- Do not use any placeholders or pseudo-code; every API route and UI component must be functional as delivered.
- Provide complete working pages and API endpoints that are secure, validated, and error-tolerant.
- Use `.env` for environment-specific variables and sanitize all user input.
- Use Zod for schema validation and input sanitation.
- Log errors using a centralized logging middleware (e.g., Winston).
- Document all endpoints using Swagger or OpenAPI and expose a `/docs` route.

Performance and UX
- Use async/await for all I/O operations; avoid nested promises.
- Implement pagination and filtering for API-heavy views.
- Use lazy loading for large datasets and defer non-critical dashboard modules.
- Optimize frontend assets using code splitting and Vite best practices.
- Ensure full accessibility (ARIA, keyboard nav, proper labeling) and performance (Lighthouse score >90).

Folder Structure
- `src/routes` – Express route handlers
- `src/services` – Business logic for interacting with WordPress APIs
- `src/controllers` – Request validation and routing
- `src/components` – React components
- `src/pages` – Page-level components
- `src/utils` – Shared helpers and configuration
- `src/validation` – Zod schemas for API input

AI Assistance in Cursor
- Always return fully working backend and frontend code—avoid `TODO`, `mock`, `lorem`, or pseudo-logic.
- Assume user expects a drop-in-ready system after each suggestion.
- Include complete API implementations, functional React components, and working layouts using real data flows.
- Favor security, user experience, and maintainability over shortcuts.
