(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=`BV1kNEP6cEmu`,o=`https://www.bilibili.com/video/${a}`,s=`https://player.bilibili.com/player.html?isOutside=true&aid=116692164354026&bvid=${a}&cid=38858260566&p=1&autoplay=1&muted=0&danmaku=0&high_quality=1&loop=1`;function c(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function l(){let a=null,l=null,u=null,d=null,f=!1,p=null,m=null;function h(){return a||(a=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),l=a.createGain(),l.gain.value=.52,l.connect(a.destination),u=a.createGain(),u.gain.value=.42,u.connect(l),d=c(a,.045),a)}async function g(){h(),a.state===`suspended`&&await a.resume()}function _(e){h();let t=()=>{e()};if(a.state===`suspended`){a.resume().then(t);return}t()}function v(e,t,n,r,i,o,s=0){let c=a.createOscillator(),l=a.createGain();c.type=t,c.frequency.setValueAtTime(e,n),c.detune.setValueAtTime(s,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),c.connect(l),l.connect(o),c.start(n),c.stop(n+r+.02)}function y(){p||(p=document.createElement(`aside`),p.className=`bgm-dock`,p.setAttribute(`aria-label`,`關注塔菲喵背景音樂`),p.innerHTML=`
      <div class="bgm-dock-bar">
        <span>BGM</span>
        <a href="${o}" target="_blank" rel="noreferrer">關注塔菲喵 · 循環歌單</a>
      </div>
    `,m=document.createElement(`iframe`),m.title=`關注塔菲喵 循環歌單`,m.allow=`autoplay; fullscreen; encrypted-media`,m.referrerPolicy=`no-referrer-when-downgrade`,m.setAttribute(`scrolling`,`no`),m.setAttribute(`frameborder`,`0`),m.setAttribute(`allowfullscreen`,`true`),p.append(m),document.body.append(p))}async function b(e){return await g(),f=e,y(),e?(p.classList.add(`is-on`),m.src=s,u.gain.setTargetAtTime(.22,a.currentTime,.05)):(p.classList.remove(`is-on`),m.src=`about:blank`,u.gain.setTargetAtTime(.42,a.currentTime,.05)),f}function x(){_(()=>{let e=a.currentTime;v(1864,`sine`,e,.55,.16,u),v(2489,`sine`,e,.32,.07,u);let t=a.createBufferSource();t.buffer=d;let n=a.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=a.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(u),t.start(e),t.stop(e+.06)})}function S(){_(()=>{let t=a.currentTime;[e,n,r].forEach((e,n)=>{v(e,`sine`,t,.55,.09,u),v(e*1.5,`triangle`,t+.18+n*.04,.5,.07,u),v(e*2,`sine`,t+.38+n*.05,.55,.05,u)})})}function ee(n){_(()=>{let o=a.currentTime;n?(v(r,`sine`,o,.35,.1,u),v(i*2,`sine`,o+.12,.5,.09,u)):(v(e/2,`triangle`,o,.55,.12,u),v(t/2,`sine`,o+.08,.45,.08,u))})}return{unlock:g,setMusic:b,playQing:x,playRise:S,playEvent:ee,isMusicOn:()=>f}}function u(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var d=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],f=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],p=[{id:`metal`,name:`金靈根`,hue:`#d7ae5b`},{id:`wood`,name:`木靈根`,hue:`#77c59c`},{id:`water`,name:`水靈根`,hue:`#7eb4d4`},{id:`fire`,name:`火靈根`,hue:`#d48a6a`},{id:`earth`,name:`土靈根`,hue:`#c4a574`},{id:`heaven`,name:`天靈根`,hue:`#f3d591`},{id:`mixed`,name:`雜靈根`,hue:`#8a9a90`}],m=[{id:`diligent`,name:`勤懇`,weights:{cultivate:3.2,study:1.4,rest:.6,adventure:.5}},{id:`ambitious`,name:`野心`,weights:{cultivate:1.4,adventure:2.4,study:1.2,trade:.8}},{id:`kind`,name:`仁善`,weights:{social:2.6,alchemy:1.3,rest:1.1,adventure:.5}},{id:`pride`,name:`傲骨`,weights:{adventure:2.2,study:1.4,social:.5,trade:.6}},{id:`greed`,name:`貪婪`,weights:{trade:2.8,adventure:1.5,cultivate:.7,social:.6}},{id:`caution`,name:`謹慎`,weights:{rest:1.8,study:1.8,cultivate:1.4,adventure:.35}},{id:`passion`,name:`多情`,weights:{social:3.1,trade:1.1,cultivate:.8,adventure:.7}},{id:`demon`,name:`魔心`,weights:{adventure:2.3,trade:1.3,social:.4,cultivate:1.1}}],h=[`青嵐吐納訣`,`蒼梧劍意`,`雲水心經`,`焚天掌印`,`厚土養氣章`,`百草丹經`,`問雪無痕步`],g=[{id:`nexus`,name:`靈樞`,hint:`吐納`},{id:`peak`,name:`後山`,hint:`歷練`},{id:`alchemy`,name:`丹房`,hint:`煉丹`},{id:`library`,name:`藏經閣`,hint:`參悟`},{id:`gate`,name:`山門`,hint:`論道`},{id:`market`,name:`雲市`,hint:`交易`}],_={cultivate:{label:`吐納修煉`,region:`nexus`},adventure:{label:`後山歷練`,region:`peak`},alchemy:{label:`煉製丹藥`,region:`alchemy`},study:{label:`參悟功法`,region:`library`},social:{label:`論道交心`,region:`gate`},trade:{label:`雲市交易`,region:`market`},rest:{label:`調息養傷`,region:`nexus`}},v=[`青`,`沈`,`葉`,`白`,`蒼`,`嵐`,`蘇`,`江`,`陸`,`謝`,`韓`,`顧`],y=[`玄機`,`清梧`,`疏影`,`無塵`,`小魚`,`七七`,`問雪`,`承光`,`靈犀`,`墨白`,`青棠`,`遠山`,`晚晴`,`折竹`,`聽潮`],b=[`青鋒殘劍`,`避水珠`,`聚氣戒`,`蒼梧令`,`問心鏡`,`焚香爐`,`靈犀簪`],x=[`寅`,`卯`,`辰`,`巳`,`午`,`未`,`申`,`酉`,`戌`,`亥`,`子`,`丑`],S=[{type:`good`,title:`仙草現世`,text:`後山現百年靈芝，靈樞為之一振。`,qi:500},{type:`good`,title:`天作之合`,text:`一門親事說成，香火又盛一分。`,members:1},{type:`good`,title:`高人指點`,text:`雲遊真人路過，留下一縷修行心得。`,qi:280},{type:`good`,title:`靈脈湧動`,text:`地底靈脈復甦，滿院清輝。`,qi:800},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門。`,members:-1},{type:`bad`,title:`走火入魔`,text:`有人修行冒進，心魔趁虛而入。`,qi:-200},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植凋零。`,qi:-350}],ee=1,te=()=>`c${ee++}`,C=e=>e[Math.floor(Math.random()*e.length)],w=(e,t,n)=>Math.max(t,Math.min(n,e)),T=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e),E=(e,t)=>e.traits.includes(t),D=e=>e.people.filter(e=>e.alive),ne=e=>e.people.find(t=>t.id===e.selectedId)||D(e)[0];function O(e){return 90+e*36}function k(e){return 10*(E(e,`diligence`)?2:1)}function re(e){let t=E(e,`heaven-root`)?1.5:1,n=E(e,`jade-bones`)?1.25:1,r=D(e).filter(e=>e.action===`cultivate`).length,i=Math.max(1,D(e).length*.35);return(r*1.8+i)*t*n}function A(e){let t=E(e,`merchant`)?1.2975:1.35,n=E(e,`prosperity`)?.8:1;return Math.round(80*t**Math.max(0,D(e).length-1)*n)}function j(e){return Math.round(500*2.15**e.patriarchRealm)}function M(e){return`玄元曆 ${e.year} 年${x[e.month]}月`}function ie(e){let t=new Set(e.people.map(e=>e.name));for(let e=0;e<40;e+=1){let e=`${C(v)}${C(y)}`;if(!t.has(e))return e}return`${C(v)}${C(y)}${e.people.length}`}function N(e,t={}){let n=t.nature||C(m.filter(e=>e.id!==`demon`||Math.random()>.82)),r=t.root||C(p.slice(0,6).concat(Math.random()>.88?[p[5]]:[p[6]])),i=t.realm??Math.floor(Math.random()*3);return{id:t.id||te(),name:t.name||ie(e),role:t.role||`disciple`,root:r,nature:n,technique:t.technique||C(h),realm:i,personalQi:t.personalQi??Math.round(20+Math.random()*80),age:t.age??16+Math.floor(Math.random()*28),lifespan:t.lifespan??O(i),mood:t.mood??10+Math.floor(Math.random()*30),hp:100,bonds:{},location:t.location||`nexus`,action:t.action||`cultivate`,lockedAction:null,thought:t.thought||`山門初立，心緒未定。`,memory:[],nickname:t.nickname||``,pills:0,artifacts:t.artifacts||[],alive:!0}}function ae(e,t){e.memory.unshift(t),e.memory=e.memory.slice(0,4)}function P(e,t){e.thought=t,ae(e,t)}function oe(e){if(e.hp<42)return`rest`;if(e.lockedAction){let t=e.lockedAction;return e.lockedAction=null,t}let t={...e.nature.weights};e.mood<-20&&(t.rest=(t.rest||1)+1.6),e.personalQi>70+e.realm*18&&(t.cultivate=(t.cultivate||1)+1.2);let n=Object.entries(t),r=n.reduce((e,[,t])=>e+t,0),i=Math.random()*r;for(let[e,t]of n)if(i-=t,i<=0)return e;return`cultivate`}function se(e,t){return D(e).filter(e=>e.id!==t.id)}function F(e,t,n){e.bonds[t.id]=w((e.bonds[t.id]||0)+n,-100,100),t.bonds[e.id]=w((t.bonds[e.id]||0)+n*.85,-100,100)}function ce(e,t){let n=Object.entries(e.bonds);if(!n.length)return`尚無深交`;n.sort((e,t)=>Math.abs(t[1])-Math.abs(e[1]));let[r,i]=n[0],a=t.people.find(e=>e.id===r);return a?i>=35?`與${a.name}交好`:i<=-35?`與${a.name}交惡`:`與${a.name}相識`:`尚無深交`}function le(e,t,n){let r=t.root.id===`heaven`?1.6:t.root.id===`mixed`?.75:1,i=(E(e,`heaven-root`)?1.5:1)*(E(e,`jade-bones`)?1.25:1);if(t.action===`cultivate`){let a=(8+t.realm*3)*r*i;t.personalQi+=a,e.qi+=a*.45,t.mood+=2,Math.random()<.22?P(t,`${t.name}於靈樞吐納，只覺${t.root.name}隱隱共鳴。`):t.thought=`${t.name}閉目調息，一呼一吸皆在青嵐之中。`,t.personalQi>85+t.realm*22&&t.realm<d.length-1&&Math.random()<.28&&I(e,t,n,.62);return}if(t.action===`adventure`){let r=Math.random();if(r<.42){let r=C(b);t.artifacts.includes(r)||t.artifacts.push(r),e.qi+=90,e.karma+=1,P(t,`${t.name}於後山得「${r}」，喜不自勝。`),n.push({text:`${t.name}後山歷練，覓得${r}。`,tone:`jade`}),!t.nickname&&Math.random()<.4&&(t.nickname=C([`青嵐遊俠`,`後山夜行`,`尋寶散人`,`蒼梧獵手`]),n.push({text:`江湖開始稱${t.name}為「${t.nickname}」。`,tone:`gold`}))}else r<.7?(t.hp-=18+Math.floor(Math.random()*16),t.mood-=8,P(t,`${t.name}遇着猛獸機關，帶傷而返。`),n.push({text:`${t.name}歷練受挫，帶傷回山。`,tone:`danger`})):(t.personalQi+=12,P(t,`${t.name}在後山走了一遭，收獲平平，心卻定了些。`));return}if(t.action===`alchemy`){Math.random()<.55?(t.pills+=1,e.qi+=40,P(t,`${t.name}煉成一枚養氣丹，丹香滿室。`),n.push({text:`${t.name}於丹房煉成養氣丹。`,tone:`jade`})):(t.hp-=8,P(t,`${t.name}火候偏差，丹爐一震，只得作罷。`));return}if(t.action===`study`){t.personalQi+=6*r,Math.random()<.18?(t.technique=C(h),P(t,`${t.name}於藏經閣改修《${t.technique}》。`),n.push({text:`${t.name}改修功法《${t.technique}》。`,tone:`gold`})):P(t,`${t.name}反覆推演《${t.technique}》，隱有所得。`);return}if(t.action===`social`){let r=se(e,t);if(!r.length)return;let i=C(r),a=(t.nature.id===`demon`||i.nature.id===`demon`?-18:14)+Math.floor(Math.random()*10)-4;F(t,i,a),a>0?(P(t,`${t.name}與${i.name}月下論道，頗為投契。`),(t.bonds[i.id]||0)>55&&Math.random()<.35&&n.push({text:`${t.name}與${i.name}結為道友，約共證長生。`,tone:`jade`})):(P(t,`${t.name}與${i.name}言語不合，各懷心事。`),(t.bonds[i.id]||0)<-50&&Math.random()<.4&&(t.hp-=12,i.hp-=12,n.push({text:`${t.name}與${i.name}山門內鬥，拳腳相向。`,tone:`danger`})));return}if(t.action===`trade`){let r=Math.round((40+Math.random()*160)*(t.nature.id===`greed`?1.4:1));Math.random()<.18?(e.qi=Math.max(0,e.qi-70),t.mood-=6,P(t,`${t.name}在雲市被人坑了一筆靈石。`),n.push({text:`${t.name}雲市折本而歸。`,tone:`danger`})):(e.qi+=r,e.karma+=+(Math.random()<.25),P(t,`${t.name}以物易物，為家族帶回靈石。`));return}t.hp=w(t.hp+22,0,100),t.mood+=6,t.pills>0&&t.hp<80?(--t.pills,t.hp=w(t.hp+18,0,100),t.personalQi+=8,P(t,`${t.name}服下養氣丹，傷勢漸穩。`)):P(t,`${t.name}靜室調息，把心火慢慢壓了下去。`)}function I(e,t,n,r){if(t.realm>=d.length-1)return!1;let i=t.pills>0?.12:0;if(t.pills>0&&--t.pills,Math.random()<r+i){t.realm+=1,t.personalQi=12,t.lifespan=Math.max(t.lifespan,O(t.realm));let r=d[t.realm];return P(t,`${t.name}突破至「${r}」，天地為之側目。`),n.push({text:`${t.name}破境成功，踏入「${r}」。`,tone:`gold`,flash:/金丹|元嬰/.test(r),toast:{type:`heritage`,title:`族人破境`,text:t.name,detail:r}}),t.role===`patriarch`&&(e.patriarchRealm=t.realm),!0}return t.hp-=24,t.mood-=14,t.personalQi*=.55,P(t,`${t.name}衝擊失敗，經脈隱隱作痛。`),n.push({text:`${t.name}破境失敗，經脈受損。`,tone:`danger`}),!1}function ue(e,t,n){if(e.month===0&&(t.age+=1),t.mood=w(t.mood+(Math.random()*6-3),-80,80),t.hp<=0&&t.role!==`patriarch`){t.alive=!1,P(t,`${t.name}傷重不治，魂歸蒼梧。`),n.push({text:`${t.name}傷重坐化。族譜又添一筆哀榮。`,tone:`danger`,toast:{type:`bad`,title:`族人隕落`,text:t.name,detail:`傷重不治`}});return}t.age>=t.lifespan&&t.role!==`patriarch`&&(t.alive=!1,P(t,`${t.name}壽元將盡，化清風而去。`),n.push({text:`${t.name}壽元耗盡，坐化於${_[t.action]?.label||`山門`}。`,tone:`danger`,toast:{type:`bad`,title:`壽元耗盡`,text:t.name,detail:`${t.age}歲`}})),t.role===`patriarch`&&(t.hp=Math.max(t.hp,35),t.alive=!0)}function de(){let e={qi:680,karma:36,year:146,month:2,patriarchRealm:0,traits:[],people:[],selectedId:`patriarch`,paused:!1,speed:1,omenIn:18};return e.people=[N(e,{id:`patriarch`,name:`青玄機`,role:`patriarch`,root:p[5],nature:m[0],technique:`青嵐吐納訣`,realm:0,age:62,lifespan:180,nickname:`青嵐老祖`,location:`nexus`,action:`cultivate`,thought:`青嵐一脈，當以我為骨。`,artifacts:[`蒼梧令`]}),N(e,{name:`沈清梧`,role:`elder`,root:p[0],nature:m[5],realm:1,age:44,action:`study`,location:`library`}),N(e,{name:`葉疏影`,root:p[1],nature:m[6],realm:0,age:19,action:`social`,location:`gate`}),N(e,{name:`白無塵`,root:p[2],nature:m[3],realm:1,age:27,action:`adventure`,location:`peak`}),N(e,{name:`蒼小魚`,root:p[3],nature:m[1],realm:0,age:17,action:`alchemy`,location:`alchemy`}),N(e,{name:`嵐七七`,root:p[4],nature:m[2],realm:0,age:16,action:`cultivate`,location:`nexus`})],F(e.people[0],e.people[1],28),F(e.people[2],e.people[5],22),F(e.people[3],e.people[4],-12),e}function L(e){let t=[];if(e.paused)return t;e.month=(e.month+1)%12,e.month===0&&(e.year+=1),e.karma=w(e.karma+.35,0,99);for(let n of D(e))n.action=oe(n),n.location=_[n.action].region,le(e,n,t),ue(e,n,t);return--e.omenIn,e.omenIn<=0&&(e.omenIn=8+Math.floor(Math.random()*10),t.push(...R(e,!1))),t}function R(e,t=!1){let n=[];if(!t&&Math.random()>.55)return n.push({text:`天機掠過，此月山門無事。`,tone:``}),n;let r=C(S),i=E(e,`ancestral`)&&r.qi>0?1.5:1;if(r.qi&&(e.qi=Math.max(0,e.qi+r.qi*i)),r.members>0)for(let t=0;t<r.members;t+=1)z(e,!0);if(r.members<0){let t=D(e).filter(e=>e.role!==`patriarch`);if(t.length){let e=C(t);e.hp=Math.max(0,e.hp-55),e.hp<=0&&(e.alive=!1,n.push({text:`夜襲之中，${e.name}為護山門而隕。`,tone:`danger`}))}}let a=r.qi?`靈氣 ${r.qi>0?`+`:``}${T(r.qi*i)}`:r.members>0?`族人 +1`:`山門動盪`;return n.push({text:`${r.title}：${r.text}（${a}）`,tone:r.type===`bad`?`danger`:`jade`,toast:{type:r.type,title:r.title,text:r.text,detail:a},sfx:r.type!==`bad`}),n}function z(e,t=!1){let n=A(e);if(!t){if(e.qi<n)return{ok:!1};e.qi-=n}let r=N(e,{role:`disciple`,age:15+Math.floor(Math.random()*12),realm:0});return e.people.push(r),e.selectedId=r.id,P(r,`${r.name}拜入青嵐，眼底還有凡塵未褪。`),{ok:!0,person:r}}function fe(e){let t=j(e),n=e.people.find(e=>e.role===`patriarch`);if(!n||e.qi<t||e.patriarchRealm>=d.length-1)return{ok:!1};e.qi-=t,e.patriarchRealm+=1,n.realm=e.patriarchRealm,n.personalQi=20,n.lifespan=Math.max(n.lifespan,O(n.realm));let r=d[e.patriarchRealm];return P(n,`老祖青玄機突破至「${r}」，青嵐氣運陡然一振。`),{ok:!0,stage:r,flash:/金丹|元嬰/.test(r)}}function pe(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<8?{ok:!1,reason:`氣運不足`}:(e.karma-=8,n.mood+=24,n.hp=w(n.hp+20,0,100),n.personalQi+=28,P(n,`天道賜福於${n.name}，周身金光一閃，心魔暫退。`),{ok:!0,text:`天道賜福「${n.name}」，傷勢與道心皆有進益。`})}function me(e,t){let n=e.people.find(e=>e.id===t&&e.alive);if(!n||e.karma<12)return{ok:!1,reason:`氣運不足`};e.karma-=12;let r=[];return I(e,n,r,.48),{ok:!0,reports:r,text:`天劫劈向${n.name}。`}}function he(e,t,n){let r=e.people.find(e=>e.id===t&&e.alive);return!r||e.karma<3?{ok:!1,reason:`氣運不足`}:_[n]?(e.karma-=3,r.lockedAction=n,r.action=n,r.location=_[n].region,P(r,`天道令${r.name}去「${_[n].label}」，不敢不從。`),{ok:!0,text:`已令${r.name}改行「${_[n].label}」。`}):{ok:!1,reason:`無此律令`}}function ge(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<10?{ok:!1,reason:`氣運不足`}:(e.karma-=10,n.nature=n.nature.id===`demon`?C(m.filter(e=>e.id!==`demon`)):m.find(e=>e.id===`demon`),n.mood-=10,P(n,n.nature.id===`demon`?`${n.name}心魔大盛，眸中多了一絲戾氣。`:`${n.name}心魔被強行剝去，整個人空了一截。`),{ok:!0,text:`${n.name}性情轉為「${n.nature.name}」。`})}function _e(e,t){return ce(e,t)}function ve(e){return d[D(e).reduce((e,t)=>e.realm>=t.realm?e:t).realm]}function ye(e,t){return D(e).filter(e=>e.location===t)}var B=l(),V=u(),H=de(),U=e=>document.querySelector(e);document.querySelector(`#app`).innerHTML=`
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
        <span class="eyebrow">蒼梧山 · 你是天道的影子</span>
        <h1>靜觀族人自行演化，<em>或降下賜福與天劫</em></h1>
        <p>每位弟子都有靈根、性格、壽元與私心。他們會自己修煉、結怨、煉丹、闖蕩；你不必當劍修，只要執掌氣運。</p>
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
`;var W={qi:U(`#qi-value`),qiRate:U(`#qi-rate`),members:U(`#member-value`),realm:U(`#realm-name`),realmProgress:U(`#realm-progress`),realmProgressLabel:U(`#realm-progress-label`),recruitCost:U(`#recruit-cost`),breakthroughCost:U(`#breakthrough-cost`),breakthroughHint:U(`#breakthrough-hint`),clickYield:U(`#click-yield`),recruitButton:U(`#recruit-button`),breakthroughButton:U(`#breakthrough-button`),gatherButton:U(`#gather-button`),traitList:U(`#trait-list`),emptyTraits:U(`#empty-traits`),logList:U(`#log-list`),modal:U(`#trait-modal`),choices:U(`#trait-choices`),toastRegion:U(`#toast-region`),musicToggle:U(`#music-toggle`),calendar:U(`#calendar-label`),karma:U(`#karma-value`),peak:U(`#peak-realm`),roster:U(`#roster-list`),regions:U(`#region-grid`),inspector:U(`#inspector`),pauseBtn:U(`#pause-btn`),speedBtn:U(`#speed-btn`),pulse:U(`#pulse-badge`),fortune:U(`#fortune-word`)},G=[{time:M(H),text:`青嵐世家於蒼梧山立下道統。天道臨世，開始觀察族人自行演化。`,tone:`gold`},{time:M(H),text:`沈清梧入藏經閣，葉疏影在山門等人，白無塵已往後山。`,tone:`jade`}];function K(e,t=``){G.unshift({time:M(H),text:e,tone:t}),G.splice(24),be()}function be(){W.logList.innerHTML=G.map(e=>`
    <div class="log-entry ${e.tone}">
      <time>${e.time.replace(`玄元曆 `,``)}</time>
      <span>${e.text}</span>
    </div>
  `).join(``)}function q(e){let t=document.createElement(`div`);t.className=`event-toast ${e.type}`,t.innerHTML=`
    <span class="toast-icon">${e.type===`bad`?`厄`:e.type===`heritage`?`脈`:`吉`}</span>
    <div>
      <small>${e.type===`bad`?`TRIBULATION`:e.type===`heritage`?`BREAKTHROUGH`:`OMEN`}</small>
      <strong>${e.title}</strong>
      <p>${e.text} <b>${e.detail||``}</b></p>
    </div>
    <span class="toast-timer"></span>
  `,W.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function J(e){for(let t of e)t.text&&K(t.text,t.tone),t.toast?(q(t.toast),B.playEvent(t.toast.type!==`bad`)):t.sfx===!0?B.playEvent(!0):t.sfx===!1&&B.playEvent(!1),t.flash&&V.flashScreen()}function Y(){W.emptyTraits.hidden=H.traits.length>0,W.traitList.innerHTML=H.traits.map(e=>{let t=f.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function xe(){W.roster.innerHTML=D(H).map(e=>`
    <button type="button" class="roster-card ${e.id===H.selectedId?`is-selected`:``}" data-id="${e.id}">
      <span class="roster-seal" style="border-color:${e.root.hue};color:${e.root.hue}">${e.name.slice(-1)}</span>
      <span>
        <strong>${e.name}${e.role===`patriarch`?` · 老祖`:``}</strong>
        <small>${d[e.realm]} · ${_[e.action].label}</small>
      </span>
      <i>${e.hp}%</i>
    </button>
  `).join(``)}function Se(){W.regions.innerHTML=g.map(e=>{let t=ye(H,e.id).map(e=>`
      <button type="button" class="region-token ${e.id===H.selectedId?`is-on`:``}" data-id="${e.id}" title="${e.name}">
        ${e.name.slice(-1)}
      </button>
    `).join(``);return`
      <article class="region-cell">
        <header><strong>${e.name}</strong><small>${e.hint}</small></header>
        <div class="token-row">${t||`<span class="token-empty">空</span>`}</div>
      </article>
    `}).join(``)}function Ce(){let e=ne(H);if(!e){W.inspector.innerHTML=`<p class="empty-inspect">山門已空。</p>`;return}let t=e.memory.length?e.memory.map(e=>`<li>${e}</li>`).join(``):`<li>尚無記憶殘片</li>`,n=e.artifacts.length?e.artifacts.join(`、`):`無`;W.inspector.innerHTML=`
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
      <div><small>人際</small><b>${_e(e,H)}</b></div>
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
  `}function X(){let e=j(H),t=H.patriarchRealm>=d.length-1;W.qi.textContent=T(H.qi),W.qiRate.textContent=T(re(H)),W.members.textContent=`${D(H).length}`,W.realm.textContent=d[H.patriarchRealm],W.realmProgressLabel.textContent=t?`道心圓滿`:`${T(Math.min(H.qi,e))} / ${T(e)}`,W.realmProgress.style.width=t?`100%`:`${Math.min(H.qi/e*100,100)}%`,W.recruitCost.textContent=T(A(H)),W.breakthroughCost.textContent=t?`—`:T(e),W.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${d[H.patriarchRealm+1]}`,W.clickYield.textContent=`+${T(k(H))}`,W.recruitButton.disabled=H.qi<A(H),W.breakthroughButton.disabled=t||H.qi<e,W.calendar.textContent=M(H),W.karma.textContent=T(H.karma),W.peak.textContent=ve(H),W.pulse.textContent=H.paused?`時停`:`演化中`,W.fortune.textContent=H.paused?`時停`:H.karma>40?`昌盛`:H.karma<12?`式微`:`觀察`,W.pauseBtn.textContent=H.paused?`▶ 繼續`:`⏸ 暫停`,W.speedBtn.textContent=`×${H.speed}`}function Z(e={}){let t=e.inspect??!0;X(),xe(),Se(),t&&Ce()}function we(){let e=f.filter(e=>!H.traits.includes(e.id));return[...e.length>=3?e:f].sort(()=>Math.random()-.5).slice(0,3)}function Te(){let e=we();W.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),W.modal.classList.add(`visible`),W.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),W.choices.querySelector(`button`)?.focus()}function Ee(e){let t=f.find(t=>t.id===e);t&&(H.traits.includes(e)||H.traits.push(e),W.modal.classList.remove(`visible`),W.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),K(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),q({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),Y(),Z())}function De(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${T(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function Oe(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function Q(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function ke(e){e&&(H.selectedId=e,Z())}W.roster.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&ke(t.dataset.id)}),W.regions.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&ke(t.dataset.id)}),W.inspector.addEventListener(`click`,e=>{let t=e.target.closest(`[data-heaven]`),n=e.target.closest(`[data-assign]`),r=H.selectedId;if(t){let e=t.dataset.heaven,n=e===`bless`?pe(H,r):e===`tribulate`?me(H,r):ge(H,r);if(!n.ok){K(n.reason||`氣運不足，天道暫時不可妄動。`,`danger`),Z();return}B.playRise(),e===`tribulate`&&J(n.reports||[]),K(n.text,`gold`),q({type:e===`tribulate`?`heritage`:e===`corrupt`?`bad`:`good`,title:e===`bless`?`天道賜福`:e===`tribulate`?`天劫降臨`:`心魔翻湧`,text:ne(H)?.name||``,detail:n.text}),Z();return}if(n){let e=he(H,r,n.dataset.assign);e.ok?(B.playQing(),K(e.text,`jade`)):K(e.reason||`氣運不足。`,`danger`),Z()}}),W.gatherButton.addEventListener(`click`,e=>{let t=k(H);H.qi+=t;let{x:n,y:r}=Oe(e);De(n,r,t),V.burst(n,r),B.playQing(),Q(W.gatherButton),X()}),W.recruitButton.addEventListener(`click`,()=>{let e=z(H);e.ok&&(B.playRise(),Q(W.recruitButton),K(`${e.person.name}拜入青嵐，靈根為${e.person.root.name}，性${e.person.nature.name}。`,`jade`),Z())}),W.breakthroughButton.addEventListener(`click`,()=>{let e=fe(H);e.ok&&(B.playRise(),e.flash&&V.flashScreen(),Q(W.breakthroughButton),K(`老祖破境成功，踏入「${e.stage}」！`,`gold`),Z(),window.setTimeout(Te,350))}),W.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&Ee(t.dataset.trait)}),W.pauseBtn.addEventListener(`click`,()=>{H.paused=!H.paused,X()}),W.speedBtn.addEventListener(`click`,()=>{H.speed=H.speed===1?3:H.speed===3?8:1,$(),X()}),W.musicToggle.addEventListener(`click`,async()=>{let e=await B.setMusic(!B.isMusicOn());W.musicToggle.setAttribute(`aria-pressed`,String(e)),W.musicToggle.classList.toggle(`is-on`,e),W.musicToggle.textContent=e?`🐱 塔菲喵播放中`:`🔇 關注塔菲喵`}),document.addEventListener(`pointerdown`,()=>B.unlock(),{once:!0});var Ae=0;function $(){window.clearInterval(Ae),Ae=window.setInterval(()=>{J(L(H)),Z({inspect:!W.inspector.matches(`:hover`)})},Math.round(1600/H.speed))}window.__cultivationFamily={triggerRandomEvent:()=>{J(R(H,!0)),Z()},state:H,tick:()=>{J(L(H)),Z()}},be(),Y(),Z(),$();