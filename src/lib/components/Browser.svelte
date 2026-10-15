<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		address,
		class: className,
		children
	}: { address: string; class?: string; children: Snippet } = $props();
</script>

<!-- Rahmen in bg-muted statt Linie, damit das Fenster auch auf bg-background sichtbar bleibt -->
<div data-ui="browser" class={cn('rounded-xl bg-muted p-2', className)}>
	<div class="flex items-center gap-3 px-2 pb-2 pt-1">
		<div class="flex gap-1.5" aria-hidden="true">
			<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
			<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
			<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
		</div>
		<div class="min-w-0 flex-1 truncate rounded-lg bg-background px-3 py-1.5 text-small">
			<code>{address}</code>
		</div>
	</div>
	<div class="relative overflow-hidden rounded-lg bg-card text-card-foreground">
		{@render children()}
	</div>
</div>
