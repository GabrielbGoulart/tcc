const stage = process.env.STAGE || 'dev'
const settings = {
    dev: {
        API_SETTINGS: {
            PORT: process.env.PORT || '3000'
        },
        DB_SETTINGS:{
            INFLUX:{
                URL:'http://ec2-34-226-136-124.compute-1.amazonaws.com:8086',
                TOKEN:'FPKW9EzaYbH_xy_HySeJzuWRVrW8nWsT-eWUPkf_BOQ-DIQULd1HY5EPdFOokxkUuBawxCZeZ72h5uJTnP-GQw==',
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
            apiSecret:"tcc"
        }
    }
}

export const enviroment  = settings[stage]