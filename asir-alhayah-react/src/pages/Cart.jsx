import React, { useState, useMemo } from 'react'
import { useAppStore, currency } from '../store.jsx'
import { products, experiences, museums, availableCoupons } from '../utils/data.js'
import { getTranslation } from '../utils/i18n.js'

export default function Cart() {
  const { cart, bookings, updateQty, removeFromCart, applyCoupon, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  
  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.productId)
    return sum + (p ? p.price * item.qty : 0)
  }, 0), [cart])
  
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0
  const total = subtotal - discount

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('cart.title')}</h1>
        <div className="list">
          {cart.map(item => {
            const p = products.find(x => x.id === item.productId)
            if (!p) return null
            const line = p.price * item.qty
            return (
              <div key={p.id} className="list__item">
                <img src={p.image} alt={p.name} />
                <div>
                  <div className="tile__title">{p.name} — {currency(p.price, language)}</div>
                  <div className="list__meta">{t('cart.quantity')}: {item.qty} • {t('cart.total')}: {currency(line, language)}</div>
                  <div className="tile__actions">
                    <button className="btn" onClick={()=>updateQty(p.id, item.qty - 1)}>-</button>
                    <button className="btn" onClick={()=>updateQty(p.id, item.qty + 1)}>+</button>
                    <button className="btn" onClick={()=>removeFromCart(p.id)}>{t('cart.delete')}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="card" style={{marginTop:12, padding:16}}>
          <div style={{display: 'grid', gap: '12px', marginBottom: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>{t('cart.subtotal')}:</span>
              <strong>{currency(subtotal, language)}</strong>
            </div>
            {appliedCoupon && (
              <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--success)'}}>
                <span>{t('cart.discount')} ({appliedCoupon.discount}%):</span>
                <strong>-{currency(discount, language)}</strong>
              </div>
            )}
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
              <strong>{t('cart.finalTotal')}:</strong>
              <strong>{currency(total, language)}</strong>
            </div>
          </div>
          
          {!appliedCoupon && (
            <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
              <input
                className="input"
                placeholder={t('cart.couponCode')}
                value={couponCode}
                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                style={{flex: 1}}
              />
              <button className="btn" onClick={() => {
                const coupon = applyCoupon(couponCode)
                if (coupon) setAppliedCoupon(coupon)
              }}>{t('cart.apply')}</button>
            </div>
          )}
          
          {appliedCoupon && (
            <div style={{marginBottom: '12px', padding: '8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', fontSize: '14px'}}>
              ✓ {t('cart.applied')}: {appliedCoupon.code} - {appliedCoupon.description}
              <button className="btn" onClick={() => {setAppliedCoupon(null); setCouponCode('')}} style={{marginRight: '8px', fontSize: '12px'}}>
                {t('cart.cancel')}
              </button>
            </div>
          )}
          
          <button className="btn primary" style={{width: '100%'}} onClick={()=>alert(t('cart.orderComplete'))}>
            {t('cart.completePurchase')}
          </button>
        </div>

        <h2 className="section__title" style={{marginTop:18}}>{t('cart.bookings')}</h2>
        <div className="list">
          {bookings.map(b => {
            const e = experiences.find(x => x.id === b.experienceId)
            const m = e ? museums.find(mm => mm.id === e.museumId) : null
            return (
              <div key={b.id} className="list__item">
                <img src={m?.images?.[0] || ''} alt={e?.title || ''} />
                <div>
                  <div className="tile__title">{e?.title}</div>
                  <div className="list__meta">{m?.name} • {b.when} • {t('cart.status')}: {b.status}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}


