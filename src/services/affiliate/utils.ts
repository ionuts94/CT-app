const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateReferralCode(): string {
    let code = ''

    for (let i = 0; i < 4; i++) {
        code += CHARS[Math.floor(Math.random() * CHARS.length)]
    }

    return code
}