const stage = process.env.STAGE || 'dev'
const settings = {
    dev: {
        API_SETTINGS: {
            PORT: process.env.PORT || '3000'
        },
        DB_SETTINGS:{
            INFLUX:{
                URL:'http://localhost:8086',
                TOKEN:'OQLn6k2N5PV08mS1-AF_eE-hnoeSGF3Eqw5o_zJ7NNHnRMVqpQuZg1xynvWoPf5OWMOLWboTtKsPymISMDo-XA==',
                ORG:'ufc'
            },
            POSTGRES:{
                DATABASE:"homebroker",
                URL:'localhost',
                USER:"tcc",
                PASSWORD:"ufc@2021",
                PORT:5432,

            }
        },
        SECURITY:{
            apiSecret:"tccc"
        }
    }
}

export const enviroment  = settings[stage]