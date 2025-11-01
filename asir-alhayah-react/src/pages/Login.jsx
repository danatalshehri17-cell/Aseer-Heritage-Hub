import React, { useState } from 'react'
import { useAppStore } from '../store.jsx'
import { showToast } from '../components/Toast.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function Login() {
  const { setUserProfile, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'individual',
    organization: '',
    category: '',
    location: '',
    bio: ''
  })

  function handleRegister(e) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      showToast(t('login.requiredFields'), 'error')
      return
    }
    
    const userData = {
      id: `user_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userType: formData.userType,
      registeredAt: new Date().toISOString()
    }

    if (formData.userType === 'creator') {
      if (!formData.category || !formData.bio) {
        showToast(t('login.requiredSpecialty'), 'error')
        return
      }
      userData.category = formData.category
      userData.bio = formData.bio
    }
    
    if (formData.userType === 'vendor') {
      if (!formData.location) {
        showToast(t('login.requiredLocation'), 'error')
        return
      }
      userData.location = formData.location
    }
    
    if (formData.userType === 'organization') {
      if (!formData.organization || !formData.location) {
        showToast(t('login.requiredOrgData'), 'error')
        return
      }
      userData.organization = formData.organization
      userData.location = formData.location
    }

    setUserProfile(userData)
    showToast(t('login.success'), 'success')
    setTimeout(() => window.location.hash = '/', 1000)
  }

  function handleLogin(e) {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      showToast(t('login.requiredNameEmail'), 'error')
      return
    }
    const userData = {
      id: `user_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      userType: 'individual'
    }
    setUserProfile(userData)
    showToast(t('login.welcome'), 'success')
    setTimeout(() => window.location.hash = '/', 1000)
  }

  return (
    <main className="section">
      <div className="container">
        <div className="login__container" style={{ 
          maxWidth: '900px', 
          margin: '40px auto', 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px'
        }}>
          {/* Left side - Branding */}
          <div className="login__branding" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(245, 158, 11, 0.1))',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(14, 165, 233, 0.2)',
            textAlign: 'center'
          }}>
            <img src="/logo.png" alt={t('login.title')} style={{ width: '100px', height: '100px', margin: '0 auto 24px' }} />
            <h2 style={{ marginBottom: '12px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('login.title')}
            </h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '24px' }}>
              {t('login.subtitle')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🎨</span>
                <span style={{ fontSize: '14px' }}>{t('login.showWorks')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🏪</span>
                <span style={{ fontSize: '14px' }}>{t('login.marketProducts')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🏢</span>
                <span style={{ fontSize: '14px' }}>{t('login.manageOrganization')}</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div style={{ 
            background: 'var(--card)', 
            padding: '32px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px' }}>
              <button
                className={`btn ${!showRegister ? 'primary' : ''}`}
                onClick={() => setShowRegister(false)}
                style={{ flex: 1, fontSize: '14px', padding: '10px' }}
              >
                {t('login.login')}
              </button>
              <button
                className={`btn ${showRegister ? 'primary' : ''}`}
                onClick={() => setShowRegister(true)}
                style={{ flex: 1, fontSize: '14px', padding: '10px' }}
              >
                {t('login.register')}
              </button>
            </div>

            {!showRegister ? (
              <form onSubmit={handleLogin}>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.name')}</label>
                    <input
                      className="input"
                      placeholder={t('login.namePlaceholder')}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.email')}</label>
                    <input
                      className="input"
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary" style={{ width: '100%', marginTop: '8px', padding: '12px 16px' }}>
                    {t('login.login')}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} style={{ display: 'grid', gap: '16px', maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', paddingRight: '8px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>{t('login.userType')}</label>
                  <select
                    className="select"
                    value={formData.userType}
                    onChange={e => setFormData({ ...formData, userType: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  >
                    <option value="individual">{t('login.individual')}</option>
                    <option value="creator">{t('login.creator')}</option>
                    <option value="vendor">{t('login.vendor')}</option>
                    <option value="organization">{t('login.organization')}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    {formData.userType === 'organization' ? t('login.organizationName') : t('login.fullName')}
                  </label>
                  <input
                    className="input"
                    placeholder={formData.userType === 'organization' ? t('login.organizationNamePlaceholder') : t('login.fullNamePlaceholder')}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.email')}</label>
                  <input
                    className="input"
                    type="email"
                    placeholder={t('login.emailPlaceholder')}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.phone')}</label>
                  <input
                    className="input"
                    type="tel"
                    placeholder={t('login.phonePlaceholder')}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                {formData.userType === 'creator' && (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.specialty')}</label>
                      <select
                        className="select"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="">{t('login.selectSpecialty')}</option>
                        <option value={language === 'ar' ? 'رسم وزخرفة' : 'Painting & Decoration'}>{t('login.specialty1')}</option>
                        <option value={language === 'ar' ? 'نحت خشبي' : 'Wood Carving'}>{t('login.specialty2')}</option>
                        <option value={language === 'ar' ? 'تصوير فوتوغرافي' : 'Photography'}>{t('login.specialty3')}</option>
                        <option value={language === 'ar' ? 'حياكة ونسيج' : 'Weaving & Textiles'}>{t('login.specialty4')}</option>
                        <option value={language === 'ar' ? 'فخار وسيراميك' : 'Pottery & Ceramics'}>{t('login.specialty5')}</option>
                        <option value={language === 'ar' ? 'موسيقى وفنون أدائية' : 'Music & Performing Arts'}>{t('login.specialty6')}</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.bio')}</label>
                      <textarea
                        className="input"
                        placeholder={t('login.bioPlaceholder')}
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        rows="3"
                        style={{ width: '100%', resize: 'vertical' }}
                        required
                      />
                    </div>
                  </>
                )}

                {formData.userType === 'vendor' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.location')}</label>
                    <input
                      className="input"
                      placeholder={t('login.locationPlaceholder')}
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                )}

                {formData.userType === 'organization' && (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.organizationType')}</label>
                      <select
                        className="select"
                        value={formData.organization}
                        onChange={e => setFormData({ ...formData, organization: e.target.value })}
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="">{t('login.selectOrganizationType')}</option>
                        <option value={language === 'ar' ? 'متحف' : 'Museum'}>{t('login.orgType1')}</option>
                        <option value={language === 'ar' ? 'مؤسسة ثقافية' : 'Cultural Institution'}>{t('login.orgType2')}</option>
                        <option value={language === 'ar' ? 'شركة سياحية' : 'Tourism Company'}>{t('login.orgType3')}</option>
                        <option value={language === 'ar' ? 'جمعية' : 'Association'}>{t('login.orgType4')}</option>
                        <option value={language === 'ar' ? 'منظمة غير ربحية' : 'Non-profit Organization'}>{t('login.orgType5')}</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{t('login.location')}</label>
                      <input
                        className="input"
                        placeholder={t('login.locationPlaceholder2')}
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        style={{ width: '100%' }}
                        required
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn primary" style={{ width: '100%', marginTop: '8px', padding: '14px' }}>
                  {t('login.createAccount')}
                </button>

                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)', margin: 0 }}>
                  {t('login.termsAgreement')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
