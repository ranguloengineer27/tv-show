import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the home page successfully', async ({ page }) => {
        // Check that the main heading is present (visually hidden for accessibility)
        await expect(page.locator('h1')).toContainText('Explore TV Shows');
    });

    test('should display search input', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Search TV shows...');
        await expect(searchInput).toBeVisible();
    });

    test('should display show cards', async ({ page }) => {
        // Wait for shows to load
        await page.waitForSelector('[role="article"]', { timeout: 10000 });
        const showCards = page.locator('[role="article"]');
        const count = await showCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should search for shows', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Search TV shows...');
        await searchInput.fill('Breaking Bad');

        // Wait for search results
        await page.waitForTimeout(500); // Wait for debounce
        await page.waitForSelector('[role="article"]', { timeout: 10000 });

        // Check that results are displayed
        const showCards = page.locator('[role="article"]');
        const count = await showCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should navigate through pagination', async ({ page }) => {
        // Wait for shows to load
        await page.waitForSelector('[role="article"]', { timeout: 10000 });

        // Check if pagination exists
        const nextButton = page.getByLabel('Go to next page');
        if (await nextButton.isVisible()) {
            // Capture the first show's title on page 1
            const firstTitleBefore = await page.locator('[role="article"]')
                .first()
                .locator('[data-slot="card-title"]')
                .innerText();

            await nextButton.click();

            // Wait for page to update
            await page.waitForTimeout(300);

            // Check that the list of shows has changed (we're on a different page)
            const firstTitleAfter = await page.locator('[role="article"]')
                .first()
                .locator('[data-slot="card-title"]')
                .innerText();

            expect(firstTitleAfter).not.toBe(firstTitleBefore);
        }
    });

    test('should navigate to show details when clicking "See more"', async ({ page }) => {
        // Wait for shows to load
        await page.waitForSelector('[role="article"]', { timeout: 10000 });

        // Click the first "See more" button
        const seeMoreButton = page.getByRole('button', { name: 'See more' }).first();
        await seeMoreButton.click();

        // Check that show details content is displayed
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });
        const title = page.locator('[data-slot="card-title"]').first();
        await expect(title).toBeVisible();
    });
});
