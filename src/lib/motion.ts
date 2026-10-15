import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Action } from 'svelte/action';

gsap.registerPlugin(ScrollTrigger);

// Schriften verschieben das Layout, danach müssen alle Start- und Endpunkte neu gemessen werden
if (typeof document !== 'undefined') {
	void document.fonts.ready.then(() => {
		ScrollTrigger.refresh();
		// Beim Einstieg per Hash (/#fazit) war das Ziel vor den Pin-Abständen berechnet, deshalb einmal neu anspringen
		if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
	});
}

const BEWEGUNG = '(prefers-reduced-motion: no-preference)';
const PLATZ = '(min-width: 768px) and (min-height: 640px)';

// Die Kopfzeile klebt oben, angeheftete Flächen schlagen mit etwas Luft darunter an
const kopfhoehe = () => document.querySelector('header')?.getBoundingClientRect().height ?? 0;

/** Einstieg: alle [data-reveal] im Knoten steigen einmalig gestaffelt auf. */
export const reveal: Action<HTMLElement> = (node) => {
	const mm = gsap.matchMedia();
	mm.add(BEWEGUNG, () => {
		const teile = node.querySelectorAll('[data-reveal]');
		if (!teile.length) return;
		gsap.from(teile, {
			y: 24,
			autoAlpha: 0,
			duration: 0.8,
			stagger: 0.08,
			ease: 'power3.out',
			scrollTrigger: { trigger: node, start: 'top 80%', once: true }
		});
	});
	return { destroy: () => mm.revert() };
};

export type SceneOptions = {
	build: (tl: gsap.core.Timeline, node: HTMLElement) => void;
	pin?: boolean;
	length?: number;
	onProgress?: (p: number) => void;
};

/** Scroll-gesteuerter Ablauf: vor und zurück scrollen spult die Timeline. */
export const scene: Action<HTMLElement, SceneOptions> = (node, { build, pin, length, onProgress }) => {
	const mm = gsap.matchMedia();
	mm.add({ ok: BEWEGUNG, platz: PLATZ }, (ctx) => {
		const { ok, platz } = ctx.conditions as { ok: boolean; platz: boolean };
		if (!ok) return;
		const angeheftet = pin && platz;
		const tl = gsap.timeline({
			defaults: { ease: 'power2.out' },
			scrollTrigger: {
				trigger: node,
				scrub: 0.6,
				pin: angeheftet,
				// clamp: Der letzte Abschnitt der Seite erreicht seinen Endpunkt sonst nie
				start: angeheftet ? () => `top top+=${kopfhoehe() + 32}` : 'clamp(top 75%)',
				end: angeheftet ? `+=${length ?? 150}%` : 'clamp(bottom 40%)',
				onUpdate: (self) => onProgress?.(self.progress)
			}
		});
		build(tl, node);
	});
	return { destroy: () => mm.revert() };
};
