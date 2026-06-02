'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './SlideshowSection.module.css'

/* ─────────────────────────────────────────────────────────────
   SVG WATERMARKS — silhouettes of Nigerian church people
   ViewBox 900×420. Left cluster: x 0–280. Right cluster: x 620–900.
   Center (x 280–620) stays clear for the text overlay.
   CSS mask-image fades figures toward the center.
───────────────────────────────────────────────────────────── */

/* Slide 1 — WORSHIP: congregation with raised hands, women in gele & bubu */
function WorshipWatermark() {
  return (
    <svg className={styles.watermark} viewBox="0 0 900 420"
         preserveAspectRatio="xMidYMid slice" aria-hidden="true"
         fill="white">
      {/* ── LEFT CLUSTER ── */}

      {/* Woman 1 — gele, bubu, arms raised high */}
      <g transform="translate(0,28)">
        {/* Gele — distinctive high Nigerian head-wrap */}
        <path d="M12 42 Q18 6 46 2 Q74 6 80 42 Q70 20 46 14 Q22 20 12 42Z"/>
        <ellipse cx="46" cy="54" rx="18" ry="20"/>
        <rect x="39" y="74" width="14" height="12" rx="5"/>
        {/* Bubu — wide flowing top + wrapper */}
        <path d="M8 86 Q46 76 84 86 L90 240 Q46 250 2 240 Z"/>
        {/* Arms raised */}
        <path d="M12 104 Q-4 74 -8 40" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M80 104 Q96 74 100 40" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      {/* Man 1 — agbada (wide flowing traditional robe), arms raised */}
      <g transform="translate(96,52)">
        <ellipse cx="44" cy="38" rx="16" ry="18"/>
        <rect x="37" y="56" width="14" height="11" rx="4"/>
        {/* Agbada — dramatically wide sleeves */}
        <path d="M-4 67 Q44 55 92 67 L94 225 Q44 234 -6 225 Z"/>
        <path d="M2 84 Q-14 58 -18 26" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M86 84 Q102 58 106 26" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>

      {/* Woman 2 — gele, slightly behind */}
      <g transform="translate(182,42)">
        <path d="M10 38 Q16 6 42 2 Q68 6 74 38 Q64 18 42 12 Q20 18 10 38Z"/>
        <ellipse cx="42" cy="49" rx="16" ry="18"/>
        <rect x="35" y="67" width="14" height="11" rx="4"/>
        <path d="M6 79 Q42 72 78 79 L82 225 Q42 234 2 225 Z"/>
        <path d="M8 96 Q-6 68 -10 36" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M74 96 Q88 68 92 36" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>

      {/* ── RIGHT CLUSTER (mirror layout) ── */}

      <g transform="translate(638,28)">
        <path d="M12 42 Q18 6 46 2 Q74 6 80 42 Q70 20 46 14 Q22 20 12 42Z"/>
        <ellipse cx="46" cy="54" rx="18" ry="20"/>
        <rect x="39" y="74" width="14" height="12" rx="5"/>
        <path d="M8 86 Q46 76 84 86 L90 240 Q46 250 2 240 Z"/>
        <path d="M12 104 Q-4 74 -8 40" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M80 104 Q96 74 100 40" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      <g transform="translate(724,52)">
        <ellipse cx="44" cy="38" rx="16" ry="18"/>
        <rect x="37" y="56" width="14" height="11" rx="4"/>
        <path d="M-4 67 Q44 55 92 67 L94 225 Q44 234 -6 225 Z"/>
        <path d="M2 84 Q-14 58 -18 26" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M86 84 Q102 58 106 26" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>

      <g transform="translate(808,42)">
        <path d="M10 38 Q16 6 42 2 Q68 6 74 38 Q64 18 42 12 Q20 18 10 38Z"/>
        <ellipse cx="42" cy="49" rx="16" ry="18"/>
        <rect x="35" y="67" width="14" height="11" rx="4"/>
        <path d="M6 79 Q42 72 78 79 L82 225 Q42 234 2 225 Z"/>
        <path d="M8 96 Q-6 68 -10 36" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M74 96 Q88 68 92 36" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

/* Slide 2 — PRAYER: kneeling & prostrate figures — very Nigerian prayer style */
function PrayerWatermark() {
  return (
    <svg className={styles.watermark} viewBox="0 0 900 420"
         preserveAspectRatio="xMidYMid slice" aria-hidden="true"
         fill="white">
      {/* ── LEFT CLUSTER ── */}

      {/* Person 1 — fully prostrate face-down (common Nigerian prayer posture) */}
      <g transform="translate(-10,240)">
        {/* Horizontal body */}
        <path d="M20 0 Q110 -12 200 -2 L202 22 Q110 34 18 24 Z"/>
        {/* Head facing forward */}
        <ellipse cx="8" cy="10" rx="16" ry="14"/>
        {/* Gele flat */}
        <path d="M-4 0 Q8 -18 20 0 Q14 -10 8 -12 Q2 -10 -4 0Z"/>
        {/* Arms stretched forward */}
        <path d="M180 4 Q220 -14 250 -26" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M190 12 Q228 0 258 -10" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        {/* Feet/legs back */}
        <path d="M18 20 Q10 55 12 90" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M32 22 Q26 58 28 90" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      {/* Person 2 — kneeling, head bowed low in prayer */}
      <g transform="translate(130,140)">
        <path d="M12 34 Q16 8 42 4 Q68 8 72 34 Q62 16 42 12 Q22 16 12 34Z"/>
        <ellipse cx="42" cy="44" rx="16" ry="17"/>
        <rect x="35" y="61" width="14" height="10" rx="4"/>
        {/* Body leaning forward */}
        <path d="M8 71 Q42 62 76 71 L72 170 Q42 178 12 170 Z"/>
        {/* Arms pressed down to ground */}
        <path d="M12 88 Q4 108 2 140" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M72 88 Q80 108 82 140" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        {/* Kneeling legs */}
        <path d="M14 168 Q-2 195 -4 220" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
        <path d="M70 168 Q86 195 88 220" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
      </g>

      {/* Person 3 — standing, head bowed, hands clasped */}
      <g transform="translate(218,48)">
        <path d="M10 36 Q14 8 38 4 Q62 8 66 36 Q56 16 38 12 Q20 16 10 36Z"/>
        <ellipse cx="38" cy="46" rx="15" ry="16"/>
        <rect x="31" y="62" width="14" height="10" rx="4"/>
        <path d="M6 72 Q38 65 70 72 L74 215 Q38 223 2 215 Z"/>
        {/* Hands clasped in front */}
        <path d="M10 90 Q24 115 38 125 Q52 115 66 90" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
      </g>

      {/* ── RIGHT CLUSTER ── */}

      <g transform="translate(652,240)">
        <path d="M20 0 Q110 -12 200 -2 L202 22 Q110 34 18 24 Z"/>
        <ellipse cx="8" cy="10" rx="16" ry="14"/>
        <path d="M-4 0 Q8 -18 20 0 Q14 -10 8 -12 Q2 -10 -4 0Z"/>
        <path d="M180 4 Q220 -14 250 -26" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M190 12 Q228 0 258 -10" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M18 20 Q10 55 12 90" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M32 22 Q26 58 28 90" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      <g transform="translate(548,140)">
        <path d="M12 34 Q16 8 42 4 Q68 8 72 34 Q62 16 42 12 Q22 16 12 34Z"/>
        <ellipse cx="42" cy="44" rx="16" ry="17"/>
        <rect x="35" y="61" width="14" height="10" rx="4"/>
        <path d="M8 71 Q42 62 76 71 L72 170 Q42 178 12 170 Z"/>
        <path d="M12 88 Q4 108 2 140" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M72 88 Q80 108 82 140" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M14 168 Q-2 195 -4 220" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
        <path d="M70 168 Q86 195 88 220" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
      </g>

      <g transform="translate(462,48)">
        <path d="M10 36 Q14 8 38 4 Q62 8 66 36 Q56 16 38 12 Q20 16 10 36Z"/>
        <ellipse cx="38" cy="46" rx="15" ry="16"/>
        <rect x="31" y="62" width="14" height="10" rx="4"/>
        <path d="M6 72 Q38 65 70 72 L74 215 Q38 223 2 215 Z"/>
        <path d="M10 90 Q24 115 38 125 Q52 115 66 90" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

/* Slide 3 — BIBLE STUDY: people seated reading open Bibles in pews */
function BibleStudyWatermark() {
  return (
    <svg className={styles.watermark} viewBox="0 0 900 420"
         preserveAspectRatio="xMidYMid slice" aria-hidden="true"
         fill="white">
      {/* ── LEFT CLUSTER — seated row ── */}

      {/* Seated woman 1 — gele, holding open Bible */}
      <g transform="translate(0,60)">
        <path d="M10 36 Q14 6 42 2 Q70 6 74 36 Q64 16 42 12 Q20 16 10 36Z"/>
        <ellipse cx="42" cy="47" rx="17" ry="18"/>
        <rect x="35" y="65" width="14" height="10" rx="4"/>
        {/* Seated torso — shorter */}
        <path d="M6 75 Q42 68 78 75 L80 185 Q42 192 4 185 Z"/>
        {/* Arms angled down holding book */}
        <path d="M10 92 Q16 130 26 148" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M74 92 Q68 130 58 148" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        {/* Open Bible — two pages */}
        <path d="M14 148 Q42 140 70 148 L72 175 Q42 182 12 175 Z"/>
        <line x1="42" y1="140" x2="42" y2="182" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        {/* Pew bench */}
        <rect x="-8" y="186" width="100" height="10" rx="3"/>
        {/* Seated legs */}
        <path d="M14 192 L12 260" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M70 192 L72 260" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      {/* Seated man 2 — leaning forward studying */}
      <g transform="translate(98,80)">
        <ellipse cx="42" cy="38" rx="16" ry="17"/>
        <rect x="35" y="55" width="14" height="10" rx="4"/>
        <path d="M6 65 Q42 58 78 65 L76 172 Q42 179 8 172 Z"/>
        <path d="M10 82 Q18 118 28 138" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M74 82 Q66 118 56 138" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M16 138 Q42 130 68 138 L70 163 Q42 170 14 163 Z"/>
        <line x1="42" y1="130" x2="42" y2="170" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        <rect x="-6" y="174" width="100" height="10" rx="3"/>
        <path d="M14 184 L12 252" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M70 184 L72 252" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      {/* Seated woman 3 — gele, turning slightly as if discussing */}
      <g transform="translate(190,68)">
        <path d="M8 32 Q12 5 38 2 Q64 5 68 32 Q58 14 38 10 Q18 14 8 32Z"/>
        <ellipse cx="38" cy="42" rx="15" ry="16"/>
        <rect x="31" y="58" width="14" height="10" rx="4"/>
        <path d="M4 68 Q38 62 72 68 L74 175 Q38 182 2 175 Z"/>
        <path d="M8 85 Q14 120 22 140" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M68 85 Q62 120 54 140" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M14 140 Q38 133 62 140 L64 163 Q38 170 12 163 Z"/>
        <line x1="38" y1="133" x2="38" y2="170" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        <rect x="-4" y="176" width="92" height="10" rx="3"/>
        <path d="M10 186 L8 250" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M66 186 L68 250" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>

      {/* ── RIGHT CLUSTER ── */}

      <g transform="translate(640,60)">
        <path d="M10 36 Q14 6 42 2 Q70 6 74 36 Q64 16 42 12 Q20 16 10 36Z"/>
        <ellipse cx="42" cy="47" rx="17" ry="18"/>
        <rect x="35" y="65" width="14" height="10" rx="4"/>
        <path d="M6 75 Q42 68 78 75 L80 185 Q42 192 4 185 Z"/>
        <path d="M10 92 Q16 130 26 148" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M74 92 Q68 130 58 148" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M14 148 Q42 140 70 148 L72 175 Q42 182 12 175 Z"/>
        <line x1="682" y1="140" x2="682" y2="182" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        <rect x="-8" y="186" width="100" height="10" rx="3"/>
        <path d="M14 192 L12 260" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M70 192 L72 260" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      <g transform="translate(738,80)">
        <ellipse cx="42" cy="38" rx="16" ry="17"/>
        <rect x="35" y="55" width="14" height="10" rx="4"/>
        <path d="M6 65 Q42 58 78 65 L76 172 Q42 179 8 172 Z"/>
        <path d="M10 82 Q18 118 28 138" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M74 82 Q66 118 56 138" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M16 138 Q42 130 68 138 L70 163 Q42 170 14 163 Z"/>
        <rect x="-6" y="174" width="100" height="10" rx="3"/>
        <path d="M14 184 L12 252" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M70 184 L72 252" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      <g transform="translate(828,68)">
        <path d="M8 32 Q12 5 38 2 Q64 5 68 32 Q58 14 38 10 Q18 14 8 32Z"/>
        <ellipse cx="38" cy="42" rx="15" ry="16"/>
        <rect x="31" y="58" width="14" height="10" rx="4"/>
        <path d="M4 68 Q38 62 72 68 L74 175 Q38 182 2 175 Z"/>
        <path d="M8 85 Q14 120 22 140" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M68 85 Q62 120 54 140" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M14 140 Q38 133 62 140 L64 163 Q38 170 12 163 Z"/>
        <rect x="-4" y="176" width="92" height="10" rx="3"/>
        <path d="M10 186 L8 250" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M66 186 L68 250" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

/* Slide 4 — YOUTH & FAMILY: adults with children, standing together */
function FamilyWatermark() {
  return (
    <svg className={styles.watermark} viewBox="0 0 900 420"
         preserveAspectRatio="xMidYMid slice" aria-hidden="true"
         fill="white">
      {/* ── LEFT CLUSTER — family group ── */}

      {/* Adult woman — gele, tall, arm around child */}
      <g transform="translate(0,20)">
        <path d="M12 40 Q16 6 44 2 Q72 6 76 40 Q66 18 44 13 Q22 18 12 40Z"/>
        <ellipse cx="44" cy="52" rx="17" ry="19"/>
        <rect x="37" y="71" width="14" height="11" rx="4"/>
        <path d="M8 82 Q44 74 80 82 L84 250 Q44 260 4 250 Z"/>
        {/* Left arm — around child */}
        <path d="M10 100 Q-2 130 -6 165" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        {/* Right arm — slightly out */}
        <path d="M78 100 Q90 128 94 155" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        {/* Legs */}
        <path d="M20 248 L18 340" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M68 248 L70 340" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      {/* Child 1 — short, next to adult, arms at sides/holding up */}
      <g transform="translate(-16,155)">
        {/* Small gele on child */}
        <path d="M18 24 Q22 6 36 4 Q50 6 54 24 Q46 12 36 10 Q26 12 18 24Z"/>
        <ellipse cx="36" cy="32" rx="12" ry="13"/>
        <rect x="30" y="45" width="12" height="9" rx="4"/>
        {/* Child bubu */}
        <path d="M14 54 Q36 48 58 54 L60 150 Q36 157 12 150 Z"/>
        {/* Arms raised in joy */}
        <path d="M16 68 Q6 52 2 34" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M56 68 Q66 52 70 34" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        {/* Legs */}
        <path d="M22 148 L20 210" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M50 148 L52 210" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
      </g>

      {/* Adult man — agbada, beside woman */}
      <g transform="translate(90,32)">
        <ellipse cx="44" cy="38" rx="16" ry="18"/>
        <rect x="37" y="56" width="14" height="11" rx="4"/>
        <path d="M-4 67 Q44 56 92 67 L94 238 Q44 248 -6 238 Z"/>
        <path d="M2 84 Q-12 112 -14 145" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M86 84 Q100 112 102 145" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M18 236 L16 330" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
        <path d="M70 236 L72 330" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
      </g>

      {/* Child 2 — boy, smaller, beside man */}
      <g transform="translate(178,168)">
        <ellipse cx="30" cy="28" rx="11" ry="12"/>
        <rect x="24" y="40" width="12" height="8" rx="3"/>
        <path d="M10 48 Q30 42 50 48 L52 138 Q30 144 8 138 Z"/>
        <path d="M12 62 Q4 48 0 32" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        <path d="M48 62 Q56 48 60 32" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        <path d="M16 136 L14 198" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M44 136 L46 198" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
      </g>

      {/* ── RIGHT CLUSTER (mirrored) ── */}

      <g transform="translate(638,20)">
        <path d="M12 40 Q16 6 44 2 Q72 6 76 40 Q66 18 44 13 Q22 18 12 40Z"/>
        <ellipse cx="44" cy="52" rx="17" ry="19"/>
        <rect x="37" y="71" width="14" height="11" rx="4"/>
        <path d="M8 82 Q44 74 80 82 L84 250 Q44 260 4 250 Z"/>
        <path d="M10 100 Q-2 130 -6 165" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M78 100 Q90 128 94 155" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M20 248 L18 340" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
        <path d="M68 248 L70 340" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round"/>
      </g>

      <g transform="translate(622,155)">
        <path d="M18 24 Q22 6 36 4 Q50 6 54 24 Q46 12 36 10 Q26 12 18 24Z"/>
        <ellipse cx="36" cy="32" rx="12" ry="13"/>
        <rect x="30" y="45" width="12" height="9" rx="4"/>
        <path d="M14 54 Q36 48 58 54 L60 150 Q36 157 12 150 Z"/>
        <path d="M16 68 Q6 52 2 34" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M56 68 Q66 52 70 34" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M22 148 L20 210" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M50 148 L52 210" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round"/>
      </g>

      <g transform="translate(728,32)">
        <ellipse cx="44" cy="38" rx="16" ry="18"/>
        <rect x="37" y="56" width="14" height="11" rx="4"/>
        <path d="M-4 67 Q44 56 92 67 L94 238 Q44 248 -6 238 Z"/>
        <path d="M2 84 Q-12 112 -14 145" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M86 84 Q100 112 102 145" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M18 236 L16 330" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
        <path d="M70 236 L72 330" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round"/>
      </g>

      <g transform="translate(818,168)">
        <ellipse cx="30" cy="28" rx="11" ry="12"/>
        <rect x="24" y="40" width="12" height="8" rx="3"/>
        <path d="M10 48 Q30 42 50 48 L52 138 Q30 144 8 138 Z"/>
        <path d="M12 62 Q4 48 0 32" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        <path d="M48 62 Q56 48 60 32" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        <path d="M16 136 L14 198" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        <path d="M44 136 L46 198" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SLIDE DATA — each slide references its watermark component
───────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    label: 'Sunday Worship',
    title: 'Come Into His Presence',
    desc: 'Join us every Sunday for a powerful time of worship, the Word, and encounter with the living God.',
    accent: '#B01A1A',
    pattern: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(176,26,26,0.45) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 30%, rgba(212,160,23,0.12) 0%, transparent 60%)',
    icon: '🙌',
    Watermark: WorshipWatermark,
  },
  {
    label: 'Prayer & Deliverance',
    title: 'Set Free by His Power',
    desc: 'Aggressive prayer is the engine of MFM. Every service is a portal of deliverance, healing, and breakthrough.',
    accent: '#D4A017',
    pattern: 'radial-gradient(ellipse 60% 70% at 70% 40%, rgba(212,160,23,0.2) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 20% 70%, rgba(176,26,26,0.35) 0%, transparent 60%)',
    icon: '🔥',
    Watermark: PrayerWatermark,
  },
  {
    label: 'Bible Study',
    title: 'Rooted in the Word',
    desc: 'We are a Word-based ministry. Every prayer point, every doctrine, every step is grounded in Scripture.',
    accent: '#B01A1A',
    pattern: 'radial-gradient(ellipse 80% 50% at 50% 80%, rgba(176,26,26,0.4) 0%, transparent 65%), radial-gradient(ellipse 30% 30% at 85% 15%, rgba(212,160,23,0.15) 0%, transparent 55%)',
    icon: '📖',
    Watermark: BibleStudyWatermark,
  },
  {
    label: 'Youth & Family',
    title: 'Building the Next Generation',
    desc: 'Our children and youth programs raise up a generation that is on fire for God — bold, pure, and unashamed.',
    accent: '#D4A017',
    pattern: 'radial-gradient(ellipse 50% 60% at 20% 30%, rgba(212,160,23,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 60% 70%, rgba(176,26,26,0.38) 0%, transparent 65%)',
    icon: '✝️',
    Watermark: FamilyWatermark,
  },
]

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function SlideshowSection() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((idx: number) => {
    setFading(true)
    setTimeout(() => {
      setActive(idx)
      setFading(false)
    }, 350)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [active, goTo])

  const slide = SLIDES[active]
  const { Watermark } = slide

  return (
    <section className={styles.section}>
      {/* Main slide display */}
      <div className={`${styles.stage} ${fading ? styles.fading : ''}`}>
        {/* Background gradient */}
        <div className={styles.stageBg} style={{ background: slide.pattern }} />

        {/* Grid overlay */}
        <div className={styles.stageGrid} />

        {/* Watermark silhouettes — left & right sides only */}
        <Watermark />

        {/* Corner accents */}
        <div className={styles.cornerTL} style={{ borderColor: slide.accent + '55' }} />
        <div className={styles.cornerBR} style={{ borderColor: slide.accent + '55' }} />

        {/* Slide content — centered, above watermark */}
        <div className={styles.stageContent}>
          <div className={styles.slideIcon}>{slide.icon}</div>
          <span className={styles.slideLabel} style={{ color: slide.accent }}>{slide.label}</span>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
          <div className={styles.slideDivider} style={{ background: `linear-gradient(90deg, ${slide.accent}, transparent)` }} />
          <p className={styles.slideDesc}>{slide.desc}</p>
        </div>

        {/* Slide number */}
        <div className={styles.slideNum}>
          <span className={styles.slideNumCurrent}>{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.slideNumSep} />
          <span className={styles.slideNumTotal}>{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className={styles.thumbStrip}>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
          >
            <div className={styles.thumbBg} style={{ background: s.pattern, opacity: i === active ? 1 : 0.4 }} />
            <div className={styles.thumbGrid} />
            <div className={styles.thumbContent}>
              <span className={styles.thumbIcon}>{s.icon}</span>
              <span className={styles.thumbLabel}>{s.label}</span>
            </div>
            {i === active && (
              <div className={styles.thumbProgress} style={{ borderColor: s.accent }}>
                <div className={styles.thumbProgressBar} style={{ background: s.accent }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dot navigation */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
