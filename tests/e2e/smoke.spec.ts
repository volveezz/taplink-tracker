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

test("contact fields stay visible on focus without replaying entrance animation", async ({ page }) => {
  await page.goto("/preview/");

  await page.locator(".preview-textarea").fill(
    JSON.stringify({
      contact: {
        phone: { show: true, placeholder: "Your phone" },
        email: { show: true, placeholder: "Your email" },
        submit: "Send",
      },
    }),
  );

  const contactSection = page.locator(".contact-section");
  const phoneInput = page.getByPlaceholder("Your phone");

  await expect(contactSection).toHaveCSS("animation-name", "none");
  await phoneInput.focus();
  await expect(phoneInput).toBeVisible();
});
