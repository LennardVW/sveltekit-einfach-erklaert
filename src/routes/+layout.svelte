<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '#lib/assets/favicon.svg';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>SvelteKit, einfach erklärt</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<SiteHeader />
<main>
	{@render children()}
</main>
