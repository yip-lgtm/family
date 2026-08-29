#!/usr/bin/env python3
"""Generate a 3-minute pitch deck for 教父世家."""
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.oxml.ns import nsmap
from pptx.oxml import parse_xml
from pptx.util import Emu, Inches, Pt

W, H = Inches(13.333), Inches(7.5)
INK = RGBColor(0x0B, 0x08, 0x04)
GOLD = RGBColor(0xD4, 0xAF, 0x37)
CREAM = RGBColor(0xF4, 0xE8, 0xC8)
MUTED = RGBColor(0xB8, 0xA8, 0x88)
CYAN = RGBColor(0x7E, 0xC8, 0xC3)

OUT = Path(__file__).resolve().parents[1] / "docs" / "教父世家-3分鐘簡報.pptx"


def set_run(run, text, size=18, bold=False, color=CREAM, font="Microsoft YaHei"):
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    rPr = run._r.get_or_add_rPr()
    # East Asian font
    ea = parse_xml(
        f'<a:ea xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" typeface="{font}"/>'
    )
    rPr.append(ea)


def add_notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text.strip()


def bg(slide, color=INK):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def bar(slide, top, height=Inches(0.04), color=GOLD):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), top, W, height)
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh


def box(slide, l, t, w, h, fill=None, line=None):
    sh = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, w, h)
    if fill:
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill
    else:
        sh.fill.background()
    if line:
        sh.line.color.rgb = line
        sh.line.width = Pt(1.25)
    else:
        sh.line.fill.background()
    return sh


def tb(slide, l, t, w, h, lines, align=PP_ALIGN.LEFT):
    """lines: list of (text, size, bold, color) or str"""
    tf = slide.shapes.add_textbox(l, t, w, h).text_frame
    tf.word_wrap = True
    first = True
    for item in lines:
        if isinstance(item, str):
            item = (item, 18, False, CREAM)
        text, size, bold, color = item
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.alignment = align
        p.space_after = Pt(6)
        set_run(p.add_run(), text, size, bold, color)
    return tf


def new_slide(prs):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    bar(s, Inches(0), Inches(0.06))
    bar(s, H - Inches(0.06), Inches(0.06))
    return s


def main():
    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H

    # 1 Title
    s = new_slide(prs)
    tb(s, Inches(0.8), Inches(1.5), Inches(11.5), Inches(0.5),
       [("蒼梧山 · 修仙家族史詩", 16, False, GOLD)], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(2.05), Inches(11.5), Inches(1.1),
       [("教父世家", 54, True, GOLD)], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(3.2), Inches(11.5), Inches(0.7),
       [("你唔係點擊升級。你係天道。", 26, False, CREAM)], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(4.1), Inches(11.5), Inches(1.2),
       [
           ("約 3 分鐘  ·  含製作 workflow", 16, False, MUTED),
           ("玩：https://yip-lgtm.github.io/family/", 18, True, CYAN),
           ("源碼：https://github.com/yip-lgtm/family.git", 16, False, MUTED),
       ], PP_ALIGN.CENTER)
    add_notes(s, """大家好。呢個係教父世家。
唔係又一個點擊升級遊戲。你入去唔係一個數字，而係一間住喺青嵐山門嘅修仙世家。
你係天道：睇住人長大、結緣、走火、身死道消；間中伸手改命。
而家就可以玩：yip-lgtm.github.io/family
源碼喺 github.com/yip-lgtm/family
今日三分鐘：做咩、點做出嚟、點玩。""")

    # 2 Not a clicker
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.9),
       [("01  ·  唔係點擊遊戲", 14, False, GOLD),
        ("玩家角色：天道，唔係農夫", 32, True, CREAM)])
    cards = [
        ("傳統放置", "囤靈氣\n買升級\n睇數字漲", MUTED),
        ("教父世家", "養人\n改命\n睇戲", GOLD),
        ("你出手", "賜福 · 天劫\n心魔 · 指派\n耗的是業力", CYAN),
    ]
    for i, (t, b, c) in enumerate(cards):
        x = Inches(0.7 + i * 4.1)
        box(s, x, Inches(2.0), Inches(3.8), Inches(4.4), RGBColor(0x16, 0x12, 0x0C), c)
        tb(s, x + Inches(0.25), Inches(2.25), Inches(3.3), Inches(0.6),
           [(t, 20, True, c)])
        tb(s, x + Inches(0.25), Inches(3.0), Inches(3.3), Inches(3.0),
           [(b, 22, False, CREAM)])
    add_notes(s, """傳統放置遊戲：你係農夫，囤資源、買升級、睇數字。
教父世家唔係。畫面中間個靈樞可以聚氣，但真正玩法係右邊同下面：一班有根骨、心性、境界、壽元、心情、關係網嘅人。
你用業力賜福、降天劫、種心魔、或者指派去丹房藏經閣。
你少出手，山門自己過月。你出手，就係改命。""")

    # 3 Heaven
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.9),
       [("02  ·  天道介面", 14, False, GOLD),
        ("一屏睇晒山門、人、同你可改嘅命", 28, True, CREAM)])
    items = [
        ("曆法 HUD", "玄元曆、靈氣、業力、人口。暫停、一倍、三倍、八倍過月。"),
        ("山門地圖", "靈樞、後山、丹房、藏經閣、山門、雲市。人會自己揀去邊。"),
        ("人物檢視", "根骨、心性、功法、丹藥、法寶、心事、記憶、關係。"),
        ("天道三鍵", "賜福、天劫、心魔。再加指派。業力唔夠就唔好亂改。"),
        ("世家傳承", "家訓、老祖突破、三選 N 天賦。金丹元嬰有金光。"),
        ("山門誌", "功法、丹方、法寶、紀年。人死功法可以留下。"),
    ]
    for i, (t, b) in enumerate(items):
        col, row = i % 3, i // 3
        x, y = Inches(0.55 + col * 4.2), Inches(1.7 + row * 2.55)
        box(s, x, y, Inches(4.0), Inches(2.35), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.2), y + Inches(0.2), Inches(3.6), Inches(0.5), [(t, 18, True, GOLD)])
        tb(s, x + Inches(0.2), y + Inches(0.75), Inches(3.6), Inches(1.4), [(b, 15, False, CREAM)])
    add_notes(s, """介面就係天道嘅工作台。
上面係曆法、靈氣、業力。時間可以停、可以快轉。
中間係山門地圖：人會自己去後山冒險、丹房煉丹、藏經閣讀書、雲市交易。
點一個人，睇根骨心性境界心事記憶。
天道三鍵好貴：賜福八業、天劫十二、心魔十、指派三。
左邊傳承：家訓、老祖突破、揀天賦。金丹同元嬰會金光一閃。""")

    # 4 Living people
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.85),
       [("03  ·  活人，唔係數值", 14, False, GOLD),
        ("開局六人，各有根骨、心性、心事", 28, True, CREAM)])
    people = [
        ("青玄機", "老祖 · 金丹後期", "鎮山門。你唔可以等佢死。"),
        ("沈清梧", "長女 · 金丹初期", "穩陣、顧家、會頂老祖。"),
        ("葉疏影", "二代 · 築基", "冷、準、同清梧有舊怨。"),
        ("白無塵", "外門 · 築基", "散修入贅，身世成謎。"),
        ("蒼小魚", "雜役 · 煉氣", "貪生、識時務、會偷雞。"),
        ("嵐七七", "記名 · 煉氣", "細、靈、成日問不該問嘅。"),
    ]
    for i, (name, role, blurb) in enumerate(people):
        col, row = i % 3, i // 3
        x, y = Inches(0.55 + col * 4.2), Inches(1.4 + row * 2.7)
        box(s, x, y, Inches(4.0), Inches(2.5), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.22), y + Inches(0.25), Inches(3.5), Inches(0.5), [(name, 22, True, GOLD)])
        tb(s, x + Inches(0.22), y + Inches(0.85), Inches(3.5), Inches(0.4), [(role, 14, False, CYAN)])
        tb(s, x + Inches(0.22), y + Inches(1.35), Inches(3.5), Inches(0.85), [(blurb, 16, False, CREAM)])
    add_notes(s, """開局六個人，全部寫咗性格，唔係隨機數。
青玄機鎮山門，金丹後期，壽元同普通人唔同，死唔到——因為冇老祖就冇世家。
沈清梧穩、顧家。葉疏影冷、準、同清梧有舊怨。白無塵外來、身世成謎。蒼小魚貪生識時務。嵐七七細、靈、成日問不該問嘅嘢。
每個月佢哋自己揀修煉、冒險、煉丹、讀書、交際、交易或者歇息。會生病、心魔、走火、身死。死咗，功法可以留低。
你招人，招嚟嘅係新角色，唔係再加一點 DPS。""")

    # 5 Screenplay + AI
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.85),
       [("04  ·  編劇組 + OpenRouter", 14, False, GOLD),
        ("《教父》三部曲節奏，唔抄對白", 28, True, CREAM)])
    acts = [
        ("第一幕", "血色開端", "權力真空、聯姻、暗湧。家要先立住。"),
        ("第二幕", "雙生歲月", "繼承、背叛、事業擴張。人開始唔同路。"),
        ("第三幕", "最後輓歌", "贖罪、遺產、落幕。唔一定團圓。"),
    ]
    for i, (act, title, blurb) in enumerate(acts):
        x = Inches(0.55 + i * 4.2)
        box(s, x, Inches(1.4), Inches(4.0), Inches(2.55), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.2), Inches(1.55), Inches(3.6), Inches(0.35), [(act, 13, False, MUTED)])
        tb(s, x + Inches(0.2), Inches(1.95), Inches(3.6), Inches(0.5), [(title, 22, True, GOLD)])
        tb(s, x + Inches(0.2), Inches(2.55), Inches(3.6), Inches(1.1), [(blurb, 15, False, CREAM)])
    box(s, Inches(0.55), Inches(4.15), Inches(12.2), Inches(2.7), RGBColor(0x14, 0x10, 0x0A), CYAN)
    tb(s, Inches(0.8), Inches(4.35), Inches(11.7), Inches(2.3), [
        ("現場：每兩個月自動一場戲 · 可按「下一場」催更", 16, True, CYAN),
        ("有 Key：OpenRouter 用你揀嘅免費模型寫場面、對白、長線。Key 只喺你部瀏覽器。", 15, False, CREAM),
        ("冇 Key / 失敗：劇組代班——仍然係完整劇本，唔會停機。", 15, False, CREAM),
        ("戲會寫入心事同關係，再影響下個月邊個去邊、同邊個結怨。", 15, False, CREAM),
    ])
    add_notes(s, """呢度係產品最特別嘅一層：編劇組。
結構致敬《教父》三部曲：血色開端、雙生歲月、最後輓歌。致敬節奏同主題，唔抄對白，唔抄人名。
每兩個月自動一場戲，你亦可以撳下一場。
接咗 OpenRouter，預設免費路由。API Key 只存在你部瀏覽器，我哋伺服器唔存。
冇 Key 或者模型失敗，就用劇組代班——仍然有完整場面，遊戲唔會爛。
場戲會寫入角色心事同關係，所以下個月世界會唔同。""")

    # 6 Craft
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.85),
       [("05  ·  金漆山門，現場聲畫", 14, False, GOLD),
        ("零外鏈圖 · Web Audio · 嗶哩官方嵌入", 26, True, CREAM)])
    craft = [
        ("視覺", "CSS 金漆牌坊、墨底描金。Canvas 靈塵。突破金光。無外部圖片。"),
        ("音效", "瀏覽器合成木魚、磬、雷、心魔。一鍵靜音。"),
        ("BGM", "嗶哩嗶哩官方嵌入《中國風純音樂》。可縮小成一條，唔擋操作。"),
        ("技術", "Vite + 原生 JS。規則模擬同編劇分檔。GitHub Pages 可直接開。"),
    ]
    for i, (t, b) in enumerate(craft):
        col, row = i % 2, i // 2
        x, y = Inches(0.55 + col * 6.35), Inches(1.4 + row * 2.7)
        box(s, x, y, Inches(6.1), Inches(2.5), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.3), y + Inches(0.3), Inches(5.5), Inches(0.5), [(t, 22, True, GOLD)])
        tb(s, x + Inches(0.3), y + Inches(1.0), Inches(5.5), Inches(1.2), [(b, 16, False, CREAM)])
    add_notes(s, """美術全部 CSS 同 Canvas，無外部圖，載入快，GitHub Pages 穩。
音效用 Web Audio 合成木魚磬雷，唔使下載音檔。
背景音樂係嗶哩官方嵌入《中國風純音樂》，有牌有鏈接。右下角可縮成一條，唔擋地圖。
技術棧刻意薄：Vite、原生 JS。規則引擎同編劇組分開。npm run dev 或者直接開 Pages。""")

    # 7 Production workflow
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.28), Inches(12), Inches(0.85),
       [("06  ·  遊戲製作 workflow", 14, False, GOLD),
        ("先立天道，再寫規則，最後先上金漆", 26, True, CREAM)])
    flow = [
        ("1", "立意", "玩家係天道。\n養人、改命、睇戲。\n唔做點擊農夫。"),
        ("2", "規則", "world.js\n月結、根骨、壽元\n業力、死亡、傳承。"),
        ("3", "編劇", "screenplay.js\n三幕節奏 + 劇組代班。\n戲寫入心事同關係。"),
        ("4", "皮與聲", "CSS 金漆、Canvas 靈塵、\nWeb Audio、嗶哩嵌入。\n零外鏈圖。"),
        ("5", "試玩", "Vite 開 /family/\n改完即睇。\n細畫面、BGM、文案。"),
        ("6", "出貨", "npm run build\n推 gh-pages。\ngithub.io/family"),
    ]
    for i, (n, t, b) in enumerate(flow):
        col, row = i % 3, i // 3
        x, y = Inches(0.5 + col * 4.2), Inches(1.35 + row * 2.8)
        box(s, x, y, Inches(4.0), Inches(2.6), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.2), y + Inches(0.18), Inches(3.6), Inches(0.4),
           [(n + "  ·  " + t, 18, True, GOLD)])
        tb(s, x + Inches(0.2), y + Inches(0.7), Inches(3.6), Inches(1.7),
           [(line, 15, False, CREAM) for line in b.split("\n")])
    add_notes(s, """製作唔係先畫皮。先問：玩家係邊個？答案係天道。
第二先寫規則引擎 world.js：每個月人自己揀去邊、會病、會走火、會死，業力先可以改命。
第三先有編劇組 screenplay.js：三幕致敬教父節奏，劇組代班保證冇 Key 都有戲。
第四先上金漆：CSS、Canvas、Web Audio、嗶哩官方嵌入。無外部圖，Pages 先載得快。
第五現場試：Vite 開 /family/，改完即睇。BGM 太大、文案唔順，呢一步先修。
第六出貨：npm run build，推 gh-pages，base 設 /family/，就係而家呢個站。""")

    # 8 Engineering loop
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.28), Inches(12), Inches(0.85),
       [("07  ·  工程回路", 14, False, GOLD),
        ("六個檔，一條每日回路：改 → 睇 → 推", 26, True, CREAM)])
    modules = [
        ("world.js", "月結、人物、天道三鍵"),
        ("screenplay.js", "導演、三幕、OpenRouter"),
        ("main.js", "HUD、地圖、檢視、操作"),
        ("style.css", "金漆牌坊、墨底描金"),
        ("fx.js", "靈塵、聚氣、突破金光"),
        ("audio.js", "木魚磬雷 + 嗶哩嵌入"),
    ]
    for i, (name, blurb) in enumerate(modules):
        col, row = i % 3, i // 3
        x, y = Inches(0.5 + col * 4.2), Inches(1.28 + row * 1.7)
        box(s, x, y, Inches(4.0), Inches(1.52), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.2), y + Inches(0.18), Inches(3.6), Inches(0.4),
           [(name, 18, True, CYAN)])
        tb(s, x + Inches(0.2), y + Inches(0.68), Inches(3.6), Inches(0.6),
           [(blurb, 15, False, CREAM)])
    box(s, Inches(0.5), Inches(4.8), Inches(12.3), Inches(2.15), RGBColor(0x14, 0x10, 0x0A), CYAN)
    tb(s, Inches(0.75), Inches(4.95), Inches(11.8), Inches(1.85), [
        ("日常　改規則或文案 → npm run dev → 現場睇一場戲 → git commit", 16, True, CYAN),
        ("出貨　npm run build → 將 dist 推去 gh-pages → https://yip-lgtm.github.io/family/", 16, False, CREAM),
        ("約束　唔下載嗶哩音源 · 唔抄《教父》對白 · Key 只存瀏覽器 · 劇組永遠可代班", 15, False, MUTED),
    ])
    add_notes(s, """工程刻意薄：六個檔，冇框架組件庫。
world 管規則，screenplay 管戲，main 管天道介面，style、fx、audio 管現場。
每日回路就係：改一條規則或者一句文案，開 Vite 睇，覺得山門仲似一間屋，先 commit。
出貨唔使後端：build 完推 gh-pages，base 係 /family/。
三條紅線：唔偷嗶哩音、唔抄教父對白、Key 唔上伺服器。劇組代班永遠兜底。""")

    # 9 How to play 3 min
    s = new_slide(prs)
    tb(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.85),
       [("08  ·  而家點玩（三分鐘）", 14, False, GOLD),
        ("四步入局，唔使註冊", 28, True, CREAM)])
    steps = [
        ("1", "打開連結", "yip-lgtm.github.io/family\n撳「承天命」。"),
        ("2", "睇一個人", "點沈清梧或者葉疏影。\n記住佢心事同關係。"),
        ("3", "等兩場戲", "開時間。睇編劇組出第一、第二場。"),
        ("4", "先改一次命", "賜福或者天劫。\n然後停手，睇後果。"),
    ]
    for i, (n, t, b) in enumerate(steps):
        x = Inches(0.5 + i * 3.2)
        box(s, x, Inches(1.45), Inches(3.0), Inches(4.7), RGBColor(0x14, 0x10, 0x0A), GOLD)
        tb(s, x + Inches(0.2), Inches(1.7), Inches(2.6), Inches(0.7), [(n, 36, True, GOLD)], PP_ALIGN.CENTER)
        tb(s, x + Inches(0.2), Inches(2.5), Inches(2.6), Inches(0.7), [(t, 18, True, CREAM)], PP_ALIGN.CENTER)
        tb(s, x + Inches(0.15), Inches(3.35), Inches(2.7), Inches(2.4), [(b, 15, False, MUTED)], PP_ALIGN.CENTER)
    add_notes(s, """示範四步。
一：打開 yip-lgtm.github.io/family ，撳承天命。
二：點一個角色，睇心事。建議先睇沈清梧同葉疏影——佢哋有舊怨，戲先有衝突。
三：開時間，等編劇組兩場。第一幕會寫權力同聯姻。
四：只用一次天道：賜福或者天劫。然後停手。好嘅天道唔係不停改，而係改完就睇。
可選：模型設定貼 OpenRouter Key，之後嘅戲會更貼近現場。冇 Key 一樣完整。""")

    # 10 Close
    s = new_slide(prs)
    tb(s, Inches(0.8), Inches(1.35), Inches(11.7), Inches(0.5),
       [("結  ·  家訓", 14, False, GOLD)], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(1.9), Inches(11.7), Inches(1.4),
       [("人死功法在。家在，戲就未完。", 32, True, GOLD)], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(3.4), Inches(11.7), Inches(1.6),
       [
           ("玩　　https://yip-lgtm.github.io/family/", 20, True, CYAN),
           ("源碼　https://github.com/yip-lgtm/family.git", 18, False, MUTED),
           ("鏡像　https://github.com/yip-lgtm/qi-lineage", 16, False, MUTED),
       ], PP_ALIGN.CENTER)
    tb(s, Inches(0.8), Inches(5.5), Inches(11.7), Inches(0.8),
       [("開源 · 瀏覽器即玩 · Key 可選 · 劇組永遠代班", 16, False, MUTED)], PP_ALIGN.CENTER)
    add_notes(s, """收束。
教父世家想證明：放置遊戲可以係一場有人、有怨、有遺產嘅戲，而唔係一條升級曲線。
你係天道。少出手。睇住人。
連結再講一次：github.io/family 同 github.com/yip-lgtm/family。
多謝。歡迎而家一齊開。""")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
