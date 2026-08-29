(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=`BV1kNEP6cEmu`,o=`https://www.bilibili.com/video/${a}`,s=`https://player.bilibili.com/player.html?isOutside=true&aid=116692164354026&bvid=${a}&cid=38858260566&p=1&autoplay=1&muted=0&danmaku=0&high_quality=1&loop=1`;function c(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function l(){let a=null,l=null,u=null,d=null,f=!1,p=null,m=null;function h(){return a||(a=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),l=a.createGain(),l.gain.value=.52,l.connect(a.destination),u=a.createGain(),u.gain.value=.42,u.connect(l),d=c(a,.045),a)}async function ee(){h(),a.state===`suspended`&&await a.resume()}function g(e){h();let t=()=>{e()};if(a.state===`suspended`){a.resume().then(t);return}t()}function _(e,t,n,r,i,o,s=0){let c=a.createOscillator(),l=a.createGain();c.type=t,c.frequency.setValueAtTime(e,n),c.detune.setValueAtTime(s,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),c.connect(l),l.connect(o),c.start(n),c.stop(n+r+.02)}function te(){p||(p=document.createElement(`aside`),p.className=`bgm-dock`,p.setAttribute(`aria-label`,`關注塔菲喵背景音樂`),p.innerHTML=`
      <div class="bgm-dock-bar">
        <span>BGM</span>
        <a href="${o}" target="_blank" rel="noreferrer">關注塔菲喵</a>
        <button type="button" class="bgm-size-btn" aria-label="縮小畫面">縮小</button>
      </div>
    `,m=document.createElement(`iframe`),m.title=`關注塔菲喵 循環歌單`,m.allow=`autoplay; fullscreen; encrypted-media`,m.referrerPolicy=`no-referrer-when-downgrade`,m.setAttribute(`scrolling`,`no`),m.setAttribute(`frameborder`,`0`),p.append(m),p.querySelector(`.bgm-size-btn`).addEventListener(`click`,()=>{let e=p.classList.toggle(`is-compact`);p.querySelector(`.bgm-size-btn`).textContent=e?`畫面`:`縮小`}),document.body.append(p))}async function ne(e){return await ee(),f=e,te(),e?(p.classList.add(`is-on`),m.src=s,u.gain.setTargetAtTime(.22,a.currentTime,.05)):(p.classList.remove(`is-on`),m.src=`about:blank`,u.gain.setTargetAtTime(.42,a.currentTime,.05)),f}function re(){g(()=>{let e=a.currentTime;_(1864,`sine`,e,.55,.16,u),_(2489,`sine`,e,.32,.07,u);let t=a.createBufferSource();t.buffer=d;let n=a.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=a.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(u),t.start(e),t.stop(e+.06)})}function ie(){g(()=>{let t=a.currentTime;[e,n,r].forEach((e,n)=>{_(e,`sine`,t,.55,.09,u),_(e*1.5,`triangle`,t+.18+n*.04,.5,.07,u),_(e*2,`sine`,t+.38+n*.05,.55,.05,u)})})}function ae(n){g(()=>{let o=a.currentTime;n?(_(r,`sine`,o,.35,.1,u),_(i*2,`sine`,o+.12,.5,.09,u)):(_(e/2,`triangle`,o,.55,.12,u),_(t/2,`sine`,o+.08,.45,.08,u))})}return{unlock:ee,setMusic:ne,playQing:re,playRise:ie,playEvent:ae,isMusicOn:()=>f}}function u(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var d=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],f=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],p=[{id:`metal`,name:`金靈根`,hue:`#d7ae5b`},{id:`wood`,name:`木靈根`,hue:`#77c59c`},{id:`water`,name:`水靈根`,hue:`#7eb4d4`},{id:`fire`,name:`火靈根`,hue:`#d48a6a`},{id:`earth`,name:`土靈根`,hue:`#c4a574`},{id:`heaven`,name:`天靈根`,hue:`#f3d591`},{id:`mixed`,name:`雜靈根`,hue:`#8a9a90`}],m=[{id:`diligent`,name:`勤懇`,weights:{cultivate:3.2,study:1.4,rest:.6,adventure:.5}},{id:`ambitious`,name:`野心`,weights:{cultivate:1.4,adventure:2.4,study:1.2,trade:.8}},{id:`kind`,name:`仁善`,weights:{social:2.6,alchemy:1.3,rest:1.1,adventure:.5}},{id:`pride`,name:`傲骨`,weights:{adventure:2.2,study:1.4,social:.5,trade:.6}},{id:`greed`,name:`貪婪`,weights:{trade:2.8,adventure:1.5,cultivate:.7,social:.6}},{id:`caution`,name:`謹慎`,weights:{rest:1.8,study:1.8,cultivate:1.4,adventure:.35}},{id:`passion`,name:`多情`,weights:{social:3.1,trade:1.1,cultivate:.8,adventure:.7}},{id:`demon`,name:`魔心`,weights:{adventure:2.3,trade:1.3,social:.4,cultivate:1.1}}],h=[`青嵐吐納訣`,`蒼梧劍意`,`雲水心經`,`焚天掌印`,`厚土養氣章`,`百草丹經`,`問雪無痕步`],ee=[{id:`nexus`,name:`靈樞`,hint:`吐納`},{id:`peak`,name:`後山`,hint:`歷練`},{id:`alchemy`,name:`丹房`,hint:`煉丹`},{id:`library`,name:`藏經閣`,hint:`參悟`},{id:`gate`,name:`山門`,hint:`論道`},{id:`market`,name:`雲市`,hint:`交易`}],g={cultivate:{label:`吐納修煉`,region:`nexus`},adventure:{label:`後山歷練`,region:`peak`},alchemy:{label:`煉製丹藥`,region:`alchemy`},study:{label:`參悟功法`,region:`library`},social:{label:`論道交心`,region:`gate`},trade:{label:`雲市交易`,region:`market`},rest:{label:`調息養傷`,region:`nexus`}},_=[`青`,`沈`,`葉`,`白`,`蒼`,`嵐`,`蘇`,`江`,`陸`,`謝`,`韓`,`顧`],te=[`玄機`,`清梧`,`疏影`,`無塵`,`小魚`,`七七`,`問雪`,`承光`,`靈犀`,`墨白`,`青棠`,`遠山`,`晚晴`,`折竹`,`聽潮`],ne=[`青鋒殘劍`,`避水珠`,`聚氣戒`,`蒼梧令`,`問心鏡`,`焚香爐`,`靈犀簪`],re=[`寅`,`卯`,`辰`,`巳`,`午`,`未`,`申`,`酉`,`戌`,`亥`,`子`,`丑`],ie=[{type:`good`,title:`仙草現世`,text:`後山現百年靈芝，靈樞為之一振。`,qi:500},{type:`good`,title:`天作之合`,text:`一門親事說成，香火又盛一分。`,members:1},{type:`good`,title:`高人指點`,text:`雲遊真人路過，留下一縷修行心得。`,qi:280},{type:`good`,title:`靈脈湧動`,text:`地底靈脈復甦，滿院清輝。`,qi:800},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門。`,members:-1},{type:`bad`,title:`走火入魔`,text:`有人修行冒進，心魔趁虛而入。`,qi:-200},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植凋零。`,qi:-350}],ae=1,oe=()=>`c${ae++}`,v=e=>e[Math.floor(Math.random()*e.length)],y=(e,t,n)=>Math.max(t,Math.min(n,e)),b=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e),x=(e,t)=>e.traits.includes(t),S=e=>e.people.filter(e=>e.alive),C=e=>e.people.find(t=>t.id===e.selectedId)||S(e)[0];function w(e){return 90+e*36}function se(e){return 10*(x(e,`diligence`)?2:1)}function ce(e){let t=x(e,`heaven-root`)?1.5:1,n=x(e,`jade-bones`)?1.25:1,r=S(e).filter(e=>e.action===`cultivate`).length,i=Math.max(1,S(e).length*.35);return(r*1.8+i)*t*n}function le(e){let t=x(e,`merchant`)?1.2975:1.35,n=x(e,`prosperity`)?.8:1;return Math.round(80*t**Math.max(0,S(e).length-1)*n)}function ue(e){return Math.round(500*2.15**e.patriarchRealm)}function T(e){return`玄元曆 ${e.year} 年${re[e.month]}月`}function de(e){let t=new Set(e.people.map(e=>e.name));for(let e=0;e<40;e+=1){let e=`${v(_)}${v(te)}`;if(!t.has(e))return e}return`${v(_)}${v(te)}${e.people.length}`}function E(e,t={}){let n=t.nature||v(m.filter(e=>e.id!==`demon`||Math.random()>.82)),r=t.root||v(p.slice(0,6).concat(Math.random()>.88?[p[5]]:[p[6]])),i=t.realm??Math.floor(Math.random()*3);return{id:t.id||oe(),name:t.name||de(e),role:t.role||`disciple`,root:r,nature:n,technique:t.technique||v(h),realm:i,personalQi:t.personalQi??Math.round(20+Math.random()*80),age:t.age??16+Math.floor(Math.random()*28),lifespan:t.lifespan??w(i),mood:t.mood??10+Math.floor(Math.random()*30),hp:100,bonds:{},location:t.location||`nexus`,action:t.action||`cultivate`,lockedAction:null,thought:t.thought||`山門初立，心緒未定。`,memory:[],nickname:t.nickname||``,pills:0,artifacts:t.artifacts||[],alive:!0}}function fe(e,t){e.memory.unshift(t),e.memory=e.memory.slice(0,4)}function D(e,t){e.thought=t,fe(e,t)}function pe(e){if(e.hp<42)return`rest`;if(e.lockedAction){let t=e.lockedAction;return e.lockedAction=null,t}let t={...e.nature.weights};e.mood<-20&&(t.rest=(t.rest||1)+1.6),e.personalQi>70+e.realm*18&&(t.cultivate=(t.cultivate||1)+1.2);let n=Object.entries(t),r=n.reduce((e,[,t])=>e+t,0),i=Math.random()*r;for(let[e,t]of n)if(i-=t,i<=0)return e;return`cultivate`}function me(e,t){return S(e).filter(e=>e.id!==t.id)}function O(e,t,n){e.bonds[t.id]=y((e.bonds[t.id]||0)+n,-100,100),t.bonds[e.id]=y((t.bonds[e.id]||0)+n*.85,-100,100)}function he(e,t){let n=Object.entries(e.bonds);if(!n.length)return`尚無深交`;n.sort((e,t)=>Math.abs(t[1])-Math.abs(e[1]));let[r,i]=n[0],a=t.people.find(e=>e.id===r);return a?i>=35?`與${a.name}交好`:i<=-35?`與${a.name}交惡`:`與${a.name}相識`:`尚無深交`}function ge(e,t,n){let r=t.root.id===`heaven`?1.6:t.root.id===`mixed`?.75:1,i=(x(e,`heaven-root`)?1.5:1)*(x(e,`jade-bones`)?1.25:1);if(t.action===`cultivate`){let a=(8+t.realm*3)*r*i;t.personalQi+=a,e.qi+=a*.45,t.mood+=2,Math.random()<.22?D(t,`${t.name}於靈樞吐納，只覺${t.root.name}隱隱共鳴。`):t.thought=`${t.name}閉目調息，一呼一吸皆在青嵐之中。`,t.personalQi>85+t.realm*22&&t.realm<d.length-1&&Math.random()<.28&&_e(e,t,n,.62);return}if(t.action===`adventure`){let r=Math.random();if(r<.42){let r=v(ne);t.artifacts.includes(r)||t.artifacts.push(r),e.qi+=90,e.karma+=1,D(t,`${t.name}於後山得「${r}」，喜不自勝。`),n.push({text:`${t.name}後山歷練，覓得${r}。`,tone:`jade`}),!t.nickname&&Math.random()<.4&&(t.nickname=v([`青嵐遊俠`,`後山夜行`,`尋寶散人`,`蒼梧獵手`]),n.push({text:`江湖開始稱${t.name}為「${t.nickname}」。`,tone:`gold`}))}else r<.7?(t.hp-=18+Math.floor(Math.random()*16),t.mood-=8,D(t,`${t.name}遇着猛獸機關，帶傷而返。`),n.push({text:`${t.name}歷練受挫，帶傷回山。`,tone:`danger`})):(t.personalQi+=12,D(t,`${t.name}在後山走了一遭，收獲平平，心卻定了些。`));return}if(t.action===`alchemy`){Math.random()<.55?(t.pills+=1,e.qi+=40,D(t,`${t.name}煉成一枚養氣丹，丹香滿室。`),n.push({text:`${t.name}於丹房煉成養氣丹。`,tone:`jade`})):(t.hp-=8,D(t,`${t.name}火候偏差，丹爐一震，只得作罷。`));return}if(t.action===`study`){t.personalQi+=6*r,Math.random()<.18?(t.technique=v(h),D(t,`${t.name}於藏經閣改修《${t.technique}》。`),n.push({text:`${t.name}改修功法《${t.technique}》。`,tone:`gold`})):D(t,`${t.name}反覆推演《${t.technique}》，隱有所得。`);return}if(t.action===`social`){let r=me(e,t);if(!r.length)return;let i=v(r),a=(t.nature.id===`demon`||i.nature.id===`demon`?-18:14)+Math.floor(Math.random()*10)-4;O(t,i,a),a>0?(D(t,`${t.name}與${i.name}月下論道，頗為投契。`),(t.bonds[i.id]||0)>55&&Math.random()<.35&&n.push({text:`${t.name}與${i.name}結為道友，約共證長生。`,tone:`jade`})):(D(t,`${t.name}與${i.name}言語不合，各懷心事。`),(t.bonds[i.id]||0)<-50&&Math.random()<.4&&(t.hp-=12,i.hp-=12,n.push({text:`${t.name}與${i.name}山門內鬥，拳腳相向。`,tone:`danger`})));return}if(t.action===`trade`){let r=Math.round((40+Math.random()*160)*(t.nature.id===`greed`?1.4:1));Math.random()<.18?(e.qi=Math.max(0,e.qi-70),t.mood-=6,D(t,`${t.name}在雲市被人坑了一筆靈石。`),n.push({text:`${t.name}雲市折本而歸。`,tone:`danger`})):(e.qi+=r,e.karma+=+(Math.random()<.25),D(t,`${t.name}以物易物，為家族帶回靈石。`));return}t.hp=y(t.hp+22,0,100),t.mood+=6,t.pills>0&&t.hp<80?(--t.pills,t.hp=y(t.hp+18,0,100),t.personalQi+=8,D(t,`${t.name}服下養氣丹，傷勢漸穩。`)):D(t,`${t.name}靜室調息，把心火慢慢壓了下去。`)}function _e(e,t,n,r){if(t.realm>=d.length-1)return!1;let i=t.pills>0?.12:0;if(t.pills>0&&--t.pills,Math.random()<r+i){t.realm+=1,t.personalQi=12,t.lifespan=Math.max(t.lifespan,w(t.realm));let r=d[t.realm];return D(t,`${t.name}突破至「${r}」，天地為之側目。`),n.push({text:`${t.name}破境成功，踏入「${r}」。`,tone:`gold`,flash:/金丹|元嬰/.test(r),toast:{type:`heritage`,title:`族人破境`,text:t.name,detail:r}}),t.role===`patriarch`&&(e.patriarchRealm=t.realm),!0}return t.hp-=24,t.mood-=14,t.personalQi*=.55,D(t,`${t.name}衝擊失敗，經脈隱隱作痛。`),n.push({text:`${t.name}破境失敗，經脈受損。`,tone:`danger`}),!1}function ve(e,t,n){if(e.month===0&&(t.age+=1),t.mood=y(t.mood+(Math.random()*6-3),-80,80),t.hp<=0&&t.role!==`patriarch`){t.alive=!1,D(t,`${t.name}傷重不治，魂歸蒼梧。`),n.push({text:`${t.name}傷重坐化。族譜又添一筆哀榮。`,tone:`danger`,toast:{type:`bad`,title:`族人隕落`,text:t.name,detail:`傷重不治`}});return}t.age>=t.lifespan&&t.role!==`patriarch`&&(t.alive=!1,D(t,`${t.name}壽元將盡，化清風而去。`),n.push({text:`${t.name}壽元耗盡，坐化於${g[t.action]?.label||`山門`}。`,tone:`danger`,toast:{type:`bad`,title:`壽元耗盡`,text:t.name,detail:`${t.age}歲`}})),t.role===`patriarch`&&(t.hp=Math.max(t.hp,35),t.alive=!0)}function ye(){let e={qi:680,karma:36,year:146,month:2,patriarchRealm:0,traits:[],people:[],selectedId:`patriarch`,paused:!1,speed:1,omenIn:18};return e.people=[E(e,{id:`patriarch`,name:`青玄機`,role:`patriarch`,root:p[5],nature:m[0],technique:`青嵐吐納訣`,realm:0,age:62,lifespan:180,nickname:`青嵐老祖`,location:`nexus`,action:`cultivate`,thought:`青嵐一脈，當以我為骨。`,artifacts:[`蒼梧令`]}),E(e,{name:`沈清梧`,role:`elder`,root:p[0],nature:m[5],realm:1,age:44,action:`study`,location:`library`}),E(e,{name:`葉疏影`,root:p[1],nature:m[6],realm:0,age:19,action:`social`,location:`gate`}),E(e,{name:`白無塵`,root:p[2],nature:m[3],realm:1,age:27,action:`adventure`,location:`peak`}),E(e,{name:`蒼小魚`,root:p[3],nature:m[1],realm:0,age:17,action:`alchemy`,location:`alchemy`}),E(e,{name:`嵐七七`,root:p[4],nature:m[2],realm:0,age:16,action:`cultivate`,location:`nexus`})],O(e.people[0],e.people[1],28),O(e.people[2],e.people[5],22),O(e.people[3],e.people[4],-12),e}function be(e){let t=[];if(e.paused)return t;e.month=(e.month+1)%12,e.month===0&&(e.year+=1),e.karma=y(e.karma+.35,0,99);for(let n of S(e))n.action=pe(n),n.location=g[n.action].region,ge(e,n,t),ve(e,n,t);return--e.omenIn,e.omenIn<=0&&(e.omenIn=8+Math.floor(Math.random()*10),t.push(...xe(e,!1))),t}function xe(e,t=!1){let n=[];if(!t&&Math.random()>.55)return n.push({text:`天機掠過，此月山門無事。`,tone:``}),n;let r=v(ie),i=x(e,`ancestral`)&&r.qi>0?1.5:1;if(r.qi&&(e.qi=Math.max(0,e.qi+r.qi*i)),r.members>0)for(let t=0;t<r.members;t+=1)Se(e,!0);if(r.members<0){let t=S(e).filter(e=>e.role!==`patriarch`);if(t.length){let e=v(t);e.hp=Math.max(0,e.hp-55),e.hp<=0&&(e.alive=!1,n.push({text:`夜襲之中，${e.name}為護山門而隕。`,tone:`danger`}))}}let a=r.qi?`靈氣 ${r.qi>0?`+`:``}${b(r.qi*i)}`:r.members>0?`族人 +1`:`山門動盪`;return n.push({text:`${r.title}：${r.text}（${a}）`,tone:r.type===`bad`?`danger`:`jade`,toast:{type:r.type,title:r.title,text:r.text,detail:a},sfx:r.type!==`bad`}),n}function Se(e,t=!1){let n=le(e);if(!t){if(e.qi<n)return{ok:!1};e.qi-=n}let r=E(e,{role:`disciple`,age:15+Math.floor(Math.random()*12),realm:0});return e.people.push(r),e.selectedId=r.id,D(r,`${r.name}拜入教父世家，眼底還有凡塵未褪。`),{ok:!0,person:r}}function Ce(e){let t=ue(e),n=e.people.find(e=>e.role===`patriarch`);if(!n||e.qi<t||e.patriarchRealm>=d.length-1)return{ok:!1};e.qi-=t,e.patriarchRealm+=1,n.realm=e.patriarchRealm,n.personalQi=20,n.lifespan=Math.max(n.lifespan,w(n.realm));let r=d[e.patriarchRealm];return D(n,`老祖青玄機突破至「${r}」，青嵐氣運陡然一振。`),{ok:!0,stage:r,flash:/金丹|元嬰/.test(r)}}function we(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<8?{ok:!1,reason:`氣運不足`}:(e.karma-=8,n.mood+=24,n.hp=y(n.hp+20,0,100),n.personalQi+=28,D(n,`天道賜福於${n.name}，周身金光一閃，心魔暫退。`),{ok:!0,text:`天道賜福「${n.name}」，傷勢與道心皆有進益。`})}function Te(e,t){let n=e.people.find(e=>e.id===t&&e.alive);if(!n||e.karma<12)return{ok:!1,reason:`氣運不足`};e.karma-=12;let r=[];return _e(e,n,r,.48),{ok:!0,reports:r,text:`天劫劈向${n.name}。`}}function Ee(e,t,n){let r=e.people.find(e=>e.id===t&&e.alive);return!r||e.karma<3?{ok:!1,reason:`氣運不足`}:g[n]?(e.karma-=3,r.lockedAction=n,r.action=n,r.location=g[n].region,D(r,`天道令${r.name}去「${g[n].label}」，不敢不從。`),{ok:!0,text:`已令${r.name}改行「${g[n].label}」。`}):{ok:!1,reason:`無此律令`}}function De(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<10?{ok:!1,reason:`氣運不足`}:(e.karma-=10,n.nature=n.nature.id===`demon`?v(m.filter(e=>e.id!==`demon`)):m.find(e=>e.id===`demon`),n.mood-=10,D(n,n.nature.id===`demon`?`${n.name}心魔大盛，眸中多了一絲戾氣。`:`${n.name}心魔被強行剝去，整個人空了一截。`),{ok:!0,text:`${n.name}性情轉為「${n.nature.name}」。`})}function Oe(e,t){return he(e,t)}function ke(e){return d[S(e).reduce((e,t)=>e.realm>=t.realm?e:t).realm]}function Ae(e,t){return S(e).filter(e=>e.location===t)}function je(e,t,n,r=0){let i=S(e).find(e=>e.name===t);i&&(D(i,n),i.mood=y(i.mood+r,-80,80))}function Me(e,t,n,r){let i=S(e).find(e=>e.name===t),a=S(e).find(e=>e.name===n);!i||!a||O(i,a,r)}var k=[{id:1,title:`第一部 · 血色開端`,english:`THE FAMILY`,theme:`立譜、報應、無法拒絕的道盟`},{id:2,title:`第二部 · 雙生歲月`,english:`THE BETRAYAL`,theme:`創業回憶與當下猜忌、兄弟反目`},{id:3,title:`第三部 · 最後輓歌`,english:`THE RECKONING`,theme:`想洗白飛升、與天庭交易、繼承人倒下`}],Ne=`qinglan-llm-config`,Pe=`https://openrouter.ai/api/v1`,Fe=`openrouter/free`,A=8e3,Ie=4e3;function Le(){return{enabled:!0,baseUrl:Pe,apiKey:``,model:Fe,illustrate:!0,imageModel:`google/gemini-2.5-flash-image`}}function j(){try{let e=JSON.parse(localStorage.getItem(Ne)||`{}`),t={...Le(),...e};return(!t.baseUrl||t.baseUrl.includes(`deepseek.com`)||t.baseUrl.includes(`11434`))&&(t.baseUrl=Pe),(!t.model||t.model===`deepseek-chat`||t.model===`llama3.1`)&&(t.model=Fe),t.imageModel||=`google/gemini-2.5-flash-image`,t.illustrate===void 0&&(t.illustrate=!0),t}catch{return Le()}}function Re(e){localStorage.setItem(Ne,JSON.stringify({enabled:!!e.enabled,baseUrl:String(e.baseUrl||`https://openrouter.ai/api/v1`).trim()||`https://openrouter.ai/api/v1`,apiKey:String(e.apiKey||``).trim(),model:String(e.model||`openrouter/free`).trim()||`openrouter/free`,illustrate:e.illustrate!==!1,imageModel:String(e.imageModel||`google/gemini-2.5-flash-image`).trim()||`google/gemini-2.5-flash-image`}))}function M(e=j()){return!e.enabled||!e.baseUrl?!1:/127\.0\.0\.1|localhost/i.test(e.baseUrl)?!0:!!e.apiKey}function ze(e){let t=S(e),n=t.find(e=>e.role===`patriarch`)||t[0],r=t.find(e=>e.role===`elder`)||t[1]||n,i=t.filter(e=>e.id!==n.id),a=i.find(e=>e.nature.id===`passion`)||i[0]||n;return{don:n,consiglieri:r,kay:a,fredo:[...i].sort((e,t)=>(e.bonds[n.id]||0)-(t.bonds[n.id]||0))[0]||a,soldier:i.find(e=>e.nature.id===`pride`||e.nature.id===`ambitious`)||i.at(-1)||n,child:[...i].sort((e,t)=>e.age-t.age)[0]||a,people:t}}function Be(e,t){let{don:n,people:r}=ze(e),i=r.map(e=>`${e.name}（${d[e.realm]}／${e.root.name}／${e.nature.name}／正在${e.action}／${e.thought}）`).join(`
`);return{calendar:T(e),part:k[t-1],qi:Math.round(e.qi),karma:Math.round(e.karma),don:n?.name,roster:i}}function N(e,t,n,r,i,a={}){return{part:e,title:t,slug:n,narration:r,line:i,...a}}function Ve(e,t,n){let{don:r,consiglieri:i,kay:a,fredo:o,soldier:s,child:c}=ze(e),l={1:[()=>N(1,`立譜宴`,`INT. 山門大殿 · 夜`,`燈火把教父門匾照得像一口金棺。四方來客低頭敬酒，沒有人敢問靈石從哪來。${a.name}立在廊柱後，看${r.name}接過一封染血的拜帖。`,`${r.name}：今晚是喜事。喜事過了，帳才開始算。`,{speaker:r.name,mood:4,bond:[r.name,a.name,6]}),()=>N(1,`無法拒絕`,`INT. 密室 · 子時`,`${i.name}把盟書推過桌面。對方的手在抖。窗外有人練劍，劍聲整齊得像送葬。`,`${r.name}：我給你一個無法拒絕的道盟。簽，你還是青嵐的客；不簽，你就是後山的土。`,{speaker:r.name,karma:1}),()=>N(1,`枕邊警告`,`EXT. 丹房 · 黎明`,`爐蓋揭開，裡面不是丹，是一顆還帶溫的妖獸頭顱。${s.name}後退半步，第一次明白「客氣」在這座山裡怎麼寫。`,`${i.name}：下次，我們會讓他親自來看。`,{speaker:i.name,mood:-8}),()=>N(1,`沉潭`,`EXT. 蒼梧深潭 · 霧`,`有人說仇家去雲遊了。潭面只冒一個氣泡。${o.name}把石子扔進去，數到三，不敢數到四。`,`${o.name}：他會回來的吧？`,{speaker:o.name,bond:[o.name,r.name,-8]}),()=>N(1,`第一次開火`,`EXT. 山門石階 · 雨`,`雨把血跡洗淡，洗不淡規矩。${s.name}把劍收回鞘，手卻停在鞘口。`,`${r.name}：這不是殺戮。這是讓世界重新學會害怕我們的姓。`,{speaker:r.name,karma:-2}),()=>N(1,`西西里式流放`,`EXT. 後山密林 · 日`,`${a.name}被送去「避災」。林子很靜，靜得像有人被全世界原諒了，只除了自己。`,`${a.name}：你護我，是因為愛，還是因為我看見了不該看見的？`,{speaker:a.name,mood:-12}),()=>N(1,`渡劫蒙太奇`,`INT. 靈樞 · 同時`,`${r.name}在靈樞閉目渡劫，山門外三路仇家同時倒下。鐘響一聲，兩種儀式重疊成一種。`,`${i.name}：今日他成親於天，也成親於血。`,{speaker:i.name,karma:-3}),()=>N(1,`關門`,`INT. 寢殿 · 夜`,`${a.name}問他今晚殺了誰。${r.name}不答。門在她面前合上，留下一道金縫，像未癒的傷口。`,`${r.name}：家族的事，到此為止。`,{speaker:r.name,bond:[r.name,a.name,-14]})],2:[()=>N(2,`雙線`,`INT. 藏經閣 / EXT. 舊碼頭 · 交切`,`一邊是少年${r.name}在碼頭偷渡靈苗，一邊是今日的他聽密報。兩張臉疊在一起，誰都不比誰乾淨。`,`${r.name}：我不是變了。是世界終於追上我。`,{speaker:r.name}),()=>N(2,`庭訊`,`INT. 山門議事 · 日`,`外門長老像審官。問題不是「有沒有做」，是「能不能證明我們沒做」。${i.name}把偽證與丹方一併推過去。`,`${i.name}：真相是奢侈品。我們只賣能活下去的版本。`,{speaker:i.name}),()=>N(2,`我知道是你`,`INT. 湖心亭 · 冬`,`${o.name}的笑先碎。湖面結冰，冰下還有去年沉下去的名字。`,`${r.name}：我知道是你。你是我的血，所以你會死得比外人慢一點。`,{speaker:r.name,bond:[r.name,o.name,-40],mood:-20}),()=>N(2,`孤島`,`EXT. 山巔 · 雪`,`權勢把人抬到沒有平輩的高度。${c.name}來送衣，不敢靠太近。`,`${r.name}：坐下。不，站著。我需要有人提醒我還能被靠近。`,{speaker:r.name,mood:-6}),()=>N(2,`舊神的賭局`,`INT. 雲市密室 · 夜`,`有人允諾海外靈礦、朝廷文書、長生契約。條件只有一個：交出一個弟弟。`,`${s.name}：這買賣太乾淨，乾淨得像陷阱。`,{speaker:s.name,karma:2}),()=>N(2,`吻別`,`EXT. 碼頭 · 黎明`,`${o.name}上了船。船沒開。岸上有人已把劍出了半寸。`,`${o.name}：哥，我只是想被看見。`,{speaker:o.name})],3:[()=>N(3,`想洗手`,`INT. 靈樞 · 晨`,`${r.name}說要飛升、要合法、要把青嵐還給天道。桌上放著三份還沒撕的血契。`,`${r.name}：我只想做個普通的長生者。這句話本身，已經像笑話。`,{speaker:r.name}),()=>N(3,`天庭 Immobiliare`,`INT. 虛空廊橋 · 金光`,`天庭要靈石，要門生，要他用俗世的罪去換天上的席。${i.name}算到第三筆，停筆。`,`${i.name}：飛升不是解脫。是換一家更大的家族。`,{speaker:i.name,karma:-4}),()=>N(3,`繼承人`,`EXT. 演武場 · 黃昏`,`${s.name}太像年輕的他。這讓他安心，也讓他厭惡。`,`${r.name}：你不要學我。你要學我活下來的那一部分——如果還有的話。`,{speaker:r.name,bond:[r.name,s.name,10]}),()=>N(3,`臺階`,`EXT. 山門石階 · 夜宴散場`,`流矢不知從哪來。${c.name}倒下時還笑著，以為是煙花。橙從${r.name}袖中滑落，滾過血。`,`${r.name}：不。換我。`,{speaker:r.name,mood:-30,karma:-6}),()=>N(3,`空椅`,`EXT. 庭園 · 秋`,`很久以後，有人在椅上看見他。風吹過，像一句沒說完的對不起。家族還在，故事已經死了。`,`${a.name}（旁白）：他贏了所有該贏的，只輸掉坐在他身邊的人。`,{speaker:a.name})]}[t];return l[n%l.length]()}function He(e){let t=String(e||``).trim(),n=t.match(/\{[\s\S]*\}/);if(n)try{let e=JSON.parse(n[0]);if(e.narration||e.line||e.title)return{title:e.title||`未名場次`,slug:e.slug||`INT. 教父世家 · 夜`,narration:e.narration||``,line:e.line||``,speaker:e.speaker||``}}catch{}let[r,...i]=t.split(`
`).map(e=>e.trim()).filter(Boolean);return{title:r?.slice(0,12)||`連載場次`,slug:`INT. 教父世家 · 連續`,narration:i.join(``)||t,line:``,speaker:``}}async function Ue(e,t,n,r){let i=e.baseUrl.replace(/\/$/,``),a=`${i}/chat/completions`,o=Be(t,n),s={model:e.model||`openrouter/free`,temperature:.95,max_tokens:420,messages:[{role:`system`,content:[`你是電影編劇，要把「教父世家」寫成向《教父》三部曲致敬的修仙家族史詩。`,`風格：克制、陰冷、家庭倫理與權力並置；旁白像Coppola鏡頭，對白短而重。`,`禁止直接抄襲電影原句。用修仙意象改寫：道盟、靈石、天劫、渡劫、飛升、血契、橙（死亡預兆）。`,`只輸出 JSON：{"title","slug","narration","line","speaker"}`,`narration 70-120字，line 一句對白。speaker 必須是在場族人真名。`].join(`
`)},{role:`user`,content:[`當前部：${o.part.title}（${o.part.theme}）`,`時間：${o.calendar}`,`家主：${o.don}；靈氣${o.qi}；氣運${o.karma}`,`已寫過的場次標題（勿重複）：${r.join(`、`)||`無`}`,`在場人物：`,o.roster,`請寫下一場，必須推進情節，不要總結主題。`].join(`
`)}]},c={"Content-Type":`application/json`};e.apiKey&&(c.Authorization=`Bearer ${e.apiKey}`),/openrouter\.ai/i.test(i)&&(c[`HTTP-Referer`]=window.location.origin||`https://yip-lgtm.github.io`,c[`X-Title`]=`Godfather Clan`);let l=new AbortController,u=window.setTimeout(()=>l.abort(),2e4);try{let e=await fetch(a,{method:`POST`,headers:c,body:JSON.stringify(s),signal:l.signal}),t=await e.json().catch(()=>({}));if(!e.ok){let n=t.error?.message||t.message||t.error||`HTTP ${e.status}`;throw Error(typeof n==`string`?n:JSON.stringify(n))}let n=t.choices?.[0]?.message?.content||t.content||``;if(!n)throw Error(`模型沒有寫出內容`);return He(n)}finally{window.clearTimeout(u)}}function We(e,t){t.speaker&&je(e,t.speaker,t.line||t.narration,t.mood||0),t.bond&&Me(e,t.bond[0],t.bond[1],t.bond[2]),t.karma&&(e.karma=Math.max(0,Math.min(99,e.karma+t.karma)))}function Ge(){let e={part:1,beat:0,months:0,scenes:[],busy:!1,source:`studio`,error:``,lastLlmAt:0,config:j()};function t(t){let n=t.people.filter(e=>!e.alive).length;e.part===1&&(t.year-146>=2||n>=1||t.karma<18)&&(e.part=2),e.part===2&&(t.year-146>=4||n>=2||t.patriarchRealm>=6)&&(e.part=3)}async function n(n,r){if(e.busy)return null;t(n),e.busy=!0;let i=e.scenes.map(e=>e.title),a,o=e.config,s=!!r,c=Date.now()-e.lastLlmAt>=A;if(M(o)&&(s||c))try{a={...await Ue(o,n,e.part,i.slice(0,8)),part:e.part,source:`llm`},e.source=`llm`,e.error=``,e.lastLlmAt=Date.now()}catch(t){e.error=t.message||`LLM 失敗`,e.lastLlmAt=Date.now()-A+Ie,a={...Ve(n,e.part,e.beat),source:`studio`},e.source=`studio`}else a={...Ve(n,e.part,e.beat),source:`studio`},e.source=`studio`;return a.time=T(n),a.id=`${Date.now().toString(36)}-${e.beat}`,a.artStatus=`ready`,a.artSource=`demo`,a.artUrl=``,e.beat+=1,e.scenes.unshift(a),e.scenes=e.scenes.slice(0,16),We(n,a),e.busy=!1,a}async function r(t){if(t.paused)return null;e.months+=1;let r=e.config,i=Date.now()-e.lastLlmAt>=A;return M(r)&&i?n(t,!0):e.months%2==0?n(t,!1):null}return{state:e,writeScene:n,onMonth:r,reloadConfig(){e.config=j()}}}var P=e=>`/family/demo/${e}`,Ke={青玄機:P(`qing-xuanji.webp`),沈清梧:P(`shen-qingwu.webp`),葉疏影:P(`ye-shuying.webp`),白無塵:P(`bai-wuchen.webp`),蒼小魚:P(`cang-xiaoyu.webp`),嵐七七:P(`lan-qiqi.webp`)},F={m:P(`disciple-m.webp`),f:P(`disciple-f.webp`)},qe={hall:P(`hall-banquet.webp`),rain:P(`rain-steps.webp`),gate:P(`mountain-gate.webp`),chamber:P(`chamber-lamp.webp`)},Je=/梧|影|七七|雪|棠|晴|犀|蘭|芳|娘|妹|姑|女|清|疏|晚/,Ye={立譜宴:`hall`,無法拒絕:`chamber`,枕邊警告:`chamber`,沉潭:`gate`,第一次開火:`rain`,西西里式流放:`gate`,渡劫蒙太奇:`gate`,關門:`chamber`,雙線:`hall`,庭訊:`hall`,我知道是你:`chamber`,孤島:`gate`,舊神的賭局:`chamber`,吻別:`gate`,想洗手:`chamber`,"天庭 Immobiliare":`hall`,繼承人:`gate`,臺階:`rain`,空椅:`gate`};function Xe(e){return e?Ke[e.name]?Ke[e.name]:Je.test(e.name)?F.f:F.m:F.m}function Ze(e){if(Ye[e?.title])return Ye[e.title];let t=`${e?.title||``} ${e?.slug||``} ${e?.narration||``}`;return/雨|石階|開火|劍|血|夜襲/.test(t)?`rain`:/密室|子時|盟書|靈樞|寢殿|亭|丹房/.test(t)?`chamber`:/大殿|宴|議事|燈火|拜帖/.test(t)?`hall`:`gate`}function Qe(e){return qe[Ze(e)]||qe.gate}var $e=`qinglan-art`,I=`frames`,et=28,tt=22e3,nt=[`Cinematic still from a dark xianxia family epic at the Godfather Gate, a gold-and-ink mountain sect.`,`Ink-wash painting with gold leaf, oil-lamp chiaroscuro, restrained Coppola lighting.`,`Cultivation robes, mountain sect architecture, no modern objects.`,`Absolutely no text, letters, watermarks, logos, captions, or UI.`].join(` `),rt={青玄機:`elderly Chinese cultivation patriarch, silver-white hair tied back, gold-trimmed black robes, severe calm face, late sixties`,沈清梧:`composed Chinese woman in her forties, dark hair in a bun, ink-blue robes, steady protective eyes`,葉疏影:`pale young Chinese woman, long black hair, cold precise gaze, grey-green robes, early twenties`,白無塵:`handsome wandering cultivator, white outer robe over travel-worn layers, unreadable smile, late twenties`,蒼小魚:`skinny teenage boy, slightly greedy eyes, stained alchemy-brown robes, always alert`,嵐七七:`small bright-eyed girl of sixteen, messy hair, pale cyan robes, curious and unafraid`};function L(e=j()){return M(e)&&e.illustrate!==!1}function it(e){return e===`3:4`?`384x512`:`512x288`}function R(){return new Promise((e,t)=>{if(!window.indexedDB){e(null);return}let n=indexedDB.open($e,1);n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(I)||e.createObjectStore(I)},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function at(e){try{let t=await R();return t?await new Promise((n,r)=>{let i=t.transaction(I,`readonly`).objectStore(I).get(e);i.onsuccess=()=>n(i.result||null),i.onerror=()=>r(i.error)}):null}catch{return null}}async function ot(e,t){try{let n=await R();if(!n)return;await new Promise((r,i)=>{let a=n.transaction(I,`readwrite`);a.objectStore(I).put(t,e),a.oncomplete=()=>r(),a.onerror=()=>i(a.error)});let r=await R();if(!r)return;let i=await new Promise((e,t)=>{let n=r.transaction(I,`readonly`).objectStore(I).getAllKeys();n.onsuccess=()=>e(n.result||[]),n.onerror=()=>t(n.error)});if(i.length>et){let e=i.slice(0,i.length-et),t=r.transaction(I,`readwrite`);e.forEach(e=>t.objectStore(I).delete(e))}}catch{}}function z(e){if(!e)return``;if(typeof e==`string`)return e.startsWith(`data:`)||e.startsWith(`http`)?e:`data:image/png;base64,${e}`;let t=e.b64_json||e.b64||e.base64;return e.url||e.image_url?.url||(t?`data:${e.media_type||e.mime_type||`image/png`};base64,${String(t).replace(/^data:[^;]+;base64,/,``)}`:``)}function st(e){let t=e?.data?.[0];if(t){let e=z(t);if(e)return e}let n=e?.choices?.[0]?.message,r=n?.images;if(Array.isArray(r)&&r[0]){let e=z(r[0].image_url||r[0]);if(e)return e}let i=n?.content;if(Array.isArray(i))for(let e of i){let t=z(e.image_url||e.inline_data||e);if(t&&t.startsWith(`data:`))return t}return``}function ct(e){let t={"Content-Type":`application/json`};return e.apiKey&&(t.Authorization=`Bearer ${e.apiKey}`),/openrouter\.ai/i.test(e.baseUrl||``)&&(t[`HTTP-Referer`]=window.location.origin||`https://yip-lgtm.github.io`,t[`X-Title`]=`Godfather Clan`),t}function lt(e){return/401|403|Unauthorized|invalid api|invalid_api|user not found/i.test(e||``)}async function ut(e,t,n,r){let i=new AbortController,a=window.setTimeout(()=>i.abort(),r);try{let r=await fetch(e,{method:`POST`,headers:t,body:JSON.stringify(n),signal:i.signal}),a=await r.json().catch(()=>({}));if(!r.ok){let e=a.error?.message||a.message||a.error||`HTTP ${r.status}`;throw Error(typeof e==`string`?e:JSON.stringify(e))}return a}finally{window.clearTimeout(a)}}async function dt(e,t,n=`16:9`){let r=String(e.baseUrl||``).replace(/\/$/,``),i=e.imageModel||`google/gemini-2.5-flash-image`,a=ct(e),o=it(n),s=[],c=[{path:`/images`,body:{model:i,prompt:t,n:1,aspect_ratio:n,size:o}},{path:`/images/generations`,body:{model:i,prompt:t,n:1,size:o}}];for(let e of c)try{let t=st(await ut(`${r}${e.path}`,a,e.body,tt));if(t)return t;s.push(`${e.path} 沒有返回圖片`)}catch(e){let t=e.message||String(e);if(s.push(t),lt(t))break}throw Error(s[0]||`插畫生成失敗`)}function ft(e){return[nt,`Widescreen 16:9 narrative illustration, compact 512-class resolution is fine.`,`Beat title in English sense only, do not paint the words: ${e.title}.`,`Setting: ${e.slug||`Godfather Gate hall at night`}.`,`Action: ${e.narration||``}`,e.line?`Mood of the unspoken line: ${e.line}`:``,`Show two or three cultivators in a gold-and-ink interior or mountain night, faces readable, family tension.`].filter(Boolean).join(`
`)}function pt(e){let t=rt[e.name]||[`Chinese cultivator, ${e.nature?.name||`tempered`} temperament,`,`${e.root?.name||`mixed`} spirit-root coloring in the wardrobe,`,`apparent age ${e.age}, realm presence of ${d[e.realm]||`Qi Refining`}.`].join(` `);return[nt,`Vertical 3:4 character portrait, bust, eye-level, shallow depth of field.`,`Subject is the ${e.role===`patriarch`?`sect patriarch`:e.role===`elder`?`clan elder`:`disciple`}: ${t}`,e.thought?`Inner weather: ${e.thought}`:``,`Do not paint any name, seal text, or calligraphy that forms readable characters.`].filter(Boolean).join(`
`)}function B(e){return`scene:${e.id||e.title}:${e.slug||``}`}function mt(e){return`face:${e.id}:${e.realm}:${e.name}`}function ht(e){return e.artUrl?(e.artStatus=`ready`,e.artSource=e.artSource||`demo`,e.artError=``,!0):!1}function gt({onUpdate:e}={}){let t=new Map,n=new Set,r=new Map,i=[],a=!1,o=``,s=0;function c(){e?.()}function l(e){return Math.min(6e4,7e3*2**Math.max(0,e-1))}async function u(){if(!a){for(a=!0;i.length;){let e=i.shift();s+=1,c();try{let n=await dt(e.config,e.prompt,e.aspect);t.set(e.key,n),r.delete(e.key),await ot(e.key,n),e.apply(n),o=``}catch(t){o=t.message||`插畫失敗`;let n=(r.get(e.key)?.tries||0)+1;r.set(e.key,{at:Date.now(),tries:n}),e.fail?.(o),n<4&&!lt(o)&&window.setTimeout(()=>{d({...e,force:!0})},l(n))}finally{n.delete(e.key),s=Math.max(0,s-1),c()}}a=!1}}async function d(e){if(t.has(e.key)){e.apply(t.get(e.key)),c();return}if(n.has(e.key))return;let a=r.get(e.key);if(a&&!e.force&&(a.tries>=4||Date.now()-a.at<l(a.tries)))return;n.add(e.key),c();let o=await at(e.key);if(o){t.set(e.key,o),n.delete(e.key),r.delete(e.key),e.apply(o),c();return}i.push(e),u()}function f(e){e.artSource===`llm`&&e.artUrl||(e.artUrl=Qe(e),e.artSource=`demo`,e.artStatus=`ready`,e.artError=``)}function p(e,t){e.artSource===`llm`&&e.artUrl&&e.artKey===t||(e.artUrl=Xe(e),e.artKey=t,e.artSource=`demo`,e.artStatus=`ready`,e.artError=``)}return{get lastError(){return o},get busy(){return s>0||i.length>0},cached(e){return t.get(e)||``},isPending(e){return n.has(e)||i.some(t=>t.key===e)},paintScene(e,n=j()){if(!e)return;let r=B(e);if(f(e),e.artSource===`llm`&&e.artUrl)return;let i=t.get(r);if(i){e.artUrl=i,e.artSource=`llm`,e.artStatus=`ready`;return}L(n)&&d({key:r,config:n,aspect:`16:9`,prompt:ft(e),apply:t=>{e.artUrl=t,e.artStatus=`ready`,e.artSource=`llm`,e.artError=``},fail:()=>{ht(e)||(e.artStatus=`error`,e.artError=o)}})},paintPerson(e,n=j()){if(!e)return;let r=mt(e);if(e.artSource===`llm`&&e.artUrl&&e.artKey===r)return;p(e,r);let i=t.get(r);if(i){e.artUrl=i,e.artKey=r,e.artSource=`llm`,e.artStatus=`ready`;return}L(n)&&d({key:r,config:n,aspect:`3:4`,prompt:pt(e),apply:t=>{e.artUrl=t,e.artKey=r,e.artStatus=`ready`,e.artSource=`llm`,e.artError=``},fail:()=>{ht(e)||(e.artStatus=`error`,e.artError=o)}})},retryScene(e,n=j()){e&&(t.delete(B(e)),r.delete(B(e)),e.artSource===`llm`&&(e.artUrl=``,e.artSource=``),f(e),this.paintScene(e,n))}}}var V=l(),_t=u(),H=ye(),U=Ge(),W=e=>document.querySelector(e);document.querySelector(`#app`).innerHTML=`
  <div class="ambient" aria-hidden="true">
    <span class="mist mist-one"></span>
    <span class="mist mist-two"></span>
    <span class="star star-one"></span>
    <span class="star star-two"></span>
    <span class="star star-three"></span>
  </div>

  <div id="toast-region" class="toast-region" aria-live="polite"></div>

  <header class="topbar">
    <a class="brand" href="#" aria-label="教父世家首頁">
      <span class="brand-seal">父</span>
      <span class="brand-copy">
        <strong>教父世家</strong>
        <small>THE FAMILY</small>
      </span>
    </a>
    <div class="fate-chip-row" aria-label="天道總覽">
      <span class="fate-chip"><small>曆法</small><b id="calendar-label">—</b></span>
      <span class="fate-chip"><small>氣運</small><b id="karma-value">0</b></span>
      <span class="fate-chip"><small>人口</small><b id="member-value">0</b></span>
      <span class="fate-chip"><small>最高境界</small><b id="peak-realm">煉氣初期</b></span>
    </div>
    <div class="topbar-end">
      <button type="button" class="time-btn" id="pause-btn">⏸ 暫停</button>
      <button type="button" class="time-btn" id="speed-btn">×1</button>
      <button
        type="button"
        class="music-toggle"
        id="music-toggle"
        aria-pressed="false"
        title="播放 Bilibili《關注塔菲喵》循環歌單（絕世雙萌／永雛塔菲の小曲）"
      >
        🐱 關注塔菲喵
      </button>
    </div>
  </header>

  <main class="game-shell">
    <section class="hero-heading compact-hero">
      <div>
        <span class="eyebrow">蒼梧山 · 教父三部曲連載</span>
        <h1>家族史詩自動開拍，<em>權力、血債與輓歌</em></h1>
        <p>編劇按《教父》三部曲推進：立譜報應、兄弟反目、飛升輓歌。開場畫像與場次插畫已隨遊戲附送，即開即見。有 OpenRouter Key，編劇與畫師會在背景無限連載、出圖，完成後自動替換演示畫；沒有則劇組代班，金漆牌坊照常開拍。</p>
      </div>
      <div class="fortune-mark" aria-label="家族氣運">
        <span>天道視角</span>
        <strong id="fortune-word">觀察</strong>
      </div>
    </section>

    <div class="dashboard-grid sim-grid">
      <aside class="left-column">
        <section class="panel stats-panel">
          <div class="panel-heading">
            <span>
              <small>CLAN VAULT</small>
              <h2>家族總覽</h2>
            </span>
            <span class="live-badge" id="pulse-badge">演化中</span>
          </div>
          <div class="stat-card qi-stat">
            <span class="stat-icon">氣</span>
            <div>
              <small>天地靈氣</small>
              <strong id="qi-value">0</strong>
              <span><b>↗</b> <span id="qi-rate">0</span> / 月</span>
            </div>
          </div>
          <div class="realm-block">
            <div class="realm-label">
              <span><small>老祖境界</small><strong id="realm-name">煉氣初期</strong></span>
              <span id="realm-progress-label">0 / 0</span>
            </div>
            <div class="progress-track"><span id="realm-progress"></span></div>
            <p>突破後可覺醒一項家族傳承，福澤所有自主修士</p>
          </div>
        </section>

        <section class="panel roster-panel">
          <div class="panel-heading">
            <span>
              <small>AVATARS</small>
              <h2>族人名冊</h2>
            </span>
            <span class="live-badge">群像</span>
          </div>
          <div id="roster-list" class="roster-list"></div>
        </section>

        <section class="panel actions-panel">
          <div class="section-title">
            <span>◈</span><h2>家族經營</h2><i></i>
          </div>
          <button id="recruit-button" class="game-button secondary-button" type="button">
            <span class="button-glyph">人</span>
            <span><strong>納入弟子</strong><small>隨機靈根與性格入譜</small></span>
            <span class="cost"><b id="recruit-cost">0</b><small>靈氣</small></span>
          </button>
          <button id="breakthrough-button" class="game-button gold-button" type="button">
            <span class="button-glyph">境</span>
            <span><strong>老祖突破</strong><small id="breakthrough-hint">衝擊下一境界</small></span>
            <span class="cost"><b id="breakthrough-cost">0</b><small>靈氣</small></span>
          </button>
        </section>
      </aside>

      <section class="cultivation-stage world-stage">
        <div class="stage-header">
          <span></span>
          <div><small>GODFATHER GATE</small><h2>教父山門</h2></div>
          <span></span>
        </div>
        <div id="region-grid" class="region-grid"></div>
        <div class="nexus-wrap compact-nexus">
          <div class="orbit orbit-outer"><i></i><i></i><i></i></div>
          <div class="orbit orbit-inner"></div>
          <button id="gather-button" class="qi-orb" type="button" aria-label="閉關修煉，凝聚靈氣">
            <span class="orb-aura"></span>
            <span class="orb-rune">炁</span>
            <span class="orb-copy"><strong>閉關修煉</strong><small>GATHER QI</small></span>
          </button>
        </div>
        <p class="gather-message">點擊靈樞為天道庫藏凝聚 <strong id="click-yield">+10</strong> 靈氣</p>
      </section>

      <aside class="right-column">
        <section class="panel inspector-panel">
          <div class="panel-heading">
            <span>
              <small>CULTIVATOR</small>
              <h2>角色面板</h2>
            </span>
            <span class="dna-mark">視</span>
          </div>
          <div id="inspector" class="inspector"></div>
        </section>

        <section class="panel heritage-panel compact-heritage">
          <div class="panel-heading">
            <span>
              <small>FAMILY HERITAGE</small>
              <h2>家族傳承</h2>
            </span>
          </div>
          <div id="trait-list" class="trait-list"></div>
          <div id="empty-traits" class="empty-traits">
            <span class="empty-seal">承</span>
            <strong>傳承尚未覺醒</strong>
            <p>老祖突破時，從三項天賦中擇一。</p>
          </div>
        </section>

        <section class="panel screenplay-panel">
          <div class="panel-heading">
            <span>
              <small id="part-english">THE FAMILY</small>
              <h2 id="part-title">第一部 · 血色開端</h2>
            </span>
            <span class="live-badge" id="writer-badge">劇組代班</span>
          </div>
          <p class="part-theme" id="part-theme">立譜、報應、無法拒絕的道盟</p>
          <div class="screenplay-toolbar">
            <button type="button" class="time-btn" id="next-scene-btn">下一場</button>
            <button type="button" class="time-btn" id="llm-settings-btn">模型設定</button>
          </div>
          <div id="screenplay-list" class="screenplay-list"></div>
        </section>

        <section class="panel log-panel">
          <div class="log-heading">
            <span><i></i><strong>事件流</strong><small>WORLD CHRONICLE</small></span>
            <span class="log-live"><i></i> 湧現中</span>
          </div>
          <div id="log-list" class="log-list"></div>
        </section>
      </aside>
    </div>
  </main>

  <footer>
    <span>教父家訓</span>
    <p>修身 · 齊家 · 問道 · 長生</p>
    <span><a class="footer-bgm" href="https://www.bilibili.com/video/BV1kNEP6cEmu" target="_blank" rel="noreferrer">BGM 關注塔菲喵</a></span>
  </footer>

  <div id="trait-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title">
      <div class="modal-glow"></div>
      <span class="modal-seal">脈</span>
      <small>ANCESTRAL AWAKENING</small>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p>老祖踏入新境，三道傳承顯現。<br />擇其一，福澤所有自行演化的族人。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <span class="modal-footnote">此選擇將永久銘刻於族譜</span>
    </div>
  </div>

  <div id="llm-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal llm-modal" role="dialog" aria-modal="true" aria-labelledby="llm-modal-title">
      <small>SCREENWRITER</small>
      <h2 id="llm-modal-title">OpenRouter 模型與插畫</h2>
      <p>開場六人畫像與場次演示畫已打進遊戲，開局即見，不會再空白等圖。貼上 <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">OpenRouter</a> 的 <code>sk-or-...</code> 後：編劇用免費文字路由無限連載，畫師在背景以較細解析度出圖，畫好就替換演示畫。金鑰只存在你的瀏覽器。沒有金鑰則劇組代班，演示畫照常開拍。</p>
      <form id="llm-form" class="llm-form">
        <label>接口 Base URL<input id="llm-base" value="https://openrouter.ai/api/v1" placeholder="https://openrouter.ai/api/v1" /></label>
        <label>文字模型
          <input id="llm-model" list="llm-free-models" value="openrouter/free" placeholder="openrouter/free" />
          <datalist id="llm-free-models">
            <option value="openrouter/free">openrouter/free 自動揀免費模型</option>
            <option value="minimax/minimax-m2.7:free"></option>
            <option value="z-ai/glm-5.2:free"></option>
            <option value="google/gemma-4-31b-it:free"></option>
            <option value="nvidia/nemotron-3-super-120b-a12b:free"></option>
          </datalist>
        </label>
        <label>插畫模型
          <input id="llm-image-model" list="llm-image-models" value="google/gemini-2.5-flash-image" placeholder="google/gemini-2.5-flash-image" />
          <datalist id="llm-image-models">
            <option value="google/gemini-2.5-flash-image">Nano Banana · 較快細圖</option>
            <option value="black-forest-labs/flux.2-flex">Flux · 通常更快更平</option>
            <option value="google/gemini-3.1-flash-image-preview"></option>
            <option value="openai/gpt-5-image-mini"></option>
            <option value="bytedance-seed/seedream-4.5"></option>
          </datalist>
        </label>
        <label>OpenRouter API Key<input id="llm-key" type="password" placeholder="sk-or-v1-… 必填" autocomplete="off" /></label>
        <label class="llm-check"><input id="llm-enabled" type="checkbox" checked /> 允許呼叫 LLM 寫場</label>
        <label class="llm-check"><input id="llm-illustrate" type="checkbox" checked /> 有 Key 時在背景無限出圖（場次 16:9、人物 3:4；演示畫先上，畫好再換）</label>
        <div class="heaven-row">
          <button type="submit" class="time-btn">儲存並試寫一場</button>
          <button type="button" class="time-btn" id="llm-cancel">關閉</button>
        </div>
      </form>
    </div>
  </div>
`;var G={qi:W(`#qi-value`),qiRate:W(`#qi-rate`),members:W(`#member-value`),realm:W(`#realm-name`),realmProgress:W(`#realm-progress`),realmProgressLabel:W(`#realm-progress-label`),recruitCost:W(`#recruit-cost`),breakthroughCost:W(`#breakthrough-cost`),breakthroughHint:W(`#breakthrough-hint`),clickYield:W(`#click-yield`),recruitButton:W(`#recruit-button`),breakthroughButton:W(`#breakthrough-button`),gatherButton:W(`#gather-button`),traitList:W(`#trait-list`),emptyTraits:W(`#empty-traits`),logList:W(`#log-list`),modal:W(`#trait-modal`),choices:W(`#trait-choices`),toastRegion:W(`#toast-region`),musicToggle:W(`#music-toggle`),calendar:W(`#calendar-label`),karma:W(`#karma-value`),peak:W(`#peak-realm`),roster:W(`#roster-list`),regions:W(`#region-grid`),inspector:W(`#inspector`),pauseBtn:W(`#pause-btn`),speedBtn:W(`#speed-btn`),pulse:W(`#pulse-badge`),fortune:W(`#fortune-word`),partTitle:W(`#part-title`),partEnglish:W(`#part-english`),partTheme:W(`#part-theme`),writerBadge:W(`#writer-badge`),screenplayList:W(`#screenplay-list`),nextSceneBtn:W(`#next-scene-btn`),llmSettingsBtn:W(`#llm-settings-btn`),llmModal:W(`#llm-modal`),llmForm:W(`#llm-form`),llmBase:W(`#llm-base`),llmModel:W(`#llm-model`),llmKey:W(`#llm-key`),llmEnabled:W(`#llm-enabled`),llmIllustrate:W(`#llm-illustrate`),llmImageModel:W(`#llm-image-model`),llmCancel:W(`#llm-cancel`)},K=gt({onUpdate:()=>Z({inspect:!G.inspector.matches(`:hover`)})}),vt=[{time:T(H),text:`教父世家於蒼梧山立下道統。天道臨世，開始觀察族人自行演化。`,tone:`gold`},{time:T(H),text:`沈清梧入藏經閣，葉疏影在山門等人，白無塵已往後山。`,tone:`jade`}];function q(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e,t=``){vt.unshift({time:T(H),text:e,tone:t}),vt.splice(24),yt()}function yt(){G.logList.innerHTML=vt.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time.replace(`玄元曆 `,``)}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function bt(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`TRIBULATION`:e.type===`heritage`?`BREAKTHROUGH`:`OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail||``}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,G.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function Y(e){for(let t of e)t.text&&J(t.text,t.tone),t.toast?(bt(t.toast),V.playEvent(t.toast.type!==`bad`)):t.sfx===!0?V.playEvent(!0):t.sfx===!1&&V.playEvent(!1),t.flash&&_t.flashScreen()}function xt(){G.emptyTraits.hidden=H.traits.length>0,G.traitList.innerHTML=H.traits.map(e=>{let t=f.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function St(e,t){let n=e.artUrl,r=n&&e.artSource!==`llm`&&K.isPending(mt(e));return n?`<img class="${t} has-art${r?` is-upgrading`:``}" src="${n}" alt="" />`:e.artStatus===`pending`&&L()?`<span class="${t} art-pending" aria-hidden="true"></span>`:`<span class="${t}" style="border-color:${e.root.hue};color:${e.root.hue}">${e.name.slice(-1)}</span>`}function Ct(e){let t=e.artUrl,n=t&&e.artSource!==`llm`&&K.isPending(B(e));return t?`<div class="scene-art-wrap${n?` is-upgrading`:``}"><img class="scene-art" src="${t}" alt="${q(e.title)}" /></div>`:e.artStatus===`pending`?`<div class="scene-art art-pending" role="img" aria-label="插畫生成中"></div>`:e.artStatus===`error`?`<button type="button" class="scene-art art-retry" data-retry-art="${q(e.id||``)}">插畫未成 · 點此重試</button>`:`<div class="scene-art art-pending" role="img" aria-label="演示畫載入中"></div>`}function wt(){G.roster.innerHTML=S(H).map(e=>`
    <button type="button" class="roster-card ${e.id===H.selectedId?`is-selected`:``}" data-id="${e.id}">
      ${St(e,`roster-seal`)}
      <span>
        <strong>${e.name}${e.role===`patriarch`?` · 老祖`:``}</strong>
        <small>${d[e.realm]} · ${g[e.action].label}</small>
      </span>
      <i>${e.hp}%</i>
    </button>
  `).join(``)}function Tt(){G.regions.innerHTML=ee.map(e=>{let t=Ae(H,e.id).map(e=>`
      <button type="button" class="region-token ${e.id===H.selectedId?`is-on`:``}" data-id="${e.id}" title="${e.name}">
        ${e.name.slice(-1)}
      </button>
    `).join(``);return`
      <article class="region-cell">
        <header><strong>${e.name}</strong><small>${e.hint}</small></header>
        <div class="token-row">${t||`<span class="token-empty">空</span>`}</div>
      </article>
    `}).join(``)}function Et(){let e=C(H);if(!e){G.inspector.innerHTML=`<p class="empty-inspect">山門已空。</p>`;return}let t=e.memory.length?e.memory.map(e=>`<li>${e}</li>`).join(``):`<li>尚無記憶殘片</li>`,n=e.artifacts.length?e.artifacts.join(`、`):`無`,r=e.artUrl?`<img class="inspect-portrait${e.artSource!==`llm`&&K.isPending(mt(e))?` is-upgrading`:``}" src="${e.artUrl}" alt="${q(e.name)}" />`:e.artStatus===`pending`&&L()?`<span class="inspect-portrait art-pending" aria-hidden="true"></span>`:`<span class="inspect-seal">${e.name.slice(-1)}</span>`;G.inspector.innerHTML=`
    <div class="inspect-name">
      ${r}
      <div>
        <strong>${e.name}</strong>
        <small>${e.nickname||`尚無江湖綽號`} · ${e.role===`patriarch`?`老祖`:e.role===`elder`?`長老`:`弟子`}</small>
      </div>
    </div>
    <div class="inspect-tags">
      <span>${e.root.name}</span>
      <span>${e.nature.name}</span>
      <span>《${e.technique}》</span>
    </div>
    <div class="inspect-grid">
      <div><small>境界</small><b>${d[e.realm]}</b></div>
      <div><small>年齡 / 壽元</small><b>${e.age} / ${e.lifespan}</b></div>
      <div><small>傷勢</small><b>${e.hp}%</b></div>
      <div><small>心情</small><b>${e.mood>20?`暢快`:e.mood<-15?`陰鬱`:`平淡`}</b></div>
      <div><small>丹藥</small><b>${e.pills}</b></div>
      <div><small>人際</small><b>${Oe(e,H)}</b></div>
    </div>
    <p class="thought-box">「${e.thought}」</p>
    <p class="inspect-gear">法寶：${n}</p>
    <ul class="memory-list">${t}</ul>
    <div class="heaven-actions">
      <small>天道干預 · 消耗氣運</small>
      <div class="heaven-row">
        <button type="button" data-heaven="bless">賜福 · 8</button>
        <button type="button" data-heaven="tribulate">天劫 · 12</button>
        <button type="button" data-heaven="corrupt">心魔 · 10</button>
      </div>
      <div class="heaven-row">
        <button type="button" data-assign="cultivate">令其修煉 · 3</button>
        <button type="button" data-assign="adventure">令其歷練 · 3</button>
        <button type="button" data-assign="alchemy">令其煉丹 · 3</button>
      </div>
    </div>
  `}function X(){let e=ue(H),t=H.patriarchRealm>=d.length-1;G.qi.textContent=b(H.qi),G.qiRate.textContent=b(ce(H)),G.members.textContent=`${S(H).length}`,G.realm.textContent=d[H.patriarchRealm],G.realmProgressLabel.textContent=t?`道心圓滿`:`${b(Math.min(H.qi,e))} / ${b(e)}`,G.realmProgress.style.width=t?`100%`:`${Math.min(H.qi/e*100,100)}%`,G.recruitCost.textContent=b(le(H)),G.breakthroughCost.textContent=t?`—`:b(e),G.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${d[H.patriarchRealm+1]}`,G.clickYield.textContent=`+${b(se(H))}`,G.recruitButton.disabled=H.qi<le(H),G.breakthroughButton.disabled=t||H.qi<e,G.calendar.textContent=T(H),G.karma.textContent=b(H.karma),G.peak.textContent=ke(H),G.pulse.textContent=H.paused?`時停`:`演化中`,G.fortune.textContent=H.paused?`時停`:H.karma>40?`昌盛`:H.karma<12?`式微`:`觀察`,G.pauseBtn.textContent=H.paused?`▶ 繼續`:`⏸ 暫停`,G.speedBtn.textContent=`×${H.speed}`}function Dt(){let e=k[U.state.part-1];G.partTitle.textContent=e.title,G.partEnglish.textContent=e.english,G.partTheme.textContent=e.theme,G.writerBadge.textContent=U.state.busy?`執筆中…`:K.busy?`畫師執筆中…`:U.state.source===`llm`?`OpenRouter`:M(U.state.config)?`劇組代班`:`欠 API Key`,G.writerBadge.title=U.state.error||K.lastError||``,G.screenplayList.innerHTML=U.state.scenes.map(e=>`
    <article class="scene-card">
      ${Ct(e)}
      <header>
        <small>${q(e.slug)}</small>
        <b>${q(e.title)}</b>
        <i>${e.source===`llm`?`LLM`:`劇組`}${e.artSource===`llm`?` · 插畫`:e.artUrl?` · 演示畫`:``}</i>
      </header>
      <p>${q(e.narration)}</p>
      ${e.line?`<blockquote>${q(e.line)}</blockquote>`:``}
    </article>
  `).join(``)||`<p class="token-empty">劇本尚未開場。</p>`}function Ot(){for(let e of S(H))K.paintPerson(e);for(let e of U.state.scenes)K.paintScene(e)}function Z(e={}){let t=e.inspect??!0;X(),wt(),Tt(),Dt(),t&&Et(),queueMicrotask(Ot)}function kt(){let e=f.filter(e=>!H.traits.includes(e.id));return[...e.length>=3?e:f].sort(()=>Math.random()-.5).slice(0,3)}function At(){let e=kt();G.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),G.modal.classList.add(`visible`),G.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),G.choices.querySelector(`button`)?.focus()}function jt(e){let t=f.find(t=>t.id===e);t&&(H.traits.includes(e)||H.traits.push(e),G.modal.classList.remove(`visible`),G.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),J(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),bt({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),xt(),Z())}function Mt(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${b(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function Nt(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function Q(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function Pt(e){e&&(H.selectedId=e,Z())}G.screenplayList.addEventListener(`click`,e=>{let t=e.target.closest(`[data-retry-art]`);if(!t)return;let n=U.state.scenes.find(e=>e.id===t.dataset.retryArt);n&&K.retryScene(n,U.state.config)}),G.roster.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&Pt(t.dataset.id)}),G.regions.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&Pt(t.dataset.id)}),G.inspector.addEventListener(`click`,e=>{let t=e.target.closest(`[data-heaven]`),n=e.target.closest(`[data-assign]`),r=H.selectedId;if(t){let e=t.dataset.heaven,n=e===`bless`?we(H,r):e===`tribulate`?Te(H,r):De(H,r);if(!n.ok){J(n.reason||`氣運不足，天道暫時不可妄動。`,`danger`),Z();return}V.playRise(),e===`tribulate`&&Y(n.reports||[]),J(n.text,`gold`),bt({type:e===`tribulate`?`heritage`:e===`corrupt`?`bad`:`good`,title:e===`bless`?`天道賜福`:e===`tribulate`?`天劫降臨`:`心魔翻湧`,text:C(H)?.name||``,detail:n.text}),Z();return}if(n){let e=Ee(H,r,n.dataset.assign);e.ok?(V.playQing(),J(e.text,`jade`)):J(e.reason||`氣運不足。`,`danger`),Z()}}),G.gatherButton.addEventListener(`click`,e=>{let t=se(H);H.qi+=t;let{x:n,y:r}=Nt(e);Mt(n,r,t),_t.burst(n,r),V.playQing(),Q(G.gatherButton),X()}),G.recruitButton.addEventListener(`click`,()=>{let e=Se(H);e.ok&&(V.playRise(),Q(G.recruitButton),J(`${e.person.name}拜入教父世家，靈根為${e.person.root.name}，性${e.person.nature.name}。`,`jade`),K.paintPerson(e.person),Z())}),G.breakthroughButton.addEventListener(`click`,()=>{let e=Ce(H);e.ok&&(V.playRise(),e.flash&&_t.flashScreen(),Q(G.breakthroughButton),J(`老祖破境成功，踏入「${e.stage}」！`,`gold`),Z(),window.setTimeout(At,350))}),G.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&jt(t.dataset.trait)});async function $(e){if(!e)return;J(`【${k[e.part-1].title}／${e.title}】${e.line||e.narration}`,`gold`),K.paintScene(e);let t=C(H);t&&K.paintPerson(t),Z()}G.nextSceneBtn.addEventListener(`click`,async()=>{G.nextSceneBtn.disabled=!0;let e=await U.writeScene(H,!0);G.nextSceneBtn.disabled=!1,await $(e)});function Ft(){let e=j();G.llmBase.value=e.baseUrl||`https://openrouter.ai/api/v1`,G.llmModel.value=e.model||`openrouter/free`,G.llmImageModel.value=e.imageModel||`google/gemini-2.5-flash-image`,G.llmKey.value=e.apiKey||``,G.llmEnabled.checked=e.enabled!==!1,G.llmIllustrate.checked=e.illustrate!==!1,G.llmModal.classList.add(`visible`),G.llmModal.setAttribute(`aria-hidden`,`false`)}function It(){G.llmModal.classList.remove(`visible`),G.llmModal.setAttribute(`aria-hidden`,`true`)}G.llmSettingsBtn.addEventListener(`click`,Ft),G.llmCancel.addEventListener(`click`,It),G.llmForm.addEventListener(`submit`,async e=>{e.preventDefault(),Re({enabled:G.llmEnabled.checked,illustrate:G.llmIllustrate.checked,baseUrl:G.llmBase.value,apiKey:G.llmKey.value,model:G.llmModel.value,imageModel:G.llmImageModel.value}),U.reloadConfig(),It(),await $(await U.writeScene(H,M(U.state.config)))}),G.pauseBtn.addEventListener(`click`,()=>{H.paused=!H.paused,X()}),G.speedBtn.addEventListener(`click`,()=>{H.speed=H.speed===1?3:H.speed===3?8:1,Rt(),X()}),G.musicToggle.addEventListener(`click`,async()=>{let e=await V.setMusic(!V.isMusicOn());G.musicToggle.setAttribute(`aria-pressed`,String(e)),G.musicToggle.classList.toggle(`is-on`,e),G.musicToggle.textContent=e?`🐱 塔菲喵播放中`:`🔇 關注塔菲喵`}),document.addEventListener(`pointerdown`,()=>V.unlock(),{once:!0});var Lt=0;function Rt(){window.clearInterval(Lt),Lt=window.setInterval(()=>{Y(be(H)),U.onMonth(H).then(e=>{e&&(J(`【${k[e.part-1].title}／${e.title}】${e.line||e.narration}`,`gold`),K.paintScene(e)),Z({inspect:!G.inspector.matches(`:hover`)})})},Math.round(1600/H.speed))}window.__jiaofuFamily=window.__cultivationFamily={triggerRandomEvent:()=>{Y(xe(H,!0)),Z()},state:H,director:U,art:K,tick:()=>{Y(be(H)),Z()}},yt(),xt(),Ot(),Z(),Rt(),U.writeScene(H,!1).then($);