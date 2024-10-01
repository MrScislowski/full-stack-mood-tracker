import { test, expect } from "@playwright/test";
import { MoodEnum } from "../types";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Basic Page Loading", () => {
  test("Page loads", async ({ page }) => {
    await expect(page.getByText(/welcome to the mood tracker/i)).toBeVisible();
  });

  test("Emotion choices shown", async ({ page }) => {
    await Promise.all(
      MoodEnum.options.map((mood) =>
        expect(page.getByRole("button", { name: mood })).toBeVisible(),
      ),
    );
  });
});
