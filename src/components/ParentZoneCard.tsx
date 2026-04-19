import React, { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { track } from '../lib/analytics'

/**
 * 家长区：商业化与账号的占位说明（§6.1），正式环境需对接服务端与微信开放平台。
 */
export function ParentZoneCard() {
  const [open, setOpen] = useState(false)

  return (
    <Card style={{ marginTop: '28px' }}>
      <button
        type="button"
        onClick={() => {
          setOpen(!open)
          track('parent_zone_toggle', { open: !open })
        }}
        style={{
          width: '100%',
          textAlign: 'left',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          padding: 0,
        }}
      >
        {open ? '▼' : '▶'} 家长专区（登录 · 试用 · 隐私说明）
      </button>
      {open ? (
        <div style={{ marginTop: '16px', fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          <p>
            <strong>数据存储：</strong>当前为体验版，学习进度主要保存在本机浏览器；清除站点数据会丢失记录。正式版将同步到家长账号。
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>计划支持：</strong>手机号验证码登录、微信扫码登录；按次 / 周 / 月 / 年订阅；<strong>首周试用</strong>（规则以正式上架说明为准）。
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>交流与分享：</strong>可向亲友分享学习小结（见下方按钮）；「好友家庭绑定、微信群」等需小程序或服务端能力，见产品文档 §6.2。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                track('auth_mock_click', { method: 'phone' })
                alert('体验版未接入服务端。正式版将在此使用手机验证码登录。')
              }}
            >
              手机号登录（待接入）
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                track('auth_mock_click', { method: 'wechat' })
                alert('体验版未接入微信开放平台。正式版将支持微信扫码登录。')
              }}
            >
              微信登录（待接入）
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
