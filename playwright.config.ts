import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		port: 4173
	},
	testDir: 'e2e',
	use: { baseURL: 'http://localhost:4173' },
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{
			name: 'mobile',
			// iPhone-Werte, aber mit Chromium, damit nur ein Browser installiert sein muss
			use: {
				...devices['iPhone 13'],
				browserName: 'chromium',
				viewport: { width: 375, height: 812 },
				isMobile: true,
				hasTouch: true
			}
		}
	]
});
