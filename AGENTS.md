## Architecture

- **Framework:** Next.js 16 (App Router) with TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- **Data Fetching:** TanStack React Query v5 (client cache) + server components (direct TMDB API calls)
- **External API:** TMDB v3 (authenticated via bearer token in `src/lib/api-client.ts`)

### Directory Structure

```
src/
  app/              # App Router: pages, layouts, API routes
    (features)/     # Route group: movie & tv pages
    api/            # API route handlers (TMDB proxy)
  components/       # Shared UI (shadcn/ui primitives, header, footer)
  config/           # Env validation (Zod), route path definitions
  features/         # Domain modules (movie, tv), each with:
    api/            #   Server-side TMDB API functions
    components/     #   Feature-specific React components
    query/          #   React Query options & hooks
  lib/              # Utilities: API client, React Query config, helpers
  styles/           # Global CSS (Tailwind v4 entry point)
  types/            # TypeScript interfaces matching TMDB response shapes
```

### Key Conventions

- **No database** — all data comes from TMDB external API
- **Server components** for initial data (home pages, detail pages via `async/await`)
- **Client components** with React Query for interactive/paginated lists
- **API routes** (`/api/...`) act as server-side TMDB proxies, called from client hooks
- **Path alias** `@/*` maps to `./src/*`
- Default React Query config: `staleTime: 60s`, no refetch on focus, no retry

## Important Constraints

- Do not install unnecessary dependencies
- Do not modify unrelated files
- Keep code simple and maintainable
- Prefer explicit code over magic abstractions
- Use context timeout for external resources
- Do not implement testing until I need that
