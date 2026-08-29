(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],t=[{type:`good`,title:`仙草現世`,text:`家族子弟在後山發現百年靈芝！`,qi:500,detail:`靈氣 +500`},{type:`good`,title:`天作之合`,text:`家族喜結良緣，香火愈盛。`,members:2,detail:`族人 +2`},{type:`good`,title:`高人指點`,text:`雲遊真人傳下一縷修行心得。`,qi:280,detail:`靈氣 +280`},{type:`good`,title:`靈脈湧動`,text:`地底靈脈忽然復甦，滿院清輝。`,qi:800,detail:`靈氣 +800`},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門！`,members:-1,detail:`族人 −1`},{type:`bad`,title:`走火入魔`,text:`一名族人修行冒進，靈氣四散。`,qi:-200,detail:`靈氣 −200`},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植盡數凋零。`,qi:-350,detail:`靈氣 −350`}],n=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`],r={qi:680,members:6,realm:0,traits:[],logs:[{time:`辰時`,text:`青嵐世家於蒼梧山立下道統。`,tone:`gold`},{time:`巳時`,text:`靈脈運轉穩定，族人開始吐納。`,tone:`jade`}],eventCountdown:0},i=e=>r.traits.includes(e),a=()=>10*(i(`diligence`)?2:1),o=()=>{let e=i(`heaven-root`)?1.5:1,t=i(`jade-bones`)?1.25:1;return r.members*e*t},s=()=>{let e=i(`merchant`)?1.2975:1.35,t=i(`prosperity`)?.8:1;return Math.round(80*e**(r.members-1)*t)},c=()=>Math.round(500*2.15**r.realm),l=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e);document.querySelector(`#app`).innerHTML=`
  <div class="ambient" aria-hidden="true">
    <span class="mist mist-one"></span>
    <span class="mist mist-two"></span>
    <span class="star star-one"></span>
    <span class="star star-two"></span>
    <span class="star star-three"></span>
  </div>

  <div id="toast-region" class="toast-region" aria-live="polite"></div>

  <header class="topbar">
    <a class="brand" href="#" aria-label="青嵐世家首頁">
      <span class="brand-seal">嵐</span>
      <span class="brand-copy">
        <strong>青嵐世家</strong>
        <small>CULTIVATION FAMILY</small>
      </span>
    </a>
    <div class="world-state">
      <span class="pulse-dot"></span>
      <span>靈脈穩定</span>
      <i></i>
      <span>玄元曆 146 年</span>
    </div>
  </header>

  <main class="game-shell">
    <section class="hero-heading">
      <div>
        <span class="eyebrow">蒼梧山 · 青嵐血脈</span>
        <h1>一脈承仙途，<em>百世鑄道統</em></h1>
        <p>引天地之靈氣，興家族之氣運。你的每一次抉擇，都將流傳於後世。</p>
      </div>
      <div class="fortune-mark" aria-label="家族氣運昌盛">
        <span>家族氣運</span>
        <strong>昌盛</strong>
      </div>
    </section>

    <div class="dashboard-grid">
      <aside class="left-column">
        <section class="panel stats-panel">
          <div class="panel-heading">
            <span>
              <small>FAMILY LEDGER</small>
              <h2>家族總覽</h2>
            </span>
            <span class="live-badge">生生不息</span>
          </div>

          <div class="stat-card qi-stat">
            <span class="stat-icon">氣</span>
            <div>
              <small>天地靈氣</small>
              <strong id="qi-value">0</strong>
              <span><b>↗</b> <span id="qi-rate">0</span> / 秒</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon member-icon">族</span>
            <div>
              <small>家族族人</small>
              <strong><span id="member-value">0</span><i>位</i></strong>
              <span>同心修煉，共築仙途</span>
            </div>
          </div>

          <div class="realm-block">
            <div class="realm-label">
              <span><small>老祖境界</small><strong id="realm-name">煉氣初期</strong></span>
              <span id="realm-progress-label">0 / 0</span>
            </div>
            <div class="progress-track"><span id="realm-progress"></span></div>
            <p>突破後可覺醒一項家族傳承</p>
          </div>
        </section>

        <section class="panel actions-panel">
          <div class="section-title">
            <span>◈</span><h2>家族經營</h2><i></i>
          </div>
          <button id="recruit-button" class="game-button secondary-button" type="button">
            <span class="button-glyph">人</span>
            <span><strong>招募族人</strong><small>延續香火，壯大家族</small></span>
            <span class="cost"><b id="recruit-cost">0</b><small>靈氣</small></span>
          </button>
          <button id="breakthrough-button" class="game-button gold-button" type="button">
            <span class="button-glyph">境</span>
            <span><strong>老祖突破</strong><small id="breakthrough-hint">衝擊下一境界</small></span>
            <span class="cost"><b id="breakthrough-cost">0</b><small>靈氣</small></span>
          </button>
        </section>
      </aside>

      <section class="cultivation-stage">
        <div class="stage-header">
          <span></span>
          <div><small>SPIRIT NEXUS</small><h2>家族靈樞</h2></div>
          <span></span>
        </div>

        <div class="nexus-wrap">
          <div class="orbit orbit-outer"><i></i><i></i><i></i></div>
          <div class="orbit orbit-inner"></div>
          <button id="gather-button" class="qi-orb" type="button" aria-label="閉關修煉，凝聚靈氣">
            <span class="orb-aura"></span>
            <span class="orb-rune">炁</span>
            <span class="orb-copy"><strong>閉關修煉</strong><small>GATHER QI</small></span>
          </button>
          <span class="nexus-particle particle-one"></span>
          <span class="nexus-particle particle-two"></span>
          <span class="nexus-particle particle-three"></span>
        </div>
        <p class="gather-message">點擊靈樞凝聚 <strong id="click-yield">+10</strong> 靈氣</p>
        <span class="meditation-note">「 心若止水，氣自歸元 」</span>
      </section>

      <aside class="right-column">
        <section class="panel heritage-panel">
          <div class="panel-heading">
            <span>
              <small>FAMILY HERITAGE</small>
              <h2>家族傳承</h2>
            </span>
            <span class="dna-mark">⌘</span>
          </div>
          <div id="trait-list" class="trait-list"></div>
          <div id="empty-traits" class="empty-traits">
            <span class="empty-seal">承</span>
            <strong>傳承尚未覺醒</strong>
            <p>老祖突破境界時，可從三項家族天賦中擇一，福澤後世。</p>
          </div>
        </section>

        <section class="panel log-panel">
          <div class="log-heading">
            <span><i></i><strong>家族志</strong><small>CLAN CHRONICLE</small></span>
            <span class="log-live"><i></i> 載錄中</span>
          </div>
          <div id="log-list" class="log-list"></div>
          <div class="scroll-end"><i></i><span>卷</span><i></i></div>
        </section>

        <div class="omen-timer">
          <span>✦</span>
          <p><small>天機流轉</small><strong id="event-timer">下一次天象：-- 秒</strong></p>
        </div>
      </aside>
    </div>
  </main>

  <footer>
    <span>青嵐家訓</span>
    <p>修身 · 齊家 · 問道 · 長生</p>
    <span>玄元146</span>
  </footer>

  <div id="trait-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title">
      <div class="modal-glow"></div>
      <span class="modal-seal">脈</span>
      <small>ANCESTRAL AWAKENING</small>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p>老祖踏入新境，冥冥中三道傳承顯現。<br />擇其一，福澤青嵐後世。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <span class="modal-footnote">此選擇將永久銘刻於族譜</span>
    </div>
  </div>
`;var u={qi:document.querySelector(`#qi-value`),qiRate:document.querySelector(`#qi-rate`),members:document.querySelector(`#member-value`),realm:document.querySelector(`#realm-name`),realmProgress:document.querySelector(`#realm-progress`),realmProgressLabel:document.querySelector(`#realm-progress-label`),recruitCost:document.querySelector(`#recruit-cost`),breakthroughCost:document.querySelector(`#breakthrough-cost`),breakthroughHint:document.querySelector(`#breakthrough-hint`),clickYield:document.querySelector(`#click-yield`),recruitButton:document.querySelector(`#recruit-button`),breakthroughButton:document.querySelector(`#breakthrough-button`),gatherButton:document.querySelector(`#gather-button`),traitList:document.querySelector(`#trait-list`),emptyTraits:document.querySelector(`#empty-traits`),logList:document.querySelector(`#log-list`),modal:document.querySelector(`#trait-modal`),choices:document.querySelector(`#trait-choices`),toastRegion:document.querySelector(`#toast-region`),eventTimer:document.querySelector(`#event-timer`)};function d(){return new Intl.DateTimeFormat(`zh-Hant`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date)}function f(e,t=``){r.logs.unshift({time:d(),text:e,tone:t}),r.logs=r.logs.slice(0,10),p()}function p(){u.logList.innerHTML=r.logs.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function m(){u.emptyTraits.hidden=r.traits.length>0,u.traitList.innerHTML=r.traits.map(t=>{let n=e.find(e=>e.id===t);return`
      <div class="active-trait">
        <span>${n.icon}</span>
        <div><strong>${n.name}</strong><small>${n.modifier}</small></div>
      </div>
    `}).join(``)}function h(){let e=c(),t=r.realm>=n.length-1;u.qi.textContent=l(r.qi),u.qiRate.textContent=l(o()),u.members.textContent=l(r.members),u.realm.textContent=n[Math.min(r.realm,n.length-1)],u.realmProgressLabel.textContent=t?`道心圓滿`:`${l(Math.min(r.qi,e))} / ${l(e)}`,u.realmProgress.style.width=t?`100%`:`${Math.min(r.qi/e*100,100)}%`,u.recruitCost.textContent=l(s()),u.breakthroughCost.textContent=t?`—`:l(e),u.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${n[r.realm+1]}`,u.clickYield.textContent=`+${l(a())}`,u.recruitButton.disabled=r.qi<s(),u.breakthroughButton.disabled=t||r.qi<e}function g(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${l(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove())}function _(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function v(){let t=e.filter(e=>!r.traits.includes(e.id));return[...t.length>=3?t:e].sort(()=>Math.random()-.5).slice(0,3)}function y(){let e=v();u.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),u.modal.classList.add(`visible`),u.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),u.choices.querySelector(`button`)?.focus()}function b(t){let n=e.find(e=>e.id===t);n&&(r.traits.includes(t)||r.traits.push(t),u.modal.classList.remove(`visible`),u.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),f(`血脈覺醒「${n.name}」，${n.description}。`,`gold`),x({type:`heritage`,title:`家族傳承已覺醒`,text:n.name,detail:n.modifier}),m(),h())}function x(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`UNEXPECTED TRIBULATION`:`AUSPICIOUS OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,u.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function S(e=!1){if(!e&&Math.random()>.5){f(`天機掠過，一夜無事，族人修行如常。`);return}let n=t[Math.floor(Math.random()*t.length)],a=i(`ancestral`)&&n.qi>0?1.5:1;n.qi&&(r.qi=Math.max(0,r.qi+n.qi*a)),n.members&&(r.members=Math.max(1,r.members+n.members));let o=n.qi>0&&a>1?`靈氣 +${l(n.qi*a)}`:n.detail;x({...n,detail:o}),f(`${n.title}：${n.text}（${o}）`,n.type===`bad`?`danger`:`jade`),h()}function C(){r.eventCountdown=Math.floor(15+Math.random()*16),u.eventTimer.textContent=`下一次天象：${r.eventCountdown} 秒`}u.gatherButton.addEventListener(`click`,e=>{let t=a();r.qi+=t,g(e.clientX,e.clientY,t),_(u.gatherButton),h()}),u.recruitButton.addEventListener(`click`,()=>{let e=s();r.qi<e||(r.qi-=e,r.members+=1,_(u.recruitButton),f(`一名懷有靈根的後輩歸入族譜。族人增至 ${r.members} 位。`,`jade`),h())}),u.breakthroughButton.addEventListener(`click`,()=>{let e=c();r.qi<e||r.realm>=n.length-1||(r.qi-=e,r.realm+=1,_(u.breakthroughButton),f(`老祖破境成功，踏入「${n[r.realm]}」！`,`gold`),h(),window.setTimeout(y,350))}),u.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&b(t.dataset.trait)}),window.setInterval(()=>{r.qi+=o()/4,h()},250),window.setInterval(()=>{--r.eventCountdown,r.eventCountdown<=0?(S(),C()):u.eventTimer.textContent=`下一次天象：${r.eventCountdown} 秒`},1e3),window.__cultivationFamily={triggerRandomEvent:()=>S(!0),state:r},p(),m(),h(),C();