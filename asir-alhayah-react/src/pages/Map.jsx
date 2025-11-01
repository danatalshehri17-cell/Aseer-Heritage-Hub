import React, { useMemo, useState } from 'react'
import { museums } from '../utils/data.js'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function MapPage() {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const filtered = useMemo(() => museums
    .filter(m => (q ? (m.name.includes(q) || m.city.includes(q)) : true))
    .filter(m => (city ? m.city === city : true)), [q, city])

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('map.title')}</h1>
        <div className="toolbar">
          <input className="input" placeholder={t('map.searchPlaceholder')} value={q} onChange={e=>setQ(e.target.value)} />
          <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
            <option value="">{t('map.allCities')}</option>
            <option>أبها</option>
            <option>رجال ألمع</option>
          </select>
        </div>
        <div className="grid">
          <div>
            <div className="card" style={{height:360, overflow:'hidden'}}>
              <img src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop" alt={t('map.title')} style={{width:'100%', height:'100%', objectFit:'cover', opacity:.7}} />
            </div>
          </div>
          <div>
            <div className="list">
              {filtered.map(m => (
                <div key={m.id} className="list__item">
                  <img src={m.images[0]} alt={m.name} />
                  <div>
                    <div className="tile__title">{m.name}</div>
                    <div className="list__meta">{m.city} • {t('map.workingHours')}: {m.hours} • {t('map.rating')} {m.rating}</div>
                    <div className="tile__actions"><a className="btn primary" href="#/museums">{t('map.view')}</a></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


