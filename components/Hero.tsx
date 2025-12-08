import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.bulbWrapper}>
          <Image
            src="/images/front.png"
            alt="KI Lampe Illustration"
            width={800}
            height={800}
            priority
            className={styles.bulbImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
        <div className={styles.textBlock}>
          <p className={styles.kicker}>WILLKOMMEN BEI</p>
          <h1 className={styles.title}>
            <span className={styles.brandGlow}>
              <span className="text-white">KI</span>
              <span className="text-amber-400">.</span>
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
