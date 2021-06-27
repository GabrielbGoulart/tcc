const stage = process.env.STAGE || 'dev'
const settings = {
    dev: {
        API_SETTINGS: {
            PORT: process.env.PORT || '3000'
        },
        DB_SETTINGS:{
            INFLUX:{
                URL:'http://localhost:8086',
                TOKEN:'i4eaV0EWJJLuEKiNGh_emX-DRBGZ1D9dS36dbHh20TERnleo-nuRGf3cH0d1zqU1XoR7ZTQ2JxWUrq_A0QU6Uw==',
                ORG:'meutcc'
            }
        }
    }
}

export const enviroment  = settings[stage]