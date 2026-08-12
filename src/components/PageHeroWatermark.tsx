import Image from 'next/image'
import styles from './PageHeroWatermark.module.css'

export default function PageHeroWatermark() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <Image
        src="/new Logo mfm.png"
        alt=""
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
