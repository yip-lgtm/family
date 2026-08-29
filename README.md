# 青嵐世家 · Cultivation Family

A polished dark-fantasy HTML5 idle game about building an immortal cultivation
lineage. Gather spiritual Qi, recruit family members, break through realms,
inherit bloodline traits, and respond to random family events.

The interface uses gold paifang frames, a Canvas spirit-mote particle field,
and Web Audio for click / breakthrough / event cues. Background music is the
Bilibili loop playlist [關注塔菲喵 / 絕世雙萌の小曲 / 永雛塔菲の小曲](https://www.bilibili.com/video/BV1kNEP6cEmu)
embedded via the official player (not downloaded or rehosted).

Gameplay is inspired by Cultivation World Simulator, with a living clan of
rule-driven cultivators. A screenwriter layer keeps generating Godfather-trilogy
set pieces (rise, betrayal, elegy). Connect OpenRouter in 「模型設定」: base `https://openrouter.ai/api/v1`,
model `openrouter/free`, and paste a free API key from
https://openrouter.ai/keys (stored only in the browser). With a key, new scenes
and the selected cultivator automatically receive illustrations via
`google/gemini-2.5-flash-image` (OpenRouter Image API; billed to your key).
Turn this off with the 「自動生成插畫」 checkbox. Without a key the
built-in studio writer continues the same trilogy and the gold paifang UI stays
as the art.

Live site: https://yip-lgtm.github.io/family/

## 3-minute pitch deck

Cantonese product pitch (10 slides, 16:9, includes production workflow, speaker notes included):

- [docs/青嵐世家-3分鐘簡報.pptx](docs/青嵐世家-3分鐘簡報.pptx)
- [docs/青嵐世家-3分鐘講稿.md](docs/青嵐世家-3分鐘講稿.md)

Regenerate after copy changes:

```bash
pip install -r docs/requirements-pptx.txt
python3 scripts/make-pitch-pptx.py
```

## Gameplay

- **教父三部曲連載** — 持續生成立譜／背叛／輓歌場面；可接 LLM 或用劇組代班。
- **自動插畫** — 有 OpenRouter Key 時，新場次與目前檢視的人物會自動出圖（可在模型設定關閉）。
- **天道干預** — 花費氣運賜福、降天劫、種心魔，或令某人改行。
- **閉關修煉** — click the spirit nexus to gather clan Qi.
- **納入弟子** — spend Qi to add a cultivator with random root and nature.
- **老祖突破** — advance the patriarch and choose a permanent family trait.
- **湧現事件** — omens plus interpersonal drama from the simulation itself.
- **關注塔菲喵** — play the Bilibili loop playlist as BGM (click to start).

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
