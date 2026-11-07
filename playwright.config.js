import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./test/browser",
  timeout: 45000,
  expect: { timeout: 12000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {baseURL:"http://127.0.0.1:4173",browserName:"chromium",headless:true,acceptDownloads:true},
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  }
});
