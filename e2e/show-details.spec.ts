import { test, expect } from '@playwright/test';

test.describe('Show Details Page', () => {
    test('should load show details page', async ({ page }) => {
        // Navigate to a specific show (using show ID 1)
        await page.goto('/show/1');

        // Wait for content to load - look for the show title
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        // Check that show title is displayed
        const title = page.locator('[data-slot="card-title"]');
        await expect(title).toBeVisible();
    });

    test('should display show information', async ({ page }) => {
        await page.goto('/show/1');
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        // Check for various show details elements
        const showImage = page.locator('img').first();
        await expect(showImage).toBeVisible();
    });

    test('should toggle favorite status', async ({ page }) => {
        await page.goto('/show/1');
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        // Find the favorite button (heart icon)
        const favoriteButton = page.getByRole('button', { name: /Add to favorites/i });

        if (await favoriteButton.isVisible()) {
            // Click to add to favorites
            await favoriteButton.click();

            // Wait for state to update
            await page.waitForTimeout(300);

            // Navigate to favorites page to verify
            await page.goto('/favorites');
            await page.waitForTimeout(500);

            // Check that the show appears in favorites
            const showCards = page.locator('[role="article"]');
            const count = await showCards.count();
            expect(count).toBeGreaterThan(0);
        }
    });

    test('should navigate back to home', async ({ page }) => {
        await page.goto('/show/1');
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        // Click the header link to go back home (brand or Home nav)
        const homeLink = page.getByRole('link', { name: /ShowSpotter|Home/i }).first();
        await homeLink.click();

        // Check that we're back on the home page
        await expect(page).toHaveURL('/');
    });
});
