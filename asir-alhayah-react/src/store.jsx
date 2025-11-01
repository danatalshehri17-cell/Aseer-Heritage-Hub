import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products, experiences, availableCoupons } from './utils/data.js'
import { showToast } from './components/Toast.jsx'
import { getTranslation } from './utils/i18n.js'

const AppCtx = createContext(null)

export function AppStoreProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('asir_cart') || '[]'))
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('asir_bookings') || '[]'))
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('asir_reviews') || '[]'))
  const [follows, setFollows] = useState(() => JSON.parse(localStorage.getItem('asir_follows') || '[]'))
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('asir_notifications') || '[]'))
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('asir_user') || 'null'))
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('asir_events') || '[]'))
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('asir_coupons')
    return saved ? JSON.parse(saved) : availableCoupons
  })
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('asir_darkMode')
    return saved ? JSON.parse(saved) : true // default to dark mode
  })
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('asir_language')
    return saved || 'ar' // default to Arabic
  })

  function persist(key, data) {
    localStorage.setItem(`asir_${key}`, JSON.stringify(data))
  }

  function addToCart(productId, qty = 1) {
    setCart(prev => {
      const next = [...prev]
      const idx = next.findIndex(i => i.productId === productId)
      if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty }
      else next.push({ productId, qty })
      persist('cart', next)
      return next
    })
    const msg = getTranslation('store.addedToCart', language)
    addNotification(msg, 'success')
    showToast(msg, 'success')
  }

  function updateQty(productId, qty) {
    setCart(prev => {
      const next = prev.map(i => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i)
      persist('cart', next)
      return next
    })
  }

  function removeFromCart(productId) {
    setCart(prev => {
      const next = prev.filter(i => i.productId !== productId)
      persist('cart', next)
      return next
    })
  }

  function bookExperience(experienceId, when) {
    const exp = experiences.find(e => e.id === experienceId)
    if (!exp) return
    setBookings(prev => {
      const next = [...prev, { id: `b_${Date.now()}`, experienceId, when, status: 'confirmed', createdAt: new Date().toISOString() }]
      persist('bookings', next)
      return next
    })
    const msg = getTranslation('store.bookingConfirmed', language)
    addNotification(msg, 'success')
    showToast(msg, 'success')
  }

  function addReview(targetType, targetId, rating, comment) {
    setReviews(prev => {
      const next = [...prev, {
        id: `r_${Date.now()}`,
        targetType, // 'museum', 'vendor', 'creator', 'product'
        targetId,
        userId: user?.id || 'guest',
        userName: user?.name || getTranslation('store.guest', language),
        rating,
        comment,
        createdAt: new Date().toISOString()
      }]
      persist('reviews', next)
      return next
    })
    const msg = getTranslation('store.reviewPosted', language)
    addNotification(msg, 'success')
    showToast(msg, 'success')
  }

  function toggleFollow(creatorId) {
    setFollows(prev => {
      const exists = prev.includes(creatorId)
      const next = exists ? prev.filter(id => id !== creatorId) : [...prev, creatorId]
      persist('follows', next)
      const msg = exists ? getTranslation('store.unfollowed', language) : getTranslation('store.followed', language)
      addNotification(msg, 'info')
      showToast(msg, 'info')
      return next
    })
  }

  function addNotification(message, type = 'info') {
    const notification = {
      id: `n_${Date.now()}`,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    }
    setNotifications(prev => {
      const next = [notification, ...prev].slice(0, 50) // keep last 50
      persist('notifications', next)
      return next
    })
  }

  function markNotificationRead(id) {
    setNotifications(prev => {
      const next = prev.map(n => n.id === id ? {...n, read: true} : n)
      persist('notifications', next)
      return next
    })
  }

  function setUserProfile(profile) {
    setUser(profile)
    persist('user', profile)
  }

  function registerEvent(eventData) {
    setEvents(prev => {
      const next = [...prev, {
        ...eventData,
        id: `ev_${Date.now()}`,
        registeredAt: new Date().toISOString()
      }]
      persist('events', next)
      const msg = getTranslation('store.eventRegistered', language)
      addNotification(msg, 'success')
      showToast(msg, 'success')
      return next
    })
  }

  function applyCoupon(code) {
    const coupon = coupons.find(c => c.code === code && !c.used)
    if (!coupon) {
      const msg = getTranslation('store.invalidCoupon', language)
      addNotification(msg, 'error')
      showToast(msg, 'error')
      return null
    }
    setCoupons(prev => {
      const next = prev.map(c => c.code === code ? {...c, used: true} : c)
      persist('coupons', next)
      return next
    })
    const msg = `${getTranslation('store.discountApplied', language)} ${coupon.discount}%`
    addNotification(msg, 'success')
    showToast(msg, 'success')
    return coupon
  }

  function toggleDarkMode() {
    setDarkMode(prev => {
      const next = !prev
      persist('darkMode', next)
      return next
    })
  }

  function toggleLanguage() {
    setLanguage(prev => {
      const next = prev === 'ar' ? 'en' : 'ar'
      localStorage.setItem('asir_language', next)
      // Update HTML lang and dir attributes
      document.documentElement.lang = next
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
      return next
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    // Initialize language
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [darkMode, language])

  const value = useMemo(() => ({
    cart, bookings, reviews, follows, notifications, user, events, coupons, darkMode, language,
    addToCart, updateQty, removeFromCart, bookExperience,
    addReview, toggleFollow, addNotification, markNotificationRead,
    setUserProfile, registerEvent, applyCoupon, toggleDarkMode, toggleLanguage
  }), [cart, bookings, reviews, follows, notifications, user, events, coupons, darkMode, language])
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useAppStore() {
  return useContext(AppCtx)
}

export function currency(n, lang = 'ar') { 
  return lang === 'ar' ? `${n.toFixed(2)} ر.س` : `${n.toFixed(2)} SAR`
}


