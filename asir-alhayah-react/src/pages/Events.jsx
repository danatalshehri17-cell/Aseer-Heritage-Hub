import React, { useState } from 'react'
import { workshops, creators } from '../utils/data.js'
import { currency, useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

function Tile({ image, title, meta, children }) {
  return (
    <div className="tile">
      <img src={image} alt={title} />
      <div className="tile__body">
        <div className="tile__title">{title}</div>
        <div className="tile__meta">{meta}</div>
        <div className="tile__actions">{children}</div>
      </div>
    </div>
  )
}

export default function Events() {
  const { registerEvent, user, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [selectedWorkshop, setSelectedWorkshop] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })

  function handleRegister(workshop) {
    if (!user) {
      const name = prompt(t('events.pleaseEnterName'))
      const email = prompt(t('events.pleaseEnterEmail'))
      const phone = prompt(t('events.pleaseEnterPhone'))
      if (!name || !email || !phone) return
      setFormData({ name, email, phone })
      registerEvent({ workshopId: workshop.id, ...workshop, ...{ name, email, phone } })
    } else {
      registerEvent({ workshopId: workshop.id, ...workshop, name: user.name, email: user.email, phone: user.phone })
    }
    setSelectedWorkshop(null)
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('events.title')}</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '24px' }}>
          {t('events.subtitle')}
        </p>

        <div className="grid">
          {workshops.map(workshop => {
            const instructor = creators.find(c => c.id === workshop.instructorId)
            return (
              <Tile
                key={workshop.id}
                image={workshop.image}
                title={workshop.title}
                meta={`${instructor?.name} • ${workshop.date} ${workshop.time} • ${currency(workshop.price, language)}`}
              >
                <button className="btn primary" onClick={() => setSelectedWorkshop(workshop)}>
                  {t('events.registerNow')}
                </button>
              </Tile>
            )
          })}
        </div>

        {selectedWorkshop && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 100,
            padding: '40px',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'var(--card)',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>{selectedWorkshop.title}</h2>
                <button className="btn" onClick={() => setSelectedWorkshop(null)}>✕</button>
              </div>
              <img src={selectedWorkshop.image} alt={selectedWorkshop.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-dim)', marginBottom: '16px' }}>{selectedWorkshop.description}</p>
              <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
                <div><strong>{t('events.instructor')}:</strong> {selectedWorkshop.instructor}</div>
                <div><strong>{t('events.date')}:</strong> {selectedWorkshop.date} {language === 'ar' ? 'في' : 'at'} {selectedWorkshop.time}</div>
                <div><strong>{t('events.duration')}:</strong> {selectedWorkshop.duration}</div>
                <div><strong>{t('events.location')}:</strong> {selectedWorkshop.location}</div>
                <div><strong>{t('events.price')}:</strong> {currency(selectedWorkshop.price, language)}</div>
                <div><strong>{t('events.maxParticipants')}:</strong> {t('events.upTo')} {selectedWorkshop.maxParticipants} {t('events.participants')}</div>
              </div>
              <button className="btn primary" style={{ width: '100%' }} onClick={() => handleRegister(selectedWorkshop)}>
                {t('events.confirmRegistration')}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

