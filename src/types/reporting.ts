export type T_SignUpFunnel = {
    invitations_sent: number,
    active_invitations: number,
    users_signed_up: number,
    active_users: number
}

export type T_CompanyCourseMetrics = {
    coursesData: { name: string, started: number, completed: number }[],
    modulesData: { started: number, completed: number }
}

export type T_CompannySessionsMetrics = {
    sessionsCount: number,
    distinctUsers: number,
    totalTimeSpentSeconds: number,
    avgTimePerUserSeconds: number
}

export type T_CompannyCommitmentsMetrics = {
    total: number,
    completed: number,
    distinctUsers: number
}

export type T_CompannyAIMetrics = {
    totalMessages: number,
    distinctUsers: number
}