/**
 * 前端埋点（§6.3）：开发环境输出调试信息；生产可挂载 window.__KIDS_TRACK__
 * 禁止上传幼儿真实姓名、精确地址等敏感字段。
 */
const SESSION_KEY = 'kids-analytics-session'

function getSessionId(): string {
  if (typeof sessionStorage === 'undefined') return 'ssr'
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export type TrackProps = Record<string, string | number | boolean | undefined | null>

export function track(event: string, props?: TrackProps): void {
  if (typeof window === 'undefined') return
  const detail = {
    event,
    props: props ?? {},
    ts: Date.now(),
    sessionId: getSessionId(),
  }
  window.dispatchEvent(new CustomEvent('kids-analytics', { detail }))

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', detail)
  }

  const hook = (window as unknown as { __KIDS_TRACK__?: (e: string, p: TrackProps) => void }).__KIDS_TRACK__
  if (import.meta.env.PROD && typeof hook === 'function') {
    hook(event, { ...detail.props, sessionId: detail.sessionId, ts: detail.ts })
  }
}
