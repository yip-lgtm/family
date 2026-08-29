(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=[e,t,n,r,i],o=[0,2,4,3,1,4,2,0,3,2,4,0];function s(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function c(){let c=null,l=null,u=null,d=null,f=null,p=null,m=0,h=0,g=0,_=!1;function v(){return c||(c=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),l=c.createGain(),l.gain.value=.55,l.connect(c.destination),u=c.createGain(),u.gain.value=0,u.connect(l),d=c.createGain(),d.gain.value=.42,d.connect(l),c)}async function y(){v(),c.state===`suspended`&&await c.resume()}function b(e){v();let t=()=>{e()};if(c.state===`suspended`){c.resume().then(t);return}t()}function x(e,t,n,r,i,a,o=0){let s=c.createOscillator(),l=c.createGain();s.type=t,s.frequency.setValueAtTime(e,n),s.detune.setValueAtTime(o,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),s.connect(l),l.connect(a),s.start(n),s.stop(n+r+.02)}function S(){if(f)return;f=c.createOscillator(),p=c.createGain(),f.type=`sine`,f.frequency.value=e/4,p.gain.value=.035;let t=c.createOscillator(),n=c.createGain();t.type=`sine`,t.frequency.value=e/2,n.gain.value=.012,f.connect(p),t.connect(n),p.connect(u),n.connect(u),f.start(),t.start(),f._pair=t}function C(){if(f){try{f.stop(),f._pair?.stop()}catch{}f.disconnect(),f._pair?.disconnect(),p?.disconnect(),f=null}}function w(){if(!_||!c)return;let e=c.currentTime;for(;h<e+1.4;){let e=a[o[g%o.length]],t=g%8==0?.5:1;x(e*t,`sine`,h,1.15,.055,u,-6),x(e*t,`triangle`,h,1.05,.028,u,8),g%4==0&&x(a[4]/2,`sine`,h,1.6,.018,u),h+=.92,g+=1}}function T(){w(),m=window.setTimeout(T,200)}async function E(e){return await y(),_=e,e?(S(),h=c.currentTime+.05,u.gain.cancelScheduledValues(c.currentTime),u.gain.setValueAtTime(Math.max(u.gain.value,1e-4),c.currentTime),u.gain.exponentialRampToValueAtTime(.22,c.currentTime+.6),window.clearTimeout(m),T()):(u.gain.cancelScheduledValues(c.currentTime),u.gain.setValueAtTime(Math.max(u.gain.value,1e-4),c.currentTime),u.gain.exponentialRampToValueAtTime(1e-4,c.currentTime+.35),window.clearTimeout(m),C()),_}function D(){b(()=>{let e=c.currentTime;x(1864,`sine`,e,.55,.16,d),x(2489,`sine`,e,.32,.07,d);let t=c.createBufferSource();t.buffer=s(c,.045);let n=c.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=c.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(d),t.start(e),t.stop(e+.06)})}function O(){b(()=>{let t=c.currentTime;[e,n,r].forEach((e,n)=>{x(e,`sine`,t,.55,.09,d),x(e*1.5,`triangle`,t+.18+n*.04,.5,.07,d),x(e*2,`sine`,t+.38+n*.05,.55,.05,d)})})}function k(n){b(()=>{let a=c.currentTime;n?(x(r,`sine`,a,.35,.1,d),x(i*2,`sine`,a+.12,.5,.09,d)):(x(e/2,`triangle`,a,.55,.12,d),x(t/2,`sine`,a+.08,.45,.08,d))})}return{unlock:y,setMusic:E,playQing:D,playRise:O,playEvent:k,isMusicOn:()=>_}}function l(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var u=c(),d=l(),f=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],p=[{type:`good`,title:`仙草現世`,text:`家族子弟在後山發現百年靈芝！`,qi:500,detail:`靈氣 +500`},{type:`good`,title:`天作之合`,text:`家族喜結良緣，香火愈盛。`,members:2,detail:`族人 +2`},{type:`good`,title:`高人指點`,text:`雲遊真人傳下一縷修行心得。`,qi:280,detail:`靈氣 +280`},{type:`good`,title:`靈脈湧動`,text:`地底靈脈忽然復甦，滿院清輝。`,qi:800,detail:`靈氣 +800`},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門！`,members:-1,detail:`族人 −1`},{type:`bad`,title:`走火入魔`,text:`一名族人修行冒進，靈氣四散。`,qi:-200,detail:`靈氣 −200`},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植盡數凋零。`,qi:-350,detail:`靈氣 −350`}],m=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],h={qi:680,members:6,realm:0,traits:[],logs:[{time:`辰時`,text:`青嵐世家於蒼梧山立下道統。`,tone:`gold`},{time:`巳時`,text:`靈脈運轉穩定，族人開始吐納。`,tone:`jade`}],eventCountdown:0},g=e=>h.traits.includes(e),_=()=>10*(g(`diligence`)?2:1),v=()=>{let e=g(`heaven-root`)?1.5:1,t=g(`jade-bones`)?1.25:1;return h.members*e*t},y=()=>{let e=g(`merchant`)?1.2975:1.35,t=g(`prosperity`)?.8:1;return Math.round(80*e**(h.members-1)*t)},b=()=>Math.round(500*2.15**h.realm),x=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e);document.querySelector(`#app`).innerHTML=`
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
    <div class="topbar-end">
      <button type="button" class="music-toggle" id="music-toggle" aria-pressed="false">
        🔊 音樂開/關
      </button>
      <div class="world-state">
        <span class="pulse-dot"></span>
        <span>靈脈穩定</span>
        <i></i>
        <span>玄元曆 146 年</span>
      </div>
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
`;var S={qi:document.querySelector(`#qi-value`),qiRate:document.querySelector(`#qi-rate`),members:document.querySelector(`#member-value`),realm:document.querySelector(`#realm-name`),realmProgress:document.querySelector(`#realm-progress`),realmProgressLabel:document.querySelector(`#realm-progress-label`),recruitCost:document.querySelector(`#recruit-cost`),breakthroughCost:document.querySelector(`#breakthrough-cost`),breakthroughHint:document.querySelector(`#breakthrough-hint`),clickYield:document.querySelector(`#click-yield`),recruitButton:document.querySelector(`#recruit-button`),breakthroughButton:document.querySelector(`#breakthrough-button`),gatherButton:document.querySelector(`#gather-button`),traitList:document.querySelector(`#trait-list`),emptyTraits:document.querySelector(`#empty-traits`),logList:document.querySelector(`#log-list`),modal:document.querySelector(`#trait-modal`),choices:document.querySelector(`#trait-choices`),toastRegion:document.querySelector(`#toast-region`),eventTimer:document.querySelector(`#event-timer`),musicToggle:document.querySelector(`#music-toggle`)};function C(){return new Intl.DateTimeFormat(`zh-Hant`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date)}function w(e,t=``){h.logs.unshift({time:C(),text:e,tone:t}),h.logs=h.logs.slice(0,10),T()}function T(){S.logList.innerHTML=h.logs.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function E(){S.emptyTraits.hidden=h.traits.length>0,S.traitList.innerHTML=h.traits.map(e=>{let t=f.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function D(){let e=b(),t=h.realm>=m.length-1;S.qi.textContent=x(h.qi),S.qiRate.textContent=x(v()),S.members.textContent=x(h.members),S.realm.textContent=m[Math.min(h.realm,m.length-1)],S.realmProgressLabel.textContent=t?`道心圓滿`:`${x(Math.min(h.qi,e))} / ${x(e)}`,S.realmProgress.style.width=t?`100%`:`${Math.min(h.qi/e*100,100)}%`,S.recruitCost.textContent=x(y()),S.breakthroughCost.textContent=t?`—`:x(e),S.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${m[h.realm+1]}`,S.clickYield.textContent=`+${x(_())}`,S.recruitButton.disabled=h.qi<y(),S.breakthroughButton.disabled=t||h.qi<e}function O(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${x(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function k(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function A(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function j(){let e=f.filter(e=>!h.traits.includes(e.id));return[...e.length>=3?e:f].sort(()=>Math.random()-.5).slice(0,3)}function M(){let e=j();S.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),S.modal.classList.add(`visible`),S.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),S.choices.querySelector(`button`)?.focus()}function N(e){let t=f.find(t=>t.id===e);t&&(h.traits.includes(e)||h.traits.push(e),S.modal.classList.remove(`visible`),S.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),w(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),P({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),E(),D())}function P(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`UNEXPECTED TRIBULATION`:`AUSPICIOUS OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,S.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function F(e=!1){if(!e&&Math.random()>.5){w(`天機掠過，一夜無事，族人修行如常。`);return}let t=p[Math.floor(Math.random()*p.length)],n=g(`ancestral`)&&t.qi>0?1.5:1;t.qi&&(h.qi=Math.max(0,h.qi+t.qi*n)),t.members&&(h.members=Math.max(1,h.members+t.members));let r=t.qi>0&&n>1?`靈氣 +${x(t.qi*n)}`:t.detail;u.playEvent(t.type!==`bad`),P({...t,detail:r}),w(`${t.title}：${t.text}（${r}）`,t.type===`bad`?`danger`:`jade`),D()}function I(){h.eventCountdown=Math.floor(15+Math.random()*16),S.eventTimer.textContent=`下一次天象：${h.eventCountdown} 秒`}S.gatherButton.addEventListener(`click`,e=>{let t=_();h.qi+=t;let{x:n,y:r}=k(e);O(n,r,t),d.burst(n,r),u.playQing(),A(S.gatherButton),D()}),S.recruitButton.addEventListener(`click`,()=>{let e=y();h.qi<e||(h.qi-=e,h.members+=1,u.playRise(),A(S.recruitButton),w(`一名懷有靈根的後輩歸入族譜。族人增至 ${h.members} 位。`,`jade`),D())}),S.breakthroughButton.addEventListener(`click`,()=>{let e=b();if(h.qi<e||h.realm>=m.length-1)return;h.qi-=e,h.realm+=1;let t=m[h.realm];u.playRise(),/金丹|元嬰/.test(t)&&d.flashScreen(),A(S.breakthroughButton),w(`老祖破境成功，踏入「${t}」！`,`gold`),D(),window.setTimeout(M,350)}),document.addEventListener(`pointerdown`,()=>{u.unlock()},{once:!0}),S.musicToggle.addEventListener(`click`,async()=>{let e=await u.setMusic(!u.isMusicOn());S.musicToggle.setAttribute(`aria-pressed`,String(e)),S.musicToggle.classList.toggle(`is-on`,e),S.musicToggle.textContent=e?`🔊 音樂開`:`🔇 音樂關`}),S.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&N(t.dataset.trait)}),window.setInterval(()=>{h.qi+=v()/4,D()},250),window.setInterval(()=>{--h.eventCountdown,h.eventCountdown<=0?(F(),I()):S.eventTimer.textContent=`下一次天象：${h.eventCountdown} 秒`},1e3),window.__cultivationFamily={triggerRandomEvent:()=>F(!0),state:h},document.addEventListener(`pointerdown`,()=>{u.unlock()},{once:!0}),T(),E(),D(),I();