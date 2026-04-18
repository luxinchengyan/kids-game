const locales = {
  en: {
    microtask_title: 'MicroTask — Tap to hear',
    reward_star: '✨ +1 star'
  },
  zh: {
    microtask_title: '微任务 — 点击听音',
    reward_star: '✨ +1 星'
  }
}
let current = 'zh'
export function setLocale(l){ if(locales[l]) current = l }
export function t(key){ return locales[current][key] || key }
export default { t, setLocale }
