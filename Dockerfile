# Node LTS als Basis
FROM node:24-bookworm-slim
WORKDIR /app

# Zuerst nur die Paketlisten kopieren, damit Docker die Installation zwischenspeichern kann
COPY package.json package-lock.json ./
# Pakete und der Browser für die Tests (Chromium samt Systembibliotheken)
RUN npm ci && npx playwright install --with-deps chromium

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
