import React, { useEffect, useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import MapPage from './pages/Map.jsx'
import Museums from './pages/Museums.jsx'
import Vendors from './pages/Vendors.jsx'
import Creators from './pages/Creators.jsx'
import Events from './pages/Events.jsx'
import Competitors from './pages/Competitors.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Cart from './pages/Cart.jsx'
import Notifications from './components/Notifications.jsx'
import Toast from './components/Toast.jsx'
import { AppStoreProvider, useAppStore } from './store.jsx'
import { getTranslation } from './utils/i18n.js'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace('#', '') || '/')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace('#', '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return [hash, (to) => { window.location.hash = to }]
}

function Nav({ route, navigate }) {
  const { user, darkMode, toggleDarkMode, language, toggleLanguage } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = (key) => getTranslation(key, language)
  
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <img src="/logo.png" alt={t('home.brand')} className="brand__logo-img" />
          <span className="brand__name">{t('home.brand')}</span>
        </div>
        
        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="menu-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'var(--text)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              minWidth: '50px'
            }}
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="menu-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'var(--text)',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            title={darkMode ? t('nav.toggleDarkMode') : t('nav.toggleLightMode')}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Menu button - always visible */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-toggle-btn"
            style={{
              background: mobileMenuOpen ? 'rgba(14, 165, 233, 0.2)' : 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'var(--text)',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'nav--open' : ''}`}>
          <a className={route==='/'?'active':''} onClick={()=>{navigate('/'); setMobileMenuOpen(false)}} href="#/">
            <span>🏠</span><span>{t('nav.home')}</span>
          </a>
          <a className={route==='/map'?'active':''} onClick={()=>{navigate('/map'); setMobileMenuOpen(false)}} href="#/map">
            <span>🗺️</span><span>{t('nav.map')}</span>
          </a>
          <a className={route==='/museums'?'active':''} onClick={()=>{navigate('/museums'); setMobileMenuOpen(false)}} href="#/museums">
            <span>🏛️</span><span>{t('nav.museums')}</span>
          </a>
          <a className={route==='/vendors'?'active':''} onClick={()=>{navigate('/vendors'); setMobileMenuOpen(false)}} href="#/vendors">
            <span>🏪</span><span>{t('nav.vendors')}</span>
          </a>
          <a className={route==='/creators'?'active':''} onClick={()=>{navigate('/creators'); setMobileMenuOpen(false)}} href="#/creators">
            <span>🎨</span><span>{t('nav.creators')}</span>
          </a>
          <a className={route==='/events'?'active':''} onClick={()=>{navigate('/events'); setMobileMenuOpen(false)}} href="#/events">
            <span>🎪</span><span>{t('nav.events')}</span>
          </a>
          <a href="#/competitors" onClick={()=>{setMobileMenuOpen(false)}}>
            <span>⚡</span><span>{t('nav.competitors')}</span>
          </a>
          <Notifications onClose={() => setMobileMenuOpen(false)} />
          <div style={{height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0'}}></div>
          {user ? (
            <a className={route==='/profile'?'active':''} onClick={()=>{navigate('/profile'); setMobileMenuOpen(false)}} href="#/profile">
              <span>👤</span><span>{user.name}</span>
            </a>
          ) : (
            <a className={route==='/login'?'active':''} onClick={()=>{navigate('/login'); setMobileMenuOpen(false)}} href="#/login">
              <span>🔐</span><span>{t('nav.login')}</span>
            </a>
          )}
          <a className={`${route==='/cart'?'active':''} cta`} onClick={()=>{navigate('/cart'); setMobileMenuOpen(false)}} href="#/cart">
            <span>🛒</span><span>{t('nav.cart')}</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

function AppContent({ route, navigate }) {
  const page = useMemo(() => {
    if (route === '/map') return <MapPage />
    if (route === '/museums') return <Museums />
    if (route === '/vendors') return <Vendors />
    if (route === '/creators') return <Creators />
    if (route === '/events') return <Events />
    if (route === '/competitors') return <Competitors />
    if (route === '/login') return <Login />
    if (route === '/profile') return <Profile />
    if (route === '/cart') return <Cart />
    return <Home />
  }, [route])

  return (
    <>
      <Nav route={route} navigate={navigate} />
      {page}
      <Toast />
    </>
  )
}

export default function App() {
  const [route, navigate] = useHashRoute()

  return (
    <AppStoreProvider>
      <AppContent route={route} navigate={navigate} />
    </AppStoreProvider>
  )
}


