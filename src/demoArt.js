const asset = (file) => `${import.meta.env.BASE_URL}demo/${file}`

export const DEMO_PORTRAITS = {
  青玄機: asset('qing-xuanji.webp'),
  沈清梧: asset('shen-qingwu.webp'),
  葉疏影: asset('ye-shuying.webp'),
  白無塵: asset('bai-wuchen.webp'),
  蒼小魚: asset('cang-xiaoyu.webp'),
  嵐七七: asset('lan-qiqi.webp'),
}

export const DEMO_GENERIC = {
  m: asset('disciple-m.webp'),
  f: asset('disciple-f.webp'),
}

export const DEMO_SCENES = {
  hall: asset('hall-banquet.webp'),
  rain: asset('rain-steps.webp'),
  gate: asset('mountain-gate.webp'),
  chamber: asset('chamber-lamp.webp'),
}

const FEMININE = /梧|影|七七|雪|棠|晴|犀|蘭|芳|娘|妹|姑|女|清|疏|晚/

const TITLE_KIND = {
  立譜宴: 'hall',
  無法拒絕: 'chamber',
  枕邊警告: 'chamber',
  沉潭: 'gate',
  第一次開火: 'rain',
  西西里式流放: 'gate',
  渡劫蒙太奇: 'gate',
  關門: 'chamber',
  雙線: 'hall',
  庭訊: 'hall',
  我知道是你: 'chamber',
  孤島: 'gate',
  舊神的賭局: 'chamber',
  吻別: 'gate',
  想洗手: 'chamber',
  '天庭 Immobiliare': 'hall',
  繼承人: 'gate',
  臺階: 'rain',
  空椅: 'gate',
}

export function demoPortraitUrl(person) {
  if (!person) return DEMO_GENERIC.m
  if (DEMO_PORTRAITS[person.name]) return DEMO_PORTRAITS[person.name]
  return FEMININE.test(person.name) ? DEMO_GENERIC.f : DEMO_GENERIC.m
}

export function isOpeningCast(person) {
  return Boolean(person && DEMO_PORTRAITS[person.name])
}

export function demoSceneKind(scene) {
  if (TITLE_KIND[scene?.title]) return TITLE_KIND[scene.title]
  const blob = `${scene?.title || ''} ${scene?.slug || ''} ${scene?.narration || ''}`
  if (/雨|石階|開火|劍|血|夜襲/.test(blob)) return 'rain'
  if (/密室|子時|盟書|靈樞|寢殿|亭|丹房/.test(blob)) return 'chamber'
  if (/大殿|宴|議事|燈火|拜帖/.test(blob)) return 'hall'
  return 'gate'
}

export function demoSceneUrl(scene) {
  return DEMO_SCENES[demoSceneKind(scene)] || DEMO_SCENES.gate
}
