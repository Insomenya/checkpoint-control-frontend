export const API_PATHS = {
    ROOT: import.meta.env.VITE_NEEDS_MIRAGE === 'true' ? 'api' : import.meta.env.VITE_API_HOST,
    AUTH: {
        ROOT: '/auth',
        CREATE: '/jwt/create',
        REFRESH: '/jwt/refresh',
        VERIFY: '/jwt/verify',
        DETAILS: '/details',
        SETPASS: '/setpass',
        STATS: '/stats',
        USERS: '/users',
        SIGNUP: '/signup',
    },
    CHECKPOINTS: {
        ROOT: '/checkpoints',
    },
    CONFIRM: {
        ROOT: '/confirm',
    },
    CONFIRMED: {
        ROOT: '/confirmed',
        CHECKPOINT: '/checkpoint',
        ZONE: '/zone',
    },
    EXPEDITION: {
        ROOT: '/expedition',
        STATUS: '/status',
    },
    EXPEDITIONS: {
        ROOT: '/expeditions',
        BRIEF: '/brief',
    },
    GOODS: {
        ROOT: '/goods',
    },
    ORGS: {
        ROOT: '/orgs',
    }
};