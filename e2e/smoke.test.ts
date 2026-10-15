import { expect, test, type Page } from '@playwright/test';

const abschnitte = ['start', 'problem', 'trick', 'ordner', 'server', 'robust', 'nutzer', 'fazit'];

// Sammelt Konsolenfehler und Seitenfehler, solange der Test läuft
function fehlerSammeln(page: Page) {
	const fehler: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') fehler.push(msg.text());
	});
	page.on('pageerror', (err) => fehler.push(err.message));
	return fehler;
}

test.describe('Smoke', () => {
	test('Titel und genau eine H1', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('SvelteKit, einfach erklärt');
		await expect(page.locator('h1')).toHaveCount(1);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('alle acht Abschnitte haben eine sichtbare Überschrift', async ({ page }) => {
		await page.goto('/');
		for (const id of abschnitte) {
			const abschnitt = page.locator(`section#${id}`);
			await expect(abschnitt).toHaveCount(1);
			// Überschriften blenden erst beim Erreichen des Abschnitts ein
			await abschnitt.evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
			await expect(abschnitt.locator('h1, h2').first()).toBeVisible();
		}
	});

	test('keine Konsolenfehler beim Laden und Durchscrollen', async ({ page }) => {
		const fehler = fehlerSammeln(page);
		await page.goto('/');
		let letzte = -1;
		for (let i = 0; i < 400; i++) {
			const y = await page.evaluate(() => {
				window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'instant' });
				return window.scrollY;
			});
			if (y === letzte) break;
			letzte = y;
			await page.waitForTimeout(30);
		}
		await expect(page.locator('#fazit [data-sentence]').last()).toBeVisible();
		expect(fehler).toEqual([]);
	});

	test('kein horizontales Scrollen', async ({ page }) => {
		await page.goto('/');
		const breiter = await page.evaluate(
			() => document.documentElement.scrollWidth > window.innerWidth
		);
		expect(breiter).toBe(false);
	});

	test('Fließtext ist mindestens 18 px groß', async ({ page }) => {
		await page.goto('/');
		const zuKlein = await page.evaluate(() =>
			[...document.querySelectorAll('main p')]
				.filter((p) => !p.closest('[data-ui]') && p.getClientRects().length > 0)
				.map((p) => ({ text: p.textContent?.trim().slice(0, 40), px: parseFloat(getComputedStyle(p).fontSize) }))
				.filter((p) => p.px < 18)
		);
		expect(zuKlein).toEqual([]);
	});

	test('Zähler im Abschnitt Trick zählt hoch', async ({ page }) => {
		await page.goto('/');
		const knopf = page.locator('#trick').getByRole('button', { name: /^Geklickt:/ });
		await knopf.scrollIntoViewIfNeeded();
		await expect(knopf).toHaveText('Geklickt: 0');
		await knopf.click();
		await expect(knopf).toHaveText('Geklickt: 1');
	});

	test('Schalter im Abschnitt Robust zeigt den Hinweis', async ({ page }) => {
		await page.goto('/');
		const hinweis = page.getByText('Diese Seite kann ohne ihre Skripte nichts anzeigen.');
		await expect(hinweis).toHaveCount(0);
		const schalter = page.locator('#robust').getByRole('switch', { name: 'Verbindung bricht ab' });
		await schalter.scrollIntoViewIfNeeded();
		await schalter.click();
		await expect(hinweis).toBeVisible();
	});

	test('Klick auf "kontakt" zeigt die Adresse im Browserfenster', async ({ page }) => {
		await page.goto('/');
		const zeile = page.locator('#ordner [data-row]', { hasText: 'kontakt' }).getByRole('button');
		await page.locator('#ordner').scrollIntoViewIfNeeded();
		// Die Zeilen erscheinen beim Scrollen durch den angehefteten Abschnitt
		await expect(async () => {
			await page.mouse.wheel(0, 150);
			await expect(zeile).toBeVisible({ timeout: 300 });
		}).toPass({ timeout: 15_000 });
		await zeile.click();
		await expect(page.locator('#ordner [data-ui="browser"] code')).toHaveText('beispiel.de/kontakt');
	});

	test('Farbschema-Umschalter setzt die Klasse dark', async ({ page }) => {
		await page.goto('/');
		const html = page.locator('html');
		const vorher = await html.evaluate((el) => el.classList.contains('dark'));
		await page.getByRole('button', { name: 'Farbschema wechseln' }).click();
		if (vorher) await expect(html).not.toHaveClass(/dark/);
		else await expect(html).toHaveClass(/dark/);
	});
});
