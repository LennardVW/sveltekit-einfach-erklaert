# SvelteKit, einfach erklärt

Eine interaktive Website, die SvelteKit für Menschen ohne IT-Hintergrund erklärt. Gebaut mit SvelteKit, shadcn-svelte und GSAP.

## Starten mit Docker

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/) installieren und starten.
2. Dieses Repository herunterladen (grüner Button "Code", dann "Download ZIP") und entpacken.
3. Ein Terminal im entpackten Ordner öffnen und eingeben:

   ```
   docker compose up
   ```

4. Im Browser http://localhost:5173 öffnen.
5. Beenden mit Strg+C.

## Starten in GitHub Codespaces

1. Auf GitHub "Code", dann "Codespaces", dann "Create codespace" wählen.
2. Warten, bis alles eingerichtet ist. Die Seite öffnet sich danach von selbst.
3. Falls nicht: unten den Tab "Ports" öffnen und bei Port 5173 auf das Weltkugel-Symbol klicken.

## Prüfen und testen

```
docker compose run --rm app npm run check
docker compose run --rm app npm run build
docker compose run --rm app npm test
```

## Stack

- SvelteKit 3 mit Svelte 5 und TypeScript
- Tailwind CSS 4
- shadcn-svelte und Lucide Icons
- GSAP mit ScrollTrigger
- Inter Variable als Schrift
- Vitest und Playwright für Tests
- Docker
