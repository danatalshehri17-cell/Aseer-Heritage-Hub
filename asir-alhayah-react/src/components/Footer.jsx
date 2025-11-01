import React from 'react'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function Footer() {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.1)',
      marginTop: '64px',
      padding: '40px 0 24px',
      background: 'var(--muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ marginBottom: '16px' }}>{t('footer.title')}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '14px' }}>
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>{t('footer.quickLinks')}</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <a href="#/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.home')}</a>
              <a href="#/museums" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.museums')}</a>
              <a href="#/vendors" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.vendors')}</a>
              <a href="#/creators" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.creators')}</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>{t('footer.discover')}</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <a href="#/events" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.events')}</a>
              <a href="#/competitors" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('footer.whyUs')}</a>
              <a href="#/map" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('nav.map')}</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>{t('footer.contact')}</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <a href="mailto:aseerheritagehub@gmail.com" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>
                📧 aseerheritagehub@gmail.com
              </a>
              <div style={{ color: 'var(--text-dim)', fontSize: '14px' }}>
                📍 {t('footer.location')}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <a href="#" style={{ color: 'var(--text-dim)', fontSize: '20px' }}>📘</a>
                <a href="#" style={{ color: 'var(--text-dim)', fontSize: '20px' }}>📷</a>
                <a href="#" style={{ color: 'var(--text-dim)', fontSize: '20px' }}>🐦</a>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>
            © {new Date().getFullYear()} {t('footer.title')}. {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#/competitors" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('footer.privacy')}</a>
            <a href="#/competitors" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

