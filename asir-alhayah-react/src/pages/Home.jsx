import React from 'react'
import { products, experiences, museums, vendors, creators, workshops } from '../utils/data.js'
import { currency, useAppStore } from '../store.jsx'
import Stories from '../components/Stories.jsx'
import Footer from '../components/Footer.jsx'
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

export default function Home() {
  const { addToCart, bookExperience, language } = useAppStore()
  const t = (key) => getTranslation(key, language)
  
  return (
    <main>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <div className="hero__badge">🌿 {t('home.brand')}</div>
            <h1>{t('home.heroTitle')}</h1>
            <p className="hero__subtitle">{t('home.heroSubtitle')}</p>
            
            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-number">{museums.length}+</div>
                <div className="hero__stat-label">{t('home.privateMuseums')}</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">{vendors.length}+</div>
                <div className="hero__stat-label">{t('home.producingFamilies')}</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">{creators.length}+</div>
                <div className="hero__stat-label">{t('home.creatorsArtists')}</div>
              </div>
            </div>

            <div className="hero__actions">
              <a href="#/map" className="btn primary hero__cta">
                <span>{t('home.exploreMap')}</span>
                <span style={{marginRight: '8px'}}>🗺️</span>
              </a>
              <a href="#/vendors" className="btn hero__cta">
                <span>{t('home.shopFromFamilies')}</span>
                <span style={{marginRight: '8px'}}>🛍️</span>
              </a>
              <a href="#/login" className="btn hero__cta" style={{background: 'rgba(14,165,233,0.1)', borderColor: 'var(--primary)'}}>
                <span>{t('home.joinUs')}</span>
                <span style={{marginRight: '8px'}}>🚀</span>
              </a>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__image-container">
              <div className="hero__image-shadow"></div>
              <img src={museums[0].images[0]} alt={t('home.heroTitle')} className="hero__image" />
              <div className="hero__floating-badge" style={{top: '20px', left: '20px'}}>
                <span>🏛️</span>
                <div>
                  <div style={{fontWeight: '600'}}>متحف رجال ألمع</div>
                  <div style={{fontSize: '12px', color: 'var(--text-dim)'}}>{t('home.museumRating')} ⭐ 4.8</div>
                </div>
              </div>
              <div className="hero__floating-badge" style={{bottom: '20px', right: '20px'}}>
                <span>🎨</span>
                <div>
                  <div style={{fontWeight: '600'}}>أسرة الوادي</div>
                  <div style={{fontSize: '12px', color: 'var(--text-dim)'}}>{t('home.heritageProducts')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t('home.heritageStories')}</h2>
          <Stories />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <h2 className="section__title">{t('home.popularExperiences')}</h2>
          <div className="grid">
            {experiences.map(exp => {
              const mus = museums.find(m => m.id === exp.museumId)
              return (
                <Tile key={exp.id} image={mus?.images?.[0]} title={`${exp.title} — ${currency(exp.price, language)}`} meta={`${mus?.name} • ${exp.duration}`}>
                  <button className="btn primary" onClick={() => {
                    const when = prompt(t('home.chooseDateTime'))
                    if (when) bookExperience(exp.id, when)
                  }}>{t('home.bookNow')}</button>
                </Tile>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t('home.vendorProducts')}</h2>
          <div className="grid">
            {products.map(p => {
              const v = vendors.find(x => x.id === p.vendorId)
              return (
                <Tile key={p.id} image={p.image} title={`${p.name} — ${currency(p.price, language)}`} meta={`${v?.name} • ${t('home.available')}: ${p.stock}`}>
                  <button className="btn primary" onClick={() => addToCart(p.id)}>{t('home.addToCart')}</button>
                </Tile>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h2 className="section__title">{t('home.talentsCreators')}</h2>
            <a href="#/creators" className="btn">{t('home.viewAll')}</a>
          </div>
          <div className="grid">
            {creators.slice(0, 3).map(creator => (
              <Tile key={creator.id} image={creator.image} title={creator.name} meta={`${creator.category} • ${creator.city}`}>
                <a href="#/creators" className="btn primary">{t('home.viewWorks')}</a>
              </Tile>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h2 className="section__title">{t('home.upcomingEvents')}</h2>
            <a href="#/events" className="btn">{t('home.viewAll')}</a>
          </div>
          <div className="grid">
            {workshops.slice(0, 3).map(workshop => (
              <Tile key={workshop.id} image={workshop.image} title={workshop.title} meta={`${workshop.instructor} • ${workshop.date} • ${currency(workshop.price, language)}`}>
                <a href="#/events" className="btn primary">{t('home.registerNow')}</a>
              </Tile>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}


