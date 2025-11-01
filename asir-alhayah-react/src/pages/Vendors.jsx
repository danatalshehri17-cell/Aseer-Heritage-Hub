import React, { useMemo } from 'react'
import { vendors, products } from '../utils/data.js'
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

export default function VendorsPage() {
  const { addToCart, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const params = new URLSearchParams(window.location.hash.split('?')[1])
  const vendorId = params.get('v') || ''
  const vendorProducts = useMemo(() => products.filter(p => !vendorId || p.vendorId === vendorId), [vendorId])

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('vendors.title')}</h1>
        <div className="grid">
          {vendors.map(v => (
            <Tile key={v.id} image={v.images[0]} title={v.name} meta={`${v.category} • ${t('vendors.rating')} ${v.rating}`}>
              <a className="btn primary" href={`#/vendors?v=${v.id}`}>{t('vendors.viewProducts')}</a>
            </Tile>
          ))}
        </div>

        <h2 className="section__title" style={{marginTop:18}}>{t('vendors.selectedFamilyProducts')}</h2>
        <div className="grid">
          {vendorProducts.map(p => (
            <Tile key={p.id} image={p.image} title={`${p.name} — ${currency(p.price, language)}`} meta={`${t('home.available')}: ${p.stock}`}>
              <button className="btn primary" onClick={()=>addToCart(p.id)}>{t('home.addToCart')}</button>
            </Tile>
          ))}
        </div>
      </div>
    </main>
  )
}


