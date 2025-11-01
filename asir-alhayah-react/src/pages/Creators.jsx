import React, { useState, useMemo } from 'react'
import { creators } from '../utils/data.js'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

function CreatorCard({ creator, onViewWorks }) {
  const { follows, toggleFollow, reviews, addReview, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [showReview, setShowReview] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })
  const isFollowing = follows.includes(creator.id)
  const creatorReviews = reviews.filter(r => r.targetType === 'creator' && r.targetId === creator.id)
  const avgRating = creatorReviews.length > 0 
    ? (creatorReviews.reduce((sum, r) => sum + r.rating, 0) / creatorReviews.length).toFixed(1)
    : creator.rating

  function handleAddReview() {
    if (!reviewData.comment.trim()) {
      alert(t('creators.pleaseEnterComment'))
      return
    }
    addReview('creator', creator.id, reviewData.rating, reviewData.comment)
    setReviewData({ rating: 5, comment: '' })
    setShowReview(false)
  }

  return (
    <div className="tile">
      <img src={creator.image} alt={creator.name} />
      <div className="tile__body">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="tile__title">{creator.name}</div>
          <div style={{fontSize: '14px', color: 'var(--accent)'}}>⭐ {avgRating}</div>
        </div>
        <div className="tile__meta">{creator.category} • {creator.city} • {creatorReviews.length} {t('creators.reviews')}</div>
        <p style={{fontSize: '14px', color: 'var(--text-dim)', margin: '8px 0'}}>{creator.bio}</p>
        <div className="tile__actions">
          <button className="btn primary" onClick={() => onViewWorks(creator)}>{t('creators.viewWorks')}</button>
          <button className={isFollowing ? "btn" : "btn primary"} onClick={() => toggleFollow(creator.id)}>
            {isFollowing ? t('creators.following') : t('creators.follow')}
          </button>
          <button className="btn" onClick={() => setShowReview(true)}>{t('creators.rate')}</button>
          <a href={`mailto:${creator.contact}`} className="btn">{t('creators.contact')}</a>
        </div>
        {showReview && (
          <div style={{marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>
            <div style={{display: 'grid', gap: '8px'}}>
              <div>
                <label style={{fontSize: '12px', color: 'var(--text-dim)'}}>{t('creators.rating')}:</label>
                <select className="select" value={reviewData.rating} onChange={e => setReviewData({...reviewData, rating: parseInt(e.target.value)})}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)}</option>)}
                </select>
              </div>
              <textarea
                className="input"
                placeholder={t('creators.writeReview')}
                value={reviewData.comment}
                onChange={e => setReviewData({...reviewData, comment: e.target.value})}
                rows="2"
              />
              <div style={{display: 'flex', gap: '8px'}}>
                <button className="btn primary" onClick={handleAddReview} style={{flex: 1}}>{t('creators.publish')}</button>
                <button className="btn" onClick={() => setShowReview(false)}>{t('common.cancel')}</button>
              </div>
            </div>
          </div>
        )}
        {creatorReviews.length > 0 && (
          <div style={{marginTop: '12px', fontSize: '12px', color: 'var(--text-dim)'}}>
            {creatorReviews.slice(0, 2).map(r => (
              <div key={r.id} style={{marginBottom: '6px'}}>
                <strong>{r.userName}:</strong> {'⭐'.repeat(r.rating)} {r.comment}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function WorkGallery({ creator, onClose }) {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  if (!creator) return null
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      zIndex: 100,
      padding: '40px',
      overflow: 'auto'
    }}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h2 style={{margin: 0}}>{t('creators.worksOf')} {creator.name}</h2>
          <button className="btn" onClick={onClose}>{t('creators.close')}</button>
        </div>
        <div className="grid">
          {creator.works.map(work => (
            <div key={work.id} className="card" style={{cursor: 'pointer'}}>
              <img src={work.image} alt={work.title} />
              <div style={{padding: '12px'}}>
                <div className="tile__title">{work.title}</div>
                <div className="tile__meta">{work.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Creators() {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [category, setCategory] = useState('')
  const [showSubmit, setShowSubmit] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    bio: '',
    contact: '',
    workTitle: '',
    workDescription: '',
    workImage: ''
  })

  const filtered = useMemo(() => {
    let result = creators.filter(c => c.status === 'approved')
    if (category) result = result.filter(c => c.category === category)
    return result
  }, [category])

  const categories = [...new Set(creators.map(c => c.category))]

  function handleSubmit(e) {
    e.preventDefault()
    alert(t('creators.submitSuccess'))
    setFormData({
      name: '',
      category: '',
      city: '',
      bio: '',
      contact: '',
      workTitle: '',
      workDescription: '',
      workImage: ''
    })
    setShowSubmit(false)
  }

  return (
    <main className="section">
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 className="section__title">{t('creators.title')}</h1>
          <button className="btn primary" onClick={() => setShowSubmit(true)}>{t('creators.submitWork')}</button>
        </div>

        <div className="toolbar">
          <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">{t('creators.allSpecialties')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid">
          {filtered.map(creator => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onViewWorks={setSelectedCreator}
            />
          ))}
        </div>

        {selectedCreator && (
          <WorkGallery
            creator={selectedCreator}
            onClose={() => setSelectedCreator(null)}
          />
        )}

        {showSubmit && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 100,
            padding: '40px',
            overflow: 'auto'
          }}>
            <div className="container">
              <div style={{maxWidth: '600px', margin: '0 auto', background: 'var(--card)', padding: '24px', borderRadius: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                  <h2 style={{margin: 0}}>{t('creators.submitWork')}</h2>
                  <button className="btn" onClick={() => setShowSubmit(false)}>{t('creators.close')}</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{display: 'grid', gap: '12px', marginBottom: '16px'}}>
                    <input
                      className="input"
                      placeholder={t('creators.fullName')}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <select
                      className="select"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">{t('creators.selectSpecialty')}</option>
                      <option value={language === 'ar' ? 'رسم وزخرفة' : 'Painting & Decoration'}>{t('login.specialty1')}</option>
                      <option value={language === 'ar' ? 'نحت خشبي' : 'Wood Carving'}>{t('login.specialty2')}</option>
                      <option value={language === 'ar' ? 'تصوير فوتوغرافي' : 'Photography'}>{t('login.specialty3')}</option>
                      <option value={language === 'ar' ? 'حياكة ونسيج' : 'Weaving & Textiles'}>{t('login.specialty4')}</option>
                      <option value={language === 'ar' ? 'فخار وسيراميك' : 'Pottery & Ceramics'}>{t('login.specialty5')}</option>
                      <option value={language === 'ar' ? 'موسيقى وفنون أدائية' : 'Music & Performing Arts'}>{t('login.specialty6')}</option>
                      <option>{t('creators.other')}</option>
                    </select>
                    <input
                      className="input"
                      placeholder={t('creators.city')}
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      required
                    />
                    <textarea
                      className="input"
                      placeholder={t('creators.bio')}
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      rows="3"
                      required
                    />
                    <input
                      className="input"
                      type="email"
                      placeholder={t('creators.email')}
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      required
                    />
                    <hr style={{border: '1px solid rgba(255,255,255,0.1)', margin: '16px 0'}} />
                    <h3 style={{margin: '8px 0'}}>{t('creators.works')}</h3>
                    <input
                      className="input"
                      placeholder={t('creators.workTitle')}
                      value={formData.workTitle}
                      onChange={e => setFormData({...formData, workTitle: e.target.value})}
                      required
                    />
                    <textarea
                      className="input"
                      placeholder={t('creators.workDescription')}
                      value={formData.workDescription}
                      onChange={e => setFormData({...formData, workDescription: e.target.value})}
                      rows="2"
                      required
                    />
                    <input
                      className="input"
                      type="url"
                      placeholder={t('creators.workImageUrl')}
                      value={formData.workImage}
                      onChange={e => setFormData({...formData, workImage: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary" style={{width: '100%'}}>{t('creators.submitRequest')}</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

