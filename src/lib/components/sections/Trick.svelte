<script lang="ts">
	import Package from '@lucide/svelte/icons/package';
	import * as Card from '#lib/components/ui/card/index.js';
	import { Button } from '#lib/components/ui/button/index.js';

	// Als String, damit Svelte die geschweiften Klammern nicht auswertet
	const beispiel = `<script>
  let klicks = $state(0);
<\/script>

<button onclick={() => klicks++}>
  Geklickt: {klicks}
</button>`;

	let klicks = $state(0);

	const chip = 'rounded-lg bg-background px-4 py-3 text-small font-medium';
</script>

<section id="trick" aria-labelledby="trick-titel" class="pt-(--section-gap)">
	<div class="wrap">
		<h2 id="trick-titel" class="text-head">Der Trick: Die Arbeit passiert vorher</h2>
		<div class="grid-12 mt-10 gap-y-6">
			<p class="col-span-12 max-w-[60ch] lg:col-span-6">
				Stellen Sie sich zwei Möbelhäuser vor. Das erste liefert einen Bausatz: Teile, Schrauben,
				Anleitung. Aufbauen müssen Sie selbst, bei sich zu Hause. Das zweite baut den Schrank in der
				Werkstatt auf und liefert ihn fertig.
			</p>
			<p class="col-span-12 max-w-[60ch] lg:col-span-6 lg:col-start-1">
				Svelte arbeitet wie das zweite Möbelhaus. Ein
				<dfn class="font-semibold not-italic">Compiler</dfn>, also ein Übersetzungsprogramm, baut
				die Website schon beim Erstellen fertig zusammen. Beim Besucher kommt nur an, was wirklich
				gebraucht wird.
			</p>
		</div>

		<!-- Vergleichsgrafik: zwei Bahnen, getrennt durch die Lieferung -->
		<div class="relative mt-16 md:pt-12">
			<div
				data-delivery
				class="absolute inset-y-0 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center md:flex"
			>
				<span
					class="rounded-lg bg-primary px-3 py-1 text-small font-medium text-primary-foreground"
				>
					Lieferung
				</span>
				<span class="w-1 flex-1 bg-primary"></span>
			</div>

			<div
				class="mb-4 hidden grid-cols-2 gap-x-10 text-small text-muted-foreground md:grid"
				aria-hidden="true"
			>
				<span>Vorher, in der Werkstatt</span>
				<span>Beim Besucher</span>
			</div>

			<div class="flex flex-col gap-4">
				<div data-lane="bausatz" class="rounded-xl bg-muted p-4 sm:p-6">
					<h3 class="mb-4 text-small font-semibold">Bausatz: Aufbau beim Besucher</h3>
					<div class="grid gap-4 md:grid-cols-2 md:gap-x-10">
						<div class="flex flex-col gap-2">
							<p class="text-small text-muted-foreground md:hidden">Vorher, in der Werkstatt</p>
							<div class="flex flex-wrap gap-2">
								<span data-step class="{chip} flex items-center gap-2">
									<Package class="size-5" aria-hidden="true" />
									Teile einpacken
								</span>
							</div>
						</div>
						<span class="h-1 bg-primary md:hidden" data-delivery-line aria-hidden="true"></span>
						<div class="flex flex-col gap-2">
							<p class="text-small text-muted-foreground md:hidden">Beim Besucher</p>
							<div class="flex flex-wrap gap-2">
								<span data-step class={chip}>Auspacken</span>
								<span data-step class={chip}>Anleitung lesen</span>
								<span data-step class={chip}>Zusammenbauen</span>
								<span data-step class={chip}>Fertig</span>
							</div>
						</div>
					</div>
				</div>

				<div data-lane="svelte" class="rounded-xl bg-muted p-4 sm:p-6">
					<h3 class="mb-4 text-small font-semibold">Svelte: fertig geliefert</h3>
					<div class="grid gap-4 md:grid-cols-2 md:gap-x-10">
						<div class="flex flex-col gap-2">
							<p class="text-small text-muted-foreground md:hidden">Vorher, in der Werkstatt</p>
							<div class="flex flex-wrap gap-2">
								<span data-step class={chip}>Zusammenbauen</span>
								<span data-step class={chip}>Prüfen</span>
								<span data-step class={chip}>Fertig</span>
							</div>
						</div>
						<span class="h-1 bg-primary md:hidden" aria-hidden="true"></span>
						<div class="flex flex-col gap-2">
							<p class="text-small text-muted-foreground md:hidden">Beim Besucher</p>
							<div class="flex flex-wrap gap-2">
								<span
									data-step
									class="rounded-lg bg-primary px-4 py-3 text-small font-medium text-primary-foreground"
								>
									Sofort benutzbar
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-20 bg-muted py-16 lg:py-24">
		<div class="wrap grid-12 items-start gap-y-10">
			<Card.Root class="col-span-12 lg:col-span-6">
				<Card.Header>
					<Card.Title class="text-small font-semibold">So sieht Svelte-Code aus</Card.Title>
				</Card.Header>
				<Card.Content>
					<pre
						class="overflow-x-auto text-[0.9375rem] leading-relaxed sm:text-small"><code>{beispiel}</code></pre>
				</Card.Content>
			</Card.Root>

			<div class="col-span-12 flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
				<h3 class="text-lead font-semibold">Was diese Zeilen tun</h3>
				<p class="max-w-[60ch]">
					Oben steht: Merke dir eine Zahl, sie beginnt bei 0. Unten steht: Zeige einen Knopf. Bei
					jedem Klick wird die Zahl um eins größer und sofort angezeigt.
				</p>
				<p class="max-w-[60ch]">
					Der Compiler macht daraus vorab genau die wenigen Anweisungen, die dieser Knopf braucht.
					Ein Werkzeugkasten muss nicht mitgeliefert werden.
				</p>
				<div class="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
					<Button class="press h-12 px-6 text-small" onclick={() => klicks++}>
						Geklickt: {klicks}
					</Button>
					<span class="text-small text-muted-foreground">
						Probieren Sie es aus. Das ist genau dieser Code.
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
