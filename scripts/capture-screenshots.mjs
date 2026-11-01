// Screenshot tooling.
//
//   node scripts/capture-screenshots.mjs projects [--only <slug>]
//     Captures live client sites into src/assets/projects/<slug>/{desktop,mobile,full}.jpg
//
//   node scripts/capture-screenshots.mjs qa [--base http://localhost:3000] [--quick]
//     Captures this site across locales × themes × widths into .qa/<timestamp>/ for visual review.
//
// Uses playwright-core with $CHROME_PATH or the locally installed Playwright Chromium.
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { launchBrowser } from "./lib/browser.mjs";

const args = process.argv.slice(2);
const mode = args[0];
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : (args[i + 1] ?? true);
};

const PROJECTS = [
  { slug: "mirk", url: "https://mirk.co.il/" },
  { slug: "my-north-food", url: "https://mynorthfood.com/" },
  { slug: "tor-group", url: "https://thetorgroup.com/" },
];

const QA_ROUTES = [
  "",
  "/projects",
  "/projects/mirk",
  "/projects/reports-manager",
  "/about",
  "/marketing",
  "/articles",
  "/contact",
  "/accessibility",
  "/missing-page",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Scroll through the page so lazy images and on-scroll reveals render, then return to the top. */
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1200);
}

/**
 * Third-party sites carry cookie bars, chat/WhatsApp bubbles and accessibility buttons.
 * Click an obvious consent button if present, then hide every fixed element that is not a top bar.
 */
async function hideOverlays(page) {
  const consent = page.getByRole("button", {
    name: /^(אשרו הכל|הבנתי|אישור|אני מסכים|Accept( all)?|Got it|OK)$/i,
  });
  if (await consent.count())
    await consent
      .first()
      .click({ timeout: 2000 })
      .catch(() => {});
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed") continue;
      const rect = el.getBoundingClientRect();
      const isTopBar =
        rect.top <= 1 &&
        rect.width >= window.innerWidth * 0.9 &&
        rect.height < 160;
      if (!isTopBar) el.style.setProperty("visibility", "hidden", "important");
    }
  });
}

async function captureProjects(browser) {
  const only = flag("only");
  for (const { slug, url } of PROJECTS.filter(
    (p) => !only || p.slug === only,
  )) {
    const dir = join("src", "assets", "projects", slug);
    await mkdir(dir, { recursive: true });

    const shots = [
      {
        name: "desktop",
        viewport: { width: 1440, height: 900 },
        scale: 1.5,
        full: false,
      },
      {
        name: "full",
        viewport: { width: 1440, height: 900 },
        scale: 1,
        full: true,
      },
      {
        name: "mobile",
        viewport: { width: 390, height: 844 },
        scale: 2,
        full: false,
        mobile: true,
      },
    ];

    for (const shot of shots) {
      const context = await browser.newContext({
        viewport: shot.viewport,
        deviceScaleFactor: shot.scale,
        isMobile: !!shot.mobile,
        hasTouch: !!shot.mobile,
        locale: "he-IL",
        colorScheme: "light",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await hideOverlays(page);
      await warmUp(page);
      await hideOverlays(page);

      const path = join(dir, `${shot.name}.jpg`);
      if (shot.full) {
        const height = await page.evaluate(
          () => document.documentElement.scrollHeight,
        );
        await page.screenshot({
          path,
          type: "jpeg",
          quality: 82,
          fullPage: true,
          clip: {
            x: 0,
            y: 0,
            width: shot.viewport.width,
            height: Math.min(height, 7200),
          },
        });
      } else {
        await page.screenshot({ path, type: "jpeg", quality: 82 });
      }
      console.log("captured", path);
      await context.close();
    }
  }
}

async function captureQa(browser) {
  const base = (flag("base") ?? "http://localhost:3000").replace(/\/$/, "");
  const quick = !!flag("quick");
  const routes = quick
    ? ["", "/projects", "/projects/mirk", "/about"]
    : QA_ROUTES;
  const widths = quick ? [375, 1440] : [375, 768, 1024, 1440];
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

  for (const locale of ["he", "en"]) {
    for (const theme of ["light", "dark"]) {
      for (const width of widths) {
        const dir = join(".qa", stamp, `${locale}-${theme}-${width}`);
        await mkdir(dir, { recursive: true });
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          reducedMotion: "reduce",
          colorScheme: theme,
        });
        await context.addInitScript(
          (t) => localStorage.setItem("theme", t),
          theme,
        );
        const page = await context.newPage();
        for (const route of routes) {
          await page.goto(`${base}/${locale}${route}`, {
            waitUntil: "networkidle",
          });
          await warmUp(page);
          const name = route.replace(/\//g, "_").replace(/^_/, "") || "home";
          await page.screenshot({
            path: join(dir, `${name}.png`),
            fullPage: true,
          });
        }
        await context.close();
        console.log("captured", dir);
      }
    }
  }
  console.log(`\nQA screenshots in .qa/${stamp}`);
}

if (mode !== "projects" && mode !== "qa") {
  console.error(
    "Usage: capture-screenshots.mjs <projects|qa> [--only slug] [--base url] [--quick]",
  );
  process.exit(1);
}

const browser = await launchBrowser();
try {
  await (mode === "projects" ? captureProjects(browser) : captureQa(browser));
} finally {
  await browser.close();
}
