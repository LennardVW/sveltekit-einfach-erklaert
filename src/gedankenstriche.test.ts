import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { describe, expect, test } from 'vitest';

// Die Seite verzichtet bewusst auf Gedankenstriche. Der Test sucht sie in allen Projektdateien.
// Er läuft ohne git, weil das Docker-Image kein git enthält.
const wurzel = process.cwd();

// Erzeugte, installierte oder fremde Inhalte
const ausgelassen = new Set([
	'.git',
	'.agents',
	'.claude/skills',
	'.svelte-kit',
	'node_modules',
	'build',
	'test-results',
	'playwright-report',
	'package-lock.json'
]);
const binaer = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.pdf']);

function sammle(ordner: string): string[] {
	return readdirSync(ordner, { withFileTypes: true }).flatMap((eintrag) => {
		const pfad = join(ordner, eintrag.name);
		if (ausgelassen.has(relative(wurzel, pfad))) return [];
		if (eintrag.isDirectory()) return sammle(pfad);
		// Symlinks und Sonderdateien werden übersprungen
		if (!eintrag.isFile() || binaer.has(extname(eintrag.name).toLowerCase())) return [];
		return [pfad];
	});
}

function treffer(zeichen: string): string[] {
	const funde: string[] = [];
	for (const datei of sammle(wurzel)) {
		readFileSync(datei, 'utf8')
			.split('\n')
			.forEach((zeile, i) => {
				if (zeile.includes(zeichen)) funde.push(`${relative(wurzel, datei)}:${i + 1}: ${zeile.trim()}`);
			});
	}
	return funde;
}

describe('Gedankenstriche', () => {
	test('es gibt Dateien zu prüfen', () => {
		expect(sammle(wurzel).length).toBeGreaterThan(20);
	});

	test('kein Geviertstrich (U+2014)', () => {
		expect(treffer('\u2014'), 'Fundstellen').toEqual([]);
	});

	test('kein Halbgeviertstrich (U+2013)', () => {
		expect(treffer('\u2013'), 'Fundstellen').toEqual([]);
	});
});
