import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <div className={styles.actions}>
            <div className={styles.articlePrompt}>
              <div className={styles.promptBrand}>
                <span className="text-white">KI</span>
                <Image
                  src="/logo/logo-icon.svg"
                  alt=""
                  width={48}
                  height={48}
                  className={`inline-block mx-2 align-middle ${styles.logoIcon}`}
                />
                <span className="text-white">LAMPE</span>
              </div>
              <p className={styles.promptDescription}>
                Der Blog über Künstliche Intelligenz
              </p>
              <Link href="/artikel" className={styles.promptCommand}>
                <span className={styles.promptText}>&gt; alle artikel öffnen</span>
                <span className={styles.promptKey}>
                  <span className={styles.keyCap}>Enter</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
