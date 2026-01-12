import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
    });

    test('should toggle between light and dark themes', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // Find the theme toggle button
        const themeToggle = page.locator('button[aria-label*="theme" i]').or(page.locator('button').filter({ has: page.locator('svg') }).first());

        if (await themeToggle.isVisible()) {
            // Get initial theme
            const htmlElement = page.locator('html');
            const initialClass = await htmlElement.getAttribute('class');

            // Toggle theme
            await themeToggle.click();
            await page.waitForTimeout(300);

            // Check that theme changed
            const newClass = await htmlElement.getAttribute('class');
            expect(newClass).not.toBe(initialClass);
        }
    });

    test('should persist theme preference across page reloads', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // Find and click theme toggle
        const themeToggle = page.locator('button[aria-label*="theme" i]').or(page.locator('button').filter({ has: page.locator('svg') }).first());

        if (await themeToggle.isVisible()) {
            await themeToggle.click();
            await page.waitForTimeout(300);

            // Get current theme
            const htmlElement = page.locator('html');
            const themeAfterToggle = await htmlElement.getAttribute('class');

            // Reload page
            await page.reload();
            await page.waitForTimeout(500);

            // Check that theme persisted
            const themeAfterReload = await htmlElement.getAttribute('class');
            expect(themeAfterReload).toBe(themeAfterToggle);
        }
    });

    test('should apply dark theme styles correctly', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // Set to dark mode
        const themeToggle = page.locator('button[aria-label*="theme" i]').or(page.locator('button').filter({ has: page.locator('svg') }).first());

        if (await themeToggle.isVisible()) {
            // Click until we get dark mode
            const htmlElement = page.locator('html');
            let currentClass = await htmlElement.getAttribute('class');

            if (!currentClass?.includes('dark')) {
                await themeToggle.click();
                await page.waitForTimeout(300);
            }

            // Verify dark class is applied
            currentClass = await htmlElement.getAttribute('class');
            expect(currentClass).toContain('dark');
        }
    });
});
