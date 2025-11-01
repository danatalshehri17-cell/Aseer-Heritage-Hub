import React, { useState } from 'react'
import { useAppStore, currency } from '../store.jsx'
import { museums, experiences, creators, workshops } from '../utils/data.js'
import { getTranslation } from '../utils/i18n.js'

export default function Profile() {
  const { user, setUserProfile, follows, toggleFollow, reviews, bookings, events, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [showLogin, setShowLogin] = useState(!user)
  const [loginForm, setLoginForm] = useState({ name: '', email: '', phone: '' })
  const [activeTab, setActiveTab] = useState('profile')

  function handleLogin() {
    if (!loginForm.name || !loginForm.email) {
      alert(t('profile.pleaseEnterNameEmail'))
      return
    }
    setUserProfile({ id: `user_${Date.now()}`, ...loginForm })
    setShowLogin(false)
  }

  if (!user && !showLogin) {
    setShowLogin(true)
  }

  if (showLogin || !user) {
    return (
      <main className="section">
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '40px auto', background: 'var(--card)', padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px' }}>{t('profile.loginOrCreate')}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                className="input"
                placeholder={t('profile.fullName')}
                value={loginForm.name}
                onChange={e => setLoginForm({ ...loginForm, name: e.target.value })}
              />
              <input
                className="input"
                type="email"
                placeholder={t('profile.email')}
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
              />
              <input
                className="input"
                placeholder={t('profile.phoneOptional')}
                value={loginForm.phone}
                onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
              />
              <button className="btn primary" onClick={handleLogin} style={{ width: '100%' }}>
                {t('profile.login')}
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const userBookings = bookings.filter(b => !b.userId || b.userId === user.id)
  const userEvents = events.filter(e => e.email === user.email)
  const followedCreators = creators.filter(c => follows.includes(c.id))
  const userReviews = reviews.filter(r => r.userId === user.id)

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('profile.title')}</h1>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button className={`btn ${activeTab === 'profile' ? 'primary' : ''}`} onClick={() => setActiveTab('profile')}>
            {t('profile.profile')}
          </button>
          <button className={`btn ${activeTab === 'bookings' ? 'primary' : ''}`} onClick={() => setActiveTab('bookings')}>
            {t('profile.bookings')} ({userBookings.length})
          </button>
          <button className={`btn ${activeTab === 'events' ? 'primary' : ''}`} onClick={() => setActiveTab('events')}>
            {t('profile.events')} ({userEvents.length})
          </button>
          <button className={`btn ${activeTab === 'follows' ? 'primary' : ''}`} onClick={() => setActiveTab('follows')}>
            {t('profile.follows')} ({followedCreators.length})
          </button>
          <button className={`btn ${activeTab === 'reviews' ? 'primary' : ''}`} onClick={() => setActiveTab('reviews')}>
            {t('profile.reviews')} ({userReviews.length})
          </button>
        </div>

        {activeTab === 'profile' && (
          <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '32px' }}>
                {user.userType === 'creator' && '🎨'}
                {user.userType === 'vendor' && '🏪'}
                {user.userType === 'organization' && '🏢'}
                {user.userType === 'individual' && '👤'}
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{user.name}</h3>
                <div style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
                  {user.userType === 'creator' && t('profile.creator')}
                  {user.userType === 'vendor' && t('profile.vendor')}
                  {user.userType === 'organization' && t('profile.organization')}
                  {user.userType === 'individual' && t('profile.individual')}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
              <div><strong>{t('profile.name')}:</strong> {user.name}</div>
              <div><strong>{t('profile.emailLabel')}:</strong> {user.email}</div>
              {user.phone && <div><strong>{t('profile.phone')}:</strong> {user.phone}</div>}
              {user.userType === 'creator' && user.category && (
                <div><strong>{t('profile.specialty')}:</strong> {user.category}</div>
              )}
              {user.userType === 'creator' && user.bio && (
                <div><strong>{t('profile.bio')}:</strong> {user.bio}</div>
              )}
              {(user.userType === 'vendor' || user.userType === 'organization') && user.location && (
                <div><strong>{t('profile.location')}:</strong> {user.location}</div>
              )}
              {user.userType === 'organization' && user.organization && (
                <div><strong>{t('profile.orgType')}:</strong> {user.organization}</div>
              )}
              <button className="btn" onClick={() => setUserProfile(null)} style={{ marginTop: '12px' }}>
                {t('profile.logout')}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="list">
            {userBookings.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                {t('profile.noBookings')}
              </div>
            ) : (
              userBookings.map(b => {
                const e = experiences.find(x => x.id === b.experienceId)
                const m = e ? museums.find(mm => mm.id === e.museumId) : null
                return (
                  <div key={b.id} className="list__item">
                    <img src={m?.images?.[0] || ''} alt={e?.title || ''} />
                    <div>
                      <div className="tile__title">{e?.title || t('profile.experience')}</div>
                      <div className="list__meta">{m?.name} • {b.when} • {t('profile.status')}: {b.status}</div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="list">
            {userEvents.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                {t('profile.noEvents')}
              </div>
            ) : (
              userEvents.map(e => {
                const workshop = workshops.find(w => w.id === e.workshopId)
                return (
                  <div key={e.id} className="list__item">
                    <img src={workshop?.image || ''} alt={workshop?.title || ''} />
                    <div>
                      <div className="tile__title">{workshop?.title}</div>
                      <div className="list__meta">{workshop?.date} {workshop?.time} • {workshop?.location}</div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {activeTab === 'follows' && (
          <div className="grid">
            {followedCreators.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', gridColumn: '1 / -1' }}>
                {t('profile.noFollows')}
              </div>
            ) : (
              followedCreators.map(creator => (
                <div key={creator.id} className="tile">
                  <img src={creator.image} alt={creator.name} />
                  <div className="tile__body">
                    <div className="tile__title">{creator.name}</div>
                    <div className="tile__meta">{creator.category}</div>
                    <div className="tile__actions">
                      <button className="btn primary" onClick={() => toggleFollow(creator.id)}>
                        {t('profile.unfollow')}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="list">
            {userReviews.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                {t('profile.noReviews')}
              </div>
            ) : (
              userReviews.map(r => (
                <div key={r.id} className="list__item">
                  <div style={{ flex: 1 }}>
                    <div className="tile__title">
                      {'⭐'.repeat(r.rating)}
                    </div>
                    <div className="list__meta">{r.comment}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>
                      {new Date(r.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  )
}

