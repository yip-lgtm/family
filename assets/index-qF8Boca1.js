(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=`BV1kNEP6cEmu`,o=`https://www.bilibili.com/video/${a}`,s=`https://player.bilibili.com/player.html?isOutside=true&aid=116692164354026&bvid=${a}&cid=38858260566&p=1&autoplay=1&muted=0&danmaku=0&high_quality=1&loop=1`;function c(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function l(){let a=null,l=null,u=null,d=null,f=!1,p=null,m=null;function h(){return a||(a=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),l=a.createGain(),l.gain.value=.52,l.connect(a.destination),u=a.createGain(),u.gain.value=.42,u.connect(l),d=c(a,.045),a)}async function g(){h(),a.state===`suspended`&&await a.resume()}function _(e){h();let t=()=>{e()};if(a.state===`suspended`){a.resume().then(t);return}t()}function v(e,t,n,r,i,o,s=0){let c=a.createOscillator(),l=a.createGain();c.type=t,c.frequency.setValueAtTime(e,n),c.detune.setValueAtTime(s,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),c.connect(l),l.connect(o),c.start(n),c.stop(n+r+.02)}function y(){p||(p=document.createElement(`aside`),p.className=`bgm-dock`,p.setAttribute(`aria-label`,`關注塔菲喵背景音樂`),p.innerHTML=`
      <div class="bgm-dock-bar">
        <span>BGM</span>
        <a href="${o}" target="_blank" rel="noreferrer">關注塔菲喵 · 循環歌單</a>
      </div>
    `,m=document.createElement(`iframe`),m.title=`關注塔菲喵 循環歌單`,m.allow=`autoplay; fullscreen; encrypted-media`,m.referrerPolicy=`no-referrer-when-downgrade`,m.setAttribute(`scrolling`,`no`),m.setAttribute(`frameborder`,`0`),m.setAttribute(`allowfullscreen`,`true`),p.append(m),document.body.append(p))}async function ee(e){return await g(),f=e,y(),e?(p.classList.add(`is-on`),m.src=s,u.gain.setTargetAtTime(.22,a.currentTime,.05)):(p.classList.remove(`is-on`),m.src=`about:blank`,u.gain.setTargetAtTime(.42,a.currentTime,.05)),f}function b(){_(()=>{let e=a.currentTime;v(1864,`sine`,e,.55,.16,u),v(2489,`sine`,e,.32,.07,u);let t=a.createBufferSource();t.buffer=d;let n=a.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=a.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(u),t.start(e),t.stop(e+.06)})}function x(){_(()=>{let t=a.currentTime;[e,n,r].forEach((e,n)=>{v(e,`sine`,t,.55,.09,u),v(e*1.5,`triangle`,t+.18+n*.04,.5,.07,u),v(e*2,`sine`,t+.38+n*.05,.55,.05,u)})})}function te(n){_(()=>{let o=a.currentTime;n?(v(r,`sine`,o,.35,.1,u),v(i*2,`sine`,o+.12,.5,.09,u)):(v(e/2,`triangle`,o,.55,.12,u),v(t/2,`sine`,o+.08,.45,.08,u))})}return{unlock:g,setMusic:ee,playQing:b,playRise:x,playEvent:te,isMusicOn:()=>f}}function u(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var d=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],f=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],p=[{id:`metal`,name:`金靈根`,hue:`#d7ae5b`},{id:`wood`,name:`木靈根`,hue:`#77c59c`},{id:`water`,name:`水靈根`,hue:`#7eb4d4`},{id:`fire`,name:`火靈根`,hue:`#d48a6a`},{id:`earth`,name:`土靈根`,hue:`#c4a574`},{id:`heaven`,name:`天靈根`,hue:`#f3d591`},{id:`mixed`,name:`雜靈根`,hue:`#8a9a90`}],m=[{id:`diligent`,name:`勤懇`,weights:{cultivate:3.2,study:1.4,rest:.6,adventure:.5}},{id:`ambitious`,name:`野心`,weights:{cultivate:1.4,adventure:2.4,study:1.2,trade:.8}},{id:`kind`,name:`仁善`,weights:{social:2.6,alchemy:1.3,rest:1.1,adventure:.5}},{id:`pride`,name:`傲骨`,weights:{adventure:2.2,study:1.4,social:.5,trade:.6}},{id:`greed`,name:`貪婪`,weights:{trade:2.8,adventure:1.5,cultivate:.7,social:.6}},{id:`caution`,name:`謹慎`,weights:{rest:1.8,study:1.8,cultivate:1.4,adventure:.35}},{id:`passion`,name:`多情`,weights:{social:3.1,trade:1.1,cultivate:.8,adventure:.7}},{id:`demon`,name:`魔心`,weights:{adventure:2.3,trade:1.3,social:.4,cultivate:1.1}}],h=[`青嵐吐納訣`,`蒼梧劍意`,`雲水心經`,`焚天掌印`,`厚土養氣章`,`百草丹經`,`問雪無痕步`],g=[{id:`nexus`,name:`靈樞`,hint:`吐納`},{id:`peak`,name:`後山`,hint:`歷練`},{id:`alchemy`,name:`丹房`,hint:`煉丹`},{id:`library`,name:`藏經閣`,hint:`參悟`},{id:`gate`,name:`山門`,hint:`論道`},{id:`market`,name:`雲市`,hint:`交易`}],_={cultivate:{label:`吐納修煉`,region:`nexus`},adventure:{label:`後山歷練`,region:`peak`},alchemy:{label:`煉製丹藥`,region:`alchemy`},study:{label:`參悟功法`,region:`library`},social:{label:`論道交心`,region:`gate`},trade:{label:`雲市交易`,region:`market`},rest:{label:`調息養傷`,region:`nexus`}},v=[`青`,`沈`,`葉`,`白`,`蒼`,`嵐`,`蘇`,`江`,`陸`,`謝`,`韓`,`顧`],y=[`玄機`,`清梧`,`疏影`,`無塵`,`小魚`,`七七`,`問雪`,`承光`,`靈犀`,`墨白`,`青棠`,`遠山`,`晚晴`,`折竹`,`聽潮`],ee=[`青鋒殘劍`,`避水珠`,`聚氣戒`,`蒼梧令`,`問心鏡`,`焚香爐`,`靈犀簪`],b=[`寅`,`卯`,`辰`,`巳`,`午`,`未`,`申`,`酉`,`戌`,`亥`,`子`,`丑`],x=[{type:`good`,title:`仙草現世`,text:`後山現百年靈芝，靈樞為之一振。`,qi:500},{type:`good`,title:`天作之合`,text:`一門親事說成，香火又盛一分。`,members:1},{type:`good`,title:`高人指點`,text:`雲遊真人路過，留下一縷修行心得。`,qi:280},{type:`good`,title:`靈脈湧動`,text:`地底靈脈復甦，滿院清輝。`,qi:800},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門。`,members:-1},{type:`bad`,title:`走火入魔`,text:`有人修行冒進，心魔趁虛而入。`,qi:-200},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植凋零。`,qi:-350}],te=1,ne=()=>`c${te++}`,S=e=>e[Math.floor(Math.random()*e.length)],C=(e,t,n)=>Math.max(t,Math.min(n,e)),w=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e),T=(e,t)=>e.traits.includes(t),E=e=>e.people.filter(e=>e.alive),re=e=>e.people.find(t=>t.id===e.selectedId)||E(e)[0];function D(e){return 90+e*36}function ie(e){return 10*(T(e,`diligence`)?2:1)}function ae(e){let t=T(e,`heaven-root`)?1.5:1,n=T(e,`jade-bones`)?1.25:1,r=E(e).filter(e=>e.action===`cultivate`).length,i=Math.max(1,E(e).length*.35);return(r*1.8+i)*t*n}function O(e){let t=T(e,`merchant`)?1.2975:1.35,n=T(e,`prosperity`)?.8:1;return Math.round(80*t**Math.max(0,E(e).length-1)*n)}function oe(e){return Math.round(500*2.15**e.patriarchRealm)}function k(e){return`玄元曆 ${e.year} 年${b[e.month]}月`}function se(e){let t=new Set(e.people.map(e=>e.name));for(let e=0;e<40;e+=1){let e=`${S(v)}${S(y)}`;if(!t.has(e))return e}return`${S(v)}${S(y)}${e.people.length}`}function A(e,t={}){let n=t.nature||S(m.filter(e=>e.id!==`demon`||Math.random()>.82)),r=t.root||S(p.slice(0,6).concat(Math.random()>.88?[p[5]]:[p[6]])),i=t.realm??Math.floor(Math.random()*3);return{id:t.id||ne(),name:t.name||se(e),role:t.role||`disciple`,root:r,nature:n,technique:t.technique||S(h),realm:i,personalQi:t.personalQi??Math.round(20+Math.random()*80),age:t.age??16+Math.floor(Math.random()*28),lifespan:t.lifespan??D(i),mood:t.mood??10+Math.floor(Math.random()*30),hp:100,bonds:{},location:t.location||`nexus`,action:t.action||`cultivate`,lockedAction:null,thought:t.thought||`山門初立，心緒未定。`,memory:[],nickname:t.nickname||``,pills:0,artifacts:t.artifacts||[],alive:!0}}function ce(e,t){e.memory.unshift(t),e.memory=e.memory.slice(0,4)}function j(e,t){e.thought=t,ce(e,t)}function le(e){if(e.hp<42)return`rest`;if(e.lockedAction){let t=e.lockedAction;return e.lockedAction=null,t}let t={...e.nature.weights};e.mood<-20&&(t.rest=(t.rest||1)+1.6),e.personalQi>70+e.realm*18&&(t.cultivate=(t.cultivate||1)+1.2);let n=Object.entries(t),r=n.reduce((e,[,t])=>e+t,0),i=Math.random()*r;for(let[e,t]of n)if(i-=t,i<=0)return e;return`cultivate`}function ue(e,t){return E(e).filter(e=>e.id!==t.id)}function M(e,t,n){e.bonds[t.id]=C((e.bonds[t.id]||0)+n,-100,100),t.bonds[e.id]=C((t.bonds[e.id]||0)+n*.85,-100,100)}function de(e,t){let n=Object.entries(e.bonds);if(!n.length)return`尚無深交`;n.sort((e,t)=>Math.abs(t[1])-Math.abs(e[1]));let[r,i]=n[0],a=t.people.find(e=>e.id===r);return a?i>=35?`與${a.name}交好`:i<=-35?`與${a.name}交惡`:`與${a.name}相識`:`尚無深交`}function fe(e,t,n){let r=t.root.id===`heaven`?1.6:t.root.id===`mixed`?.75:1,i=(T(e,`heaven-root`)?1.5:1)*(T(e,`jade-bones`)?1.25:1);if(t.action===`cultivate`){let a=(8+t.realm*3)*r*i;t.personalQi+=a,e.qi+=a*.45,t.mood+=2,Math.random()<.22?j(t,`${t.name}於靈樞吐納，只覺${t.root.name}隱隱共鳴。`):t.thought=`${t.name}閉目調息，一呼一吸皆在青嵐之中。`,t.personalQi>85+t.realm*22&&t.realm<d.length-1&&Math.random()<.28&&pe(e,t,n,.62);return}if(t.action===`adventure`){let r=Math.random();if(r<.42){let r=S(ee);t.artifacts.includes(r)||t.artifacts.push(r),e.qi+=90,e.karma+=1,j(t,`${t.name}於後山得「${r}」，喜不自勝。`),n.push({text:`${t.name}後山歷練，覓得${r}。`,tone:`jade`}),!t.nickname&&Math.random()<.4&&(t.nickname=S([`青嵐遊俠`,`後山夜行`,`尋寶散人`,`蒼梧獵手`]),n.push({text:`江湖開始稱${t.name}為「${t.nickname}」。`,tone:`gold`}))}else r<.7?(t.hp-=18+Math.floor(Math.random()*16),t.mood-=8,j(t,`${t.name}遇着猛獸機關，帶傷而返。`),n.push({text:`${t.name}歷練受挫，帶傷回山。`,tone:`danger`})):(t.personalQi+=12,j(t,`${t.name}在後山走了一遭，收獲平平，心卻定了些。`));return}if(t.action===`alchemy`){Math.random()<.55?(t.pills+=1,e.qi+=40,j(t,`${t.name}煉成一枚養氣丹，丹香滿室。`),n.push({text:`${t.name}於丹房煉成養氣丹。`,tone:`jade`})):(t.hp-=8,j(t,`${t.name}火候偏差，丹爐一震，只得作罷。`));return}if(t.action===`study`){t.personalQi+=6*r,Math.random()<.18?(t.technique=S(h),j(t,`${t.name}於藏經閣改修《${t.technique}》。`),n.push({text:`${t.name}改修功法《${t.technique}》。`,tone:`gold`})):j(t,`${t.name}反覆推演《${t.technique}》，隱有所得。`);return}if(t.action===`social`){let r=ue(e,t);if(!r.length)return;let i=S(r),a=(t.nature.id===`demon`||i.nature.id===`demon`?-18:14)+Math.floor(Math.random()*10)-4;M(t,i,a),a>0?(j(t,`${t.name}與${i.name}月下論道，頗為投契。`),(t.bonds[i.id]||0)>55&&Math.random()<.35&&n.push({text:`${t.name}與${i.name}結為道友，約共證長生。`,tone:`jade`})):(j(t,`${t.name}與${i.name}言語不合，各懷心事。`),(t.bonds[i.id]||0)<-50&&Math.random()<.4&&(t.hp-=12,i.hp-=12,n.push({text:`${t.name}與${i.name}山門內鬥，拳腳相向。`,tone:`danger`})));return}if(t.action===`trade`){let r=Math.round((40+Math.random()*160)*(t.nature.id===`greed`?1.4:1));Math.random()<.18?(e.qi=Math.max(0,e.qi-70),t.mood-=6,j(t,`${t.name}在雲市被人坑了一筆靈石。`),n.push({text:`${t.name}雲市折本而歸。`,tone:`danger`})):(e.qi+=r,e.karma+=+(Math.random()<.25),j(t,`${t.name}以物易物，為家族帶回靈石。`));return}t.hp=C(t.hp+22,0,100),t.mood+=6,t.pills>0&&t.hp<80?(--t.pills,t.hp=C(t.hp+18,0,100),t.personalQi+=8,j(t,`${t.name}服下養氣丹，傷勢漸穩。`)):j(t,`${t.name}靜室調息，把心火慢慢壓了下去。`)}function pe(e,t,n,r){if(t.realm>=d.length-1)return!1;let i=t.pills>0?.12:0;if(t.pills>0&&--t.pills,Math.random()<r+i){t.realm+=1,t.personalQi=12,t.lifespan=Math.max(t.lifespan,D(t.realm));let r=d[t.realm];return j(t,`${t.name}突破至「${r}」，天地為之側目。`),n.push({text:`${t.name}破境成功，踏入「${r}」。`,tone:`gold`,flash:/金丹|元嬰/.test(r),toast:{type:`heritage`,title:`族人破境`,text:t.name,detail:r}}),t.role===`patriarch`&&(e.patriarchRealm=t.realm),!0}return t.hp-=24,t.mood-=14,t.personalQi*=.55,j(t,`${t.name}衝擊失敗，經脈隱隱作痛。`),n.push({text:`${t.name}破境失敗，經脈受損。`,tone:`danger`}),!1}function me(e,t,n){if(e.month===0&&(t.age+=1),t.mood=C(t.mood+(Math.random()*6-3),-80,80),t.hp<=0&&t.role!==`patriarch`){t.alive=!1,j(t,`${t.name}傷重不治，魂歸蒼梧。`),n.push({text:`${t.name}傷重坐化。族譜又添一筆哀榮。`,tone:`danger`,toast:{type:`bad`,title:`族人隕落`,text:t.name,detail:`傷重不治`}});return}t.age>=t.lifespan&&t.role!==`patriarch`&&(t.alive=!1,j(t,`${t.name}壽元將盡，化清風而去。`),n.push({text:`${t.name}壽元耗盡，坐化於${_[t.action]?.label||`山門`}。`,tone:`danger`,toast:{type:`bad`,title:`壽元耗盡`,text:t.name,detail:`${t.age}歲`}})),t.role===`patriarch`&&(t.hp=Math.max(t.hp,35),t.alive=!0)}function he(){let e={qi:680,karma:36,year:146,month:2,patriarchRealm:0,traits:[],people:[],selectedId:`patriarch`,paused:!1,speed:1,omenIn:18};return e.people=[A(e,{id:`patriarch`,name:`青玄機`,role:`patriarch`,root:p[5],nature:m[0],technique:`青嵐吐納訣`,realm:0,age:62,lifespan:180,nickname:`青嵐老祖`,location:`nexus`,action:`cultivate`,thought:`青嵐一脈，當以我為骨。`,artifacts:[`蒼梧令`]}),A(e,{name:`沈清梧`,role:`elder`,root:p[0],nature:m[5],realm:1,age:44,action:`study`,location:`library`}),A(e,{name:`葉疏影`,root:p[1],nature:m[6],realm:0,age:19,action:`social`,location:`gate`}),A(e,{name:`白無塵`,root:p[2],nature:m[3],realm:1,age:27,action:`adventure`,location:`peak`}),A(e,{name:`蒼小魚`,root:p[3],nature:m[1],realm:0,age:17,action:`alchemy`,location:`alchemy`}),A(e,{name:`嵐七七`,root:p[4],nature:m[2],realm:0,age:16,action:`cultivate`,location:`nexus`})],M(e.people[0],e.people[1],28),M(e.people[2],e.people[5],22),M(e.people[3],e.people[4],-12),e}function ge(e){let t=[];if(e.paused)return t;e.month=(e.month+1)%12,e.month===0&&(e.year+=1),e.karma=C(e.karma+.35,0,99);for(let n of E(e))n.action=le(n),n.location=_[n.action].region,fe(e,n,t),me(e,n,t);return--e.omenIn,e.omenIn<=0&&(e.omenIn=8+Math.floor(Math.random()*10),t.push(..._e(e,!1))),t}function _e(e,t=!1){let n=[];if(!t&&Math.random()>.55)return n.push({text:`天機掠過，此月山門無事。`,tone:``}),n;let r=S(x),i=T(e,`ancestral`)&&r.qi>0?1.5:1;if(r.qi&&(e.qi=Math.max(0,e.qi+r.qi*i)),r.members>0)for(let t=0;t<r.members;t+=1)N(e,!0);if(r.members<0){let t=E(e).filter(e=>e.role!==`patriarch`);if(t.length){let e=S(t);e.hp=Math.max(0,e.hp-55),e.hp<=0&&(e.alive=!1,n.push({text:`夜襲之中，${e.name}為護山門而隕。`,tone:`danger`}))}}let a=r.qi?`靈氣 ${r.qi>0?`+`:``}${w(r.qi*i)}`:r.members>0?`族人 +1`:`山門動盪`;return n.push({text:`${r.title}：${r.text}（${a}）`,tone:r.type===`bad`?`danger`:`jade`,toast:{type:r.type,title:r.title,text:r.text,detail:a},sfx:r.type!==`bad`}),n}function N(e,t=!1){let n=O(e);if(!t){if(e.qi<n)return{ok:!1};e.qi-=n}let r=A(e,{role:`disciple`,age:15+Math.floor(Math.random()*12),realm:0});return e.people.push(r),e.selectedId=r.id,j(r,`${r.name}拜入青嵐，眼底還有凡塵未褪。`),{ok:!0,person:r}}function ve(e){let t=oe(e),n=e.people.find(e=>e.role===`patriarch`);if(!n||e.qi<t||e.patriarchRealm>=d.length-1)return{ok:!1};e.qi-=t,e.patriarchRealm+=1,n.realm=e.patriarchRealm,n.personalQi=20,n.lifespan=Math.max(n.lifespan,D(n.realm));let r=d[e.patriarchRealm];return j(n,`老祖青玄機突破至「${r}」，青嵐氣運陡然一振。`),{ok:!0,stage:r,flash:/金丹|元嬰/.test(r)}}function ye(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<8?{ok:!1,reason:`氣運不足`}:(e.karma-=8,n.mood+=24,n.hp=C(n.hp+20,0,100),n.personalQi+=28,j(n,`天道賜福於${n.name}，周身金光一閃，心魔暫退。`),{ok:!0,text:`天道賜福「${n.name}」，傷勢與道心皆有進益。`})}function be(e,t){let n=e.people.find(e=>e.id===t&&e.alive);if(!n||e.karma<12)return{ok:!1,reason:`氣運不足`};e.karma-=12;let r=[];return pe(e,n,r,.48),{ok:!0,reports:r,text:`天劫劈向${n.name}。`}}function xe(e,t,n){let r=e.people.find(e=>e.id===t&&e.alive);return!r||e.karma<3?{ok:!1,reason:`氣運不足`}:_[n]?(e.karma-=3,r.lockedAction=n,r.action=n,r.location=_[n].region,j(r,`天道令${r.name}去「${_[n].label}」，不敢不從。`),{ok:!0,text:`已令${r.name}改行「${_[n].label}」。`}):{ok:!1,reason:`無此律令`}}function Se(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<10?{ok:!1,reason:`氣運不足`}:(e.karma-=10,n.nature=n.nature.id===`demon`?S(m.filter(e=>e.id!==`demon`)):m.find(e=>e.id===`demon`),n.mood-=10,j(n,n.nature.id===`demon`?`${n.name}心魔大盛，眸中多了一絲戾氣。`:`${n.name}心魔被強行剝去，整個人空了一截。`),{ok:!0,text:`${n.name}性情轉為「${n.nature.name}」。`})}function Ce(e,t){return de(e,t)}function we(e){return d[E(e).reduce((e,t)=>e.realm>=t.realm?e:t).realm]}function Te(e,t){return E(e).filter(e=>e.location===t)}function Ee(e,t,n,r=0){let i=E(e).find(e=>e.name===t);i&&(j(i,n),i.mood=C(i.mood+r,-80,80))}function De(e,t,n,r){let i=E(e).find(e=>e.name===t),a=E(e).find(e=>e.name===n);!i||!a||M(i,a,r)}var P=[{id:1,title:`第一部 · 血色開端`,english:`THE FAMILY`,theme:`立譜、報應、無法拒絕的道盟`},{id:2,title:`第二部 · 雙生歲月`,english:`THE BETRAYAL`,theme:`創業回憶與當下猜忌、兄弟反目`},{id:3,title:`第三部 · 最後輓歌`,english:`THE RECKONING`,theme:`想洗白飛升、與天庭交易、繼承人倒下`}],F=`qinglan-llm-config`;function I(){try{return{enabled:!0,baseUrl:``,apiKey:``,model:`deepseek-chat`,...JSON.parse(localStorage.getItem(F)||`{}`)}}catch{return{enabled:!0,baseUrl:``,apiKey:``,model:`deepseek-chat`}}}function Oe(e){localStorage.setItem(F,JSON.stringify({enabled:!!e.enabled,baseUrl:String(e.baseUrl||``).trim(),apiKey:String(e.apiKey||``).trim(),model:String(e.model||`deepseek-chat`).trim()}))}function L(e){let t=E(e),n=t.find(e=>e.role===`patriarch`)||t[0],r=t.find(e=>e.role===`elder`)||t[1]||n,i=t.filter(e=>e.id!==n.id),a=i.find(e=>e.nature.id===`passion`)||i[0]||n;return{don:n,consiglieri:r,kay:a,fredo:[...i].sort((e,t)=>(e.bonds[n.id]||0)-(t.bonds[n.id]||0))[0]||a,soldier:i.find(e=>e.nature.id===`pride`||e.nature.id===`ambitious`)||i.at(-1)||n,child:[...i].sort((e,t)=>e.age-t.age)[0]||a,people:t}}function ke(e,t){let{don:n,people:r}=L(e),i=r.map(e=>`${e.name}（${d[e.realm]}／${e.root.name}／${e.nature.name}／正在${e.action}／${e.thought}）`).join(`
`);return{calendar:k(e),part:P[t-1],qi:Math.round(e.qi),karma:Math.round(e.karma),don:n?.name,roster:i}}function R(e,t,n,r,i,a={}){return{part:e,title:t,slug:n,narration:r,line:i,...a}}function Ae(e,t,n){let{don:r,consiglieri:i,kay:a,fredo:o,soldier:s,child:c}=L(e),l={1:[()=>R(1,`立譜宴`,`INT. 山門大殿 · 夜`,`燈火把青嵐門匾照得像一口金棺。四方來客低頭敬酒，沒有人敢問靈石從哪來。${a.name}立在廊柱後，看${r.name}接過一封染血的拜帖。`,`${r.name}：今晚是喜事。喜事過了，帳才開始算。`,{speaker:r.name,mood:4,bond:[r.name,a.name,6]}),()=>R(1,`無法拒絕`,`INT. 密室 · 子時`,`${i.name}把盟書推過桌面。對方的手在抖。窗外有人練劍，劍聲整齊得像送葬。`,`${r.name}：我給你一個無法拒絕的道盟。簽，你還是青嵐的客；不簽，你就是後山的土。`,{speaker:r.name,karma:1}),()=>R(1,`枕邊警告`,`EXT. 丹房 · 黎明`,`爐蓋揭開，裡面不是丹，是一顆還帶溫的妖獸頭顱。${s.name}後退半步，第一次明白「客氣」在這座山裡怎麼寫。`,`${i.name}：下次，我們會讓他親自來看。`,{speaker:i.name,mood:-8}),()=>R(1,`沉潭`,`EXT. 蒼梧深潭 · 霧`,`有人說仇家去雲遊了。潭面只冒一個氣泡。${o.name}把石子扔進去，數到三，不敢數到四。`,`${o.name}：他會回來的吧？`,{speaker:o.name,bond:[o.name,r.name,-8]}),()=>R(1,`第一次開火`,`EXT. 山門石階 · 雨`,`雨把血跡洗淡，洗不淡規矩。${s.name}把劍收回鞘，手卻停在鞘口。`,`${r.name}：這不是殺戮。這是讓世界重新學會害怕我們的姓。`,{speaker:r.name,karma:-2}),()=>R(1,`西西里式流放`,`EXT. 後山密林 · 日`,`${a.name}被送去「避災」。林子很靜，靜得像有人被全世界原諒了，只除了自己。`,`${a.name}：你護我，是因為愛，還是因為我看見了不該看見的？`,{speaker:a.name,mood:-12}),()=>R(1,`渡劫蒙太奇`,`INT. 靈樞 · 同時`,`${r.name}在靈樞閉目渡劫，山門外三路仇家同時倒下。鐘響一聲，兩種儀式重疊成一種。`,`${i.name}：今日他成親於天，也成親於血。`,{speaker:i.name,karma:-3}),()=>R(1,`關門`,`INT. 寢殿 · 夜`,`${a.name}問他今晚殺了誰。${r.name}不答。門在她面前合上，留下一道金縫，像未癒的傷口。`,`${r.name}：家族的事，到此為止。`,{speaker:r.name,bond:[r.name,a.name,-14]})],2:[()=>R(2,`雙線`,`INT. 藏經閣 / EXT. 舊碼頭 · 交切`,`一邊是少年${r.name}在碼頭偷渡靈苗，一邊是今日的他聽密報。兩張臉疊在一起，誰都不比誰乾淨。`,`${r.name}：我不是變了。是世界終於追上我。`,{speaker:r.name}),()=>R(2,`庭訊`,`INT. 山門議事 · 日`,`外門長老像審官。問題不是「有沒有做」，是「能不能證明我們沒做」。${i.name}把偽證與丹方一併推過去。`,`${i.name}：真相是奢侈品。我們只賣能活下去的版本。`,{speaker:i.name}),()=>R(2,`我知道是你`,`INT. 湖心亭 · 冬`,`${o.name}的笑先碎。湖面結冰，冰下還有去年沉下去的名字。`,`${r.name}：我知道是你。你是我的血，所以你會死得比外人慢一點。`,{speaker:r.name,bond:[r.name,o.name,-40],mood:-20}),()=>R(2,`孤島`,`EXT. 山巔 · 雪`,`權勢把人抬到沒有平輩的高度。${c.name}來送衣，不敢靠太近。`,`${r.name}：坐下。不，站著。我需要有人提醒我還能被靠近。`,{speaker:r.name,mood:-6}),()=>R(2,`舊神的賭局`,`INT. 雲市密室 · 夜`,`有人允諾海外靈礦、朝廷文書、長生契約。條件只有一個：交出一個弟弟。`,`${s.name}：這買賣太乾淨，乾淨得像陷阱。`,{speaker:s.name,karma:2}),()=>R(2,`吻別`,`EXT. 碼頭 · 黎明`,`${o.name}上了船。船沒開。岸上有人已把劍出了半寸。`,`${o.name}：哥，我只是想被看見。`,{speaker:o.name})],3:[()=>R(3,`想洗手`,`INT. 靈樞 · 晨`,`${r.name}說要飛升、要合法、要把青嵐還給天道。桌上放著三份還沒撕的血契。`,`${r.name}：我只想做個普通的長生者。這句話本身，已經像笑話。`,{speaker:r.name}),()=>R(3,`天庭 Immobiliare`,`INT. 虛空廊橋 · 金光`,`天庭要靈石，要門生，要他用俗世的罪去換天上的席。${i.name}算到第三筆，停筆。`,`${i.name}：飛升不是解脫。是換一家更大的家族。`,{speaker:i.name,karma:-4}),()=>R(3,`繼承人`,`EXT. 演武場 · 黃昏`,`${s.name}太像年輕的他。這讓他安心，也讓他厭惡。`,`${r.name}：你不要學我。你要學我活下來的那一部分——如果還有的話。`,{speaker:r.name,bond:[r.name,s.name,10]}),()=>R(3,`臺階`,`EXT. 山門石階 · 夜宴散場`,`流矢不知從哪來。${c.name}倒下時還笑著，以為是煙花。橙從${r.name}袖中滑落，滾過血。`,`${r.name}：不。換我。`,{speaker:r.name,mood:-30,karma:-6}),()=>R(3,`空椅`,`EXT. 庭園 · 秋`,`很久以後，有人在椅上看見他。風吹過，像一句沒說完的對不起。家族還在，故事已經死了。`,`${a.name}（旁白）：他贏了所有該贏的，只輸掉坐在他身邊的人。`,{speaker:a.name})]}[t];return l[n%l.length]()}function je(e){let t=String(e||``).trim(),n=t.match(/\{[\s\S]*\}/);if(n)try{let e=JSON.parse(n[0]);if(e.narration||e.line||e.title)return{title:e.title||`未名場次`,slug:e.slug||`INT. 青嵐 · 夜`,narration:e.narration||``,line:e.line||``,speaker:e.speaker||``}}catch{}let[r,...i]=t.split(`
`).map(e=>e.trim()).filter(Boolean);return{title:r?.slice(0,12)||`連載場次`,slug:`INT. 青嵐世家 · 連續`,narration:i.join(``)||t,line:``,speaker:``}}async function Me(e,t,n,r){let i=`${e.baseUrl.replace(/\/$/,``)}/chat/completions`,a=ke(t,n),o={model:e.model||`deepseek-chat`,temperature:.95,max_tokens:420,messages:[{role:`system`,content:[`你是電影編劇，要把「青嵐世家」寫成向《教父》三部曲致敬的修仙家族史詩。`,`風格：克制、陰冷、家庭倫理與權力並置；旁白像Coppola鏡頭，對白短而重。`,`禁止直接抄襲電影原句。用修仙意象改寫：道盟、靈石、天劫、渡劫、飛升、血契、橙（死亡預兆）。`,`只輸出 JSON：{"title","slug","narration","line","speaker"}`,`narration 70-120字，line 一句對白。speaker 必須是在場族人真名。`].join(`
`)},{role:`user`,content:[`當前部：${a.part.title}（${a.part.theme}）`,`時間：${a.calendar}`,`家主：${a.don}；靈氣${a.qi}；氣運${a.karma}`,`已寫過的場次標題（勿重複）：${r.join(`、`)||`無`}`,`在場人物：`,a.roster,`請寫下一場，必須推進情節，不要總結主題。`].join(`
`)}]},s={"Content-Type":`application/json`};e.apiKey&&(s.Authorization=`Bearer ${e.apiKey}`);let c=new AbortController,l=window.setTimeout(()=>c.abort(),14e3);try{let e=await fetch(i,{method:`POST`,headers:s,body:JSON.stringify(o),signal:c.signal});if(!e.ok)throw Error(`LLM ${e.status}`);let t=await e.json(),n=t.choices?.[0]?.message?.content||t.content||``;if(!n)throw Error(`empty`);return je(n)}finally{window.clearTimeout(l)}}function Ne(e,t){t.speaker&&Ee(e,t.speaker,t.line||t.narration,t.mood||0),t.bond&&De(e,t.bond[0],t.bond[1],t.bond[2]),t.karma&&(e.karma=Math.max(0,Math.min(99,e.karma+t.karma)))}function Pe(){let e={part:1,beat:0,months:0,scenes:[],busy:!1,source:`studio`,error:``,config:I()};function t(t){let n=t.people.filter(e=>!e.alive).length;e.part===1&&(t.year-146>=2||n>=1||t.karma<18)&&(e.part=2),e.part===2&&(t.year-146>=4||n>=2||t.patriarchRealm>=6)&&(e.part=3)}async function n(n,r){if(e.busy)return null;t(n),e.busy=!0;let i=e.scenes.map(e=>e.title),a,o=e.config;if(r||o.enabled&&o.baseUrl)try{a={...await Me(o,n,e.part,i.slice(0,8)),part:e.part,source:`llm`},e.source=`llm`,e.error=``}catch(t){e.error=t.message||`LLM 失敗`,a={...Ae(n,e.part,e.beat),source:`studio`},e.source=`studio`}else a={...Ae(n,e.part,e.beat),source:`studio`},e.source=`studio`;return a.time=k(n),e.beat+=1,e.scenes.unshift(a),e.scenes=e.scenes.slice(0,16),Ne(n,a),e.busy=!1,a}async function r(t){return t.paused||(e.months+=1,e.months%2!=0)?null:n(t,!1)}return{state:e,writeScene:n,onMonth:r,reloadConfig(){e.config=I()}}}var z=l(),B=u(),V=he(),H=Pe(),U=e=>document.querySelector(e);document.querySelector(`#app`).innerHTML=`
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
        <small>HEAVEN'S WILL</small>
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
        <p>編劇按《教父》三部曲推進：立譜報應、兄弟反目、飛升輓歌。有模型就由 LLM 持續寫場；沒有則由劇組代班，鏡頭不停。</p>
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
          <div><small>QINGLAN MOUNTAIN</small><h2>青嵐山門</h2></div>
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
    <span>青嵐家訓</span>
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
      <h2 id="llm-modal-title">連載模型</h2>
      <p>填 OpenAI 相容接口（DeepSeek / Groq / Ollama）。金鑰只存在你的瀏覽器。空白則用劇組代班，風格同樣跟《教父》三部曲走。</p>
      <form id="llm-form" class="llm-form">
        <label>接口 Base URL<input id="llm-base" placeholder="https://api.deepseek.com/v1 或 http://127.0.0.1:11434/v1" /></label>
        <label>模型名<input id="llm-model" placeholder="deepseek-chat / llama3.1" /></label>
        <label>API Key<input id="llm-key" type="password" placeholder="可留空（本地 Ollama）" autocomplete="off" /></label>
        <label class="llm-check"><input id="llm-enabled" type="checkbox" checked /> 允許呼叫 LLM</label>
        <div class="heaven-row">
          <button type="submit" class="time-btn">儲存並試寫一場</button>
          <button type="button" class="time-btn" id="llm-cancel">關閉</button>
        </div>
      </form>
    </div>
  </div>
`;var W={qi:U(`#qi-value`),qiRate:U(`#qi-rate`),members:U(`#member-value`),realm:U(`#realm-name`),realmProgress:U(`#realm-progress`),realmProgressLabel:U(`#realm-progress-label`),recruitCost:U(`#recruit-cost`),breakthroughCost:U(`#breakthrough-cost`),breakthroughHint:U(`#breakthrough-hint`),clickYield:U(`#click-yield`),recruitButton:U(`#recruit-button`),breakthroughButton:U(`#breakthrough-button`),gatherButton:U(`#gather-button`),traitList:U(`#trait-list`),emptyTraits:U(`#empty-traits`),logList:U(`#log-list`),modal:U(`#trait-modal`),choices:U(`#trait-choices`),toastRegion:U(`#toast-region`),musicToggle:U(`#music-toggle`),calendar:U(`#calendar-label`),karma:U(`#karma-value`),peak:U(`#peak-realm`),roster:U(`#roster-list`),regions:U(`#region-grid`),inspector:U(`#inspector`),pauseBtn:U(`#pause-btn`),speedBtn:U(`#speed-btn`),pulse:U(`#pulse-badge`),fortune:U(`#fortune-word`),partTitle:U(`#part-title`),partEnglish:U(`#part-english`),partTheme:U(`#part-theme`),writerBadge:U(`#writer-badge`),screenplayList:U(`#screenplay-list`),nextSceneBtn:U(`#next-scene-btn`),llmSettingsBtn:U(`#llm-settings-btn`),llmModal:U(`#llm-modal`),llmForm:U(`#llm-form`),llmBase:U(`#llm-base`),llmModel:U(`#llm-model`),llmKey:U(`#llm-key`),llmEnabled:U(`#llm-enabled`),llmCancel:U(`#llm-cancel`)},G=[{time:k(V),text:`青嵐世家於蒼梧山立下道統。天道臨世，開始觀察族人自行演化。`,tone:`gold`},{time:k(V),text:`沈清梧入藏經閣，葉疏影在山門等人，白無塵已往後山。`,tone:`jade`}];function K(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function q(e,t=``){G.unshift({time:k(V),text:e,tone:t}),G.splice(24),Fe()}function Fe(){W.logList.innerHTML=G.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time.replace(`玄元曆 `,``)}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function J(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`TRIBULATION`:e.type===`heritage`?`BREAKTHROUGH`:`OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail||``}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,W.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function Y(e){for(let t of e)t.text&&q(t.text,t.tone),t.toast?(J(t.toast),z.playEvent(t.toast.type!==`bad`)):t.sfx===!0?z.playEvent(!0):t.sfx===!1&&z.playEvent(!1),t.flash&&B.flashScreen()}function Ie(){W.emptyTraits.hidden=V.traits.length>0,W.traitList.innerHTML=V.traits.map(e=>{let t=f.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function Le(){W.roster.innerHTML=E(V).map(e=>`
    <button type="button" class="roster-card ${e.id===V.selectedId?`is-selected`:``}" data-id="${e.id}">
      <span class="roster-seal" style="border-color:${e.root.hue};color:${e.root.hue}">${e.name.slice(-1)}</span>
      <span>
        <strong>${e.name}${e.role===`patriarch`?` · 老祖`:``}</strong>
        <small>${d[e.realm]} · ${_[e.action].label}</small>
      </span>
      <i>${e.hp}%</i>
    </button>
  `).join(``)}function Re(){W.regions.innerHTML=g.map(e=>{let t=Te(V,e.id).map(e=>`
      <button type="button" class="region-token ${e.id===V.selectedId?`is-on`:``}" data-id="${e.id}" title="${e.name}">
        ${e.name.slice(-1)}
      </button>
    `).join(``);return`
      <article class="region-cell">
        <header><strong>${e.name}</strong><small>${e.hint}</small></header>
        <div class="token-row">${t||`<span class="token-empty">空</span>`}</div>
      </article>
    `}).join(``)}function ze(){let e=re(V);if(!e){W.inspector.innerHTML=`<p class="empty-inspect">山門已空。</p>`;return}let t=e.memory.length?e.memory.map(e=>`<li>${e}</li>`).join(``):`<li>尚無記憶殘片</li>`,n=e.artifacts.length?e.artifacts.join(`、`):`無`;W.inspector.innerHTML=`
    <div class="inspect-name">
      <span class="inspect-seal">${e.name.slice(-1)}</span>
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
      <div><small>人際</small><b>${Ce(e,V)}</b></div>
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
  `}function X(){let e=oe(V),t=V.patriarchRealm>=d.length-1;W.qi.textContent=w(V.qi),W.qiRate.textContent=w(ae(V)),W.members.textContent=`${E(V).length}`,W.realm.textContent=d[V.patriarchRealm],W.realmProgressLabel.textContent=t?`道心圓滿`:`${w(Math.min(V.qi,e))} / ${w(e)}`,W.realmProgress.style.width=t?`100%`:`${Math.min(V.qi/e*100,100)}%`,W.recruitCost.textContent=w(O(V)),W.breakthroughCost.textContent=t?`—`:w(e),W.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${d[V.patriarchRealm+1]}`,W.clickYield.textContent=`+${w(ie(V))}`,W.recruitButton.disabled=V.qi<O(V),W.breakthroughButton.disabled=t||V.qi<e,W.calendar.textContent=k(V),W.karma.textContent=w(V.karma),W.peak.textContent=we(V),W.pulse.textContent=V.paused?`時停`:`演化中`,W.fortune.textContent=V.paused?`時停`:V.karma>40?`昌盛`:V.karma<12?`式微`:`觀察`,W.pauseBtn.textContent=V.paused?`▶ 繼續`:`⏸ 暫停`,W.speedBtn.textContent=`×${V.speed}`}function Be(){let e=P[H.state.part-1];W.partTitle.textContent=e.title,W.partEnglish.textContent=e.english,W.partTheme.textContent=e.theme,W.writerBadge.textContent=H.state.busy?`執筆中…`:H.state.source===`llm`?`LLM 連載`:`劇組代班`,W.writerBadge.title=H.state.error||``,W.screenplayList.innerHTML=H.state.scenes.map(e=>`
    <article class="scene-card">
      <header>
        <small>${K(e.slug)}</small>
        <b>${K(e.title)}</b>
        <i>${e.source===`llm`?`LLM`:`劇組`}</i>
      </header>
      <p>${K(e.narration)}</p>
      ${e.line?`<blockquote>${K(e.line)}</blockquote>`:``}
    </article>
  `).join(``)||`<p class="token-empty">劇本尚未開場。</p>`}function Z(e={}){let t=e.inspect??!0;X(),Le(),Re(),Be(),t&&ze()}function Ve(){let e=f.filter(e=>!V.traits.includes(e.id));return[...e.length>=3?e:f].sort(()=>Math.random()-.5).slice(0,3)}function He(){let e=Ve();W.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),W.modal.classList.add(`visible`),W.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),W.choices.querySelector(`button`)?.focus()}function Ue(e){let t=f.find(t=>t.id===e);t&&(V.traits.includes(e)||V.traits.push(e),W.modal.classList.remove(`visible`),W.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),q(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),J({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),Ie(),Z())}function We(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${w(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function Ge(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function Q(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function Ke(e){e&&(V.selectedId=e,Z())}W.roster.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&Ke(t.dataset.id)}),W.regions.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&Ke(t.dataset.id)}),W.inspector.addEventListener(`click`,e=>{let t=e.target.closest(`[data-heaven]`),n=e.target.closest(`[data-assign]`),r=V.selectedId;if(t){let e=t.dataset.heaven,n=e===`bless`?ye(V,r):e===`tribulate`?be(V,r):Se(V,r);if(!n.ok){q(n.reason||`氣運不足，天道暫時不可妄動。`,`danger`),Z();return}z.playRise(),e===`tribulate`&&Y(n.reports||[]),q(n.text,`gold`),J({type:e===`tribulate`?`heritage`:e===`corrupt`?`bad`:`good`,title:e===`bless`?`天道賜福`:e===`tribulate`?`天劫降臨`:`心魔翻湧`,text:re(V)?.name||``,detail:n.text}),Z();return}if(n){let e=xe(V,r,n.dataset.assign);e.ok?(z.playQing(),q(e.text,`jade`)):q(e.reason||`氣運不足。`,`danger`),Z()}}),W.gatherButton.addEventListener(`click`,e=>{let t=ie(V);V.qi+=t;let{x:n,y:r}=Ge(e);We(n,r,t),B.burst(n,r),z.playQing(),Q(W.gatherButton),X()}),W.recruitButton.addEventListener(`click`,()=>{let e=N(V);e.ok&&(z.playRise(),Q(W.recruitButton),q(`${e.person.name}拜入青嵐，靈根為${e.person.root.name}，性${e.person.nature.name}。`,`jade`),Z())}),W.breakthroughButton.addEventListener(`click`,()=>{let e=ve(V);e.ok&&(z.playRise(),e.flash&&B.flashScreen(),Q(W.breakthroughButton),q(`老祖破境成功，踏入「${e.stage}」！`,`gold`),Z(),window.setTimeout(He,350))}),W.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&Ue(t.dataset.trait)});async function $(e){e&&(q(`【${P[e.part-1].title}／${e.title}】${e.line||e.narration}`,`gold`),Z())}W.nextSceneBtn.addEventListener(`click`,async()=>{W.nextSceneBtn.disabled=!0;let e=await H.writeScene(V,!!H.state.config.baseUrl);W.nextSceneBtn.disabled=!1,await $(e)});function qe(){let e=I();W.llmBase.value=e.baseUrl||``,W.llmModel.value=e.model||`deepseek-chat`,W.llmKey.value=e.apiKey||``,W.llmEnabled.checked=e.enabled!==!1,W.llmModal.classList.add(`visible`),W.llmModal.setAttribute(`aria-hidden`,`false`)}function Je(){W.llmModal.classList.remove(`visible`),W.llmModal.setAttribute(`aria-hidden`,`true`)}W.llmSettingsBtn.addEventListener(`click`,qe),W.llmCancel.addEventListener(`click`,Je),W.llmForm.addEventListener(`submit`,async e=>{e.preventDefault(),Oe({enabled:W.llmEnabled.checked,baseUrl:W.llmBase.value,apiKey:W.llmKey.value,model:W.llmModel.value}),H.reloadConfig(),Je(),await $(await H.writeScene(V,!!W.llmBase.value.trim()))}),W.pauseBtn.addEventListener(`click`,()=>{V.paused=!V.paused,X()}),W.speedBtn.addEventListener(`click`,()=>{V.speed=V.speed===1?3:V.speed===3?8:1,Xe(),X()}),W.musicToggle.addEventListener(`click`,async()=>{let e=await z.setMusic(!z.isMusicOn());W.musicToggle.setAttribute(`aria-pressed`,String(e)),W.musicToggle.classList.toggle(`is-on`,e),W.musicToggle.textContent=e?`🐱 塔菲喵播放中`:`🔇 關注塔菲喵`}),document.addEventListener(`pointerdown`,()=>z.unlock(),{once:!0});var Ye=0;function Xe(){window.clearInterval(Ye),Ye=window.setInterval(()=>{Y(ge(V)),H.onMonth(V).then(e=>{e&&q(`【${P[e.part-1].title}／${e.title}】${e.line||e.narration}`,`gold`),Z({inspect:!W.inspector.matches(`:hover`)})})},Math.round(1600/V.speed))}window.__cultivationFamily={triggerRandomEvent:()=>{Y(_e(V,!0)),Z()},state:V,director:H,tick:()=>{Y(ge(V)),Z()}},Fe(),Ie(),Z(),Xe(),H.writeScene(V,!1).then($);