import { PRAYER_LINE, PASTOR } from '@/data/siteData'
import styles from './PrayerSection.module.css'

export default function PrayerSection() {
  return (
    <section id="prayer" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Left */}
          <div>
            <span className="section-label reveal">Dial In</span>
            <h2 className={`${styles.title} reveal d1`}>USA Prayer Line</h2>
            <p className={`${styles.body} reveal d2`}>
              Anchored by {PRAYER_LINE.anchor}. Call in daily and receive a spiritual breakthrough.
            </p>
            <ul className={`${styles.numbers} reveal d3`}>
              {PRAYER_LINE.numbers.map((n, i) => (
                <li key={i} className={styles.numberItem}>
                  <span className={styles.dot} />
                  <span className={styles.numberLabel}>{n.label}:</span>
                  <strong>{n.number}</strong>
                </li>
              ))}
            </ul>
            <div className={`${styles.cityBox} reveal d4`}>
              <p className={styles.cityLabel}>{PRAYER_LINE.prayerCity.name}</p>
              <p className={styles.cityText}>
                {PRAYER_LINE.prayerCity.schedule}
                <br />
                {PRAYER_LINE.prayerCity.address}
              </p>
            </div>
          </div>

          {/* Right — Time Card */}
          <div className={`${styles.timeCard} reveal-right`}>
            <div className={styles.timeSession}>
              <p className={styles.sessionLabel}>Morning Session</p>
              <p className={styles.sessionTime}>6:00 — 7:00</p>
              <p className={styles.sessionTz}>AM · Eastern Time</p>
            </div>
            <div className={styles.timeSession}>
              <p className={styles.sessionLabel}>Evening Session</p>
              <p className={styles.sessionTime}>11:00 PM — Midnight</p>
              <p className={styles.sessionTz}>Eastern Time</p>
            </div>
            <p className={styles.localNote}>
              Pastoral Counseling &amp; Prayer also available directly with {PASTOR.name}.
              <br /><br />
              <strong className={styles.localPhone}>{PASTOR.cell}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
