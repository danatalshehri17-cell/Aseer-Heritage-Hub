import React, { useMemo, useState } from 'react'
import { museums, experiences } from '../utils/data.js'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function Museums() {
  const [q, setQ] = useState('')
  const { bookExperience, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const filtered = useMemo(() => museums.filter(m => q ? (m.name.includes(q) || m.description.includes(q)) : true), [q])
  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('museums.title')}</h1>
        <div className="toolbar">
          <input className="input" placeholder={t('museums.searchPlaceholder')} value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="list">
          {filtered.map(m => {
            const firstExp = experiences.find(e => e.museumId === m.id)
            return (
              <div key={m.id} className="list__item">
                <img src={m.images[0]} alt={m.name} />
                <div>
                  <div className="tile__title">{m.name}</div>
                  <div className="list__meta">{m.city} • {t('museums.workingHours')}: {m.hours} • {t('museums.rating')} {m.rating}</div>
                  <div className="tile__actions">
                    <button className="btn primary" onClick={() => {
                      if (!firstExp) return alert(t('museums.noExperiences'))
                      const when = prompt(t('museums.chooseDateTime'))
                      if (when) bookExperience(firstExp.id, when)
                    }}>{t('museums.bookExperience')}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}


