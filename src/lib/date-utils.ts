import { format, fromZonedTime, toZonedTime } from 'date-fns-tz'

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

export function toUTC(
    date: Date | string,
    timeZone: string
): Date {
    const local = new Date(date)
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
): Date {
    const local = toZonedTime(utcDate, timeZone)
    return local
}


export function formatUtcToLocaleString(utcDate: Date | string) {
    return format(
        formatUtcToLocalDate(
            new Date(utcDate),
            getUserTimeZone()
        ),
        "dd.MM.yyyy, HH:mm:ss"
    )
}

export function getDateWithDayOffset(days: number) {
    const now = new Date()
    const daysInMs = 1000 * 60 * 60 * 24 * days
    return new Date(now.getTime() + daysInMs)
}

export const dateUtils = {
    toUTC,
    toUtcEndOfDay,
    toUtcStartOfDay,
    formatUtcToLocalDate,
    getUserTimeZone,
    formatUtcToLocaleString,
    getDateWithDayOffset
}