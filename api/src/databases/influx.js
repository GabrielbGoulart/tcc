import {InfluxDB} from '@influxdata/influxdb-client'
import { enviroment } from '../enviroment/enviroment'
import {Agent} from 'http'
const url = enviroment.DB_SETTINGS.INFLUX.URL  
const token = enviroment.DB_SETTINGS.INFLUX.TOKEN 
const org = enviroment.DB_SETTINGS.INFLUX.ORG 
const agent = new Agent({
    keepAlive: true,
    keepAliveMsecs: 20 * 1000, // 20 seconds keep alive
  })
export const influxQueryApi = new InfluxDB({url, token,transportOptions: {agent}}).getQueryApi(org)
