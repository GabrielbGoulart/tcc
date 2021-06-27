import {InfluxDB, FluxTableMetaData} from '@influxdata/influxdb-client'
import { enviroment } from '../../dist/enviroment/enviroment'

const url = enviroment.DB_SETTINGS.INFLUX.URL 
const token = enviroment.DB_SETTINGS.INFLUX.TOKEN 
const org = enviroment.DB_SETTINGS.INFLUX.ORG 

export const influxQueryApi = new InfluxDB({url, token}).getQueryApi(org)
