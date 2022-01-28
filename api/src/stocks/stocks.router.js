import { ORDERS } from "../../dist/models"
import { influxQueryApi } from "../databases/influx"
import { authorize } from "../security/auth"
import { stockNames } from "./stocksNames"
const BUCKET='prices_teste'
async function listAllPrices(req, res, next) {
  try {
    let bond = req.params.bond || 'TFOF11'
    // bond = `${bond};`
    let start = '-1mo'
    let interval = '1d'
    const { mode } = req.query

    switch (mode) {
      case 'five':
        start = '-1h'
        interval = '5m'
      break;
      
      case 'ten':
        start = '-1h'
        interval = '10m'
      break;
      case 'mes':
        start = '-1mo'
        interval = '1d'
        break;
      case 'all':
        start = '-10y'
        interval = '1mo'
        break;
    }
    console.log(start,interval,mode)
    const query = `
    first_value = from(bucket:"${BUCKET}")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}" )
      |> aggregateWindow(
            every: ${interval},
            fn: first,
            createEmpty: false
      )
    last_value = from(bucket:"${BUCKET}")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: last,
            createEmpty: false
      )
    min_value = from(bucket:"${BUCKET}")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: min,
            createEmpty: false
      )
    max_value = from(bucket:"${BUCKET}")
      |> range(start:${start})
      |> filter(fn: (r) => r.bond == "${bond}"  )
      |> aggregateWindow(
            every: ${interval},
            fn: max,
            createEmpty: false
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
        console.log(o)
        const obj_result = [o._time, o._value_first.toFixed(2), o._value_max.toFixed(2), o._value_min.toFixed(2), o._value_last.toFixed(2)]
        console.log(obj_result)
        result.push(obj_result)
      },
      error(error) {
        console.log('\nFinished ERROR', error)
        throw error
      },
      complete() {
        res.json(result)
      },
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
async function getLastPrice(bond) {
  const query = `from(bucket:"prices")
  |> range(start:-1y)
  |> filter(fn: (r) => r.bond == "${bond}" )
  |> sort(columns:["_time"])
  |>limit(n:1)`
  const data = await influxQueryApi.collectRows(query)
  return data[0]._value
}
async function createOrder(req, res, next) {
  try {
    console.log(req.authenticated)
    let { stock, target_value, buynow } = req.body
    buynow = !!buynow
    const { email, id } = req.authenticated
    const stockNameIsValid = (stock && stockNames.includes(stock))
    const valueIsValid = (!!buynow == !target_value)
    console.log(stock, target_value, buynow)
    console.log(stockNameIsValid, valueIsValid, stockNames.includes(stock))
    if (stockNameIsValid && valueIsValid) {
      if (buynow) {
        target_value = await getLastPrice(stock)
      }
      const result = await ORDERS.create({ stock, target_value, buynow, user_id: id })
      res.json(result)
    } else {
      res.status(400).json({ message: "parametros inválidos" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "INTERNAL ERROR" })

  }
}
async function listOrders(req, res, next) {
  try {
    const { _limit, _sort, _page, _order, ...filters } = req.query
    console.log(_limit, _sort, _page, _order, filters)

    const orders = await ORDERS.findAndCountAll({
      where: filters || null,
      order: (_order && _sort) ? [[_order, _sort.toUpperCase()]] : null,
      limit: _limit || null,
      offset: _page || null
    })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "parametros inválidos" })

  }
}


export const applyRoutes = (application) => {
  application.get('/prices/:bond', [authorize(), listAllPrices])
  application.post('/orders', [authorize(), createOrder])
  application.get('/orders', [authorize(), listOrders])

  // application.post('/contracts/:id/edit/datesign', [authorize(), editStatus])
}
