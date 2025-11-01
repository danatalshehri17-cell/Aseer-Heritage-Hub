import React from 'react'
import { useAppStore } from '../store.jsx'
import { getTranslation } from '../utils/i18n.js'

export default function Competitors() {
  const { language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  const competitors = [
    {
      name: 'Discover Aseer',
      type: 'منصة رسمية',
      features: ['حجز جزئي', 'لا', 'خريطة عامة', 'محدود'],
      description: 'منصة رسمية للترويج السياحي بالمنطقة'
    },
    {
      name: 'Visit Saudi',
      type: 'منصة وطنية',
      features: ['حجز محدود', 'لا', 'خريطة عامة', 'محدود'],
      description: 'المنصة الوطنية للسياحة'
    },
    {
      name: 'TripAdvisor',
      type: 'منصة عالمية',
      features: ['لا', 'لا', 'خريطة عامة', 'تقييمات فقط'],
      description: 'منصة تقييم عالمية'
    },
    {
      name: 'Google Maps',
      type: 'خدمة مواقع',
      features: ['لا', 'لا', 'مواقع فقط', 'لا'],
      description: 'خدمة خرائط عامة'
    },
    {
      name: 'Hala Yalla',
      type: 'تطبيق سعودي',
      features: ['لفعاليات', 'لا', 'غير متخصص', 'محدود'],
      description: 'تطبيق لحجز الفعاليات'
    }
  ]

  return (
    <main className="section">
      <div className="container">
        <h1 className="section__title">{t('competitors.title')}</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '32px', fontSize: '18px' }}>
          {t('competitors.subtitle')}
        </p>

        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>{t('competitors.directCompetitors')}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px', textAlign: language === 'ar' ? 'right' : 'left' }}>{t('competitors.platform')}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{t('competitors.directBooking')}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{t('competitors.familySupport')}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{t('competitors.heritageMap')}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{t('competitors.localStories')}</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{c.name}</td>
                    {c.features.map((f, fIdx) => (
                      <td key={fIdx} style={{ padding: '12px', textAlign: 'center', color: 'var(--text-dim)' }}>
                        {f === 'لا' || f === t('common.no') ? '❌' : f === 'نعم' || f === t('common.yes') ? '✅' : f}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ background: 'rgba(14, 165, 233, 0.1)', borderTop: '2px solid var(--primary)' }}>
                  <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary)' }}>{t('home.brand')}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>✅ {t('common.yes')}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>✅ {t('common.yes')}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>✅ {t('common.yes')}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>✅ {t('common.yes')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--primary)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>{t('competitors.uniqueIntegration')}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
              {t('competitors.uniqueIntegrationDesc')}
            </p>
          </div>

          <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--accent)' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '12px' }}>{t('competitors.liveStories')}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
              {t('competitors.liveStoriesDesc')}
            </p>
          </div>

          <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--success)' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '12px' }}>{t('competitors.talentSupport')}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
              {t('competitors.talentSupportDesc')}
            </p>
          </div>

          <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ marginBottom: '12px' }}>{t('competitors.unifiedBooking')}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
              {t('competitors.unifiedBookingDesc')}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '24px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '16px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '12px' }}>{t('competitors.tagline')}</h2>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>
            {t('competitors.subtitle2')}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>{t('competitors.startExploring')}</a>
            <a href="#/creators" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{t('competitors.joinAsCreator')}</a>
          </div>
        </div>
      </div>
    </main>
  )
}

