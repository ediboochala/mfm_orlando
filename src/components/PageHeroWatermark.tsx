import Image from 'next/image'
import styles from './PageHeroWatermark.module.css'

export default function PageHeroWatermark() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <Image
        src="/pexels-caleboquendo-34612562.jpg"
        alt=""
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className={styles.tint} />
    </div>
  )
}
