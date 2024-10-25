import { test, expect } from "@playwright/test";
import { ZodMoodEnum } from "../types";
import entriesService from "../backend/services/entriesService";

test.beforeEach(async ({ page }) => {
  await entriesService.deleteAll();
  await page.goto("http://localhost:8080");
});

test.describe("Basic Page Loading", () => {
  test("Page loads", async ({ page }) => {
    await expect(page.getByText(/Mood Chooser/i)).toBeVisible();
  });

  test("Emotion choices shown", async ({ page }) => {
    await Promise.all(
      ZodMoodEnum.options.map((mood) =>
        expect(page.getByRole("button", { name: mood })).toBeVisible(),
      ),
    );
  });
});

test.describe("Logging moods", () => {
  test("No entries before posting", async ({ page }) => {
    await expect(
      page.getByRole("listitem").filter({ hasText: "joy" }),
    ).not.toBeVisible();
  });

  test("After posting 'joy', it's in the list, but anger is not", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "joy" }).click();

    await expect(
      page.getByRole("listitem").filter({ hasText: "joy" }),
    ).toBeVisible();

    await expect(
      page.getByRole("listitem").filter({ hasText: "anger" }),
    ).not.toBeVisible();
  });

  test("After posting 'anger', it's in the list, but joy is not", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "anger" }).click();

    await expect(
      page.getByRole("listitem").filter({ hasText: "anger" }),
    ).toBeVisible();

    await expect(
      page.getByRole("listitem").filter({ hasText: "joy" }),
    ).not.toBeVisible();
  });
});
