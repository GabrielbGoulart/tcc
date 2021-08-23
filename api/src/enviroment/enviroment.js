const stage = process.env.STAGE || 'dev'
const settings = {
    dev: {
        API_SETTINGS: {
            PORT: process.env.PORT || '3000'
        },
        DB_SETTINGS:{
            INFLUX:{
                URL:'http://localhost:8086',
                TOKEN:'ZkZfWC_rHz2a1NqHzbtyBQCVLW_AB0WKVZ7HJeKphhQN3JRcipkoeVr6q70HnEBZs4SM121Upcb3CRUy_i5nzQ==',
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