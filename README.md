# 雲隱仙門 · Cultivation Family

A polished, browser-based idle game about building an immortal cultivation family. Gather Qi, recruit clan members, guide the ancestor through breakthroughs, and shape the family's permanent bloodline traits.

## Features

- Active Qi gathering plus passive idle generation
- Realm progression from Qi Refining to Nascent Soul
- Three-choice Family Heritage system after every breakthrough
- Good and bad random events every 15–30 seconds
- Animated event toasts, floating Qi feedback, and a live clan chronicle
- Automatic local saves and up to four hours of offline progress
- Responsive dark-mode interface for desktop and mobile

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

Game progress is stored only in the browser with `localStorage`; no account or backend is required.
