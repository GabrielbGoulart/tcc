import { ORDERS } from "../../dist/models"
import { influxQueryApi } from "../databases/influx"
import { authorize } from "../security/auth"

async function listAllPrices(req, res, next) {
  const bond = req.params.bond || 'TFOF11'
  const start = req.params.start || '-1d'
  const interval = req.params.interval || '1h'

  const query = `
    first_value = from(bucket:"prices")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}" )
      |> aggregateWindow(
            every: ${interval},
            fn: first
      )
    last_value = from(bucket:"prices")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: last
      )
    min_value = from(bucket:"prices")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: min
      )
    max_value = from(bucket:"prices")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: max
      )
    interval_join = join(
        tables:{first:first_value, last:last_value},
        on:["_time"]
      )
    limits_join= join(
        tables:{max:max_value, min:min_value},
        on:["_time"]
      )
    join(
        tables:{LIMIT:limits_join, INTERVAL:interval_join},
        on:["_time"]
      )`

  console.log(query)
  const result = []
  influxQueryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      const obj_result = [o._time, o._value_first.toFixed(2), o._value_max.toFixed(2), o._value_min.toFixed(2), o._value_last.toFixed(2)]
      console.log(obj_result)
      result.push(obj_result)
    },
    error(error) {
      res.json(error)
      console.log('\nFinished ERROR', error)
    },
    complete() {
      res.json(result)
    },
  })
}
async function createOrder(req, res, next) {
  try {
    console.log(req.authenticated)
    const { stock, target_value, buynow } = req.body
    const {email,id} = req.authenticated
    if (stock && buynow) {
      await ORDERS.create({ stock, target_value, buynow ,user_id:id})
    }else{
      res.status(400).json({message:"parametros inválidos"})
    }
  } catch (error) {
    res.status(500).json({message: "INTERNAL ERROR"})

  }
}
async function listOrders(req,res,next){

}


export const applyRoutes = (application) => {
  application.get('/prices/:bond', [authorize(), listAllPrices])
  application.post('/order', [authorize(), createOrder])
  application.get('/order', [authorize(), listOrders])

  // application.post('/contracts/:id/edit/datesign', [authorize(), editStatus])
}
