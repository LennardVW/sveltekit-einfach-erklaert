<script lang="ts">
	import Folder from '@lucide/svelte/icons/folder';
	import FileText from '@lucide/svelte/icons/file-text';
	import Browser from '#lib/components/Browser.svelte';
	import { ordnerZuAdresse } from '#lib/ordner.js';
	import { reveal, scene } from '#lib/motion.js';

	const eintraege = [
		{ pfad: 'routes/+page.svelte', seite: 'Startseite', zusatz: '' },
		{ pfad: 'routes/ueber-uns/+page.svelte', seite: 'Über uns', zusatz: '' },
		{ pfad: 'routes/kontakt/+page.svelte', seite: 'Kontakt', zusatz: '' },
		{
			pfad: 'routes/karriere/+page.svelte',
			seite: 'Karriere',
			zusatz: 'Neuer Ordner, neue Seite'
		}
	].map((e) => ({ ...e, adresse: 'beispiel.de' + ordnerZuAdresse(e.pfad) }));

	// Wird vom Scrollen (onProgress) und per Klick gesetzt
	let aktiv = $state(0);

	// Die vierte Zeile, der neue Ordner, kommt erst im letzten Viertel
	function build(tl: gsap.core.Timeline, node: HTMLElement) {
		const zeilen = node.querySelectorAll('[data-row]');
		tl.from(Array.from(zeilen).slice(0, 3), { autoAlpha: 0, x: -16, duration: 1, stagger: 1 }).from(
			zeilen[3],
			{ autoAlpha: 0, x: -16, duration: 1 },
			3
		);
	}
</script>

<section id="ordner" aria-labelledby="ordner-titel" class="section-pad">
	<div
		class="wrap grid-12 gap-y-12"
		use:reveal
		use:scene={{
			build,
			pin: true,
			length: 220,
			onProgress: (p) => (aktiv = Math.min(3, Math.floor(p * 4)))
		}}
	>
		<div class="col-span-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:row-start-1">
			<h2 id="ordner-titel" data-reveal class="text-head">Seiten sind Ordner</h2>
			<p data-reveal class="max-w-[60ch]">
				In SvelteKit bekommt jede Seite einen eigenen Ordner. Der Name des Ordners wird zur Adresse
				der Seite. Die Adresse ist das, was oben im Browser steht, zum Beispiel beispiel.de/kontakt.
			</p>
			<p data-reveal class="max-w-[60ch]">
				In jedem Ordner liegt eine Datei namens <code>+page.svelte</code>. Sie enthält den Inhalt
				der Seite. Mehr braucht es nicht.
			</p>
			<p data-reveal class="max-w-[60ch]">
				Das ist wie ein gut sortierter Aktenschrank. Wer die Ordner sieht, versteht sofort, wie die
				Website aufgebaut ist. Eine neue Seite bedeutet: ein neuer Ordner.
			</p>
			<p data-reveal class="text-small text-muted-foreground">
				Tippen Sie auf eine Zeile, um die Seite im Browser zu sehen.
			</p>
		</div>

		<div class="col-span-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-1 lg:row-start-1">
			<ul class="flex flex-col gap-1">
				{#each eintraege as e, i (e.pfad)}
					<li data-row>
						<button
							type="button"
							onclick={() => (aktiv = i)}
							aria-pressed={aktiv === i}
							class="press flex w-full flex-col gap-1 rounded-lg px-4 py-3 text-left text-small hover:bg-muted {aktiv ===
							i
								? 'bg-muted text-muted-foreground'
								: 'text-muted-foreground'}"
						>
							<span class="flex items-center gap-3">
								{#if i === 0}
									<FileText class="size-5 shrink-0" aria-hidden="true" />
								{:else}
									<Folder class="size-5 shrink-0" aria-hidden="true" />
								{/if}
								<code class="min-w-0 {aktiv === i ? 'text-foreground' : ''}"
								>{#each e.pfad.split('/') as teil, k}{#if k > 0}/<wbr />{/if}{teil}{/each}</code
							>
							</span>
							<span class="flex flex-wrap items-center gap-x-3 pl-8">
								<span>{e.adresse}</span>
								{#if e.zusatz}
									<span class="text-primary dark:text-chart-2">{e.zusatz}</span>
								{/if}
							</span>
						</button>
					</li>
				{/each}
			</ul>

			<Browser address={eintraege[aktiv].adresse}>
				<div class="flex min-h-48 items-center p-8 sm:min-h-56 sm:p-12">
					<p class="text-head font-semibold" aria-live="polite">{eintraege[aktiv].seite}</p>
				</div>
			</Browser>
		</div>
	</div>
</section>
