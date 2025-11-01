import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function Notifications({ onClose }) {
  const { notifications, markNotificationRead, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const unreadCount = notifications.filter(n => !n.read).length
  const unread = notifications.filter(n => !n.read)

  useEffect(() => {
    const timer = setTimeout(() => {
      notifications.slice(0, 3).forEach(n => {
        if (!n.read) markNotificationRead(n.id)
      })
    }, 3000)
    return () => clearTimeout(timer)
  }, [notifications, markNotificationRead])

  return (
    <a onClick={onClose} style={{display: 'flex', alignItems: 'center', gap: '12px', position: 'relative'}}>
      <span>🔔</span>
      <span>{t('notifications.title')}</span>
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          background: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </a>
  )
}

