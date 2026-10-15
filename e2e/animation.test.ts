import { expect, test } from '@playwright/test';

test.describe('reduzierte Bewegung', () => {
	test.use({ reducedMotion: 'reduce' });

	test('zeigt den Endzustand ohne Pin', async ({ page }) => {
		await page.goto('/');
		await page.locator('#problem').scrollIntoViewIfNeeded();
		const kiste = page.locator('#problem [data-crate]', { hasText: 'Ihre eigentliche Seite' });
		await expect(kiste).toBeVisible();
		await expect(kiste).toHaveCSS('opacity', '1');
		await expect(page.locator('.pin-spacer')).toHaveCount(0);
	});
});

test('Fazit-Sätze sind am Seitenende sichtbar, ohne Konsolenfehler', async ({ page }) => {
	const errors: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text());
	});
	page.on('pageerror', (err) => errors.push(err.message));

	await page.goto('/');
	await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
	const saetze = page.locator('#fazit [data-sentence]');
	await expect(saetze).toHaveCount(3);
	for (const satz of await saetze.all()) {
		await expect(satz).toBeVisible();
		// scrub läuft mit Verzögerung, deshalb auf den Endwert warten
		await expect(satz).toHaveCSS('opacity', '1');
	}
	expect(errors).toEqual([]);
});

test.describe('ohne JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('Überschriften bleiben sichtbar', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
		const h2 = page.locator('h2');
		await expect(h2).toHaveCount(7);
		for (const h of await h2.all()) await expect(h).toBeVisible();
	});
});
