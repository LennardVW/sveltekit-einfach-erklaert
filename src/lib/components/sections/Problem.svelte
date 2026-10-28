<script lang="ts">
	import Browser from '#lib/components/Browser.svelte';
	import { reveal, scene } from '#lib/motion.js';

	// Von unten nach oben: breit bis klein
	const kisten = [
		{ name: 'Werkzeugkasten', breite: 'w-full', akzent: false },
		{ name: 'Bauanleitung', breite: 'w-5/6', akzent: false },
		{ name: 'Ersatzteile', breite: 'w-2/3', akzent: false },
		{ name: 'Hilfsprogramme', breite: 'w-1/2', akzent: false },
		{ name: 'Ihre eigentliche Seite', breite: 'w-1/3', akzent: true }
	];

	// Die Kisten fallen von oberhalb des Fensters an ihren Platz, die orange zuletzt
	function build(tl: gsap.core.Timeline, node: HTMLElement) {
		tl.from(node.querySelectorAll('[data-crate]'), {
			y: (_, el: HTMLElement) => -(el.offsetTop + el.offsetHeight),
			autoAlpha: 0,
			duration: 1,
			stagger: 0.7
		}).from(node.querySelector('figcaption'), { autoAlpha: 0, duration: 0.6 }, '>');
	}
</script>

<section id="problem" aria-labelledby="problem-titel" class="section-pad">
	<div class="wrap grid-12 gap-y-12" use:reveal use:scene={{ build, pin: true, length: 120 }}>
		<h2 id="problem-titel" data-reveal class="col-span-12 max-w-[20ch] text-head">
			Viele Websites schleppen zu viel mit
		</h2>
		<div class="col-span-12 flex flex-col gap-6 lg:col-span-5">
			<p data-reveal class="max-w-[60ch]">
				Bevor Sie auf einer Website etwas lesen können, lädt Ihr Browser alles herunter, was die
				Seite braucht. Bei vielen modernen Websites ist das erstaunlich viel.
			</p>
			<p data-reveal class="max-w-[60ch]">
				Ein großer Teil davon ist <dfn class="font-semibold not-italic">JavaScript</dfn>. Das sind
				Anweisungen, die der Browser ausführt, damit Knöpfe, Menüs und Formulare reagieren.
			</p>
			<p data-reveal class="max-w-[60ch]">
				Oft schickt eine Website nicht nur ihre eigenen Anweisungen mit, sondern einen ganzen
				Werkzeugkasten. Ihr Browser muss ihn erst auspacken, bevor er die Seite zeigen kann. Auf
				einem schnellen Laptop merkt man das kaum. Auf einem älteren Handy oder im Zug schon.
			</p>
		</div>

		<figure class="col-span-12 lg:col-span-6 lg:col-start-7">
			<Browser address="beispiel.de">
				<div class="flex flex-col items-center gap-2 p-5 sm:p-8">
					<!-- column-reverse: Reihenfolge im DOM von unten nach oben, so liest es sich auch als Liste -->
					<ul class="flex w-full flex-col-reverse items-center gap-2">
						{#each kisten as kiste (kiste.name)}
							<li
								data-crate
								class="{kiste.breite} {kiste.akzent
									? 'bg-primary text-primary-foreground'
									: 'bg-foreground/10'} min-w-44 rounded-lg px-4 py-4 text-center text-small font-medium sm:py-5"
							>
								{kiste.name}
							</li>
						{/each}
					</ul>
				</div>
			</Browser>
			<figcaption class="mt-4 text-small text-muted-foreground">
				Was Sie sehen wollen, ist nur ein kleiner Teil dessen, was ankommt.
			</figcaption>
		</figure>
	</div>
</section>
