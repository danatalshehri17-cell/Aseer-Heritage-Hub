import React, { useEffect, useState } from 'react'

const toasts = []

export function showToast(message, type = 'info') {
  const id = Math.random()
  toasts.push({ id, message, type })
  const event = new CustomEvent('toast-show', { detail: { id, message, type } })
  window.dispatchEvent(event)
  setTimeout(() => {
    const removeEvent = new CustomEvent('toast-hide', { detail: { id } })
    window.dispatchEvent(removeEvent)
  }, 3000)
}

export default function Toast() {
  const [activeToasts, setActiveToasts] = useState([])

  useEffect(() => {
    function handleShow(e) {
      setActiveToasts(prev => [...prev, e.detail])
    }
    function handleHide(e) {
      setActiveToasts(prev => prev.filter(t => t.id !== e.detail.id))
    }
    
    window.addEventListener('toast-show', handleShow)
    window.addEventListener('toast-hide', handleHide)
    return () => {
      window.removeEventListener('toast-show', handleShow)
      window.removeEventListener('toast-hide', handleHide)
    }
  }, [])

  if (activeToasts.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      zIndex: 10000,
      display: 'grid',
      gap: '12px'
    }}>
      {activeToasts.map(t => (
        <div
          key={t.id}
          className="toast"
          style={{
            background: t.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 
                       t.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                       t.type === 'info' ? 'rgba(14, 165, 233, 0.1)' : 'var(--card)',
            borderColor: t.type === 'success' ? 'var(--success)' : 
                        t.type === 'error' ? 'var(--danger)' : 
                        'var(--primary)',
            minWidth: '280px',
            animation: 'slideInDown 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>
              {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ️'}
            </span>
            <span style={{ flex: 1 }}>{t.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

