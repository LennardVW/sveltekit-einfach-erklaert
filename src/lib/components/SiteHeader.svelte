<script lang="ts">
	import List from '@lucide/svelte/icons/list';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index.js';
	import { kapitel } from '#lib/kapitel.js';
</script>

<header class="sticky top-0 z-50 h-(--header-h) bg-background">
	<div class="wrap flex h-full items-center justify-between gap-4">
		<a
			href="#start"
			class="press -mx-2 rounded-lg px-2 py-2 text-small font-semibold hover:opacity-70"
		>
			SvelteKit, einfach erklärt
		</a>
		<div class="flex items-center gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="secondary" class="h-10 gap-2 px-4 text-small">
							<List />
							Kapitel
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" class="min-w-56">
					{#each kapitel as k (k.id)}
						<DropdownMenu.Item class="py-2.5 text-small">
							{#snippet child({ props })}
								<a {...props} href="#{k.id}">{k.titel}</a>
							{/snippet}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button
				onclick={toggleMode}
				variant="ghost"
				size="icon"
				class="size-10"
				aria-label="Farbschema wechseln"
			>
				<Sun class="dark:hidden" />
				<Moon class="hidden dark:block" />
			</Button>
		</div>
	</div>
</header>
