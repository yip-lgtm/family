# 萬古仙族 · Eternal Clan

一款以「修仙家族」為主題的 HTML5 放置遊戲。視覺語言（近黑 HUD、頂欄曆法／天象、左側情報、祖地地圖、右側經歷流）參考 [Cultivation World Simulator](https://github.com/4thfever/cultivation-world-simulator)；本專案是獨立的家族放置切片，並非該模擬器的移植。

## 遊戲內容

- 點擊「閉關修煉」凝聚靈氣，族人亦會自動吐納
- 招募族人以提升每秒靈氣產量
- 老祖突破時從三項隨機「家族傳承」中選擇一項
- 每 15–30 秒判定一次隨機家族事件
- 自動儲存進度，並計算最多八小時的離線收益
- 支援桌面與手機版面，以及減少動態效果的系統偏好

## 本機執行

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43180](http://127.0.0.1:43180).

建立正式版本：

```bash
npm run build
npm run preview
```

遊戲進度儲存在瀏覽器的 `localStorage`，毋須後端服務或環境變數。
