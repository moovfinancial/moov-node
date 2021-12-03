export interface Account {
    mode: "production" | "sandbox",
    accountType: "business" | "individual",
    profile: {
        individual: {
            name: {
                firstName?: string,
                middleName?: string,
                lastName?: string,
                suffix?: string
            },
            phone?: {
                number: string,
                countryCode: string
            },
            email?: string,
            address?: {
                addressLine1?: string,
                addressLine2?: string,
                city?: string,
                stateOrProvince?: string,
                postalCode?: string,
                country?: string
            },
            birthDate?: {
                day: number,
                month: number,
                year: number
            },
            governmentID?: {
                ssn?: {
                    full: string,
                    lastFour: string
                },
                itin?: {
                    full: string,
                    lastFour: string
                }
            }
        },
        business?: {
            legalBusinessName: string,
            doingBusinessAs?: string,
            businessType: "soleProprietorship" | "unincorporatedAssociation" | "trust" | "publicCorporation" | "privateCorporation" | "llc" | "partnership",
            address?: {
                addressLine1?: string,
                addressLine2?: string,
                city?: string,
                stateOrProvince?: string,
                postalCode?: string,
                country?: string
            },
            phone?: {
                number: string,
                countryCode: string
            },
            email?: string,
            website?: string,
            description?: string,
            taxID: {
                ein: {
                    number: string
                }
            },
            industryCodes: {
                naics: string,
                sic: string,
                mcc: string
            }
        }
    },
    metadata?: {
        [key: string]: string,
    },
    termsOfService?: {
        token: string
    },
    foreignID?: string
}