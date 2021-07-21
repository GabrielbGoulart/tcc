import { influxQueryApi } from "../../dist/databases/influx"

async function listAllPrices(req,res,next){
    const bond = req.params.bond || 'TFOF11'

    const query = `from(bucket: \"\prices\")\
                 |> range(start: -27h)\
                 |> filter(fn: (r) => r.bond == "${bond}")`
    console.log(query)
    const result=[]
    influxQueryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row)
          result.push({bond:o.bond,time:o._time,value:o._value})
        },
        error(error) {
            res.json(error)
            console.log('\nFinished ERROR',error)
        },
        complete() {
          res.json(result)
        },
      })
}


export const applyRoutes = (application) => {
    application.get('/prices/:bond', [ listAllPrices])
    // application.post('/contracts/:id/edit/datesign', [authorize(), editStatus])
}
