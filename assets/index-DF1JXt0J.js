(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=e=>440*2**((e-69)/12),o=.5,s=32,c=[[0,37,8,.2,`bass`],[8,42,8,.18,`bass`],[16,44,8,.18,`bass`],[24,41,8,.17,`bass`],[0,56,2,.09,`piano`],[2,60,2,.08,`piano`],[4,65,2,.09,`piano`],[6,68,2,.07,`piano`],[8,58,2,.09,`piano`],[10,61,2,.08,`piano`],[12,65,2,.09,`piano`],[14,70,2,.07,`piano`],[16,60,2,.09,`piano`],[18,63,2,.08,`piano`],[20,68,2,.09,`piano`],[22,70,2,.07,`piano`],[24,56,2,.09,`piano`],[26,60,2,.08,`piano`],[28,63,2,.08,`piano`],[30,67,2,.07,`piano`],[4,65,4,.16,`lead`],[8,63,2,.14,`lead`],[10,61,2,.13,`lead`],[12,68,6,.15,`lead`],[20,77,2,.17,`lead`],[22,75,2,.16,`lead`],[24,80,1,.15,`lead`],[25,82,1,.15,`lead`],[26,77,5,.16,`lead`],[14,84,1,.07,`bell`],[15,80,1,.06,`bell`],[16,77,2,.06,`bell`]],l=Array.from({length:s},()=>[]);for(let e of c)l[e[0]].push(e);function u(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function d(){let c=null,d=null,f=null,p=null,m=null,h=[],g=null,_=null,v=0,y=0,b=0,x=0,S=!1;function C(){return c||(c=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),d=c.createGain(),d.gain.value=.52,d.connect(c.destination),f=c.createGain(),f.gain.value=0,p=c.createBiquadFilter(),p.type=`lowpass`,p.frequency.value=1750,p.Q.value=.45,f.connect(p),p.connect(d),m=c.createGain(),m.gain.value=.42,m.connect(d),g=u(c,.05),_=u(c,.045),c)}async function w(){C(),c.state===`suspended`&&await c.resume()}function T(e){C();let t=()=>{e()};if(c.state===`suspended`){c.resume().then(t);return}t()}function E(e,t,n,r,i,a,o=0){let s=c.createOscillator(),l=c.createGain();s.type=t,s.frequency.setValueAtTime(e,n),s.detune.setValueAtTime(o,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),s.connect(l),l.connect(a),s.start(n),s.stop(n+r+.02)}function D(e,t,n,r,i){let a=c.createBiquadFilter();a.type=`lowpass`,a.frequency.setValueAtTime(i===`bass`?780:i===`bell`?3400:2200,t),a.frequency.exponentialRampToValueAtTime(i===`bass`?420:1100,t+n),a.connect(f);let o=c.createBufferSource();o.buffer=g;let s=c.createBiquadFilter();s.type=`bandpass`,s.frequency.value=Math.min(e*2.2,2800),s.Q.value=1.6;let l=c.createGain(),u=r*(i===`bass`?.06:i===`bell`?.12:.16);l.gain.setValueAtTime(u,t),l.gain.exponentialRampToValueAtTime(1e-4,t+.035),o.connect(s),s.connect(l),l.connect(a),o.start(t),o.stop(t+.045),(i===`bass`?[[1,1],[2,.2],[3,.07]]:i===`bell`?[[1,.72],[2.003,.28],[4.01,.08]]:[[1,1],[2,.26],[3.01,.09],[4.04,.035]]).forEach(([i,o],s)=>{let l=c.createOscillator(),u=c.createGain();l.type=`sine`,l.frequency.setValueAtTime(e*i,t),l.detune.setValueAtTime(s===1?3:s===2?-2:0,t);let d=Math.max(2e-4,r*o);u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(d,t+.014),u.gain.exponentialRampToValueAtTime(d*.42,t+Math.min(.55,n*.35)),u.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(u),u.connect(a),l.start(t),l.stop(t+n+.04)})}function O(){h.length||[[a(49),.016,0],[a(56),.01,6],[a(61),.007,-5]].forEach(([e,t,n])=>{let r=c.createOscillator(),i=c.createGain(),a=c.createOscillator(),o=c.createGain();r.type=`sine`,r.frequency.value=e,r.detune.value=n,i.gain.value=t,a.frequency.value=.07,o.gain.value=t*.35,a.connect(o),o.connect(i.gain),r.connect(i),i.connect(f),r.start(),a.start(),h.push(r,a,i)})}function k(){h.forEach(e=>{try{typeof e.stop==`function`&&e.stop()}catch{}try{e.disconnect()}catch{}}),h=[]}function A(){if(!S||!c)return;let e=c.currentTime;for(;y<e+1.6;){let e=b%s;for(let[,t,n,r,i]of l[e])D(a(t),y,n*o+.35,r,i);y+=o,b+=1}}function j(e){e===x&&(A(),v=window.setTimeout(()=>j(e),180))}async function M(e){if(await w(),S=e,x+=1,window.clearTimeout(v),e){let e=x;O(),b=0,y=c.currentTime+.08,f.gain.cancelScheduledValues(c.currentTime),f.gain.setValueAtTime(Math.max(f.gain.value,1e-4),c.currentTime),f.gain.exponentialRampToValueAtTime(.2,c.currentTime+1.1),j(e)}else f.gain.cancelScheduledValues(c.currentTime),f.gain.setValueAtTime(Math.max(f.gain.value,1e-4),c.currentTime),f.gain.exponentialRampToValueAtTime(1e-4,c.currentTime+.5),window.setTimeout(k,520);return S}function N(){T(()=>{let e=c.currentTime;E(1864,`sine`,e,.55,.16,m),E(2489,`sine`,e,.32,.07,m);let t=c.createBufferSource();t.buffer=_;let n=c.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=c.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(m),t.start(e),t.stop(e+.06)})}function P(){T(()=>{let t=c.currentTime;[e,n,r].forEach((e,n)=>{E(e,`sine`,t,.55,.09,m),E(e*1.5,`triangle`,t+.18+n*.04,.5,.07,m),E(e*2,`sine`,t+.38+n*.05,.55,.05,m)})})}function F(n){T(()=>{let a=c.currentTime;n?(E(r,`sine`,a,.35,.1,m),E(i*2,`sine`,a+.12,.5,.09,m)):(E(e/2,`triangle`,a,.55,.12,m),E(t/2,`sine`,a+.08,.45,.08,m))})}return{unlock:w,setMusic:M,playQing:N,playRise:P,playEvent:F,isMusicOn:()=>S}}function f(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var p=d(),m=f(),h=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],g=[{type:`good`,title:`仙草現世`,text:`家族子弟在後山發現百年靈芝！`,qi:500,detail:`靈氣 +500`},{type:`good`,title:`天作之合`,text:`家族喜結良緣，香火愈盛。`,members:2,detail:`族人 +2`},{type:`good`,title:`高人指點`,text:`雲遊真人傳下一縷修行心得。`,qi:280,detail:`靈氣 +280`},{type:`good`,title:`靈脈湧動`,text:`地底靈脈忽然復甦，滿院清輝。`,qi:800,detail:`靈氣 +800`},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門！`,members:-1,detail:`族人 −1`},{type:`bad`,title:`走火入魔`,text:`一名族人修行冒進，靈氣四散。`,qi:-200,detail:`靈氣 −200`},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植盡數凋零。`,qi:-350,detail:`靈氣 −350`}],_=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],v={qi:680,members:6,realm:0,traits:[],logs:[{time:`辰時`,text:`青嵐世家於蒼梧山立下道統。`,tone:`gold`},{time:`巳時`,text:`靈脈運轉穩定，族人開始吐納。`,tone:`jade`}],eventCountdown:0},y=e=>v.traits.includes(e),b=()=>10*(y(`diligence`)?2:1),x=()=>{let e=y(`heaven-root`)?1.5:1,t=y(`jade-bones`)?1.25:1;return v.members*e*t},S=()=>{let e=y(`merchant`)?1.2975:1.35,t=y(`prosperity`)?.8:1;return Math.round(80*e**(v.members-1)*t)},C=()=>Math.round(500*2.15**v.realm),w=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e);document.querySelector(`#app`).innerHTML=`
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
      <button
        type="button"
        class="music-toggle"
        id="music-toggle"
        aria-pressed="false"
        title="坂本龍一風格原創鋼琴曲《關注塔菲貓》。點擊後播放。"
      >
        🎹 關注塔菲貓
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
    <span>BGM《關注塔菲貓》· 坂本風</span>
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
`;var T={qi:document.querySelector(`#qi-value`),qiRate:document.querySelector(`#qi-rate`),members:document.querySelector(`#member-value`),realm:document.querySelector(`#realm-name`),realmProgress:document.querySelector(`#realm-progress`),realmProgressLabel:document.querySelector(`#realm-progress-label`),recruitCost:document.querySelector(`#recruit-cost`),breakthroughCost:document.querySelector(`#breakthrough-cost`),breakthroughHint:document.querySelector(`#breakthrough-hint`),clickYield:document.querySelector(`#click-yield`),recruitButton:document.querySelector(`#recruit-button`),breakthroughButton:document.querySelector(`#breakthrough-button`),gatherButton:document.querySelector(`#gather-button`),traitList:document.querySelector(`#trait-list`),emptyTraits:document.querySelector(`#empty-traits`),logList:document.querySelector(`#log-list`),modal:document.querySelector(`#trait-modal`),choices:document.querySelector(`#trait-choices`),toastRegion:document.querySelector(`#toast-region`),eventTimer:document.querySelector(`#event-timer`),musicToggle:document.querySelector(`#music-toggle`)};function E(){return new Intl.DateTimeFormat(`zh-Hant`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date)}function D(e,t=``){v.logs.unshift({time:E(),text:e,tone:t}),v.logs=v.logs.slice(0,10),O()}function O(){T.logList.innerHTML=v.logs.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function k(){T.emptyTraits.hidden=v.traits.length>0,T.traitList.innerHTML=v.traits.map(e=>{let t=h.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function A(){let e=C(),t=v.realm>=_.length-1;T.qi.textContent=w(v.qi),T.qiRate.textContent=w(x()),T.members.textContent=w(v.members),T.realm.textContent=_[Math.min(v.realm,_.length-1)],T.realmProgressLabel.textContent=t?`道心圓滿`:`${w(Math.min(v.qi,e))} / ${w(e)}`,T.realmProgress.style.width=t?`100%`:`${Math.min(v.qi/e*100,100)}%`,T.recruitCost.textContent=w(S()),T.breakthroughCost.textContent=t?`—`:w(e),T.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${_[v.realm+1]}`,T.clickYield.textContent=`+${w(b())}`,T.recruitButton.disabled=v.qi<S(),T.breakthroughButton.disabled=t||v.qi<e}function j(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${w(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function M(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function N(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function P(){let e=h.filter(e=>!v.traits.includes(e.id));return[...e.length>=3?e:h].sort(()=>Math.random()-.5).slice(0,3)}function F(){let e=P();T.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),T.modal.classList.add(`visible`),T.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),T.choices.querySelector(`button`)?.focus()}function I(e){let t=h.find(t=>t.id===e);t&&(v.traits.includes(e)||v.traits.push(e),T.modal.classList.remove(`visible`),T.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),D(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),L({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),k(),A())}function L(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`UNEXPECTED TRIBULATION`:`AUSPICIOUS OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,T.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function R(e=!1){if(!e&&Math.random()>.5){D(`天機掠過，一夜無事，族人修行如常。`);return}let t=g[Math.floor(Math.random()*g.length)],n=y(`ancestral`)&&t.qi>0?1.5:1;t.qi&&(v.qi=Math.max(0,v.qi+t.qi*n)),t.members&&(v.members=Math.max(1,v.members+t.members));let r=t.qi>0&&n>1?`靈氣 +${w(t.qi*n)}`:t.detail;p.playEvent(t.type!==`bad`),L({...t,detail:r}),D(`${t.title}：${t.text}（${r}）`,t.type===`bad`?`danger`:`jade`),A()}function z(){v.eventCountdown=Math.floor(15+Math.random()*16),T.eventTimer.textContent=`下一次天象：${v.eventCountdown} 秒`}T.gatherButton.addEventListener(`click`,e=>{let t=b();v.qi+=t;let{x:n,y:r}=M(e);j(n,r,t),m.burst(n,r),p.playQing(),N(T.gatherButton),A()}),T.recruitButton.addEventListener(`click`,()=>{let e=S();v.qi<e||(v.qi-=e,v.members+=1,p.playRise(),N(T.recruitButton),D(`一名懷有靈根的後輩歸入族譜。族人增至 ${v.members} 位。`,`jade`),A())}),T.breakthroughButton.addEventListener(`click`,()=>{let e=C();if(v.qi<e||v.realm>=_.length-1)return;v.qi-=e,v.realm+=1;let t=_[v.realm];p.playRise(),/金丹|元嬰/.test(t)&&m.flashScreen(),N(T.breakthroughButton),D(`老祖破境成功，踏入「${t}」！`,`gold`),A(),window.setTimeout(F,350)}),document.addEventListener(`pointerdown`,()=>{p.unlock()},{once:!0}),T.musicToggle.addEventListener(`click`,async()=>{let e=await p.setMusic(!p.isMusicOn());T.musicToggle.setAttribute(`aria-pressed`,String(e)),T.musicToggle.classList.toggle(`is-on`,e),T.musicToggle.textContent=e?`🎹 塔菲貓播放中`:`🔇 關注塔菲貓`}),T.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&I(t.dataset.trait)}),window.setInterval(()=>{v.qi+=x()/4,A()},250),window.setInterval(()=>{--v.eventCountdown,v.eventCountdown<=0?(R(),z()):T.eventTimer.textContent=`下一次天象：${v.eventCountdown} 秒`},1e3),window.__cultivationFamily={triggerRandomEvent:()=>R(!0),state:v},document.addEventListener(`pointerdown`,()=>{p.unlock()},{once:!0}),O(),k(),A(),z();