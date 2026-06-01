import styles from './Marquee.module.css'

const ITEMS = [
  '🔥 Sunday Worship — 10:00 AM',
  '✦ Bible Study — Tuesday 7:00 PM',
  '🔥 Revival Service — Thursday 7:00 PM',
  '✦ Deliverance — Friday 11:00 PM',
  '🔥 Power Must Change Hands — 1st Saturday',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.text}>{item}</span>
        ))}
      </div>
    </div>
  )
}
