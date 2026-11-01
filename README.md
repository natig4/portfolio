# New Generation SW — nati-gurevich.com

Company site and portfolio for New Generation SW (Nati Gurevich). Next.js 16 (App Router), next-intl (Hebrew default + English), Tailwind CSS v4, statically generated.

## Scripts

| Command                                      | What it does                                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`                                | Typecheck, then start the dev server (HTTPS)                                                                                   |
| `npm run build` / `npm start`                | Production build / serve it                                                                                                    |
| `npm run typecheck`                          | `next typegen` + `tsc` (translation keys are type-checked against `messages/en.json`)                                          |
| `npm run lint`                               | ESLint (flat config)                                                                                                           |
| `npm run check:messages`                     | Verify `en.json` and `he.json` have the same keys, array lengths and placeholders (`-- --strict` also fails on `TODO`/`[TBD]`) |
| `npm run screenshots`                        | Capture live client sites into `src/assets/projects/<slug>/` (`-- --only mirk` for one)                                        |
| `npm run qa -- --base http://localhost:3000` | Full-page screenshots of every route × locale × theme × width into `.qa/` (`--quick` for a subset)                             |
| `node scripts/generate-icons.mjs`            | Re-render PNG icons from `src/app/icon.svg`                                                                                    |

Screenshot scripts use `playwright-core` with `$CHROME_PATH` or a locally installed Playwright Chromium.

## Content

Structured data lives in `src/data/*.ts`; all visible copy lives in `messages/{en,he}.json` under the same ids. Brand names and tech labels are never translated (`src/lib/tech.ts`).

### Add a project

1. Add an entry to `src/data/projects.ts` (array order is display order).
2. Add `projects.items.<slug>` copy to **both** message files.
3. Screenshots: for a live site, add it to `PROJECTS` in `scripts/capture-screenshots.mjs` and run `npm run screenshots -- --only <slug>`. Otherwise drop `desktop.jpg` (1440×900, optional `mobile.jpg` 390×844 and `full.jpg`) into `src/assets/projects/<slug>/`. Then import them in `src/data/project-images.ts`. Without screenshots the project shows a placeholder.

### Add a marketing case or article

- Marketing: add an entry to `src/data/marketing.ts` (metrics as % change, optional chart image per locale in `src/assets/marketing/`) and `marketing.cases.<slug>` copy.
- Articles: add an entry to `src/data/articles.ts` (URL, ISO date, language) and `articles.items.<slug>` copy.

### Hebrew text tips

- Use ׳ and ״ rather than `'` and `"` (ICU treats apostrophes specially).
- Wrap Latin tokens that start or end with punctuation (`.NET`, `C#`) in bidi isolates (`⁦…⁩`) so they don't flip inside RTL sentences.

## Design system

Tokens are CSS variables in `src/app/globals.css` (`@theme inline`), light and dark: zinc neutrals with the NG cyan accent (`--accent`: `#0E7490` light / `#22D3EE` dark). Fonts: IBM Plex Sans + Plex Sans Hebrew, Plex Mono for labels. Use logical utilities (`ms-`, `ps-`, `start-`, `border-s`) so layouts mirror in RTL.
