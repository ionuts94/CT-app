import { fromZonedTime, toZonedTime } from 'date-fns-tz'

export function getUserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function toUtcEndOfDay(
    date: Date,
    timeZone: string
): Date {
    const local = new Date(date)
    local.setHours(23, 59, 59, 999)
    return fromZonedTime(local, timeZone)
}

export function toUtcStartOfDay(
    date: Date,
    timeZone: string
): Date {
    const local = new Date(date)
    local.setHours(0, 0, 0, 0)
    return fromZonedTime(local, timeZone)
}

export function formatUtcToLocalDate(
    utcDate: Date,
    timeZone: string,
    locale = 'ro-RO'
): string {
    const local = toZonedTime(utcDate, timeZone)
    return local.toLocaleDateString(locale)
}

export const dateUtils = {
    toUtcEndOfDay,
    toUtcStartOfDay,
    formatUtcToLocalDate,
    getUserTimeZone
}