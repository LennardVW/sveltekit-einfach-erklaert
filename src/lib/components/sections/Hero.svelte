<script lang="ts">
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Browser from '#lib/components/Browser.svelte';
</script>

<section
	id="start"
	aria-labelledby="start-titel"
	class="flex min-h-[calc(100svh-var(--header-h))] flex-col pb-10 pt-8 lg:pt-12"
>
	<div class="wrap flex flex-1 flex-col gap-10 lg:gap-14">
		<h1 id="start-titel" class="text-display">SvelteKit, einfach erklärt</h1>

		<div class="grid-12 flex-1 items-start gap-y-10">
			<div class="col-span-12 flex h-full flex-col gap-6 lg:col-span-5">
				<p class="text-lead max-w-[30ch]">
					Eine Website ist ein Paket, das Ihr Browser abholt und auspackt. SvelteKit ist ein
					Werkzeug, mit dem dieses Paket klein und schnell ankommt, fertig ausgepackt.
				</p>
				<p class="max-w-[60ch]">
					Der Browser ist das Programm, mit dem Sie Websites öffnen, zum Beispiel Chrome, Safari,
					Firefox oder Edge. Was in dem Paket steckt und warum das wichtig ist, zeigt diese Seite in
					sieben kurzen Kapiteln.
				</p>
				<p class="mt-auto hidden items-center gap-2 pt-6 text-small text-muted-foreground lg:flex">
					<ArrowDown class="size-5" aria-hidden="true" />
					Zum Weiterlesen nach unten scrollen
				</p>
			</div>

			<div class="col-span-12 lg:col-span-7">
				<Browser address="beispiel.de">
					<div class="flex flex-col gap-5 p-5 sm:p-8">
						<div data-piece class="flex items-center justify-between gap-4">
							<span class="h-4 w-24 rounded-full bg-foreground"></span>
							<span class="flex gap-3">
								<span class="h-3 w-12 rounded-full bg-muted"></span>
								<span class="h-3 w-12 rounded-full bg-muted"></span>
								<span class="hidden h-3 w-12 rounded-full bg-muted sm:block"></span>
							</span>
						</div>
						<div data-piece class="flex flex-col gap-3 pt-2">
							<span class="h-8 w-4/5 rounded-md bg-foreground sm:h-10"></span>
							<span class="h-8 w-3/5 rounded-md bg-foreground sm:h-10"></span>
						</div>
						<div data-piece class="flex flex-col gap-2.5">
							<span class="h-3 w-full rounded-full bg-muted-foreground/30"></span>
							<span class="h-3 w-11/12 rounded-full bg-muted-foreground/30"></span>
							<span class="h-3 w-2/3 rounded-full bg-muted-foreground/30"></span>
						</div>
						<div data-piece class="h-32 rounded-lg bg-chart-1 sm:h-48"></div>
						<div data-piece class="h-11 w-40 rounded-lg bg-primary"></div>
					</div>
				</Browser>
			</div>
		</div>
	</div>
</section>
