import { existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";

/** Launch Chromium: $CHROME_PATH, else the locally installed Playwright build, else Playwright's default. */
export function launchBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.LOCALAPPDATA &&
      join(
        process.env.LOCALAPPDATA,
        "ms-playwright",
        "chromium-1243",
        "chrome-win64",
        "chrome.exe",
      ),
  ].filter(Boolean);
  const executablePath = candidates.find((p) => existsSync(p));
  return chromium.launch(executablePath ? { executablePath } : {});
}
