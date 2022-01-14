import { Pool, PoolClient } from "pg"
import { enviroment } from "../enviroment/enviroment"

let _POOL
let _CONNECTION
export const getConnection = () => _POOL
// export const getPool = () => _POOL

export const initPG = async () => {
    return new Promise(async (resolve, reject) => {
        _POOL = new Pool({
            database: enviroment.DB_SETTINGS.POSTGRES.DATABASE || 'homebroker',
            host: enviroment.DB_SETTINGS.POSTGRES.URL || "localhost",
            password: enviroment.DB_SETTINGS.POSTGRES.PASSWORD||"ufc@2021",
            port: Number(enviroment.DB_SETTINGS.POSTGRES.PORT|| "5432"),
            user: enviroment.DB_SETTINGS.POSTGRES.USER||"tcc",max:200
        })
        const intervalId = setInterval(async () => {
            try {
                _CONNECTION = await _POOL.connect()
                clearInterval(intervalId)
                _CONNECTION.release()
                resolve()
            } catch (error) {
                console.log("erro ao conectar ao postgres".toLocaleUpperCase(), error)
            }
        }, 10000)

    })
}
