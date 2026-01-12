import { test, expect } from '@playwright/test';

test.describe('Favorites Functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
    });

    test('should add show to favorites from home page', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('[role="article"]', { timeout: 10000 });

        // Find and click the first favorite button (heart icon)
        const favoriteButtons = page.locator('button[aria-label*="Add"]').filter({ hasText: '' });
        const firstButton = favoriteButtons.first();

        if (await firstButton.isVisible()) {
            await firstButton.click();
            await page.waitForTimeout(300);

            // Navigate to favorites page
            await page.goto('/favorites');
            await page.waitForTimeout(500);

            // Check that favorites page has content
            const showCards = page.locator('[role="article"]');
            const count = await showCards.count();
            expect(count).toBeGreaterThan(0);
        }
    });

    test('should remove show from favorites', async ({ page }) => {
        // First add a show to favorites
        await page.goto('/show/1');
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        const favoriteButton = page.getByRole('button', { name: /Add to favorites/i });
        if (await favoriteButton.isVisible()) {
            await favoriteButton.click();
            await page.waitForTimeout(300);
        }

        // Navigate to favorites page
        await page.goto('/favorites');
        await page.waitForTimeout(500);

        // Remove the show from favorites
        const removeButton = page.locator('button[aria-label*="Remove"]').first();
        if (await removeButton.isVisible()) {
            await removeButton.click();
            await page.waitForTimeout(300);

            // Check that the show was removed
            const emptyMessage = page.getByText(/no favorites/i);
            await expect(emptyMessage).toBeVisible();
        }
    });

    test('should persist favorites across page reloads', async ({ page }) => {
        // Add a show to favorites
        await page.goto('/show/1');
        await page.waitForSelector('[data-slot="card-title"]', { timeout: 10000 });

        const favoriteButton = page.getByRole('button', { name: /Add to favorites/i });
        if (await favoriteButton.isVisible()) {
            await favoriteButton.click();
            await page.waitForTimeout(300);
        }

        // Reload the page
        await page.reload();
        await page.waitForTimeout(500);

        // Navigate to favorites
        await page.goto('/favorites');
        await page.waitForTimeout(500);

        // Check that favorites are still there
        const showCards = page.locator('[role="article"]');
        const count = await showCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display empty state when no favorites', async ({ page }) => {
        await page.goto('/favorites');
        await page.waitForTimeout(500);

        // Check for empty state message
        const emptyMessage = page.getByText(/no favorites/i);
        await expect(emptyMessage).toBeVisible();
    });
});
