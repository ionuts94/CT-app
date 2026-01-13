export const STRIPE_PRICES = {
    STARTER: {
        prices: {
            monthly: {
                priceId: "price_1Sp2X3CvzVco3QENUCGzyQvw",
            },
        },
        contractsPerPeriod: 5,
        type: "subscription",
    },

    TEAM: {
        prices: {
            monthly: {
                priceId: "price_1Sp2XiCvzVco3QEN2u3Wmd5P",
            },
        },
        contractsPerPeriod: 20,
        type: "subscription",
    },

    BUSINESS: {
        prices: {
            monthly: {
                priceId: "price_1Sp2YVCvzVco3QEN4SAIwF5z",
            },
        },
        contractsPerPeriod: 50,
        type: "subscription",
    },

    PAYG: {
        priceId: "price_1Sp2Z4CvzVco3QENtupsLLUZ",
        contractsPerPurchase: 1,
        type: "one_time",
    },
} as const

export const PRICE_IDS_LIST = Object.values(STRIPE_PRICES).map(item => item.type === "one_time" ? item.priceId : item.prices.monthly.priceId)

export const isValidPriceId = (priceId: string) => PRICE_IDS_LIST.includes(priceId as any)