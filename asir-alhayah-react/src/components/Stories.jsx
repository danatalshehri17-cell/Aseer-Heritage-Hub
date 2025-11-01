import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

const stories = [
  {
    id: 's1',
    title: 'قصة زخرفة قط العسيري',
    creator: 'سارة العسيري',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    description: 'كيف بدأت رحلتي مع الزخرفة العسيرية التقليدية'
  },
  {
    id: 's2',
    title: 'نحت الباب التراثي',
    creator: 'محمد الشهري',
    image: 'https://images.unsplash.com/photo-1583241475889-6c89346c3e5a?q=80&w=800&auto=format&fit=crop',
    description: 'الطريقة التقليدية لنحت الأبواب العسيرية'
  },
  {
    id: 's3',
    title: 'عدستي مع عسير',
    creator: 'فاطمة القحطاني',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    description: 'رحلتي في توثيق التراث بالصور'
  }
]

export default function Stories() {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [currentStory, setCurrentStory] = useState(null)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (autoPlay && stories.length > 0) {
      const timer = setInterval(() => {
        const currentIdx = stories.findIndex(s => s.id === currentStory?.id)
        const nextIdx = (currentIdx + 1) % stories.length
        setCurrentStory(stories[nextIdx])
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [currentStory, autoPlay])

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', overflowX: 'auto', padding: '8px 0' }}>
        {stories.map(story => (
          <div
            key={story.id}
            onClick={() => setCurrentStory(story)}
            style={{
              minWidth: '120px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: currentStory?.id === story.id ? '3px solid var(--primary)' : '3px solid rgba(255,255,255,0.2)',
              padding: '3px',
              background: 'linear-gradient(45deg, var(--primary), var(--accent))'
            }}>
              <img
                src={story.image}
                alt={story.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '13px', color: 'var(--text-dim)' }}>
              {story.creator.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>

      {currentStory && (
        <div style={{
          background: 'var(--card)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative'
        }}>
          <button
            onClick={() => setCurrentStory(null)}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'url(' + currentStory.image + ')',
              backgroundSize: 'cover'
            }} />
            <div>
              <div style={{ fontWeight: '600' }}>{currentStory.creator}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{t('stories.creatorAtHub')}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              <button
                className="btn"
                onClick={() => setAutoPlay(!autoPlay)}
                style={{ fontSize: '12px' }}
              >
                {autoPlay ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>
          <img
            src={currentStory.image}
            alt={currentStory.title}
            style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
          />
          <h3 style={{ marginBottom: '8px' }}>{currentStory.title}</h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>{currentStory.description}</p>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a href="#/creators" className="btn primary" style={{ fontSize: '14px' }}>
              {t('stories.readMoreAbout')} {currentStory.creator.split(' ')[0]}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

