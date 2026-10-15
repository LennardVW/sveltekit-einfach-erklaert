/** Leitet aus einem Dateipfad im routes-Ordner die Adresse der Seite ab. */
export function ordnerZuAdresse(pfad: string): string {
	const teile = pfad.split('/').filter((teil) => teil !== '');
	if (teile[0] === 'routes') teile.shift();
	if (teile[teile.length - 1] === '+page.svelte') teile.pop();
	return '/' + teile.join('/');
}
