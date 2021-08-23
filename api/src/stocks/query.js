`batchSize = ( start=-2d, interval= 1h) => {
    first_value = from(bucket:"prices")
      |> range(start:start)
      |> filter(fn: (r) => r.bond =="TFOF11" )
      |> aggregateWindow(
            every: interval,
            fn: first
      )
    last_value = from(bucket:"prices")
      |> range(start:start)
      |> filter(fn: (r) => r.bond =="TFOF11" )
      |> aggregateWindow(
            every: interval,
            fn: last
      )
    min_value = from(bucket:"prices")
      |> range(start:start)
      |> filter(fn: (r) => r.bond =="TFOF11" )
      |> aggregateWindow(
            every: interval,
            fn: min
      )
    max_value = from(bucket:"prices")
      |> range(start:start)
      |> filter(fn: (r) => r.bond =="TFOF11" )
      |> aggregateWindow(
            every: interval,
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
      return join(
        tables:{LIMIT:limits_join, INTERVAL:interval_join},
        on:["_time"]
      )
}

batchSize()`