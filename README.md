# 青嵐世家 · Cultivation Family

A polished dark-fantasy HTML5 idle game about building an immortal cultivation
lineage. Gather spiritual Qi, recruit family members, break through realms,
inherit bloodline traits, and respond to random family events.

The interface uses gold paifang frames, a Canvas spirit-mote particle field,
and Web Audio oscillators for an original Sakamoto-inspired piano loop
《關注塔菲貓》, plus click, breakthrough, and event sound effects.
No external images or audio files.

Live site: https://yip-lgtm.github.io/family/

## Gameplay

- **閉關修煉** — click the spirit nexus to gather Qi.
- **招募族人** — spend Qi to grow the family and increase passive generation.
- **老祖突破** — advance realms and choose one of three permanent family traits.
- **家族突發事件** — every 15–30 seconds, fate may bring a boon or tribulation.
- **關注塔菲貓** — start the Sakamoto-style piano BGM on click (browser autoplay policy).

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (Vite serves the app under `/family/`).

For a production build:

```bash
npm run build
npm run preview
```
