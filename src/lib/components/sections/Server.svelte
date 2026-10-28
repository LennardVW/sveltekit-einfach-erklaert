<script lang="ts">
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Check from '@lucide/svelte/icons/check';
	import Browser from '#lib/components/Browser.svelte';
	import { reveal, scene } from '#lib/motion.js';

	const momente = [
		{ titel: 'Sofort', text: 'Links eine leere Seite, rechts schon der fertige Text.' },
		{ titel: 'Kurz danach', text: 'Links ein Ladekreis, rechts werden die Knöpfe aktiv.' },
		{
			titel: 'Etwas später',
			text: 'Jetzt sind beide fertig. Die rechte Seite war aber viel früher lesbar.'
		}
	];

	const ebene = 'absolute inset-0 flex flex-col gap-4 p-5 sm:p-8';

	// Zustand 0, 1, 2 werden nacheinander durchgeblendet, die Momente darunter leuchten passend auf.
	// Der DOM-Endzustand (Zustand 2 sichtbar) bleibt ohne Animation stehen.
	function build(tl: gsap.core.Timeline, node: HTMLElement) {
		for (const fenster of node.querySelectorAll('figure')) {
			const [z0, z1, z2] = fenster.querySelectorAll('[data-state]');
			tl.fromTo(z0, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4 }, 0.4)
				.fromTo(z1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.4)
				.to(z1, { autoAlpha: 0, duration: 0.4 }, 1)
				.fromTo(z2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 1);
		}
		const momente = node.querySelectorAll('[data-moment]');
		[0, 0.4, 1].forEach((t, i) => tl.from(momente[i], { opacity: 0.35, duration: 0.4 }, t));
		// Haltezeit am Ende, damit der letzte Zustand ruhig stehen bleibt, bevor die Grafik aus dem Bild scrollt
		tl.set({}, {}, 2);
	}
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
		<div class="grid-12" use:reveal>
			<div class="col-span-12 flex flex-col gap-6 lg:col-span-7">
				<h2 id="server-titel" data-reveal class="text-head">Die Seite kommt fertig vom Server</h2>
				<p data-reveal class="max-w-[60ch]">
					Ein <dfn class="font-semibold not-italic">Server</dfn> ist ein Computer im Internet, der
					Websites auf Anfrage ausliefert. Manche Websites schicken von dort nur ein leeres Gerüst
					und eine Bauanleitung. Den Inhalt baut erst Ihr Browser zusammen. Bis dahin sehen Sie
					eine leere Seite oder einen Ladekreis.
				</p>
				<p data-reveal class="max-w-[60ch]">
					SvelteKit lässt den Server die Seite vorher fertig zusammenstellen. Ihr Browser kann sie
					sofort anzeigen. Das ist wie im Restaurant: Der Teller kommt angerichtet aus der Küche,
					statt dass Zutaten und Rezept an Ihren Tisch gebracht werden.
				</p>
				<p data-reveal class="max-w-[60ch]">
					Danach werden Knöpfe und Formulare aktiv. Fachleute nennen diesen Schritt
					<dfn class="font-semibold not-italic">Hydration</dfn>, also Bewässerung: Die fertige
					Seite wird nachträglich zum Leben erweckt.
				</p>
			</div>
		</div>

		<div class="mt-16" use:scene={{ build, pin: true, length: 130 }}>
			<div class="grid gap-x-6 gap-y-12 md:grid-cols-2">
				<figure class="flex flex-col gap-4">
					<h3 class="text-lead font-semibold">Ohne fertige Seite</h3>
					<Browser address="beispiel.de">
						<div class="relative h-72 sm:h-80 md:h-64">
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
						<div class="relative h-72 sm:h-80 md:h-64">
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
										<Check class="size-5 text-primary dark:text-chart-2" aria-hidden="true" />
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

			<ol class="mt-16 grid gap-10 md:mt-10 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
				{#each momente as m (m.titel)}
					<li data-moment class="flex flex-col gap-3">
						<span class="hidden h-1 bg-muted md:block" aria-hidden="true"></span>
						<span class="text-lead font-semibold">{m.titel}</span>
						<span class="max-w-[40ch]">{m.text}</span>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
