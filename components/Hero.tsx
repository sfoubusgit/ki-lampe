import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <p className={styles.kicker}>WILLKOMMEN BEI</p>
          <h1 className={styles.title}>
            <span className={styles.brandGlow}>
              <span className="text-white">KI</span>
              <Image
                src="/logo/logo-icon.svg"
                alt=""
                width={80}
                height={80}
                className={`inline-block mx-2 align-middle ${styles.logoIcon}`}
              />
              <span className="text-white">LAMPE</span>
            </span>
          </h1>
          <p className={styles.lead}>
            Erleuchtung durch künstliche Intelligenz – verständlich erklärt,
            praxisnah und alltagstauglich.
          </p>
          <div className={styles.actions}>
            <Link href="/artikel" className={styles.primaryButton}>
              Artikel entdecken
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
