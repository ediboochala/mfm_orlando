import { SERVICES } from '@/data/siteData'

const WEEKDAY_MAP: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function parseStartTime(time: string): { hour: number; minute: number } {
  const first = time.split(/[–-]/)[0].trim()
  const match = first.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return { hour: 0, minute: 0 }
  let hour = parseInt(match[1], 10)
  const minute = parseInt(match[2], 10)
  const period = match[3].toUpperCase()
  if (period === 'PM' && hour !== 12) hour += 12
  if (period === 'AM' && hour === 12) hour = 0
  return { hour, minute }
}

function dayNameFromService(day: string): number | 'monthly' {
  if (day.includes('Month')) return 'monthly'
  for (const name of WEEKDAY_NAMES) {
    if (day.startsWith(name)) return WEEKDAY_MAP[name]
  }
  return 0
}

function firstSaturdayOfMonth(year: number, month: number): number {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay()
  const offset = (6 - firstWeekday + 7) % 7
  return 1 + offset
}

export interface NextService {
  name: string
  weekdayLabel: string
  monthLabel: string
  dayOfMonth: number
  hour: number
  minute: number
}

export function getNextService(now: Date): NextService | null {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0'
  const nowYear = parseInt(get('year'), 10)
  const nowMonth = parseInt(get('month'), 10) - 1
  const nowDay = parseInt(get('day'), 10)
  const nowHour = parseInt(get('hour'), 10) === 24 ? 0 : parseInt(get('hour'), 10)
  const nowMinute = parseInt(get('minute'), 10)
  const nowWeekday = new Date(Date.UTC(nowYear, nowMonth, nowDay)).getUTCDay()
  const nowTotalMinutes = nowHour * 60 + nowMinute

  let best: { rankDays: number; startTotalMinutes: number; targetUtc: number; service: (typeof SERVICES)[number] } | null = null

  for (const service of SERVICES) {
    const { hour, minute } = parseStartTime(service.time)
    const startTotalMinutes = hour * 60 + minute
    const dayInfo = dayNameFromService(service.day)

    let targetUtc: number
    let rankDays: number

    if (dayInfo === 'monthly') {
      let targetDay = firstSaturdayOfMonth(nowYear, nowMonth)
      let targetMonth = nowMonth
      let targetYear = nowYear
      const alreadyPassed = nowDay > targetDay || (nowDay === targetDay && nowTotalMinutes >= startTotalMinutes)
      if (alreadyPassed) {
        targetMonth += 1
        if (targetMonth > 11) { targetMonth = 0; targetYear += 1 }
        targetDay = firstSaturdayOfMonth(targetYear, targetMonth)
      }
      targetUtc = Date.UTC(targetYear, targetMonth, targetDay)
      rankDays = Math.round((targetUtc - Date.UTC(nowYear, nowMonth, nowDay)) / 86400000)
    } else {
      let daysAhead = (dayInfo - nowWeekday + 7) % 7
      if (daysAhead === 0 && nowTotalMinutes >= startTotalMinutes) daysAhead = 7
      targetUtc = Date.UTC(nowYear, nowMonth, nowDay + daysAhead)
      rankDays = daysAhead
    }

    const isBetter =
      !best ||
      rankDays < best.rankDays ||
      (rankDays === best.rankDays && startTotalMinutes < best.startTotalMinutes)

    if (isBetter) {
      best = { rankDays, startTotalMinutes, targetUtc, service }
    }
  }

  if (!best) return null

  const targetDate = new Date(best.targetUtc)
  const { hour, minute } = parseStartTime(best.service.time)

  return {
    name: best.service.name,
    weekdayLabel: WEEKDAY_NAMES[targetDate.getUTCDay()],
    monthLabel: MONTH_NAMES[targetDate.getUTCMonth()],
    dayOfMonth: targetDate.getUTCDate(),
    hour,
    minute,
  }
}

export function formatNextService(next: NextService): string {
  const hour12 = next.hour % 12 === 0 ? 12 : next.hour % 12
  const period = next.hour >= 12 ? 'PM' : 'AM'
  const minuteStr = next.minute.toString().padStart(2, '0')
  return `NEXT SERVICE — ${next.weekdayLabel.toUpperCase()}, ${next.monthLabel.toUpperCase()} ${next.dayOfMonth} AT ${hour12}:${minuteStr} ${period}`
}
