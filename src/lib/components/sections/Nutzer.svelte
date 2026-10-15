<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	const namen = [
		'Spotify',
		'The New York Times',
		'IKEA',
		'Decathlon',
		'1Password',
		'Apple',
		'Stack Overflow',
		'Yelp'
	];

	const lohnt = [
		'eine Website auch auf älteren Handys und in schwachen Netzen schnell sein soll.',
		'Inhalte bei Suchmaschinen wie Google gut gefunden werden sollen. Der fertige Text steckt ja schon im Paket.',
		'ein kleines Team eine Website bauen und lange pflegen will. Svelte kommt mit wenig Code aus.',
		'Formulare, Rechner oder interaktive Grafiken gebraucht werden.'
	];
	const weniger = [
		'ein Team schon viel mit einem anderen Werkzeug wie React gebaut hat. Ein Wechsel kostet Zeit.',
		'sehr spezielle fertige Bausteine gebraucht werden. Die Auswahl ist bei Svelte kleiner als bei den ganz großen Werkzeugen.',
		'es nur um eine einzelne, einfache Seite geht, die sich nie ändert.'
	];
</script>

<section id="nutzer" aria-labelledby="nutzer-titel" class="section-pad">
	<div class="wrap flex flex-col gap-16">
		<div class="flex flex-col gap-6">
			<h2 id="nutzer-titel" class="max-w-[24ch] text-head">
				<span class="max-sm:hidden">Wer SvelteKit nutzt und für wen es sich lohnt</span>
				<span class="sm:hidden">Wer es nutzt und für wen es sich lohnt</span>
			</h2>
			<div class="grid-12">
				<p class="col-span-12 max-w-[60ch] lg:col-span-7">
					Svelte, die Grundlage von SvelteKit, hat Rich Harris erfunden. Er hat interaktive
					Grafiken für Zeitungen gebaut, etwa für den Guardian und die New York Times. Dort zählt
					jede Sekunde Ladezeit. Svelte ist
					<dfn class="font-semibold not-italic">Open Source</dfn>: Der Bauplan ist öffentlich, und
					alle dürfen ihn kostenlos nutzen.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-6">
			<ul class="flex flex-wrap gap-x-10 gap-y-3 sm:gap-x-14">
				{#each namen as name (name)}
					<li
						data-name
						class="press text-head text-muted-foreground hover:text-foreground"
					>
						{name}
					</li>
				{/each}
			</ul>
			<p class="text-small text-muted-foreground">
				Quelle: svelte.dev, Stand Oktober 2026. Die Liste nennt Unternehmen, die Svelte einsetzen,
				die Grundlage von SvelteKit.
			</p>
		</div>

		<div class="grid-12 gap-y-12">
			<div class="col-span-12 flex flex-col gap-6 lg:col-span-6">
				<h3 class="text-lead font-semibold">Lohnt sich besonders, wenn …</h3>
				<ul class="flex flex-col gap-4">
					{#each lohnt as punkt (punkt)}
						<li class="flex max-w-[60ch] gap-3">
							<Check class="mt-1.5 size-5 shrink-0 text-primary" aria-hidden="true" />
							<span>{punkt}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="col-span-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
				<h3 class="text-lead font-semibold">Weniger nötig, wenn …</h3>
				<ul class="flex flex-col gap-4">
					{#each weniger as punkt (punkt)}
						<li class="flex max-w-[60ch] gap-3">
							<Minus class="mt-1.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
							<span>{punkt}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
