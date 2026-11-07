import { test, expect } from "@playwright/test";

test("home and all 24 tools load without uncaught JS errors",async({page})=>{
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 await page.goto("/");
 await expect(page.locator(".hero")).toBeVisible();
 await expect(page.locator(".hero-search input")).toBeVisible();
 await page.goto("/tools/");
 await expect(page.locator(".directory-list .tool-card")).toHaveCount(24);
 await page.locator("#directory-search").fill("QR");
 await expect(page.locator(".directory-list .tool-card")).toHaveCount(1);
 expect(errors).toEqual([]);
});

test("festival library search opens poster with the chosen motto and exports PNG",async({page})=>{
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 await page.goto("/festivals/");
 await expect(page.locator("#fs-grid .fs-card")).toHaveCount(75);
 await page.locator("#fs-search").fill("लक्ष्मी");
 await expect(page.locator("#fs-grid .fs-card")).toHaveCount(1);
 await page.locator('[data-festival-design="laxmi-puja"]').click();
 await expect(page).toHaveURL(/\/poster-maker\/$/);
 await expect(page.locator("#ps-canvas")).toBeVisible();
 await expect(page.locator("#ps-title")).toHaveValue(/दीपको उज्यालो/);
 await page.locator("#ps-format").selectOption("square");
 await expect(page.locator("#ps-canvas")).toHaveAttribute("height","1080");
 const downloadPromise=page.waitForEvent("download");
 await page.locator("#ps-export").click();
 const dl=await downloadPromise;
 expect(dl.suggestedFilename()).toMatch(/todaynepal-.*\.png$/);
 expect(errors).toEqual([]);
});

test("daily quote navigation and handoff are interactive",async({page})=>{
 await page.goto("/daily-quotes/");
 await expect(page.locator("#fs-daily-text")).not.toBeEmpty();
 const previous=await page.locator("#fs-daily-text").innerText();
 await page.locator("#fs-next").click();
 expect(await page.locator("#fs-daily-text").innerText()).not.toBe(previous);
 await page.locator("#fs-quote-design").click();
 await expect(page).toHaveURL(/\/poster-maker\/$/);
 await expect(page.locator("#ps-title")).not.toBeEmpty();
});

test("financial and QR utilities provide client-side results",async({page})=>{
 await page.goto("/vat-calculator/");
 await expect(page.locator("#ex-vat-total")).toContainText("1,130");
 await page.locator("#ex-vat-method").selectOption("extract");
 await page.locator("#ex-vat-calc").click();
 await expect(page.locator("#ex-vat-total")).toContainText("1,000");
 await page.goto("/emi-calculator/");
 await expect(page.locator("#ex-emi")).not.toHaveText("—");
 await page.goto("/qr-maker/");
 await expect(page.locator("#ex-qr-canvas")).toBeVisible();
 await page.waitForFunction(()=>document.querySelector("#ex-qr-canvas")?.toDataURL("image/png").length>3000);
 await page.locator("#ex-qr-text").fill("https://todaynepal.com/design/");
 await page.locator("#ex-qr-make").click();
 await expect(page.locator("#ex-message")).toContainText("QR तयार");
});

test("typing converter, catalog filtering and password generation",async({page})=>{
 await page.goto("/unicode-to-preeti/");
 await page.locator("#conv-input").fill("नेपाल");
 await expect(page.locator("#conv-output")).not.toHaveValue("");
 await page.goto("/festivals/");
 await page.locator("#fs-category").selectOption("नेवार");
 expect(await page.locator("#fs-grid .fs-card").count()).toBeGreaterThan(5);
 await page.goto("/password-generator/");
 await expect(page.locator("#ex-password")).not.toBeEmpty();
 expect((await page.locator("#ex-password").innerText()).length).toBe(20);
 await page.locator("#ex-pass-generate").click();
 await expect(page.locator("#ex-password")).not.toBeEmpty();
});

test("festival designer preserves manual content and opens poster",async({page})=>{
 await page.goto("/festival-studio/?festival=chhath");
 await expect(page.locator("#fs-editor-festival")).toHaveValue("chhath");
 await page.locator("#fs-editor-title").fill("छठको मौलिक शुभकामना");
 await page.locator("#fs-create-poster").click();
 await expect(page).toHaveURL(/\/poster-maker\/$/);
 await expect(page.locator("#ps-title")).toHaveValue("छठको मौलिक शुभकामना");
});
