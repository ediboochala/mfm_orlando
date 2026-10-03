import Image from 'next/image'
import { DECLARATION, GENERAL_OVERSEER } from '@/data/siteData'
import styles from './DeclarationSection.module.css'

export default function DeclarationSection() {
  return (
    <section id="declaration" className={styles.section} aria-labelledby="declaration-title">
      <div className={styles.watermark} aria-hidden="true">
        <Image src="/new Logo mfm.png" alt="" fill sizes="520px" style={{ objectFit: 'contain' }} />
      </div>

      <div className="section-inner">
        <header className={`${styles.header} reveal`}>
          <span className={styles.label}>Our Identity</span>
          <h2 id="declaration-title" className={styles.title}>
            As declared by the General Overseer, <span className={styles.titleAccent}>we are</span>
          </h2>
          <div className={styles.rule} aria-hidden="true">
            <span />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.6 7.4H22l-6 4.6 2.3 7.6L12 17l-6.3 4.6L8 14 2 9.4h7.4z" fill="currentColor" />
            </svg>
            <span />
          </div>
        </header>

        <ol className={styles.list}>
          {DECLARATION.map((d, i) => (
            <li key={d.word} className={`${styles.item} reveal d${i + 1}`}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.lead}>{d.lead}</span>
              <span className={styles.word}>{d.word}</span>
            </li>
          ))}
        </ol>

        <p className={`${styles.attribution} reveal`}>
          — {GENERAL_OVERSEER.name}, {GENERAL_OVERSEER.title}, MFM Worldwide
        </p>
      </div>
    </section>
  )
}
