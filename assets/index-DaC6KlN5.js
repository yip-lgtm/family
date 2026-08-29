(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=261.63,t=293.66,n=329.63,r=392,i=440,a=e=>440*2**((e-69)/12),o=.5,s=32,c=[[0,37,8,.2,`bass`],[8,42,8,.18,`bass`],[16,44,8,.18,`bass`],[24,41,8,.17,`bass`],[0,56,2,.09,`piano`],[2,60,2,.08,`piano`],[4,65,2,.09,`piano`],[6,68,2,.07,`piano`],[8,58,2,.09,`piano`],[10,61,2,.08,`piano`],[12,65,2,.09,`piano`],[14,70,2,.07,`piano`],[16,60,2,.09,`piano`],[18,63,2,.08,`piano`],[20,68,2,.09,`piano`],[22,70,2,.07,`piano`],[24,56,2,.09,`piano`],[26,60,2,.08,`piano`],[28,63,2,.08,`piano`],[30,67,2,.07,`piano`],[4,65,4,.16,`lead`],[8,63,2,.14,`lead`],[10,61,2,.13,`lead`],[12,68,6,.15,`lead`],[20,77,2,.17,`lead`],[22,75,2,.16,`lead`],[24,80,1,.15,`lead`],[25,82,1,.15,`lead`],[26,77,5,.16,`lead`],[14,84,1,.07,`bell`],[15,80,1,.06,`bell`],[16,77,2,.06,`bell`]],l=Array.from({length:s},()=>[]);for(let e of c)l[e[0]].push(e);function u(e,t=.08){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e+=1)i[e]=(Math.random()*2-1)*(1-e/n);return r}function d(){let c=null,d=null,f=null,p=null,m=null,h=[],g=null,_=null,v=0,y=0,b=0,x=0,S=!1;function C(){return c||(c=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`}),d=c.createGain(),d.gain.value=.52,d.connect(c.destination),f=c.createGain(),f.gain.value=0,p=c.createBiquadFilter(),p.type=`lowpass`,p.frequency.value=1750,p.Q.value=.45,f.connect(p),p.connect(d),m=c.createGain(),m.gain.value=.42,m.connect(d),g=u(c,.05),_=u(c,.045),c)}async function w(){C(),c.state===`suspended`&&await c.resume()}function T(e){C();let t=()=>{e()};if(c.state===`suspended`){c.resume().then(t);return}t()}function E(e,t,n,r,i,a,o=0){let s=c.createOscillator(),l=c.createGain();s.type=t,s.frequency.setValueAtTime(e,n),s.detune.setValueAtTime(o,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.03),l.gain.exponentialRampToValueAtTime(1e-4,n+r),s.connect(l),l.connect(a),s.start(n),s.stop(n+r+.02)}function D(e,t,n,r,i){let a=c.createBiquadFilter();a.type=`lowpass`,a.frequency.setValueAtTime(i===`bass`?780:i===`bell`?3400:2200,t),a.frequency.exponentialRampToValueAtTime(i===`bass`?420:1100,t+n),a.connect(f);let o=c.createBufferSource();o.buffer=g;let s=c.createBiquadFilter();s.type=`bandpass`,s.frequency.value=Math.min(e*2.2,2800),s.Q.value=1.6;let l=c.createGain(),u=r*(i===`bass`?.06:i===`bell`?.12:.16);l.gain.setValueAtTime(u,t),l.gain.exponentialRampToValueAtTime(1e-4,t+.035),o.connect(s),s.connect(l),l.connect(a),o.start(t),o.stop(t+.045),(i===`bass`?[[1,1],[2,.2],[3,.07]]:i===`bell`?[[1,.72],[2.003,.28],[4.01,.08]]:[[1,1],[2,.26],[3.01,.09],[4.04,.035]]).forEach(([i,o],s)=>{let l=c.createOscillator(),u=c.createGain();l.type=`sine`,l.frequency.setValueAtTime(e*i,t),l.detune.setValueAtTime(s===1?3:s===2?-2:0,t);let d=Math.max(2e-4,r*o);u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(d,t+.014),u.gain.exponentialRampToValueAtTime(d*.42,t+Math.min(.55,n*.35)),u.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(u),u.connect(a),l.start(t),l.stop(t+n+.04)})}function O(){h.length||[[a(49),.016,0],[a(56),.01,6],[a(61),.007,-5]].forEach(([e,t,n])=>{let r=c.createOscillator(),i=c.createGain(),a=c.createOscillator(),o=c.createGain();r.type=`sine`,r.frequency.value=e,r.detune.value=n,i.gain.value=t,a.frequency.value=.07,o.gain.value=t*.35,a.connect(o),o.connect(i.gain),r.connect(i),i.connect(f),r.start(),a.start(),h.push(r,a,i)})}function k(){h.forEach(e=>{try{typeof e.stop==`function`&&e.stop()}catch{}try{e.disconnect()}catch{}}),h=[]}function A(){if(!S||!c)return;let e=c.currentTime;for(;y<e+1.6;){let e=b%s;for(let[,t,n,r,i]of l[e])D(a(t),y,n*o+.35,r,i);y+=o,b+=1}}function j(e){e===x&&(A(),v=window.setTimeout(()=>j(e),180))}async function M(e){if(await w(),S=e,x+=1,window.clearTimeout(v),e){let e=x;O(),b=0,y=c.currentTime+.08,f.gain.cancelScheduledValues(c.currentTime),f.gain.setValueAtTime(Math.max(f.gain.value,1e-4),c.currentTime),f.gain.exponentialRampToValueAtTime(.2,c.currentTime+1.1),j(e)}else f.gain.cancelScheduledValues(c.currentTime),f.gain.setValueAtTime(Math.max(f.gain.value,1e-4),c.currentTime),f.gain.exponentialRampToValueAtTime(1e-4,c.currentTime+.5),window.setTimeout(k,520);return S}function N(){T(()=>{let e=c.currentTime;E(1864,`sine`,e,.55,.16,m),E(2489,`sine`,e,.32,.07,m);let t=c.createBufferSource();t.buffer=_;let n=c.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1400,n.Q.value=2.4;let r=c.createGain();r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.05),t.connect(n),n.connect(r),r.connect(m),t.start(e),t.stop(e+.06)})}function P(){T(()=>{let t=c.currentTime;[e,n,r].forEach((e,n)=>{E(e,`sine`,t,.55,.09,m),E(e*1.5,`triangle`,t+.18+n*.04,.5,.07,m),E(e*2,`sine`,t+.38+n*.05,.55,.05,m)})})}function ee(n){T(()=>{let a=c.currentTime;n?(E(r,`sine`,a,.35,.1,m),E(i*2,`sine`,a+.12,.5,.09,m)):(E(e/2,`triangle`,a,.55,.12,m),E(t/2,`sine`,a+.08,.45,.08,m))})}return{unlock:w,setMusic:M,playQing:N,playRise:P,playEvent:ee,isMusicOn:()=>S}}function f(){let e=document.createElement(`canvas`);e.id=`qi-canvas`,e.setAttribute(`aria-hidden`,`true`),document.body.prepend(e);let t=e.getContext(`2d`,{alpha:!0}),n=document.createElement(`div`);n.className=`screen-flash`,n.setAttribute(`aria-hidden`,`true`),document.body.append(n);let r=[],i=[],a=0,o=0,s=0;function c(){let n=Math.min(window.devicePixelRatio||1,2);a=window.innerWidth,o=window.innerHeight,e.width=Math.floor(a*n),e.height=Math.floor(o*n),e.style.width=`${a}px`,e.style.height=`${o}px`,t.setTransform(n,0,0,n,0,0)}function l(){r.push({x:Math.random()*a,y:o+8,vx:(Math.random()-.5)*.18,vy:-.18-Math.random()*.35,life:1,decay:6e-4+Math.random()*8e-4,size:1.1+Math.random()*2.4,gold:Math.random()>.45})}function u(e,t){for(let n=0;n<36;n+=1){let r=Math.PI*2*n/36+Math.random()*.22,a=1.6+Math.random()*3.6;i.push({x:e,y:t,vx:Math.cos(r)*a,vy:Math.sin(r)*a,life:1,size:1.6+Math.random()*2.8,gold:n%2==0})}i.push({x:e,y:t,vx:0,vy:0,life:1,size:12,ring:!0}),i.push({x:e,y:t,vx:0,vy:0,life:.85,size:6,ring:!0})}function d(){n.classList.remove(`is-on`),n.offsetWidth,n.classList.add(`is-on`),window.setTimeout(()=>n.classList.remove(`is-on`),720)}function f(e){let n=Math.min(32,e-s||16);s=e,t.clearRect(0,0,a,o),r.length<78&&Math.random()>.32&&l();for(let e=r.length-1;e>=0;--e){let i=r[e];if(i.x+=i.vx*n,i.y+=i.vy*n,i.life-=i.decay*n,i.life<=0||i.y<-12){r.splice(e,1);continue}t.beginPath(),t.fillStyle=i.gold?`rgba(212, 175, 55, ${.22*i.life})`:`rgba(120, 210, 190, ${.2*i.life})`,t.arc(i.x,i.y,i.size,0,Math.PI*2),t.fill()}for(let e=i.length-1;e>=0;--e){let r=i[e];r.x+=r.vx*(n*.08),r.y+=r.vy*(n*.08),r.life-=n*.08*.018+.012,r.ring?(r.size+=n*.2,t.beginPath(),t.strokeStyle=`rgba(243, 213, 145, ${.5*r.life})`,t.lineWidth=2,t.arc(r.x,r.y,r.size,0,Math.PI*2),t.stroke()):(t.beginPath(),t.fillStyle=r.gold?`rgba(243, 213, 145, ${.9*r.life})`:`rgba(168, 228, 189, ${.85*r.life})`,t.arc(r.x,r.y,r.size*r.life,0,Math.PI*2),t.fill()),r.life<=0&&i.splice(e,1)}requestAnimationFrame(f)}return c(),window.addEventListener(`resize`,c),requestAnimationFrame(f),{burst:u,flashScreen:d}}var p=[`煉氣初期`,`煉氣中期`,`煉氣後期`,`築基初期`,`築基中期`,`築基後期`,`金丹初期`,`金丹中期`,`金丹後期`,`元嬰初期`],m=[{id:`prosperity`,icon:`囍`,name:`多子多福`,english:`Abundant Descendants`,description:`招募族人消耗降低 20%`,modifier:`Recruit cost −20%`},{id:`heaven-root`,icon:`靈`,name:`天靈根血脈`,english:`Heavenly Spirit Root`,description:`每位族人的基礎靈氣產量提升 50%`,modifier:`Member Qi +50%`},{id:`diligence`,icon:`勤`,name:`勤能補拙`,english:`Diligence Prevails`,description:`閉關修煉獲得雙倍靈氣`,modifier:`Gather Qi ×2`},{id:`jade-bones`,icon:`玉`,name:`冰肌玉骨`,english:`Jade-Boned Lineage`,description:`全族靈氣產量提升 25%`,modifier:`All Qi +25%`},{id:`merchant`,icon:`寶`,name:`奇貨可居`,english:`Spirit Merchant`,description:`招募費用增長速度降低 15%`,modifier:`Cost scaling −15%`},{id:`ancestral`,icon:`祖`,name:`先祖庇佑`,english:`Ancestor’s Blessing`,description:`突發事件的靈氣收益提升 50%`,modifier:`Event rewards +50%`}],h=[{id:`metal`,name:`金靈根`,hue:`#d7ae5b`},{id:`wood`,name:`木靈根`,hue:`#77c59c`},{id:`water`,name:`水靈根`,hue:`#7eb4d4`},{id:`fire`,name:`火靈根`,hue:`#d48a6a`},{id:`earth`,name:`土靈根`,hue:`#c4a574`},{id:`heaven`,name:`天靈根`,hue:`#f3d591`},{id:`mixed`,name:`雜靈根`,hue:`#8a9a90`}],g=[{id:`diligent`,name:`勤懇`,weights:{cultivate:3.2,study:1.4,rest:.6,adventure:.5}},{id:`ambitious`,name:`野心`,weights:{cultivate:1.4,adventure:2.4,study:1.2,trade:.8}},{id:`kind`,name:`仁善`,weights:{social:2.6,alchemy:1.3,rest:1.1,adventure:.5}},{id:`pride`,name:`傲骨`,weights:{adventure:2.2,study:1.4,social:.5,trade:.6}},{id:`greed`,name:`貪婪`,weights:{trade:2.8,adventure:1.5,cultivate:.7,social:.6}},{id:`caution`,name:`謹慎`,weights:{rest:1.8,study:1.8,cultivate:1.4,adventure:.35}},{id:`passion`,name:`多情`,weights:{social:3.1,trade:1.1,cultivate:.8,adventure:.7}},{id:`demon`,name:`魔心`,weights:{adventure:2.3,trade:1.3,social:.4,cultivate:1.1}}],_=[`青嵐吐納訣`,`蒼梧劍意`,`雲水心經`,`焚天掌印`,`厚土養氣章`,`百草丹經`,`問雪無痕步`],v=[{id:`nexus`,name:`靈樞`,hint:`吐納`},{id:`peak`,name:`後山`,hint:`歷練`},{id:`alchemy`,name:`丹房`,hint:`煉丹`},{id:`library`,name:`藏經閣`,hint:`參悟`},{id:`gate`,name:`山門`,hint:`論道`},{id:`market`,name:`雲市`,hint:`交易`}],y={cultivate:{label:`吐納修煉`,region:`nexus`},adventure:{label:`後山歷練`,region:`peak`},alchemy:{label:`煉製丹藥`,region:`alchemy`},study:{label:`參悟功法`,region:`library`},social:{label:`論道交心`,region:`gate`},trade:{label:`雲市交易`,region:`market`},rest:{label:`調息養傷`,region:`nexus`}},b=[`青`,`沈`,`葉`,`白`,`蒼`,`嵐`,`蘇`,`江`,`陸`,`謝`,`韓`,`顧`],x=[`玄機`,`清梧`,`疏影`,`無塵`,`小魚`,`七七`,`問雪`,`承光`,`靈犀`,`墨白`,`青棠`,`遠山`,`晚晴`,`折竹`,`聽潮`],S=[`青鋒殘劍`,`避水珠`,`聚氣戒`,`蒼梧令`,`問心鏡`,`焚香爐`,`靈犀簪`],C=[`寅`,`卯`,`辰`,`巳`,`午`,`未`,`申`,`酉`,`戌`,`亥`,`子`,`丑`],w=[{type:`good`,title:`仙草現世`,text:`後山現百年靈芝，靈樞為之一振。`,qi:500},{type:`good`,title:`天作之合`,text:`一門親事說成，香火又盛一分。`,members:1},{type:`good`,title:`高人指點`,text:`雲遊真人路過，留下一縷修行心得。`,qi:280},{type:`good`,title:`靈脈湧動`,text:`地底靈脈復甦，滿院清輝。`,qi:800},{type:`bad`,title:`外敵來襲`,text:`敵對家族夜襲山門。`,members:-1},{type:`bad`,title:`走火入魔`,text:`有人修行冒進，心魔趁虛而入。`,qi:-200},{type:`bad`,title:`靈田歉收`,text:`山中寒潮突至，靈植凋零。`,qi:-350}],T=1,E=()=>`c${T++}`,D=e=>e[Math.floor(Math.random()*e.length)],O=(e,t,n)=>Math.max(t,Math.min(n,e)),k=e=>new Intl.NumberFormat(`zh-Hant`,{maximumFractionDigits:+(e<100)}).format(e),A=(e,t)=>e.traits.includes(t),j=e=>e.people.filter(e=>e.alive),M=e=>e.people.find(t=>t.id===e.selectedId)||j(e)[0];function N(e){return 90+e*36}function P(e){return 10*(A(e,`diligence`)?2:1)}function ee(e){let t=A(e,`heaven-root`)?1.5:1,n=A(e,`jade-bones`)?1.25:1,r=j(e).filter(e=>e.action===`cultivate`).length,i=Math.max(1,j(e).length*.35);return(r*1.8+i)*t*n}function F(e){let t=A(e,`merchant`)?1.2975:1.35,n=A(e,`prosperity`)?.8:1;return Math.round(80*t**Math.max(0,j(e).length-1)*n)}function te(e){return Math.round(500*2.15**e.patriarchRealm)}function I(e){return`玄元曆 ${e.year} 年${C[e.month]}月`}function ne(e){let t=new Set(e.people.map(e=>e.name));for(let e=0;e<40;e+=1){let e=`${D(b)}${D(x)}`;if(!t.has(e))return e}return`${D(b)}${D(x)}${e.people.length}`}function L(e,t={}){let n=t.nature||D(g.filter(e=>e.id!==`demon`||Math.random()>.82)),r=t.root||D(h.slice(0,6).concat(Math.random()>.88?[h[5]]:[h[6]])),i=t.realm??Math.floor(Math.random()*3);return{id:t.id||E(),name:t.name||ne(e),role:t.role||`disciple`,root:r,nature:n,technique:t.technique||D(_),realm:i,personalQi:t.personalQi??Math.round(20+Math.random()*80),age:t.age??16+Math.floor(Math.random()*28),lifespan:t.lifespan??N(i),mood:t.mood??10+Math.floor(Math.random()*30),hp:100,bonds:{},location:t.location||`nexus`,action:t.action||`cultivate`,lockedAction:null,thought:t.thought||`山門初立，心緒未定。`,memory:[],nickname:t.nickname||``,pills:0,artifacts:t.artifacts||[],alive:!0}}function re(e,t){e.memory.unshift(t),e.memory=e.memory.slice(0,4)}function R(e,t){e.thought=t,re(e,t)}function ie(e){if(e.hp<42)return`rest`;if(e.lockedAction){let t=e.lockedAction;return e.lockedAction=null,t}let t={...e.nature.weights};e.mood<-20&&(t.rest=(t.rest||1)+1.6),e.personalQi>70+e.realm*18&&(t.cultivate=(t.cultivate||1)+1.2);let n=Object.entries(t),r=n.reduce((e,[,t])=>e+t,0),i=Math.random()*r;for(let[e,t]of n)if(i-=t,i<=0)return e;return`cultivate`}function ae(e,t){return j(e).filter(e=>e.id!==t.id)}function z(e,t,n){e.bonds[t.id]=O((e.bonds[t.id]||0)+n,-100,100),t.bonds[e.id]=O((t.bonds[e.id]||0)+n*.85,-100,100)}function oe(e,t){let n=Object.entries(e.bonds);if(!n.length)return`尚無深交`;n.sort((e,t)=>Math.abs(t[1])-Math.abs(e[1]));let[r,i]=n[0],a=t.people.find(e=>e.id===r);return a?i>=35?`與${a.name}交好`:i<=-35?`與${a.name}交惡`:`與${a.name}相識`:`尚無深交`}function se(e,t,n){let r=t.root.id===`heaven`?1.6:t.root.id===`mixed`?.75:1,i=(A(e,`heaven-root`)?1.5:1)*(A(e,`jade-bones`)?1.25:1);if(t.action===`cultivate`){let a=(8+t.realm*3)*r*i;t.personalQi+=a,e.qi+=a*.45,t.mood+=2,Math.random()<.22?R(t,`${t.name}於靈樞吐納，只覺${t.root.name}隱隱共鳴。`):t.thought=`${t.name}閉目調息，一呼一吸皆在青嵐之中。`,t.personalQi>85+t.realm*22&&t.realm<p.length-1&&Math.random()<.28&&B(e,t,n,.62);return}if(t.action===`adventure`){let r=Math.random();if(r<.42){let r=D(S);t.artifacts.includes(r)||t.artifacts.push(r),e.qi+=90,e.karma+=1,R(t,`${t.name}於後山得「${r}」，喜不自勝。`),n.push({text:`${t.name}後山歷練，覓得${r}。`,tone:`jade`}),!t.nickname&&Math.random()<.4&&(t.nickname=D([`青嵐遊俠`,`後山夜行`,`尋寶散人`,`蒼梧獵手`]),n.push({text:`江湖開始稱${t.name}為「${t.nickname}」。`,tone:`gold`}))}else r<.7?(t.hp-=18+Math.floor(Math.random()*16),t.mood-=8,R(t,`${t.name}遇着猛獸機關，帶傷而返。`),n.push({text:`${t.name}歷練受挫，帶傷回山。`,tone:`danger`})):(t.personalQi+=12,R(t,`${t.name}在後山走了一遭，收獲平平，心卻定了些。`));return}if(t.action===`alchemy`){Math.random()<.55?(t.pills+=1,e.qi+=40,R(t,`${t.name}煉成一枚養氣丹，丹香滿室。`),n.push({text:`${t.name}於丹房煉成養氣丹。`,tone:`jade`})):(t.hp-=8,R(t,`${t.name}火候偏差，丹爐一震，只得作罷。`));return}if(t.action===`study`){t.personalQi+=6*r,Math.random()<.18?(t.technique=D(_),R(t,`${t.name}於藏經閣改修《${t.technique}》。`),n.push({text:`${t.name}改修功法《${t.technique}》。`,tone:`gold`})):R(t,`${t.name}反覆推演《${t.technique}》，隱有所得。`);return}if(t.action===`social`){let r=ae(e,t);if(!r.length)return;let i=D(r),a=(t.nature.id===`demon`||i.nature.id===`demon`?-18:14)+Math.floor(Math.random()*10)-4;z(t,i,a),a>0?(R(t,`${t.name}與${i.name}月下論道，頗為投契。`),(t.bonds[i.id]||0)>55&&Math.random()<.35&&n.push({text:`${t.name}與${i.name}結為道友，約共證長生。`,tone:`jade`})):(R(t,`${t.name}與${i.name}言語不合，各懷心事。`),(t.bonds[i.id]||0)<-50&&Math.random()<.4&&(t.hp-=12,i.hp-=12,n.push({text:`${t.name}與${i.name}山門內鬥，拳腳相向。`,tone:`danger`})));return}if(t.action===`trade`){let r=Math.round((40+Math.random()*160)*(t.nature.id===`greed`?1.4:1));Math.random()<.18?(e.qi=Math.max(0,e.qi-70),t.mood-=6,R(t,`${t.name}在雲市被人坑了一筆靈石。`),n.push({text:`${t.name}雲市折本而歸。`,tone:`danger`})):(e.qi+=r,e.karma+=+(Math.random()<.25),R(t,`${t.name}以物易物，為家族帶回靈石。`));return}t.hp=O(t.hp+22,0,100),t.mood+=6,t.pills>0&&t.hp<80?(--t.pills,t.hp=O(t.hp+18,0,100),t.personalQi+=8,R(t,`${t.name}服下養氣丹，傷勢漸穩。`)):R(t,`${t.name}靜室調息，把心火慢慢壓了下去。`)}function B(e,t,n,r){if(t.realm>=p.length-1)return!1;let i=t.pills>0?.12:0;if(t.pills>0&&--t.pills,Math.random()<r+i){t.realm+=1,t.personalQi=12,t.lifespan=Math.max(t.lifespan,N(t.realm));let r=p[t.realm];return R(t,`${t.name}突破至「${r}」，天地為之側目。`),n.push({text:`${t.name}破境成功，踏入「${r}」。`,tone:`gold`,flash:/金丹|元嬰/.test(r),toast:{type:`heritage`,title:`族人破境`,text:t.name,detail:r}}),t.role===`patriarch`&&(e.patriarchRealm=t.realm),!0}return t.hp-=24,t.mood-=14,t.personalQi*=.55,R(t,`${t.name}衝擊失敗，經脈隱隱作痛。`),n.push({text:`${t.name}破境失敗，經脈受損。`,tone:`danger`}),!1}function ce(e,t,n){if(e.month===0&&(t.age+=1),t.mood=O(t.mood+(Math.random()*6-3),-80,80),t.hp<=0&&t.role!==`patriarch`){t.alive=!1,R(t,`${t.name}傷重不治，魂歸蒼梧。`),n.push({text:`${t.name}傷重坐化。族譜又添一筆哀榮。`,tone:`danger`,toast:{type:`bad`,title:`族人隕落`,text:t.name,detail:`傷重不治`}});return}t.age>=t.lifespan&&t.role!==`patriarch`&&(t.alive=!1,R(t,`${t.name}壽元將盡，化清風而去。`),n.push({text:`${t.name}壽元耗盡，坐化於${y[t.action]?.label||`山門`}。`,tone:`danger`,toast:{type:`bad`,title:`壽元耗盡`,text:t.name,detail:`${t.age}歲`}})),t.role===`patriarch`&&(t.hp=Math.max(t.hp,35),t.alive=!0)}function le(){let e={qi:680,karma:36,year:146,month:2,patriarchRealm:0,traits:[],people:[],selectedId:`patriarch`,paused:!1,speed:1,omenIn:18};return e.people=[L(e,{id:`patriarch`,name:`青玄機`,role:`patriarch`,root:h[5],nature:g[0],technique:`青嵐吐納訣`,realm:0,age:62,lifespan:180,nickname:`青嵐老祖`,location:`nexus`,action:`cultivate`,thought:`青嵐一脈，當以我為骨。`,artifacts:[`蒼梧令`]}),L(e,{name:`沈清梧`,role:`elder`,root:h[0],nature:g[5],realm:1,age:44,action:`study`,location:`library`}),L(e,{name:`葉疏影`,root:h[1],nature:g[6],realm:0,age:19,action:`social`,location:`gate`}),L(e,{name:`白無塵`,root:h[2],nature:g[3],realm:1,age:27,action:`adventure`,location:`peak`}),L(e,{name:`蒼小魚`,root:h[3],nature:g[1],realm:0,age:17,action:`alchemy`,location:`alchemy`}),L(e,{name:`嵐七七`,root:h[4],nature:g[2],realm:0,age:16,action:`cultivate`,location:`nexus`})],z(e.people[0],e.people[1],28),z(e.people[2],e.people[5],22),z(e.people[3],e.people[4],-12),e}function ue(e){let t=[];if(e.paused)return t;e.month=(e.month+1)%12,e.month===0&&(e.year+=1),e.karma=O(e.karma+.35,0,99);for(let n of j(e))n.action=ie(n),n.location=y[n.action].region,se(e,n,t),ce(e,n,t);return--e.omenIn,e.omenIn<=0&&(e.omenIn=8+Math.floor(Math.random()*10),t.push(...de(e,!1))),t}function de(e,t=!1){let n=[];if(!t&&Math.random()>.55)return n.push({text:`天機掠過，此月山門無事。`,tone:``}),n;let r=D(w),i=A(e,`ancestral`)&&r.qi>0?1.5:1;if(r.qi&&(e.qi=Math.max(0,e.qi+r.qi*i)),r.members>0)for(let t=0;t<r.members;t+=1)fe(e,!0);if(r.members<0){let t=j(e).filter(e=>e.role!==`patriarch`);if(t.length){let e=D(t);e.hp=Math.max(0,e.hp-55),e.hp<=0&&(e.alive=!1,n.push({text:`夜襲之中，${e.name}為護山門而隕。`,tone:`danger`}))}}let a=r.qi?`靈氣 ${r.qi>0?`+`:``}${k(r.qi*i)}`:r.members>0?`族人 +1`:`山門動盪`;return n.push({text:`${r.title}：${r.text}（${a}）`,tone:r.type===`bad`?`danger`:`jade`,toast:{type:r.type,title:r.title,text:r.text,detail:a},sfx:r.type!==`bad`}),n}function fe(e,t=!1){let n=F(e);if(!t){if(e.qi<n)return{ok:!1};e.qi-=n}let r=L(e,{role:`disciple`,age:15+Math.floor(Math.random()*12),realm:0});return e.people.push(r),e.selectedId=r.id,R(r,`${r.name}拜入青嵐，眼底還有凡塵未褪。`),{ok:!0,person:r}}function pe(e){let t=te(e),n=e.people.find(e=>e.role===`patriarch`);if(!n||e.qi<t||e.patriarchRealm>=p.length-1)return{ok:!1};e.qi-=t,e.patriarchRealm+=1,n.realm=e.patriarchRealm,n.personalQi=20,n.lifespan=Math.max(n.lifespan,N(n.realm));let r=p[e.patriarchRealm];return R(n,`老祖青玄機突破至「${r}」，青嵐氣運陡然一振。`),{ok:!0,stage:r,flash:/金丹|元嬰/.test(r)}}function me(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<8?{ok:!1,reason:`氣運不足`}:(e.karma-=8,n.mood+=24,n.hp=O(n.hp+20,0,100),n.personalQi+=28,R(n,`天道賜福於${n.name}，周身金光一閃，心魔暫退。`),{ok:!0,text:`天道賜福「${n.name}」，傷勢與道心皆有進益。`})}function he(e,t){let n=e.people.find(e=>e.id===t&&e.alive);if(!n||e.karma<12)return{ok:!1,reason:`氣運不足`};e.karma-=12;let r=[];return B(e,n,r,.48),{ok:!0,reports:r,text:`天劫劈向${n.name}。`}}function ge(e,t,n){let r=e.people.find(e=>e.id===t&&e.alive);return!r||e.karma<3?{ok:!1,reason:`氣運不足`}:y[n]?(e.karma-=3,r.lockedAction=n,r.action=n,r.location=y[n].region,R(r,`天道令${r.name}去「${y[n].label}」，不敢不從。`),{ok:!0,text:`已令${r.name}改行「${y[n].label}」。`}):{ok:!1,reason:`無此律令`}}function _e(e,t){let n=e.people.find(e=>e.id===t&&e.alive);return!n||e.karma<10?{ok:!1,reason:`氣運不足`}:(e.karma-=10,n.nature=n.nature.id===`demon`?D(g.filter(e=>e.id!==`demon`)):g.find(e=>e.id===`demon`),n.mood-=10,R(n,n.nature.id===`demon`?`${n.name}心魔大盛，眸中多了一絲戾氣。`:`${n.name}心魔被強行剝去，整個人空了一截。`),{ok:!0,text:`${n.name}性情轉為「${n.nature.name}」。`})}function ve(e,t){return oe(e,t)}function ye(e){return p[j(e).reduce((e,t)=>e.realm>=t.realm?e:t).realm]}function be(e,t){return j(e).filter(e=>e.location===t)}var V=d(),H=f(),U=le(),W=e=>document.querySelector(e);document.querySelector(`#app`).innerHTML=`
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
        title="坂本龍一風格原創鋼琴曲《關注塔菲貓》。點擊後播放。"
      >
        🎹 關注塔菲貓
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
    <span>規則驅動群像 · 非 LLM</span>
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
`;var G={qi:W(`#qi-value`),qiRate:W(`#qi-rate`),members:W(`#member-value`),realm:W(`#realm-name`),realmProgress:W(`#realm-progress`),realmProgressLabel:W(`#realm-progress-label`),recruitCost:W(`#recruit-cost`),breakthroughCost:W(`#breakthrough-cost`),breakthroughHint:W(`#breakthrough-hint`),clickYield:W(`#click-yield`),recruitButton:W(`#recruit-button`),breakthroughButton:W(`#breakthrough-button`),gatherButton:W(`#gather-button`),traitList:W(`#trait-list`),emptyTraits:W(`#empty-traits`),logList:W(`#log-list`),modal:W(`#trait-modal`),choices:W(`#trait-choices`),toastRegion:W(`#toast-region`),musicToggle:W(`#music-toggle`),calendar:W(`#calendar-label`),karma:W(`#karma-value`),peak:W(`#peak-realm`),roster:W(`#roster-list`),regions:W(`#region-grid`),inspector:W(`#inspector`),pauseBtn:W(`#pause-btn`),speedBtn:W(`#speed-btn`),pulse:W(`#pulse-badge`),fortune:W(`#fortune-word`)},K=[{time:I(U),text:`青嵐世家於蒼梧山立下道統。天道臨世，開始觀察族人自行演化。`,tone:`gold`},{time:I(U),text:`沈清梧入藏經閣，葉疏影在山門等人，白無塵已往後山。`,tone:`jade`}];function q(e,t=``){K.unshift({time:I(U),text:e,tone:t}),K.splice(24),xe()}function xe(){G.logList.innerHTML=K.map(e=>`
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
  `,G.toastRegion.append(t),window.setTimeout(()=>t.classList.add(`leaving`),3e3),window.setTimeout(()=>t.remove(),3450)}function Y(e){for(let t of e)t.text&&q(t.text,t.tone),t.toast?(J(t.toast),V.playEvent(t.toast.type!==`bad`)):t.sfx===!0?V.playEvent(!0):t.sfx===!1&&V.playEvent(!1),t.flash&&H.flashScreen()}function Se(){G.emptyTraits.hidden=U.traits.length>0,G.traitList.innerHTML=U.traits.map(e=>{let t=m.find(t=>t.id===e);return`
      <div class="active-trait">
        <span>${t.icon}</span>
        <div><strong>${t.name}</strong><small>${t.modifier}</small></div>
      </div>
    `}).join(``)}function Ce(){G.roster.innerHTML=j(U).map(e=>`
    <button type="button" class="roster-card ${e.id===U.selectedId?`is-selected`:``}" data-id="${e.id}">
      <span class="roster-seal" style="border-color:${e.root.hue};color:${e.root.hue}">${e.name.slice(-1)}</span>
      <span>
        <strong>${e.name}${e.role===`patriarch`?` · 老祖`:``}</strong>
        <small>${p[e.realm]} · ${y[e.action].label}</small>
      </span>
      <i>${e.hp}%</i>
    </button>
  `).join(``)}function we(){G.regions.innerHTML=v.map(e=>{let t=be(U,e.id).map(e=>`
      <button type="button" class="region-token ${e.id===U.selectedId?`is-on`:``}" data-id="${e.id}" title="${e.name}">
        ${e.name.slice(-1)}
      </button>
    `).join(``);return`
      <article class="region-cell">
        <header><strong>${e.name}</strong><small>${e.hint}</small></header>
        <div class="token-row">${t||`<span class="token-empty">空</span>`}</div>
      </article>
    `}).join(``)}function Te(){let e=M(U);if(!e){G.inspector.innerHTML=`<p class="empty-inspect">山門已空。</p>`;return}let t=e.memory.length?e.memory.map(e=>`<li>${e}</li>`).join(``):`<li>尚無記憶殘片</li>`,n=e.artifacts.length?e.artifacts.join(`、`):`無`;G.inspector.innerHTML=`
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
      <div><small>境界</small><b>${p[e.realm]}</b></div>
      <div><small>年齡 / 壽元</small><b>${e.age} / ${e.lifespan}</b></div>
      <div><small>傷勢</small><b>${e.hp}%</b></div>
      <div><small>心情</small><b>${e.mood>20?`暢快`:e.mood<-15?`陰鬱`:`平淡`}</b></div>
      <div><small>丹藥</small><b>${e.pills}</b></div>
      <div><small>人際</small><b>${ve(e,U)}</b></div>
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
  `}function X(){let e=te(U),t=U.patriarchRealm>=p.length-1;G.qi.textContent=k(U.qi),G.qiRate.textContent=k(ee(U)),G.members.textContent=`${j(U).length}`,G.realm.textContent=p[U.patriarchRealm],G.realmProgressLabel.textContent=t?`道心圓滿`:`${k(Math.min(U.qi,e))} / ${k(e)}`,G.realmProgress.style.width=t?`100%`:`${Math.min(U.qi/e*100,100)}%`,G.recruitCost.textContent=k(F(U)),G.breakthroughCost.textContent=t?`—`:k(e),G.breakthroughHint.textContent=t?`此界已臻圓滿`:`衝擊 ${p[U.patriarchRealm+1]}`,G.clickYield.textContent=`+${k(P(U))}`,G.recruitButton.disabled=U.qi<F(U),G.breakthroughButton.disabled=t||U.qi<e,G.calendar.textContent=I(U),G.karma.textContent=k(U.karma),G.peak.textContent=ye(U),G.pulse.textContent=U.paused?`時停`:`演化中`,G.fortune.textContent=U.paused?`時停`:U.karma>40?`昌盛`:U.karma<12?`式微`:`觀察`,G.pauseBtn.textContent=U.paused?`▶ 繼續`:`⏸ 暫停`,G.speedBtn.textContent=`×${U.speed}`}function Z(e={}){let t=e.inspect??!0;X(),Ce(),we(),t&&Te()}function Ee(){let e=m.filter(e=>!U.traits.includes(e.id));return[...e.length>=3?e:m].sort(()=>Math.random()-.5).slice(0,3)}function De(){let e=Ee();G.choices.innerHTML=e.map(e=>`
    <button class="trait-choice" type="button" data-trait="${e.id}">
      <span class="choice-icon">${e.icon}</span>
      <small>${e.english}</small>
      <strong>${e.name}</strong>
      <p>${e.description}</p>
      <i>${e.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join(``),G.modal.classList.add(`visible`),G.modal.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`modal-open`),G.choices.querySelector(`button`)?.focus()}function Oe(e){let t=m.find(t=>t.id===e);t&&(U.traits.includes(e)||U.traits.push(e),G.modal.classList.remove(`visible`),G.modal.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`modal-open`),q(`血脈覺醒「${t.name}」，${t.description}。`,`gold`),J({type:`heritage`,title:`家族傳承已覺醒`,text:t.name,detail:t.modifier}),Se(),Z())}function ke(e,t,n){let r=document.createElement(`span`);r.className=`floating-qi`,r.textContent=`+${k(n)} 靈氣`,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.append(r),r.addEventListener(`animationend`,()=>r.remove(),{once:!0}),window.setTimeout(()=>r.remove(),1400)}function Ae(e){let t=e.currentTarget,n=t instanceof HTMLElement?t.getBoundingClientRect():null;return{x:e.clientX||(n?n.left+n.width/2:window.innerWidth/2),y:e.clientY||(n?n.top+n.height/2:window.innerHeight/2)}}function Q(e){e.classList.remove(`is-pressed`),e.offsetWidth,e.classList.add(`is-pressed`),window.setTimeout(()=>e.classList.remove(`is-pressed`),260)}function je(e){e&&(U.selectedId=e,Z())}G.roster.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&je(t.dataset.id)}),G.regions.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);t&&je(t.dataset.id)}),G.inspector.addEventListener(`click`,e=>{let t=e.target.closest(`[data-heaven]`),n=e.target.closest(`[data-assign]`),r=U.selectedId;if(t){let e=t.dataset.heaven,n=e===`bless`?me(U,r):e===`tribulate`?he(U,r):_e(U,r);if(!n.ok){q(n.reason||`氣運不足，天道暫時不可妄動。`,`danger`),Z();return}V.playRise(),e===`tribulate`&&Y(n.reports||[]),q(n.text,`gold`),J({type:e===`tribulate`?`heritage`:e===`corrupt`?`bad`:`good`,title:e===`bless`?`天道賜福`:e===`tribulate`?`天劫降臨`:`心魔翻湧`,text:M(U)?.name||``,detail:n.text}),Z();return}if(n){let e=ge(U,r,n.dataset.assign);e.ok?(V.playQing(),q(e.text,`jade`)):q(e.reason||`氣運不足。`,`danger`),Z()}}),G.gatherButton.addEventListener(`click`,e=>{let t=P(U);U.qi+=t;let{x:n,y:r}=Ae(e);ke(n,r,t),H.burst(n,r),V.playQing(),Q(G.gatherButton),X()}),G.recruitButton.addEventListener(`click`,()=>{let e=fe(U);e.ok&&(V.playRise(),Q(G.recruitButton),q(`${e.person.name}拜入青嵐，靈根為${e.person.root.name}，性${e.person.nature.name}。`,`jade`),Z())}),G.breakthroughButton.addEventListener(`click`,()=>{let e=pe(U);e.ok&&(V.playRise(),e.flash&&H.flashScreen(),Q(G.breakthroughButton),q(`老祖破境成功，踏入「${e.stage}」！`,`gold`),Z(),window.setTimeout(De,350))}),G.choices.addEventListener(`click`,e=>{let t=e.target.closest(`[data-trait]`);t&&Oe(t.dataset.trait)}),G.pauseBtn.addEventListener(`click`,()=>{U.paused=!U.paused,X()}),G.speedBtn.addEventListener(`click`,()=>{U.speed=U.speed===1?3:U.speed===3?8:1,$(),X()}),G.musicToggle.addEventListener(`click`,async()=>{let e=await V.setMusic(!V.isMusicOn());G.musicToggle.setAttribute(`aria-pressed`,String(e)),G.musicToggle.classList.toggle(`is-on`,e),G.musicToggle.textContent=e?`🎹 塔菲貓播放中`:`🔇 關注塔菲貓`}),document.addEventListener(`pointerdown`,()=>V.unlock(),{once:!0});var Me=0;function $(){window.clearInterval(Me),Me=window.setInterval(()=>{Y(ue(U)),Z({inspect:!G.inspector.matches(`:hover`)})},Math.round(1600/U.speed))}window.__cultivationFamily={triggerRandomEvent:()=>{Y(de(U,!0)),Z()},state:U,tick:()=>{Y(ue(U)),Z()}},xe(),Se(),Z(),$();