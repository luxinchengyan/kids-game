import React, { useState } from 'react'
import { Button } from './Button'
import { track } from '../lib/analytics'

interface LearnProgressShareProps {
  childNickname: string
  stars: number
  level: number
  streakDays: number
}

export function LearnProgressShare({ childNickname, stars, level, streakDays }: LearnProgressShareProps) {
  const [hint, setHint] = useState('')

  const buildText = () => {
    const name = childNickname?.trim() || '小朋友'
    return `【童梦飞船】${name} 最近在坚持学习：⭐${stars} 颗星星 · Lv.${level} · 连续 ${streakDays} 天。一起来玩中学吧！`
  }

  const handleShare = async () => {
    const text = buildText()
    track('share_click', { channel: 'native_or_clipboard' })
    try {
      if (navigator.share) {
        await navigator.share({ title: '童梦飞船 · 学习进度', text })
        setHint('已分享')
      } else {
        await navigator.clipboard.writeText(text)
        setHint('已复制到剪贴板，可粘贴到微信发给亲友')
      }
    } catch {
      setHint('分享已取消或不可用，请长按复制文案')
    }
    window.setTimeout(() => setHint(''), 3500)
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <Button variant="secondary" type="button" onClick={handleShare}>
        分享学习进度给亲友
      </Button>
      {hint ? (
        <p style={{ marginTop: '10px', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{hint}</p>
      ) : null}
    </div>
  )
}
