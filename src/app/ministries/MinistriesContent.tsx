'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MINISTRIES, DEPARTMENTS_AND_UNITS } from '@/data/siteData'
import MinistryIcon from '@/components/MinistryIcon'
import styles from './page.module.css'

/* ── Main export ── */
export default function MinistriesContent() {
  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <div className={styles.ministriesList}>
          {MINISTRIES.map((ministry) => (
            <section key={ministry.id} id={ministry.id} className={styles.ministrySection}>
              <div className={styles.ministrySplit}>

                {/* LEFT — ministry info */}
                <div className={styles.splitInfo}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}><MinistryIcon name={ministry.icon} size={40} /></span>
                    <div className={styles.cardTitles}>
                      <h2 className={styles.cardName}>{ministry.name}</h2>
                      <span className={styles.cardSubtitle}>{ministry.subtitle}</span>
                    </div>
                  </div>
                  <div className={styles.cardDivider} />
                  <p className={styles.cardTagline}>{ministry.tagline}</p>
                  <p className={styles.cardDescription}>{ministry.description}</p>
                  <ul className={styles.cardDetails}>
                    {ministry.details.map((detail, i) => (
                      <li key={i} className={styles.cardDetail}>
                        <span className={styles.detailDot} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cardFooter}>
                    <div className={styles.membershipBadge}>
                      <span className={styles.membershipLabel}>Membership</span>
                      <span className={styles.membershipValue}>{ministry.membership}</span>
                    </div>
                    <blockquote className={styles.cardScripture}>{ministry.scripture}</blockquote>
                  </div>
                </div>

                {/* RIGHT — single photo */}
                <div className={styles.splitPhotos}>
                  <div className={styles.photosHeader}>
                    <span className={styles.photosLabel}>Our Work</span>
                    <div className={styles.photosRule} />
                  </div>
                  <div className={styles.photoCard}>
                    <div className={styles.photoWrap}>
                      <Image
                        src={ministry.image}
                        alt={ministry.name}
                        fill
                        className={styles.photoImg}
                        sizes="(max-width: 900px) 80vw, 42vw"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          ))}
        </div>

        {/* Departments and Units */}
        <div className={styles.departmentsSection}>
          <div className={styles.departmentsHeader}>
            <span className={styles.departmentsLabel}>Serving Arms</span>
            <h2 className={styles.departmentsTitle}>Departments and Units</h2>
          </div>
          <div className={styles.departmentsList}>
            {DEPARTMENTS_AND_UNITS.map((dept) => (
              <span key={dept} className={styles.departmentPill}>{dept}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Ready to Get Involved?</h3>
          <p className={styles.ctaText}>
            Every ministry at MFM Tampa Florida is open and welcoming. Whether you want to join, serve, or simply find out more — reach out to us and we will connect you with the right family.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <Link href="/services" className="btn-secondary">View Service Times</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
