import { describe, expect, it } from 'vitest';
import { ordnerZuAdresse } from './ordner.js';

describe('ordnerZuAdresse', () => {
	it('macht aus dem Wurzelordner die Startseite', () => {
		expect(ordnerZuAdresse('routes/+page.svelte')).toBe('/');
	});

	it('macht aus einem Ordner eine Adresse', () => {
		expect(ordnerZuAdresse('routes/ueber-uns/+page.svelte')).toBe('/ueber-uns');
		expect(ordnerZuAdresse('routes/kontakt/+page.svelte')).toBe('/kontakt');
		expect(ordnerZuAdresse('routes/karriere/+page.svelte')).toBe('/karriere');
	});

	it('löst verschachtelte Ordner auf', () => {
		expect(ordnerZuAdresse('routes/team/anna/+page.svelte')).toBe('/team/anna');
	});

	it('ignoriert doppelte Schrägstriche', () => {
		expect(ordnerZuAdresse('routes//kontakt//+page.svelte')).toBe('/kontakt');
	});
});
