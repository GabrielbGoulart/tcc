const stage = process.env.STAGE || 'dev'
const settings = {
    dev: {
        API_SETTINGS: {
            PORT: process.env.PORT || '3000'
        },
        DB_SETTINGS:{
            INFLUX:{
                URL:'http://localhost:8086',
                TOKEN:'VvspivljE2nHPMArtuXqOusd86G08q5iEY_c8MTPxUvTR6ttYAurpe2yDkz8T5Y597sLNzGndy_yewWQEVCrlA==',
                ORG:'ufc'
            }
        }
    }
}

export const enviroment  = settings[stage]