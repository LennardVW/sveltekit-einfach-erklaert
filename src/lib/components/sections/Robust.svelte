<script lang="ts">
	import CloudOff from '@lucide/svelte/icons/cloud-off';
	import Browser from '#lib/components/Browser.svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import { Input } from '#lib/components/ui/input/index.js';
	import { Label } from '#lib/components/ui/label/index.js';
	import { Switch } from '#lib/components/ui/switch/index.js';
	import { reveal } from '#lib/motion.js';

	let abbruch = $state(false);
	let typischGesendet = $state(false);
	let svelteGesendet = $state(false);

	// Demo ohne Netzwerk
	function absenden(setze: () => void) {
		return (e: SubmitEvent) => {
			e.preventDefault();
			setze();
		};
	}
</script>

<section id="robust" aria-labelledby="robust-titel" class="section-pad bg-muted">
	<div class="wrap flex flex-col gap-16">
		<div class="mx-auto flex flex-col items-center gap-6 text-center" use:reveal>
			<h2 id="robust-titel" data-reveal class="max-w-[16ch] text-head">Auch wenn etwas schiefgeht</h2>
			<p data-reveal class="max-w-[40ch]">
				Im Zug bricht die Verbindung ab. Das Firmennetz blockiert Skripte. Ein altes Handy ist zu
				langsam. Viele Websites zeigen dann nur eine leere Fläche.
			</p>
		</div>

		<div class="flex items-center justify-center gap-5">
			<Switch id="abbruch" bind:checked={abbruch} class="scale-150" />
			<Label for="abbruch" class="text-body">Verbindung bricht ab</Label>
		</div>

		<div class="grid gap-x-6 gap-y-12 md:grid-cols-2">
			<div class="flex flex-col gap-4">
				<h3 class="text-lead font-semibold">Typische Website</h3>
				<Browser address="beispiel.de/rueckruf" class="bg-background">
					<div class="min-h-72 p-5 sm:p-8" aria-live="polite">
						{#if abbruch}
							<div class="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
								<CloudOff class="size-10 text-muted-foreground" aria-hidden="true" />
								<p class="text-small">Diese Seite kann ohne ihre Skripte nichts anzeigen.</p>
							</div>
						{:else if typischGesendet}
							<p class="text-small">Danke, Ihre Anfrage ist angekommen.</p>
						{:else}
							{@render formular('typisch', () => (typischGesendet = true))}
						{/if}
					</div>
				</Browser>
			</div>

			<div class="flex flex-col gap-4">
				<h3 class="text-lead font-semibold">SvelteKit-Website</h3>
				<Browser address="beispiel.de/rueckruf" class="bg-background">
					<div class="min-h-72 p-5 sm:p-8" aria-live="polite">
						{#if svelteGesendet}
							<p class="text-small">
								{abbruch
									? 'Die Seite lädt einmal neu. Ihre Anfrage ist trotzdem angekommen.'
									: 'Danke, Ihre Anfrage ist angekommen.'}
							</p>
						{:else}
							{@render formular('svelte', () => (svelteGesendet = true))}
						{/if}
					</div>
				</Browser>
			</div>
		</div>

		<div class="grid-12 gap-y-6" use:reveal>
			<p data-reveal class="col-span-12 max-w-[60ch] lg:col-span-6">
				Bei SvelteKit steckt das Wichtigste schon im ersten Paket: Text, Bilder, Links und
				Formulare. Sie funktionieren auch ohne JavaScript. JavaScript macht die Seite nur
				bequemer, zum Beispiel weil sie beim Absenden nicht neu lädt.
			</p>
			<p data-reveal class="col-span-12 max-w-[60ch] lg:col-span-6 lg:col-start-1">
				Fachleute nennen das
				<dfn class="font-semibold not-italic">progressive Verbesserung</dfn>: Zuerst kommt ein
				Grundgerüst, das immer funktioniert. Die Extras kommen obendrauf.
			</p>
		</div>
	</div>
</section>

{#snippet formular(id: string, gesendet: () => void)}
	<form class="flex flex-col gap-4" onsubmit={absenden(gesendet)}>
		<h4 class="text-small font-semibold">Rückruf anfragen</h4>
		<div class="flex flex-col gap-2">
			<Label for="name-{id}" class="text-small">Name</Label>
			<Input id="name-{id}" name="name" autocomplete="off" class="h-11 text-small" />
		</div>
		<Button type="submit" class="press h-11 w-fit px-5 text-small">Absenden</Button>
	</form>
{/snippet}
