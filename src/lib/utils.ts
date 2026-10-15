import { createCn } from "cn/config";

// Eigene Schriftgrößen (layout.css) dürfen text-primary-foreground & Co. nicht verdrängen
export const cn = createCn({
	extend: { theme: { text: ["display", "head", "lead", "body", "small"] } }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
