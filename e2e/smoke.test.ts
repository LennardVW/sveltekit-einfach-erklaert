import { expect, test } from '@playwright/test';

test('Startseite lädt ohne Konsolenfehler', async ({ page }) => {
	const errors: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text());
	});
	page.on('pageerror', (err) => errors.push(err.message));

	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page).toHaveTitle('SvelteKit, einfach erklärt');
	for (const id of ['start', 'problem', 'trick', 'ordner', 'server', 'robust', 'nutzer', 'fazit']) {
		await expect(page.locator(`section#${id}`)).toBeVisible();
	}
	expect(errors).toEqual([]);
});
