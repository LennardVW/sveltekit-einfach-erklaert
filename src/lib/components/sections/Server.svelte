<script lang="ts">
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Check from '@lucide/svelte/icons/check';
	import Browser from '#lib/components/Browser.svelte';

	const momente = [
		{ titel: 'Sofort', text: 'Links eine leere Seite, rechts schon der fertige Text.' },
		{ titel: 'Kurz danach', text: 'Links ein Ladekreis, rechts werden die Knöpfe aktiv.' },
		{
			titel: 'Etwas später',
			text: 'Jetzt sind beide fertig. Die rechte Seite war aber viel früher lesbar.'
		}
	];

	const ebene =
		'absolute inset-0 flex flex-col gap-4 p-5 sm:p-8 transition-opacity duration-200 ease-out-soft';
</script>

{#snippet inhalt()}
	<span class="h-7 w-3/4 rounded-md bg-foreground"></span>
	<span class="flex flex-col gap-2.5">
		<span class="h-3 w-full rounded-full bg-muted-foreground/30"></span>
		<span class="h-3 w-11/12 rounded-full bg-muted-foreground/30"></span>
		<span class="h-3 w-2/3 rounded-full bg-muted-foreground/30"></span>
	</span>
{/snippet}

<section id="server" aria-labelledby="server-titel" class="section-pad">
	<div class="wrap">
		<div class="grid-12">
			<div class="col-span-12 flex flex-col gap-6 lg:col-span-7">
				<h2 id="server-titel" class="text-head">Die Seite kommt fertig vom Server</h2>
				<p class="max-w-[60ch]">
					Ein <dfn class="font-semibold not-italic">Server</dfn> ist ein Computer im Internet, der
					Websites auf Anfrage ausliefert. Manche Websites schicken von dort nur ein leeres Gerüst
					und eine Bauanleitung. Den Inhalt baut erst Ihr Browser zusammen. Bis dahin sehen Sie
					eine leere Seite oder einen Ladekreis.
				</p>
				<p class="max-w-[60ch]">
					SvelteKit lässt den Server die Seite vorher fertig zusammenstellen. Ihr Browser kann sie
					sofort anzeigen. Das ist wie im Restaurant: Der Teller kommt angerichtet aus der Küche,
					statt dass Zutaten und Rezept an Ihren Tisch gebracht werden.
				</p>
				<p class="max-w-[60ch]">
					Danach werden Knöpfe und Formulare aktiv. Fachleute nennen diesen Schritt
					<dfn class="font-semibold not-italic">Hydration</dfn>, also Bewässerung: Die fertige
					Seite wird nachträglich zum Leben erweckt.
				</p>
			</div>
		</div>

		<div class="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2">
			<figure class="flex flex-col gap-4">
				<h3 class="text-lead font-semibold">Ohne fertige Seite</h3>
				<Browser address="beispiel.de">
					<div class="relative h-72 sm:h-80">
						<div data-state="0" class="{ebene} opacity-0"></div>
						<div
							data-state="1"
							class="{ebene} items-center justify-center text-small text-muted-foreground opacity-0"
						>
							<LoaderCircle class="size-8" aria-hidden="true" />
							Lädt …
						</div>
						<div data-state="2" class={ebene}>
							{@render inhalt()}
							<span
								class="mt-auto inline-flex h-11 w-fit items-center rounded-lg bg-primary px-5 text-small font-medium text-primary-foreground"
							>
								Absenden
							</span>
						</div>
					</div>
				</Browser>
				<figcaption class="text-small text-muted-foreground">Erst leer, dann Inhalt.</figcaption>
			</figure>

			<figure class="flex flex-col gap-4">
				<h3 class="text-lead font-semibold">Mit SvelteKit</h3>
				<Browser address="beispiel.de">
					<div class="relative h-72 sm:h-80">
						<div data-state="0" class="{ebene} opacity-0">
							{@render inhalt()}
							<span
								class="mt-auto inline-flex h-11 w-fit items-center rounded-lg bg-muted px-5 text-small font-medium text-muted-foreground"
							>
								Wird aktiviert
							</span>
						</div>
						<div data-state="1" class="{ebene} opacity-0">
							{@render inhalt()}
							<span
								class="mt-auto inline-flex h-11 w-fit items-center rounded-lg bg-primary px-5 text-small font-medium text-primary-foreground"
							>
								Absenden
							</span>
						</div>
						<div data-state="2" class={ebene}>
							{@render inhalt()}
							<span class="mt-auto flex items-center gap-4">
								<span
									class="inline-flex h-11 w-fit items-center rounded-lg bg-primary px-5 text-small font-medium text-primary-foreground"
								>
									Absenden
								</span>
								<span class="flex items-center gap-1.5 text-small text-muted-foreground">
									<Check class="size-5 text-primary" aria-hidden="true" />
									Alles bereit
								</span>
							</span>
						</div>
					</div>
				</Browser>
				<figcaption class="text-small text-muted-foreground">
					Sofort Inhalt, kurz danach auch bedienbar.
				</figcaption>
			</figure>
		</div>

		<ol class="mt-16 grid gap-10 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
			{#each momente as m (m.titel)}
				<li data-moment class="flex flex-col gap-3">
					<span class="hidden h-1 bg-muted md:block" aria-hidden="true"></span>
					<span class="text-lead font-semibold">{m.titel}</span>
					<span class="max-w-[40ch]">{m.text}</span>
				</li>
			{/each}
		</ol>
	</div>
</section>
