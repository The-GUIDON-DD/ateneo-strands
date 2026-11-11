# AGENTS.md

Repository-specific guidance for coding agents working in this codebase.

## Repository Overview & Boundaries

- **Package Manager**: `pnpm` (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).
- **Framework & Build**: React Router v8 (`ssr: false` in `react-router.config.ts`), Vite, Tailwind CSS v4, and `@cloudflare/vite-plugin`.
- **Path Alias**: `~/*` resolves to `./app/*` (`tsconfig.json`).
- **Local Reference Docs**: Available under `.agents/skills/react-router/`.

## Common Commands

All commands should be executed with `pnpm` from the repository root:

- **Type Check**: `pnpm typecheck` (`react-router typegen && tsc`)
- **Lint (with auto-fix)**: `pnpm lint` (`pnpx @biomejs/biome lint --write ./`)
- **Format (with auto-fix)**: `pnpm format` (`pnpx @biomejs/biome format --write ./`)
- **Build**: `pnpm build` (`react-router build`)
- **Dev Server**: `pnpm dev` (`react-router dev`)
- **Cloudflare Types**: `pnpm cf-typegen` (`wrangler types`)

## Focused Verification Commands

- **Check & format single file**: `pnpx @biomejs/biome check --write <path>`
- **Check single file without writing**: `pnpx @biomejs/biome check <path>`
- **Typecheck code**: `pnpm typecheck`

*Note*: Git hooks are configured via `lefthook` (`lefthook.yml`) to run Biome checks on pre-commit and pre-push.

## Generated Files & Protected Areas

- `.react-router/` – Generated route types and build artifacts. Do not edit manually.
- `build/` – Production build output (`build/client/` and `build/server/`).
- `.wrangler/` – Cloudflare Wrangler build/runtime cache.
- `pnpm-lock.yaml` – Dependency lockfile; update only via `pnpm`.

## Formatting & Code Conventions

- **Tooling**: Enforced by Biome (`biome.json`).
- **JS/TS Quotes**: Double quotes (`"quoteStyle": "double"`).
- **Indentation**: Spaces.
- **Import Formatting**: Managed automatically by Biome (`organizeImports`).

## Security & Data Handling

- Do not commit credentials, secrets, or private tokens (e.g. Telegram tokens/IDs in `.github/workflows/`).

## Completion Criteria

1. `pnpm typecheck` succeeds without errors.
2. `pnpx @biomejs/biome check <files>` passes without formatting or lint issues.
3. `pnpm build` completes successfully.
