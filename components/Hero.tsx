'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className={styles.hero}>
      {/* Subtle AI grid pattern background */}
      <div className={styles.gridPattern} aria-hidden="true"></div>
      
      <div className={styles.inner}>
        <div className={styles.unifiedContent}>
          {/* Integrated brand and tagline */}
          <div className={styles.brandSection}>
            <h1 className={styles.title}>
              <span className={styles.brandName}>
                <span className={styles.brandKI}>KI</span>
                <Image
                  src="/logo/logo-icon.svg"
                  alt=""
                  width={56}
                  height={56}
                  className={styles.logoIcon}
                />
                <span className={styles.brandLAMPE}>LAMPE</span>
              </span>
            </h1>
            <p className={styles.tagline}>
              {t.hero.tagline}
            </p>
          </div>
          
          {/* Integrated CTA */}
          <Link href="/artikel" className={styles.ctaButton}>
            {t.hero.discoverArticles}
            <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
