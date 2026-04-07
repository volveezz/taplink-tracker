import { expect, test } from "@playwright/test";

test("live page renders the migrated landing shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading")).toBeVisible();
  await expect(page.getByRole("link", { name: /telegram/i })).toBeVisible();
});

test("preview page stays isolated from the public landing shell", async ({ page }) => {
  await page.goto("/preview/");

  await expect(page.getByText(/preview controls/i)).toBeVisible();
  await expect(page.getByText(/flag-backed json override/i)).toBeVisible();
});
