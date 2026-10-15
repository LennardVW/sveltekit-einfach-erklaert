<script lang="ts">
	import ArrowUp from '@lucide/svelte/icons/arrow-up';

	const saetze = [
		'SvelteKit ist ein Werkzeug, mit dem man Websites baut.',
		'Es erledigt die Arbeit vorher, damit bei Ihnen eine kleine, fertige Seite ankommt.',
		'Das macht Websites schnell, robust und für Teams übersichtlich.'
	];
</script>

<section
	id="fazit"
	aria-labelledby="fazit-titel"
	class="bg-foreground py-32 text-background lg:py-48"
>
	<div class="wrap flex flex-col gap-16 lg:gap-24">
		<h2 id="fazit-titel" class="text-head">Das Wichtigste in drei Sätzen</h2>
		<ol class="flex flex-col gap-12 lg:gap-16">
			{#each saetze as satz (satz)}
				<li data-sentence class="text-lead max-w-[30ch] font-medium">{satz}</li>
			{/each}
		</ol>
		<div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-8 text-small text-background/70">
			<p>Diese Seite ist selbst mit SvelteKit gebaut.</p>
			<a
				href="#start"
				class="press inline-flex items-center gap-2 rounded-lg py-2 hover:text-background"
			>
				<ArrowUp class="size-5" aria-hidden="true" />
				Nach oben
			</a>
		</div>
	</div>
</section>
