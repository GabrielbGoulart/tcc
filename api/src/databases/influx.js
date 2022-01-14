import {InfluxDB} from '@influxdata/influxdb-client'
import { enviroment } from '../enviroment/enviroment'
import {Agent} from 'http'
const url = enviroment.DB_SETTINGS.INFLUX.URL || "localhost"
const token = enviroment.DB_SETTINGS.INFLUX.TOKEN || "NkCxAkYs2m4FPNj_s-9AokXS7veXGShhgi5tVRjtMgGtOGb7bSLR01-3RGYcx03o743_DBp54D3Gsk0edKLGpg=="
const org = enviroment.DB_SETTINGS.INFLUX.ORG || "ufc"
const agent = new Agent({
    keepAlive: true,
    keepAliveMsecs: 20 * 1000, // 20 seconds keep alive
  })
export const influxQueryApi = new InfluxDB({url, token,transportOptions: {agent}}).getQueryApi(org)
